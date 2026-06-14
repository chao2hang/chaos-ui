const packageJson = require("../package.json");

module.exports = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
  },
  rules: {
    "no-raw-html-button": require("./rules/no-raw-html-button")["no-raw-html-button"],
    "no-raw-html-elements": require("./rules/no-raw-html-elements")["no-raw-html-elements"],
    "require-forward-ref": require("./rules/require-forward-ref")["require-forward-ref"],
    "no-hardcoded-chinese": require("./rules/no-hardcoded-chinese")["no-hardcoded-chinese"],
    "no-missing-story": require("./rules/no-missing-story")["no-missing-story"],
    "no-data-fetching-in-ui": require("./rules/no-data-fetching-in-ui")["no-data-fetching-in-ui"],
    "no-deep-imports": require("./rules/no-deep-imports")["no-deep-imports"],
  },
  configs: {
    recommended: {
      plugins: ["@chaos/eslint-plugin"],
      rules: {
        "@chaos/no-raw-html-button": "error",
        "@chaos/require-forward-ref": "error",
        "@chaos/no-hardcoded-chinese": "warn",
        "@chaos/no-missing-story": "warn",
        "@chaos/no-raw-html-elements": "warn",
        "@chaos/no-data-fetching-in-ui": "warn",
        "@chaos/no-deep-imports": "warn",
      },
    },
    strict: {
      plugins: ["@chaos/eslint-plugin"],
      rules: {
        "@chaos/no-raw-html-button": "error",
        "@chaos/require-forward-ref": "error",
        "@chaos/no-hardcoded-chinese": "error",
        "@chaos/no-missing-story": "error",
        "@chaos/no-raw-html-elements": "error",
        "@chaos/no-data-fetching-in-ui": "error",
        "@chaos/no-deep-imports": "error",
      },
    },
  },
};
