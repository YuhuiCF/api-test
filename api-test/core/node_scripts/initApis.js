'use strict';

const {envVars} = require('../../config');

const listAllApis = envVars.apiTesterNewVersion ? require('./listAllApis2') : require('./listAllApis');

listAllApis();
