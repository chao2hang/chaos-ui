import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { ApiClient, getApiClient, safeRequest } from "./api-client";
import type { ApiError, ApiClientConfig } from "./api-client";

// ---- mocks ---------------------------------------------------------------

const toastError = vi.fn();

vi.mock("sonner", () => ({
  toast: {
    error: (msg: unknown) => toastError(msg),
    success: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
    promise: vi.fn(),
  },
}));

const loggerError = vi.fn();
vi.mock("@/lib/logger", () => ({
  logger: {
    error: (...args: unknown[]) => loggerError(...args),
    info: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    setLevel: vi.fn(),
  },
}));

// A minimal axios-like instance capturing interceptors.
// A typed headers bag matching the subset of AxiosHeaders we use.
class HeadersBag {
  common: Record<string, string> = {};
  set(key: string, value: string) {
    this.common[key] = value;
  }
}

type ReqInterceptor = (cfg: {
  headers: HeadersBag;
  [k: string]: unknown;
}) => Promise<{ headers: HeadersBag; [k: string]: unknown }>;
type ResRejected = (err: unknown) => Promise<unknown>;

function createFakeInstance() {
  const request = vi.fn(async (cfg: Record<string, unknown>) => cfg);

  let reqInterceptor: ReqInterceptor | null = null;
  let resRejected: ResRejected | null = null;

  const instance = {
    defaults: { headers: { common: {} as Record<string, string> } },
    interceptors: {
      request: {
        use: (fn: ReqInterceptor) => {
          reqInterceptor = fn;
        },
      },
      response: {
        use: (_onFulfilled: unknown, onRejected: ResRejected) => {
          resRejected = onRejected;
        },
      },
    },
    request,
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    _getReqInterceptor: () => reqInterceptor,
    _getResRejected: () => resRejected,
  };
  return instance;
}

const fakeInstance = createFakeInstance();

vi.mock("axios", () => ({
  default: {
    create: vi.fn(() => fakeInstance),
  },
  AxiosError: class AxiosError extends Error {},
}));

