'use strict';

// environment variables:
// please provide at least:
//   apiHost, e.g. 'https://api.my-test-domain'
const envVars = process.env;

// API Tester configurations:
const apiPrefixOflistApis = '/smp/apitester/api';

// sonarOptions
const sonarProjectName = 'group--my-project';
const sonarProjectBaseDir = process.cwd();
function sonarOptions(appVersion) {
  // https://docs.sonarqube.org/display/SONAR/Analysis+Parameters
  return {
    serverUrl: 'SONAR-SERVER',
    token: 'TOKEN',
    options: {
      'sonar.host.url': 'SONAR-SERVER',
      'sonar.projectKey': sonarProjectName,
      'sonar.projectName': sonarProjectName,

      'sonar.coverage.exclusions': 'api-test/config.js, api-test/core/**, api-test/test/**',
      'sonar.inclusions': 'api-test/**',
      'sonar.exclusions': 'api-test/coverage/**',
      'sonar.javascript.lcov.reportPaths': 'api-test/coverage/lcov.info',
      'sonar.projectBaseDir': sonarProjectBaseDir,
      'sonar.projectVersion': appVersion,
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.sources': 'api-test/',
    }
  };
}


module.exports = {
  apiPrefixOflistApis,
  envVars,
  sonarOptions,
};
