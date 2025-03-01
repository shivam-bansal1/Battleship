import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
      jest: true,
    },
    plugins: {
      jest,
    },
    rules: {
      ...jest.configs.recommended.rules, // Enables recommended Jest rules
    },
  },
  pluginJs.configs.recommended,
];
