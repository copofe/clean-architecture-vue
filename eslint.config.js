import lint from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default lint(
  {
    ignores: [
      'public/**',
      '.nitro/**',
      '.output/**',
    ],
    vue: {
      overrides: {
        'vue/max-attributes-per-line': ['error', { singleline: 2, multiline: 1 }],
      },
    },
  },
  ...compat.config({
    extends: [
      './.eslintrc-auto-import.json',
    ],
  }),
)
