import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], // Configura para arquivos .js, .jsx, .ts, .tsx
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended, // Configuração do eslint para TypeScript
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "18", // Especifica a versão do React que você está utilizando
      },
    },
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off", // Desabilita a regra react/react-in-jsx-scope
    },
  },
];
