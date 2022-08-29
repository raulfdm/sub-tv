module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  rules: {
    "@typescript-eslint/consistent-type-assertions": 'error',
    "@typescript-eslint/consistent-type-imports": 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  }
};
