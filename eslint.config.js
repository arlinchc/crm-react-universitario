import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Ignorar build
  globalIgnores(["dist"]),

  // ================== FRONTEND (React) ==================
  {
    files: ["src/**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
  },

  // ================== BACKEND (Node.js) ==================
  {
    files: ["backend/**/*.js"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.node, // 🔥 AQUÍ ESTÁ LA CLAVE
      parserOptions: {
        sourceType: "commonjs", // 🔥 para require/module.exports
      },
    },
    rules: {
      "no-unused-vars": "warn",
    },
  },
]);