import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default [
  includeIgnoreFile(gitignorePath),
  {
    ignores: ['cypress/support/component.ts']
  },
  { files: ['**/*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    files: ['**/*.cy.ts', '**/*.cy.js'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  },
  {
    files: ['**/*.ts', '**/*.test.ts', '**/*.test.js'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
]
