'use strict';

const {log, specError} = require('../core/helper');

const fileName = require('path').basename(__filename);

const {createOfferSearch} = require('./apis');
const pathRegExp = /^\/smp\/api\/offer2\/offersearches[\w]*/;

function apiCreateOfferSearch(options) {
  return createOfferSearch(options).then((response) => {
    expect(response.request.method).toBe('POST');
    expect(response.request.path).toMatch(pathRegExp);

    return response;
  });
}


describe(`${fileName} ->`, () => {

  describe('createOfferSearch() >', () => {

    it('could not create offer search for channel of context if channel is too big and region is not indicated', (done) => {
      apiCreateOfferSearch({
        body: {
          "vehicleConfig": {
            "fiCode": "01910030004",
            "constructionTime": {
              "time": 991353600000,
            }
          },
          "services": [
            {
              "serviceId": "fa992149-a462-48f2-8913-c6b5c4e37fc4"
            }
          ],
          generateEmptyOffer: true
        },
        qs: {
          createCalculation: true,
          createOffers: true,
          contextKey: 'BIhYGSk-DlrnijwhGHI-FwoS4etKfqi' // FG default
        },
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(JSON.stringify(response.body)).toMatch(/"CALCULATION_TOO_MANY_LOCATIONS"/);
      })
      .catch((err) => {
        specError(err);
      })
      .finally(done);
    });

    it('could create offer search for channel of context if channel is small and region is not indicated', (done) => {
      apiCreateOfferSearch({
        body: {
          "vehicleConfig": {
            "fiCode": "01910030004",
            "constructionTime": {
              "time": 991353600000,
            }
          },
          "services": [
            {
              "serviceId": "fa992149-a462-48f2-8913-c6b5c4e37fc4"
            }
          ],
          generateEmptyOffer: true
        },
        qs: {
          createCalculation: true,
          createOffers: true,
          contextKey: 'FiOAZVk7A8lF' // Acoat Selected de-de
        },
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.id).toBeDefined();
        log(`searchConfigKey: ${response.body.id}`);
      })
      .catch((err) => {
        specError(err);
      })
      .finally(done);
    });
  });
});
