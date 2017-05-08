'use strict';

module.exports = {
  verbose: false,
  instrumentation: {
    'default-excludes': false,
    excludes: ['**/node_modules/**', '**/api-test/core/**'],
    'include-all-sources': true,
  },
  reporting: {
    dir: 'coverage'
  }
};
