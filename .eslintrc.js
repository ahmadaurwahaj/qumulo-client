module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    es2021: true,
    browser: true,
  },
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings",
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  plugins: ["tailwindcss", "unused-imports", "simple-import-sort"],
  rules: {
    "@next/next/no-img-element": "off",
    //*=========== Import Sort ===========
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^react$", "^next"],
          // ext library & side effect imports
          ["^@?\\w", "^\\u0000"],
          // components
          ["^@/components", "^@/providers"],
          // Other imports
          ["^@/"],
          // relative paths up until 3 level
          [
            "^\\./?$",
            "^\\.(?!/?$)",
            "^\\.\\./?$",
            "^\\.\\.(?!/?$)",
            "^\\.\\./\\.\\./?$",
            "^\\.\\./\\.\\.(?!/?$)",
            "^\\.\\./\\.\\./\\.\\./?$",
            "^\\.\\./\\.\\./\\.\\.(?!/?$)",
          ],
          ["^@/types"],
          // {s}css files
          ["^.+\\.s?css$"],
          ["^"],
        ],
      },
    ],
  },
  globals: {
    React: true,
    JSX: true,
  },
  ignorePatterns: ["!.jest"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parserOptions: {
        project: ["./tsconfig.json"],
        ecmaVersion: "latest",
      },
      rules: {
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            checksVoidReturn: false,
          },
        ],
      },
    },
    {
      files: ["src/**/*.test.ts", "src/**/*.test.tsx"],
      plugins: ["jest", "jest-formatting", "testing-library", "jest-dom"],
      extends: [
        "plugin:jest/recommended",
        "plugin:jest-formatting/recommended",
        "plugin:testing-library/react",
        "plugin:jest-dom/recommended",
      ],
    },
    {
      files: ["e2e/**"],
      extends: ["plugin:playwright/recommended"],
    },
  ],
};