describe("api-client", () => {
  beforeEach(() => {
    toastError.mockClear();
    loggerError.mockClear();
    fakeInstance.request.mockClear();
    fakeInstance.get.mockClear();
    fakeInstance.post.mockClear();
    fakeInstance.put.mockClear();
    fakeInstance.patch.mockClear();
    fakeInstance.delete.mockClear();
    fakeInstance.defaults.headers.common = {};
  });

  it("exports ApiClient", () => {
    expect(ApiClient).toBeDefined();
  });
  it("exports getApiClient", () => {
    expect(getApiClient).toBeDefined();
  });
  it("exports types", () => {
    const _tc1: ApiError | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
  it("ApiClientConfig is usable as a type", () => {
    const _tc: ApiClientConfig = {};
    expect(_tc).toEqual({});
  });

  it("constructs with default baseURL/timeout and calls axios.create", () => {
    const spy = vi.mocked(axios.create);
    spy.mockClear();
    new ApiClient();
    expect(spy).toHaveBeenCalledWith({ baseURL: "/api", timeout: 30000 });
  });

  it("respects custom baseURL/timeout and showErrorToast default true", () => {
    vi.mocked(axios.create).mockClear();
    new ApiClient({ baseURL: "https://api.test", timeout: 5000 });
    expect(vi.mocked(axios.create)).toHaveBeenCalledWith({
      baseURL: "https://api.test",
      timeout: 5000,
    });
  });

  it("get delegates to instance.get and returns data", async () => {
    fakeInstance.get.mockResolvedValueOnce({ data: { ok: 1 } });
    const client = new ApiClient();
    const data = await client.get("/things");
    expect(data).toEqual({ ok: 1 });
    expect(fakeInstance.get).toHaveBeenCalledWith("/things", undefined);
  });

  it("post delegates to instance.post with body", async () => {
    fakeInstance.post.mockResolvedValueOnce({ data: { id: 9 } });
    const client = new ApiClient();
    const data = await client.post("/things", { name: "x" });
    expect(data).toEqual({ id: 9 });
    expect(fakeInstance.post).toHaveBeenCalledWith("/things", { name: "x" }, undefined);
  });

  it("put delegates to instance.put", async () => {
    fakeInstance.put.mockResolvedValueOnce({ data: { updated: true } });
    const client = new ApiClient();
    const data = await client.put("/things/1", { name: "y" });
    expect(data).toEqual({ updated: true });
  });

  it("patch delegates to instance.patch", async () => {
    fakeInstance.patch.mockResolvedValueOnce({ data: { patched: 1 } });
    const client = new ApiClient();
    const data = await client.patch("/things/1", { a: 1 });
    expect(data).toEqual({ patched: 1 });
  });

  it("delete delegates to instance.delete", async () => {
    fakeInstance.delete.mockResolvedValueOnce({ data: { deleted: 1 } });
    const client = new ApiClient();
    const data = await client.delete("/things/1");
    expect(data).toEqual({ deleted: 1 });
  });

  it("setHeader / removeHeader mutate defaults.headers.common", () => {
    const client = new ApiClient();
    client.setHeader("X-Test", "yes");
    expect(fakeInstance.defaults.headers.common["X-Test"]).toBe("yes");
    client.removeHeader("X-Test");
    expect(fakeInstance.defaults.headers.common["X-Test"]).toBeUndefined();
  });

  // ---- request interceptor (token) ----

  it("request interceptor attaches Authorization header when getToken returns a token", async () => {
    const getToken = vi.fn(async () => "abc123");
    new ApiClient({ getToken });
    const fn = fakeInstance._getReqInterceptor()!;
    const headers = new HeadersBag();
    const cfg = { headers } as unknown as Parameters<ReqInterceptor>[0];
    await fn(cfg);
    expect(getToken).toHaveBeenCalledTimes(1);
    expect(headers.common["Authorization"]).toBe("Bearer abc123");
  });

  it("request interceptor skips header when getToken returns null", async () => {
    const getToken = vi.fn(async () => null);
    new ApiClient({ getToken });
    const fn = fakeInstance._getReqInterceptor()!;
    const headers = new HeadersBag();
    const cfg = { headers } as unknown as Parameters<ReqInterceptor>[0];
    await fn(cfg);
    expect(headers.common["Authorization"]).toBeUndefined();
  });

  it("request interceptor is a no-op when getToken not provided", async () => {
    new ApiClient();
    const fn = fakeInstance._getReqInterceptor()!;
    const headers = new HeadersBag();
    const cfg = { headers } as unknown as Parameters<ReqInterceptor>[0];
    await expect(fn(cfg)).resolves.toBe(cfg);
  });

  // ---- response interceptor error handling ----

  function makeErr(opts: {
    status?: number;
    message?: string;
    data?: { message?: string; code?: string; details?: unknown };
    config?: Record<string, unknown>;
  }) {
    return {
      response: opts.status
        ? { status: opts.status, data: opts.data }
        : undefined,
      message: opts.message ?? "Request failed",
      config: opts.config,
    };
  }

  function reject(_client: ApiClient) {
    const fn = fakeInstance._getResRejected()!;
    return (err: unknown) => fn(err);
  }

  it("rejects with ApiError and shows network toast on status 0", async () => {
    const client = new ApiClient();
    const handle = reject(client);
    const err = makeErr({});
    await expect(handle(err)).rejects.toMatchObject({
      status: 0,
      message: "Request failed",
    });
    expect(toastError).toHaveBeenCalledWith("网络连接失败");
  });

  it("shows server-error toast for status >= 500", async () => {
    const client = new ApiClient();
    const handle = reject(client);
    await expect(
      handle(makeErr({ status: 503, data: { message: "down" } })),
    ).rejects.toMatchObject({ status: 503, message: "down" });
    expect(toastError).toHaveBeenCalledWith("服务异常，请稍后重试");
  });

  it("shows login-expired toast for 401 when no refreshToken", async () => {
    const client = new ApiClient();
    const handle = reject(client);
    await expect(
      handle(makeErr({ status: 401, data: { message: "unauth" } })),
    ).rejects.toMatchObject({ status: 401, message: "unauth" });
    expect(toastError).toHaveBeenCalledWith("登录已过期");
  });

  it("shows forbidden toast for 403", async () => {
    const client = new ApiClient();
    const handle = reject(client);
    await expect(
      handle(makeErr({ status: 403, data: { message: "no" } })),
    ).rejects.toMatchObject({ status: 403 });
    expect(toastError).toHaveBeenCalledWith("没有访问权限");
  });

  it("shows the apiError.message toast for other 4xx", async () => {
    const client = new ApiClient();
    const handle = reject(client);
    await expect(
      handle(makeErr({ status: 422, data: { message: "validation failed" } })),
    ).rejects.toMatchObject({ status: 422, message: "validation failed" });
    expect(toastError).toHaveBeenCalledWith("validation failed");
  });

  it("builds ApiError.code and details from response data", async () => {
    const client = new ApiClient();
    const handle = reject(client);
    const err = makeErr({
      status: 400,
      data: { message: "bad", code: "BAD_REQ", details: { field: "x" } },
    });
    await expect(handle(err)).rejects.toMatchObject({
      status: 400,
      code: "BAD_REQ",
      message: "bad",
      details: { field: "x" },
    });
  });

  it("omits code/details when response data lacks them", async () => {
    const client = new ApiClient();
    const handle = reject(client);
    const apiErr = (await handle(makeErr({ status: 400, data: { message: "m" } }))
      .catch((e: ApiError) => e)) as ApiError;
    expect(apiErr.code).toBeUndefined();
    expect(apiErr.details).toBeUndefined();
    expect(apiErr.message).toBe("m");
  });

  it("calls onError callback with the ApiError", async () => {
    const onError = vi.fn();
    const client = new ApiClient({ onError });
    const handle = reject(client);
    await handle(makeErr({ status: 500 })).catch(() => undefined);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0]![0]).toMatchObject({ status: 500 });
  });

  it("does not show toast when showErrorToast is false", async () => {
    const client = new ApiClient({ showErrorToast: false });
    const handle = reject(client);
    await handle(makeErr({ status: 500 })).catch(() => undefined);
    expect(toastError).not.toHaveBeenCalled();
  });

  it("logs the API error via logger", async () => {
    const client = new ApiClient();
    const handle = reject(client);
    await handle(makeErr({ status: 500, config: { url: "/x" } })).catch(
      () => undefined,
    );
    expect(loggerError).toHaveBeenCalledTimes(1);
    expect(loggerError.mock.calls[0]![0]).toBe("API error");
  });

  // ---- 401 token refresh ----

  it("refreshes token on 401 and retries the request", async () => {
    const refreshToken = vi.fn(async () => "new-token");
    fakeInstance.request.mockResolvedValueOnce({ data: { ok: true } });
    const client = new ApiClient({ refreshToken });
    const handle = reject(client);
    const cfgHeaders = new HeadersBag();
    const err = makeErr({
      status: 401,
      config: { url: "/secure", headers: cfgHeaders },
    });
    const result = await handle(err);
    expect(refreshToken).toHaveBeenCalledTimes(1);
    expect(cfgHeaders.common["Authorization"]).toBe("Bearer new-token");
    expect(fakeInstance.request).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ data: { ok: true } });
  });

  it("does not retry when refreshToken returns null (falls through to 401 toast)", async () => {
    const refreshToken = vi.fn(async () => null);
    const onTokenExpired = vi.fn();
    const client = new ApiClient({ refreshToken, onTokenExpired });
    const handle = reject(client);
    await expect(
      handle(
        makeErr({ status: 401, config: { url: "/x", headers: new HeadersBag() } }),
      ),
    ).rejects.toMatchObject({ status: 401 });
    expect(onTokenExpired).toHaveBeenCalledTimes(1);
    expect(toastError).toHaveBeenCalledWith("登录已过期");
  });

  it("calls onTokenExpired when refresh throws", async () => {
    const refreshToken = vi.fn(async () => {
      throw new Error("refresh failed");
    });
    const onTokenExpired = vi.fn();
    const client = new ApiClient({ refreshToken, onTokenExpired });
    const handle = reject(client);
    await expect(
      handle(
        makeErr({ status: 401, config: { url: "/x", headers: new HeadersBag() } }),
      ),
    ).rejects.toMatchObject({ status: 401 });
    expect(onTokenExpired).toHaveBeenCalledTimes(1);
  });

  it("401 without config does not attempt refresh (no err.config)", async () => {
    const refreshToken = vi.fn(async () => "t");
    const onTokenExpired = vi.fn();
    const client = new ApiClient({ refreshToken, onTokenExpired });
    const handle = reject(client);
    await expect(handle(makeErr({ status: 401 }))).rejects.toMatchObject({
      status: 401,
    });
    expect(refreshToken).not.toHaveBeenCalled();
  });

  // ---- getApiClient singleton ----

  it("getApiClient returns a singleton", () => {
    const a = getApiClient();
    const b = getApiClient();
    expect(a).toBe(b);
  });

  // ---- safeRequest ----

  it("safeRequest returns the resolved value", async () => {
    const result = await safeRequest(async () => 42);
    expect(result).toBe(42);
  });

  it("safeRequest returns fallback when fn rejects", async () => {
    const result = await safeRequest(async () => {
      throw new Error("x");
    }, "fallback");
    expect(result).toBe("fallback");
  });

  it("safeRequest returns undefined when fn rejects and no fallback", async () => {
    const result = await safeRequest(async () => {
      throw new Error("x");
    });
    expect(result).toBeUndefined();
  });
});
