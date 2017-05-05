'use strict';

const parser = require('xml2json');
const {log, readFile} = require('../helper');
const sonarqubeScanner = require('sonarqube-scanner');

const appVersion = parser.toJson(readFile('pom.xml'), {
  object: true
}).project.version;

sonarqubeScanner({
  serverUrl: 'SONAR-SERVER',
  token: 'TOKEN',
  options: {
    'sonar.coverage.exclusions': 'api-test/*.js, api-test/node_scripts/**, api-test/test/**',
    'sonar.host.url': 'SONAR-SERVER',
    'sonar.javascript.lcov.reportPath': 'coverage/lcov-sonar.info',
    'sonar.projectKey': 'group--my-project',
    'sonar.projectName': 'group--my-project',
    'sonar.projectVersion': appVersion,
    'sonar.sourceEncoding': 'UTF-8',
    'sonar.sources': 'api-test/',
  }
}, () => {
  log('sonarqubeScanner finished');
});
