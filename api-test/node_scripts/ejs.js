
const {fatal, log, Promise} = require('../helper');
const ejs = require('ejs');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

// ejs options
const options = {};

module.exports = renderData;


function renderFile(destFileName, content) {
  return new Promise(function (resolve) {
    fse.ensureFile(destFileName, function (err) {
      if (err) {
        log('fse.ensureFile error');
        return fatal(err);
      } else {
        fs.writeFile(destFileName, content, function (err) {
          if (err) {
            log('fs.writeFile error');
            return fatal(err);
          }

          resolve();
        });
      }
    });
  });
}

function renderData(data) {
  return new Promise(function (resolve) {
    const templateFile = path.resolve(__dirname, '../', 'api.js.template');

    ejs.renderFile(templateFile, data, options, function (err, str) {
      if (err) {
        log(err);
        fatal('ejs.renderFile error');
      }

      const outputUrl = path.resolve(__dirname, '../', 'api', data.handlerClass, data.handlerMethod + '.js');
      renderFile(outputUrl, str).then(resolve);
    });
  });
}

