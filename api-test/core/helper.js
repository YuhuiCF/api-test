'use strict';

// TODO: append session to uri?
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const R = require('ramda');
const request = require('request-promise');
const util = require('util');

const config = require('../config');

const {apiHost} = config.envVars;
const {envVars} = config;

const defaultOptions = {
  jar: true,
  json: true,
  resolveWithFullResponse: true,
  simple: false,
};

const helperModule = {
  apiRequest,
  envVars,
  error,
  fatal,
  getMergedFgOptions,
  log,
  Promise,
  R,
  readFile,
  request,
  setPathRegExp,
  setUri,
  specError,
};

module.exports = helperModule;


function apiRequest(method, fullPath, params = {}) {
  const options = getMergedFgOptions({
    method: method,
    uri: setUri(fullPath, '', params.pathParams),
  }, params);

  return request(options);
}

/**
 * Logs a message to the terminal
 * @param {string} message The message to be displayed
 * @return {undefined}
 */
function error(message) {
  console.error(message);
}

/**
 * Stops the current node JS process
 * @param {string} message The message to be displayed, before ending
 * @return {undefined}
 */
function fatal(message) {
  if (message) {
    helperModule.error(message);
  }
  process.exit(1);
}

function getMergedFgOptions(options, otherOptions) {
  return R.merge(R.clone(defaultOptions), R.merge(options, otherOptions));
}

/**
 * Logs a message to the terminal
 * @param {string} message The message to be displayed
 * @return {undefined}
 */
function log(message) {
  util.log(message);
}

function readFile(file) {
  file = path.resolve(process.cwd(), file);

  try {
    return fs.readFileSync(file, {encoding: 'utf8'});
  } catch (e) {
    fatal('Cannot read ' + file + '\n' + e.message);
  }
}

function setPathRegExp(path) {
  return new RegExp(`\^${path}\$\|\^${path}?\|\^${path};jsessionid=`);
}

function setUri(url, prefix, ...replacers) {
  const replacersLength = replacers && replacers.length;

  if (replacersLength) {
    const keys = url.match(/{(\w)+}/g);

    if (keys && keys.length) {
      R.forEach((key, index) => {
        if (index < replacersLength) {
          url = url.replace(key, replacers[index]);
        }
      }, keys);
    }
  }

  return apiHost + prefix + url;
}

function specError(message) {
  fail(message);
  throw new Error(message);
}
