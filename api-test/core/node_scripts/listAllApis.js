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
  return listApis('/basepaths').then((basePaths) => {
    let promise = Promise.resolve();

    R.forEach((basePath) => {
      promise = promise.then(() => {
        return listApis('/calls', {qs: {basePath: basePath}}).then((calls) => {
          log(`calls for basePath ${basePath} fetched`);

          const promises = [];
          R.forEach((call) => {
            promises.push(
              ejs(call)
            );
          }, calls);

          return Promise.all(promises).catch((err) => {
            return fatal(err);
          });
        });
      });
    }, basePaths);

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
