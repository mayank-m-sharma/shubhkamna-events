import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jestPlugin from "eslint-plugin-jest";

const eslintConfig = defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
  ]),

  ...nextVitals,
  ...nextTs,

  {
    plugins: { import: importPlugin },
    rules: {
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-duplicates": "error",
    },
  },

  {
    rules: {
      // Core code quality
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
      "no-duplicate-imports": "off", // superseded by import/no-duplicates (type-aware)
      "consistent-return": "error",

      // Performance-focused
      "no-loop-func": "error",
      "no-new-func": "error",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": ["error", "always"],
      "prefer-template": "error",

      // Security
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-script-url": "error",
      "react/jsx-no-target-blank": "error",
      "react/no-danger": "error",

      // Maintainability (warnings — visible, non-blocking guidance)
      "max-lines": [
        "warn",
        { max: 300, skipBlankLines: true, skipComments: true },
      ],
      "max-lines-per-function": [
        "warn",
        { max: 80, skipBlankLines: true, skipComments: true },
      ],
      complexity: ["warn", 12],
      "max-depth": ["warn", 4],
      "no-restricted-imports": ["error", { patterns: [] }],

      // TypeScript
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        { allowExpressions: true },
      ],

      // Formatting handled by Prettier; keep only non-stylistic core rules here.
      semi: "off",
      quotes: "off",
      indent: "off",
      "arrow-body-style": ["error", "as-needed"],
    },
  },

  {
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    plugins: { jest: jestPlugin },
    rules: {
      ...jestPlugin.configs["flat/recommended"].rules,
      "jest/no-focused-tests": "error",
      "jest/no-disabled-tests": "error",
      "max-lines-per-function": "off",
    },
  },

  {
    files: ["**/*.config.{js,mjs,ts}", "sanity.config.ts", "sanity/**/*.ts"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },

  prettierConfig,
]);

export default eslintConfig;
