module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'no-var': 'error',
    'vue/no-mutating-props': 'off',
    'vue/require-prop-types': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  }
}