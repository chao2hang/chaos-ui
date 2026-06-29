const noMissingStory = {
  meta: {
    type: "suggestion",
    docs: {
      description: "每个组件文件必须有对应的 Storybook story 文件",
    },
    messages: {
      missingStory:
        "组件 {{name}} 缺少对应的 Storybook story 文件。\n预期位置: {{expectedPath}}",
    },
  },
  create(context) {
    const fs = require("fs");
    const path = require("path");
    const filename = context.filename || context.getFilename();
    const normalizedFilename = filename.replace(/\\/g, "/");

    // 只检查 components/ 目录
    if (
      !normalizedFilename.includes("/components/")
    )
      return {};
    // 跳过 index.ts / types.ts 等非组件文件
    const basename = path.basename(filename, path.extname(filename));
    if (
      basename === "index" ||
      basename === "types" ||
      basename === "constants"
    )
      return {};

    const dir = path.dirname(filename);
    // 计算对应的 story 文件路径
    // components/ui/button.tsx → src/components/Button.stories.tsx
    // components/business/status-tag.tsx → src/business/StatusTag.stories.tsx
    // components/layout/app-shell.tsx → src/layout/AppShell.stories.tsx

    let category;
    if (normalizedFilename.includes("/components/ui/"))
      category = "components";
    else if (normalizedFilename.includes("/components/business/"))
      category = "business";
    else if (normalizedFilename.includes("/components/layout/"))
      category = "layout";
    else return {};

    // kebab-case → PascalCase for story filenames
    const pascalName = basename
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");

    const componentsSegment = `${path.sep}components${path.sep}`;
    const componentsIndex = dir.lastIndexOf(componentsSegment);
    const projectRoot =
      componentsIndex >= 0 ? dir.slice(0, componentsIndex) : process.cwd();
    const storyDir = path.join(projectRoot, "src", category);

    // 检查多种可能的 story 文件路径
    const possiblePaths = [
      path.join(storyDir, `${pascalName}.stories.tsx`),
      path.join(storyDir, `${pascalName}.stories.ts`),
      path.join(storyDir, `${pascalName}.stories.jsx`),
    ];

    const hasStory = possiblePaths.some((p) => fs.existsSync(p));

    if (!hasStory) {
      context.report({
        node: context.sourceCode?.ast?.body?.[0] || { type: "Program" },
        loc: { line: 1, column: 0 },
        messageId: "missingStory",
        data: {
          name: basename,
          expectedPath: possiblePaths[0],
        },
      });
    }

    return {};
  },
};

module.exports = { "no-missing-story": noMissingStory };
