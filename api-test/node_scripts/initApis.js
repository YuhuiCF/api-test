'use strict';

const ejs = require('./ejs');
const listAllApis = require('./listAllApis');

listAllApis().then((calls) => {
  calls.forEach((call) => {
    ejs(call);
  });
});
