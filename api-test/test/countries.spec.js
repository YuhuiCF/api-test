'use strict';

const {error, password, R, username} = require('../helper');

const fileName = require('path').basename(__filename);

const {login, logout, listCountries} = require('./apis');


describe(`${fileName} ->`, () => {

  describe('GET >', () => {

    it('could not list countries if not authenticated', (done) => {
      listCountries().then((response) => {
        expect(response.statusCode).toBe(401);
      }, (err) => {
        error(err);
      }).finally(done);
    });

    it('could list countries if authenticated', (done) => {
      login({
        qs: {password, username}
      }).then(() => {
        return listCountries().then((response) => {
          expect(response.statusCode).toBe(200, 'statusCode');

          const countries = response.body;
          expect(countries.length).toBeGreaterThan(1, 'there should be more than 1 country');
          expect(R.contains({countryCode: 'DE'}, countries)).toBe(true, 'Germany should be included');

          return logout();
        }, (err) => {
          error(err);
        });
      }, (err) => {
        error(err);
      }).finally(done);
    });

  });

});
