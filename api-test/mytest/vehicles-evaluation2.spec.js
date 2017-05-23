'use strict';

const {createValuation} = require('./apis');
const {log, specError} = require('../core/helper');
const fileName = require('path').basename(__filename);

const contextKeyDefault = 'BIhYGSk-DlrnijwhGHI-FwoS4etKfqi';
const contextKeyHUK = 'BOo3SWFkj5oD';
const pathRegExp = /^\/smp\/api\/vehicles\/evaluation2[\w]*/;

function apiCreateValuation(options) {
  return createValuation(options).then((response) => {
    expect(response.request.method).toBe('POST');
    expect(response.request.path).toMatch(pathRegExp);

    return response;
  });
}

function getValuationPrices(body) {
  let valuationPriceHUK;
  let valuationPriceStandard;

  return apiCreateValuation({
      body,
      qs: {
        contextKey: contextKeyDefault // FG default
      },
    })
    .then((response) => {
      expect(response.statusCode).toBe(200);

      valuationPriceStandard = response.body.valuatedVehicle.valuation.purchasePriceGross;
    })
    .then(() => {
      return apiCreateValuation({
        body,
        qs: {
          contextKey: contextKeyHUK // HUK feature
        },
      });
    })
    .then((response) => {
      expect(response.statusCode).toBe(200);

      valuationPriceHUK = response.body.valuatedVehicle.valuation.purchasePriceGross;

      log({valuationPriceHUK, valuationPriceStandard});
      return {valuationPriceHUK, valuationPriceStandard};
    })
  ;
}


