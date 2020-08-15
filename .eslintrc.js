module.exports = {
  env: {
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'standard',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {},
}
