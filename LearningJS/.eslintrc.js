module.exports = {
  env: {
    browser: true,
    node: true,
    es2015: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    // "react"
  ],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    // , "plugin:react/recommended"
  ],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'linebreak-style': 0,
    'global-require': 0,
    'eslint linebreak-style': [0, 'error', 'windows'],
  },
  ignorePatterns: ['node_modules/'],
};
