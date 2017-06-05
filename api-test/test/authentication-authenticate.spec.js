'use strict';

const {setPathRegExp, specError} = require('../core/helper');
const {password, username} = require('../core/helper').envVars;

const fileName = require('path').basename(__filename);

const {getCurrentUser, login, logout} = require('./apis');
const pathRegExp = setPathRegExp('/smp/api/authentication/login/admin');

function apiLogin(options) {
  return login(options).then((response) => {
    expect(response.request.method).toBe('POST');
    expect(response.request.path).toMatch(pathRegExp);

    return response;
  });
}


describe(`${fileName} ->`, () => {

  describe('POST >', () => {
    it('could refuse login with incorrect credentials', (done) => {
      apiLogin({
        jar: false,
        body: {
          password: 'password',
          username: 'username'
        }
      })
      .then((response) => {
        expect(response.request.method).toBe('POST');
        expect(response.request.path).toBe('/smp/api/authentication/login/admin');
        expect(response.statusCode).toBe(401);
      })
      .catch((err) => {
        specError(err);
      })
      .finally(done);
    });

    it('could login with correct credentials', (done) => {
      apiLogin({
        jar: false,
        body: {password, username}
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      })
      .catch((err) => {
        specError(err);
      })
      .finally(done);
    });
  });

  describe('GET >', () => {
    it('could check current user if user is not logged in', (done) => {
      getCurrentUser({jar: false})
      .then((response) => {
        expect(response.statusCode).toBe(403);
      })
      .catch((err) => {
        specError(err);
      })
      .finally(done);
    });

    it('could check current user if user is logged in', (done) => {
      apiLogin({
        body: {password, username}
      })
      .then(() => {
        return getCurrentUser().then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual(jasmine.objectContaining({
            user: {
              username: 'admin'
            }
          }));

          return logout();
        });
      })
      .catch((err) => {
        specError(err);
      })
      .finally(done);
    });
  });

  describe('DELETE >', () => {
    it('could logout if user is not logged in', (done) => {
      logout({jar: false})
      .then((response) => {
        expect(response.statusCode).toBe(200);
      })
      .catch((err) => {
        specError(err);
      })
      .finally(done);
    });

    it('could logout if user is logged in', (done) => {
      apiLogin({
        body: {password, username}
      })
      .then(() => {
        return logout().then((response) => {
          expect(response.statusCode).toBe(200);
        });
      })
      .catch((err) => {
        specError(err);
      })
      .finally(done);
    });
  });

});
