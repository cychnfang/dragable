module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  extends: ['plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    'no-debugger': 'error'
  }
}
