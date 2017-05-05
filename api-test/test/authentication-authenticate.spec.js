'use strict';

const {error, password, username} = require('../helper');

const fileName = require('path').basename(__filename);

const {getCurrentUser, login, logout} = require('./apis');


describe(`${fileName} ->`, () => {

  describe('POST >', () => {
    it('could refuse login with incorrect credentials', (done) => {
      login({
        jar: false,
        qs: {
          password: 'password',
          username: 'username'
        }
      }).then((response) => {
        expect(response.statusCode).toBe(404);
      }, (err) => {
        error(err);
      }).finally(done);
    });

    it('could login with correct credentials', (done) => {
      login({
        jar: false,
        qs: {password, username}
      }).then((response) => {
        expect(response.statusCode).toBe(200);
      }, (err) => {
        error(err);
      }).finally(done);
    });
  });

  describe('GET >', () => {
    it('could check current user if user is not logged in', (done) => {
      getCurrentUser({jar: false}).then((response) => {
        expect(response.statusCode).toBe(403);
      }, (err) => {
        error(err);
      }).finally(done);
    });

    it('could check current user if user is logged in', (done) => {
      login({
        qs: {password, username}
      }).then(() => {
        getCurrentUser().then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.user.username).toBe('admin');

          return logout();
        }, (err) => {
          error(err);
        }).finally(done);
      });
    });
  });

  describe('DELETE >', () => {
    it('could logout if user is not logged in', (done) => {
      logout({jar: false}).then((response) => {
        expect(response.statusCode).toBe(200);
      }, (err) => {
        error(err);
      }).finally(done);
    });

    it('could logout if user is logged in', (done) => {
      login({
        qs: {password, username}
      }).then(() => {
        logout().then((response) => {
          expect(response.statusCode).toBe(200);
        }, (err) => {
          error(err);
        }).finally(done);
      });
    });
  });

});
