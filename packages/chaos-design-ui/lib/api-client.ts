import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios"
import { toast } from "sonner"
import { logger } from "@/lib/logger"

export interface ApiError {
  status: number
  code?: string
  message: string
  details?: unknown
}

export interface ApiClientConfig {
  baseURL?: string
  timeout?: number
  getToken?: () => string | null | Promise<string | null>
  onError?: (error: ApiError) => void
  showErrorToast?: boolean
}

export class ApiClient {
  private instance: AxiosInstance

  constructor(config: ApiClientConfig = {}) {
    const {
      baseURL = "/api",
      timeout = 30000,
      getToken,
      onError,
      showErrorToast = true,
    } = config

    this.instance = axios.create({ baseURL, timeout })

    this.instance.interceptors.request.use(async (cfg) => {
      if (getToken) {
        const token = await getToken()
        if (token) {
          cfg.headers.set("Authorization", `Bearer ${token}`)
        }
      }
      return cfg
    })

    this.instance.interceptors.response.use(
      (res) => res,
      (err: AxiosError<{ message?: string; code?: string; details?: unknown }>) => {
        const status = err.response?.status ?? 0
        const data = err.response?.data
        const apiError: ApiError = {
          status,
          code: data?.code,
          message: data?.message ?? err.message ?? "Request failed",
          details: data?.details,
        }
        logger.error("API error", { url: err.config?.url, ...apiError })
        onError?.(apiError)
        if (showErrorToast) {
          if (status === 0) {
            toast.error("网络连接失败")
          } else if (status >= 500) {
            toast.error("服务异常，请稍后重试")
          } else if (status === 401) {
            toast.error("登录已过期")
          } else if (status === 403) {
            toast.error("没有访问权限")
          } else if (status >= 400) {
            toast.error(apiError.message)
          }
        }
        return Promise.reject(apiError)
      }
    )
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T>(url, config).then((r) => r.data)
  }

  post<T>(url: string, body?: unknown, config?: AxiosRequestConfig) {
    return this.instance.post<T>(url, body, config).then((r) => r.data)
  }

  put<T>(url: string, body?: unknown, config?: AxiosRequestConfig) {
    return this.instance.put<T>(url, body, config).then((r) => r.data)
  }

  patch<T>(url: string, body?: unknown, config?: AxiosRequestConfig) {
    return this.instance.patch<T>(url, body, config).then((r) => r.data)
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete<T>(url, config).then((r) => r.data)
  }

  setHeader(key: string, value: string) {
    this.instance.defaults.headers.common[key] = value
  }

  removeHeader(key: string) {
    delete this.instance.defaults.headers.common[key]
  }
}

let defaultClient: ApiClient | null = null

export function getApiClient(config?: ApiClientConfig): ApiClient {
  if (!defaultClient) {
    defaultClient = new ApiClient(config)
  }
  return defaultClient
}

export async function safeRequest<T>(fn: () => Promise<T>, fallback?: T): Promise<T | undefined> {
  try {
    return await fn()
  } catch (err) {
    logger.warn("safeRequest fallback used", err)
    return fallback
  }
}
