'use strict';

const {log} = require('console');
const {SpecReporter} = require('jasmine-spec-reporter');

let specStartTime;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

jasmine.getEnv().clearReporters();               // remove default reporter logs

jasmine.getEnv().addReporter(new SpecReporter({  // add jasmine-spec-reporter
  spec: {
    displayPending: true,
  },
  summary: {
    displayDuration: false,
  }
}));

jasmine.getEnv().addReporter({
  specStarted: () => {
    specStartTime = +(new Date());
  },
  specDone: () => {
    log('        ' + (+(new Date()) - specStartTime) + ' ms');
  }
});
