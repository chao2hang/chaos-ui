const fs = require("fs");
const os = require("os");
const path = require("path");
const { RuleTester } = require("eslint");

const noMissingStory = require("../no-missing-story")["no-missing-story"];
const noDeepImports = require("../no-deep-imports")["no-deep-imports"];
const noRawHtmlElements =
  require("../no-raw-html-elements")["no-raw-html-elements"];

const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "chaos-rule-story-"));
const componentPath = path.join(
  projectRoot,
  "components",
  "ui",
  "button.tsx"
);
const storyDir = path.join(projectRoot, "src", "components");

fs.mkdirSync(path.dirname(componentPath), { recursive: true });
fs.mkdirSync(storyDir, { recursive: true });
fs.writeFileSync(
  path.join(storyDir, "Button.stories.tsx"),
  "export default {};",
  "utf8"
);

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run("no-missing-story", noMissingStory, {
  valid: [
    {
      code: "export function Button() { return <button />; }",
      filename: componentPath,
    },
  ],
  invalid: [],
});

ruleTester.run("no-deep-imports", noDeepImports, {
  valid: [
    {
      code: "import { Button } from '@/components/ui';",
      filename: path.join(process.cwd(), "components", "business", "card.tsx"),
    },
    {
      code: "import { Button } from '@/components/ui/button';",
      filename: path.join(process.cwd(), "components", "ui", "dialog.tsx"),
    },
    {
      code: "import { Button } from '@/components/ui/button';",
      filename: path.join(
        process.cwd(),
        "components",
        "business",
        "card.test.tsx"
      ),
    },
  ],
  invalid: [
    {
      code: "import { Button } from '@/components/ui/button';",
      filename: path.join(process.cwd(), "components", "business", "card.tsx"),
      errors: [{ messageId: "noDeepImport" }],
    },
  ],
});

ruleTester.run("no-raw-html-elements", noRawHtmlElements, {
  valid: [
    {
      code: 'export function SkipLink() { return <a href="#content">Skip</a>; }',
      filename: path.join(
        process.cwd(),
        "components",
        "business",
        "skip-link.tsx"
      ),
    },
  ],
  invalid: [
    {
      code: 'export function Action() { return <a href="#" onClick={() => {}}>Open</a>; }',
      filename: path.join(process.cwd(), "components", "business", "action.tsx"),
      errors: [{ messageId: "noNativeElement" }],
    },
  ],
});
