'use strict';

const {fatal, getMergedFgOptions, log, Promise, R, request, setUri} = require('../helper');
const {apiPrefixOflistApis} = require('../../config');
const ejs = require('./ejs');


const defaultOptions = {
  json: true,
  resolveWithFullResponse: false,
  simple: true,
};

module.exports = listAllApis;

function listAllApis() {
  return listApis('/endpoints').then((endpoints) => {
    let promise = Promise.resolve();

    R.forEach((endpoint) => {
      const {
        methodInfo: {
          className: handlerClass,
          methodName: handlerMethod,
        },
        pattern: fullPath,
        method,
      } = endpoint;

      promise = promise.then(() => {
        log(`${fullPath} (${method})`);

        return ejs({
          fullPath,
          handlerClass,
          handlerMethod,
          method,
        });
      });
    }, endpoints);

    promise.catch((err) => {
      return fatal(err);
    });

    return promise;
  }, (err) => {
    log('list basePaths failed');
    fatal(err);
  });
}

function listApis(path, params) {
  const options = getMergedFgOptions({
    method: 'GET',
    uri: setUri(path, apiPrefixOflistApis),
  }, R.merge(R.clone(defaultOptions), params));

  return request(options).catch((err) => {
    log(`listApis failed for
path: ${path}
params: ${params ? JSON.stringify(params) : params}
`);
    fatal(err);
  });
}
