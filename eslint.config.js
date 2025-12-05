import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      import: importPlugin,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // 🔥 Главное: порядок импортов
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // node modules (fs, path)
            "external", // npm packages
            "internal", // алиасы @/...
            "parent", // ../file
            "sibling", // ./file
            "index", // index.tsx
            "object",
            "type",
          ],

          // React всегда сверху
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],

          // Игнорируем сортировку для стилей
          pathGroupsExcludedImportTypes: ["react"],

          // 🔥 Сортировка внутри группы — по длине строки
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },

          // newline между группами
          "newlines-between": "always",
        },
      ],

      // полезное правило — запретить абсолютные пути кроме @/
      "import/no-absolute-path": "error",
    },
  },
]);
