module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  plugins: [
    'svelte3'
  ],
  ignorePatterns: [
    'public/',
    '.eslintrc.js'
  ],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  rules: {
    'semi': ['error', 'always']
  },
  settings: {
    'svelte3/ignore-styles': () => true
  }
};
