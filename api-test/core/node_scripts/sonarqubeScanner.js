'use strict';

const parser = require('xml2json');
const {log, readFile} = require('../helper');
const {sonarOptions} = require('../../config');
const sonarqubeScanner = require('sonarqube-scanner');

const appVersion = parser.toJson(readFile('pom.xml'), {
  object: true
}).project.version;

sonarqubeScanner(sonarOptions(appVersion), () => {
  log('sonarqubeScanner finished');
});
