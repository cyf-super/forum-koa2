module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    indent: ['error', 2],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true
      }
    ],
    semi: [
      'error',
      'never'
    ],
    'space-before-function-paren': 'off'
  }
}
