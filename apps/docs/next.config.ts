import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "path";

/**
 * Storybook stories under src/stories import package source as `@/components/*`.
 * Docs app `@/*` normally points at `apps/docs/@/*`, so those imports fail and
 * live previews render empty.
 *
 * Turbopack resolveAlias values are resolved relative to the app root (apps/docs),
 * so we use `../..` (monorepo root) — not absolute filesystem paths.
 */
const packageSourceAlias: Record<string, string> = {
  "@/components/ui": "../../components/ui",
  "@/components/business": "../../components/business",
  "@/components/layout": "../../components/layout",
  "@/components/mobile": "../../components/mobile",
  "@/hooks": "../../hooks",
  "@/lib/utils": "../../lib/utils",
  "@/lib/modal": "../../lib/modal",
  "@/lib/modal-store": "../../lib/modal-store",
  "@/lib/message": "../../lib/message",
};

/** Absolute aliases for webpack (webpack prefers absolute paths). */
const packageSourceAliasAbs: Record<string, string> = Object.fromEntries(
  Object.entries(packageSourceAlias).map(([k, v]) => [
    k,
    path.resolve(__dirname, v),
  ]),
);

const nextConfig: NextConfig = {
  // LAN access (e.g. 10.10.10.10) for HMR / assets in dev
  allowedDevOrigins: ["10.10.10.10", "localhost"],
  output: "standalone",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["@chaos_team/chaos-ui"],
  typescript: {
    // Dual-story graph is isolated from typecheck via stubs + tsconfig exclude.
    // Gate: root `pnpm run typecheck:docs` → docs `typecheck:site`. Optional full tree: docs `typecheck:all` (not CI-gated).
    ignoreBuildErrors: false,
  },
  // Turbopack (next dev default in Next 16)
  turbopack: {
    resolveAlias: packageSourceAlias,
  },
  // Webpack fallback (next build without turbopack / legacy)
  webpack: (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string>),
      ...packageSourceAliasAbs,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    // GitHub-Flavored Markdown: tables, strikethrough, task lists, autolink literals.
    // Passed as a module specifier string so it serializes for both webpack and Turbopack;
    // @next/mdx's mdx-js-loader resolves & imports it at compile time.
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