describe(`${fileName} ->`, () => {
  describe('createValuation() >', () => {
    describe('could return correct price for HUK >', () => {
      it('if vehicle age < 6 years AND less than 80.000 kilometers', (done) => {
        const body = {
          "valuatedVehicle": {
            "datECode": "010601070090002",
            "constructionTime": {
              "time": 1335830400000
            },
            "registrationDate": {
              "time": 1335830400000
            },
            "type": "EVALUATION",
            "mileage": 70000,
            "container": "DE00C"
          }
        };

        getValuationPrices(body)
          .then(({valuationPriceHUK ,valuationPriceStandard}) => {
            const ratio = valuationPriceHUK / valuationPriceStandard;
            expect(ratio.toFixed(2)).toBe('1.05');
          })
          .catch((err) => {
            specError(err);
          })
          .finally(done)
        ;
      });

      it('if 6 years < vehicle age < 9 years AND less than 60.000 kilometers', (done) => {
        const body = {
          "valuatedVehicle": {
            "datECode": "010600380050013",
            "constructionTime": {
              "time": 1272672000000
            },
            "registrationDate": {
              "time": 1272672000000
            },
            "type": "EVALUATION",
            "mileage": 50000,
            "container": "DE00A"
          }
        };

        getValuationPrices(body)
          .then(({valuationPriceHUK ,valuationPriceStandard}) => {
            const ratio = valuationPriceHUK / valuationPriceStandard;
            expect(ratio.toFixed(2)).toBe('1.05');
          })
          .catch((err) => {
            specError(err);
          })
          .finally(done)
        ;
      });

      it('if EUR 0 - 59', (done) => {
        const body = {
          "valuatedVehicle": {
            "datECode": "010400410140001",
            "constructionTime": {
              "time": 854755200000
            },
            "registrationDate": {
              "time": 854755200000
            },
            "type": "EVALUATION",
            "mileage": 700000,
            "container": "DE001"
          }
        };

        getValuationPrices(body)
          .then(({valuationPriceHUK ,valuationPriceStandard}) => {
            expect(valuationPriceHUK).toBe(1, 'valuationPriceHUK');
            expect(valuationPriceStandard).toBeLessThan(59, 'valuationPriceStandard');
          })
          .catch((err) => {
            specError(err);
          })
          .finally(done)
        ;
      });

      it('if EUR 60 - 99', (done) => {
        const body = {
          "valuatedVehicle": {
            "datECode": "010400410140001",
            "constructionTime": {
              "time": 854755200000
            },
            "registrationDate": {
              "time": 854755200000
            },
            "type": "EVALUATION",
            "mileage": 500000,
            "container": "DE001"
          }
        };

        getValuationPrices(body)
          .then(({valuationPriceHUK ,valuationPriceStandard}) => {
            expect(valuationPriceHUK).toBe(30, 'valuationPriceHUK');
            expect(valuationPriceStandard).toBeGreaterThan(60, 'valuationPriceStandard');
            expect(valuationPriceStandard).toBeLessThan(99, 'valuationPriceStandard');
          })
          .catch((err) => {
            specError(err);
          })
          .finally(done)
        ;
      });

      it('if EUR 100 - 149', (done) => {
        const body = {
          "valuatedVehicle": {
            "datECode": "010400430070002",
            "constructionTime": {
              "time": 917827200000
            },
            "registrationDate": {
              "time": 917827200000
            },
            "type": "EVALUATION",
            "mileage": 400000,
            "container": "DE001"
          }
        };

        getValuationPrices(body)
          .then(({valuationPriceHUK ,valuationPriceStandard}) => {
            expect(valuationPriceHUK).toBe(50, 'valuationPriceHUK');
            expect(valuationPriceStandard).toBeGreaterThan(100, 'valuationPriceStandard');
            expect(valuationPriceStandard).toBeLessThan(149, 'valuationPriceStandard');
          })
          .catch((err) => {
            specError(err);
          })
          .finally(done)
        ;
      });

      it('if EUR 150 - 199', (done) => {
        const body = {
          "valuatedVehicle": {
            "datECode": "010400430070002",
            "constructionTime": {
              "time": 917827200000
            },
            "registrationDate": {
              "time": 917827200000
            },
            "type": "EVALUATION",
            "mileage": 350000,
            "container": "DE001"
          }
        };

        getValuationPrices(body)
          .then(({valuationPriceHUK ,valuationPriceStandard}) => {
            expect(valuationPriceHUK).toBe(100, 'valuationPriceHUK');
            expect(valuationPriceStandard).toBeGreaterThan(150, 'valuationPriceStandard');
            expect(valuationPriceStandard).toBeLessThan(199, 'valuationPriceStandard');
          })
          .catch((err) => {
            specError(err);
          })
          .finally(done)
        ;
      });

      it('if EUR 200 - 1000', (done) => {
        const body = {
          "valuatedVehicle": {
            "datECode": "010400430070002",
            "constructionTime": {
              "time": 917827200000
            },
            "registrationDate": {
              "time": 917827200000
            },
            "type": "EVALUATION",
            "mileage": 60000,
            "container": "DE001"
          }
        };

        getValuationPrices(body)
          .then(({valuationPriceHUK ,valuationPriceStandard}) => {
            expect(valuationPriceStandard - valuationPriceHUK).toBe(100, 'valuationPriceStandard - valuationPriceHUK');
            expect(valuationPriceStandard).toBeGreaterThan(200, 'valuationPriceStandard');
            expect(valuationPriceStandard).toBeLessThan(1000, 'valuationPriceStandard');
          })
          .catch((err) => {
            specError(err);
          })
          .finally(done)
        ;
      });

      it('if EUR 1001 - 2000', (done) => {
        const body = {
          "valuatedVehicle": {
            "datECode": "010400450220001",
            "constructionTime": {
              "time": 1107216000000
            },
            "registrationDate": {
              "time": 1107216000000
            },
            "type": "EVALUATION",
            "mileage": 400000,
            "container": "DE001"
          }
        };

        getValuationPrices(body)
          .then(({valuationPriceHUK ,valuationPriceStandard}) => {
            expect(valuationPriceStandard - valuationPriceHUK).toBe(150, 'valuationPriceStandard - valuationPriceHUK');
            expect(valuationPriceStandard).toBeGreaterThan(1001, 'valuationPriceStandard');
            expect(valuationPriceStandard).toBeLessThan(2000, 'valuationPriceStandard');
          })
          .catch((err) => {
            specError(err);
          })
          .finally(done)
        ;
      });

      it('if EUR 2001 - 3000', (done) => {
        const body = {
          "valuatedVehicle": {
            "datECode": "010400450220001",
            "constructionTime": {
              "time": 1107216000000
            },
            "registrationDate": {
              "time": 1107216000000
            },
            "type": "EVALUATION",
            "mileage": 350000,
            "container": "DE001"
          }
        };

        getValuationPrices(body)
          .then(({valuationPriceHUK ,valuationPriceStandard}) => {
            expect(valuationPriceStandard - valuationPriceHUK).toBe(200, 'valuationPriceStandard - valuationPriceHUK');
            expect(valuationPriceStandard).toBeGreaterThan(2001, 'valuationPriceStandard');
            expect(valuationPriceStandard).toBeLessThan(3000, 'valuationPriceStandard');
          })
          .catch((err) => {
            specError(err);
          })
          .finally(done)
        ;
      });

      it('if EUR 3001 - 5000', (done) => {
        const body = {
          "valuatedVehicle": {
            "datECode": "010400450220001",
            "constructionTime": {
              "time": 1107216000000
            },
            "registrationDate": {
              "time": 1107216000000
            },
            "type": "EVALUATION",
            "mileage": 260000,
            "container": "DE001"
          }
        };

        getValuationPrices(body)
          .then(({valuationPriceHUK ,valuationPriceStandard}) => {
            expect(valuationPriceStandard - valuationPriceHUK).toBe(300, 'valuationPriceStandard - valuationPriceHUK');
            expect(valuationPriceStandard).toBeGreaterThan(3001, 'valuationPriceStandard');
            expect(valuationPriceStandard).toBeLessThan(5000, 'valuationPriceStandard');
          })
          .catch((err) => {
            specError(err);
          })
          .finally(done)
        ;
      });

      it('if EUR 5001 - 10000', (done) => {
        const body = {
          "valuatedVehicle": {
            "datECode": "010400700020016",
            "constructionTime": {
              "time": 1328054400000
            },
            "registrationDate": {
              "time": 1328054400000
            },
            "type": "EVALUATION",
            "mileage": 100000,
            "container": "DE00F"
          }
        };

        getValuationPrices(body)
          .then(({valuationPriceHUK ,valuationPriceStandard}) => {
            expect(valuationPriceStandard - valuationPriceHUK).toBe(400, 'valuationPriceStandard - valuationPriceHUK');
            expect(valuationPriceStandard).toBeGreaterThan(5001, 'valuationPriceStandard');
            expect(valuationPriceStandard).toBeLessThan(10000, 'valuationPriceStandard');
          })
          .catch((err) => {
            specError(err);
          })
          .finally(done)
        ;
      });

      it('if ≥ EUR 10.001', (done) => {
        const body = {
          "valuatedVehicle": {
            "datECode": "010420670010001",
            "constructionTime": {
              "time": 1328054400000
            },
            "registrationDate": {
              "time": 1328054400000
            },
            "type": "EVALUATION",
            "mileage": 90000,
            "container": "DE001"
          }
        };

        getValuationPrices(body)
          .then(({valuationPriceHUK ,valuationPriceStandard}) => {
            const ratio = valuationPriceHUK / valuationPriceStandard;
            expect(ratio.toFixed(2)).toBe('0.96');
            expect(valuationPriceStandard).toBeGreaterThan(10001, 'valuationPriceStandard');
          })
          .catch((err) => {
            specError(err);
          })
          .finally(done)
        ;
      });
    });
  });
});
