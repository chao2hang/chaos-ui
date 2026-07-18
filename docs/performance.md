# Performance

## Bundle Size

- **Package size**: ~400KB (gzipped ~120KB) with sourcemap disabled
- **Per-component**: Individual components are tree-shakeable by the consumer's bundler
- **CSS**: Single `styles.css` file, ~30KB gzipped

## Size Monitoring

```bash
npm run size  # Runs size-limit checks
```

Size limits are configured in `package.json` under `size-limit`.

## Virtualization

For large datasets, use:

- Prefer `ProTable` / virtualized table patterns for large lists. `AdvancedDataTable` is **deprecated** (not tanstack-virtual based).
- `VirtualList` — Generic virtual scrolling component
- `TreeSelect` — Virtualized option list for large option sets

## Code Splitting

- Components use `"use client"` directives for proper RSC boundaries
- `splitting: false` in tsup preserves file-level "use client" directives
- Consumer bundler (Next.js/webpack/vite) handles tree-shaking at module granularity

## Image Optimization

- Use `next/image` for optimized images in Next.js apps
- Lazy loading is enabled by default for `ImageGallery` and `AttachmentPreview`
- Use `loading="lazy"` for images in custom components

## RSC Compatibility

- All components with `"use client"` are properly marked
- Server Components can import type-only exports from the library
- The `next` entry point provides RSC-safe re-exports

## Performance Checklist

- [ ] Large tables use virtualization (`@tanstack/react-virtual`)
- [ ] Large dropdown lists use virtual scrolling
- [ ] Images use lazy loading
- [ ] Heavy components are code-split
- [ ] No unnecessary re-renders (use `React.memo`, `useMemo`, `useCallback`)
- [ ] Bundle size within limits (`npm run size`)
