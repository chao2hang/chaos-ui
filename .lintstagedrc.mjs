/** @type {import('lint-staged').Config} */
export default {
  // TypeScript/React 文件
  "*.{ts,tsx}": [
    "eslint --fix --no-warn-ignored",
    "prettier --write",
    () => "npx tsc --noEmit",
  ],
  // CSS 文件
  "*.css": [
    "stylelint --fix --allow-empty-input",
  ],
  // 其他文件
  "*.{json,md,mdx,yml,yaml}": [
    "prettier --write",
  ],
};
