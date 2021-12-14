module.exports = {
  parser: 'babel-eslint',
  plugins: ['import'],
  extends: '@arcblock/eslint-config',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
    mocha: true,
  },
  rules: {
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
        },
        ignore: ['setupProxy.js', 'App.js'],
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
};
