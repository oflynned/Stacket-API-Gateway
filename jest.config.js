const { readFileSync } = require('fs');

const babelConfig = JSON.parse(readFileSync('./.babelrc', 'utf8'));

require('babel-register')(babelConfig);
require('babel-polyfill');

// const { join } = require('path');

// const ROOT = process.cwd();
// const TESTS = join(ROOT, '__tests__')
// const JEST_ENV = join(ROOT, '__jest_env__');

module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  // globalSetup: join(JEST_ENV, 'setup.js'),
  // globalTeardown: join(JEST_ENV, 'teardown.js'),
  // testEnvironment: join(JEST_ENV, 'server-environment.js')
};
