import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  // 커스텀 규칙 추가
  {
    name: 'app/custom-rules', // 규칙 이름
    rules: {
      'no-unused-vars': 'warn', // 사용되지 않는 변수에 대한 경고
      'no-console': 'off', // 콘솔 사용 허용
      'vue/multi-word-component-names': 'off', // 단일 단어로 된 컴포넌트명 허용
      eqeqeq: ['error', 'always'], // 엄격한 동등 비교 사용
    },
  },

  skipFormatting,
])
