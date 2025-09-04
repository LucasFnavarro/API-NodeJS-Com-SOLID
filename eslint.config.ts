import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import ts from "typescript";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { ts },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
]);
