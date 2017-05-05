'use strict';

const {error, getMergedFgOptions, log, Promise, R, request, setUri} = require('../helper');

const defaultOptions = {
  json: true,
  resolveWithFullResponse: false,
  simple: true,
};

module.exports = listAllApis;

function listAllApis() {
  return listApis('/basepaths').then((basePaths) => {
    let promise = Promise.resolve();
    let output = [];

    R.forEach((basePath) => {
      promise = promise.then(() => {
        return listApis('/calls', {qs: {basePath: basePath}}).then((calls) => {
          output = output.concat(calls);
        });
      });
    }, basePaths);

    return promise.then(() => {
      return Promise.resolve(output);
    });
  }, (err) => {
    log('list basePaths failed');
    error(err);
  });
}

function listApis(path, params) {
  const options = getMergedFgOptions({
    method: 'GET',
    uri: setUri(path, '/apitester/api'),
  }, R.merge(R.clone(defaultOptions), params));

  return request(options).catch((err) => {
    log(`listApis failed for
path: ${path}
params: ${params ? JSON.stringify(params) : params}
`);
    error(err);
  });
}
