
const {error, log, Promise} = require('../helper');
const ejs = require('ejs');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

// ejs options
const options = {};

module.exports = renderData;


function renderFile(destFileName, content) {
  return new Promise(function (resolve, reject) {
    fse.ensureFile(destFileName, function (err) {
      if (err) {
        log('fse.ensureFile error');
        error(err);

        reject();
      } else {
        fs.writeFileSync(destFileName, content);
        resolve();
      }
    });
  });
}

function renderData(data) {
  return new Promise(function (resolve, reject) {
    const templateFile = path.resolve(__dirname, '../', 'api.js.template');

    ejs.renderFile(templateFile, data, options, function (err, str) {
      if (err) {
        log(err);
        error('ejs.renderFile error');

        reject();
      }

      const outputUrl = path.resolve(__dirname, '../../', 'api', data.handlerClass, data.handlerMethod + '.js');
      renderFile(outputUrl, str).then(resolve, reject);
    });
  });
}

