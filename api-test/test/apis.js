'use strict';

const authenticationPath = '../api/com.uv.smp.authentication.api.impl.controllers.AuthenticationController/';
const loginPath = authenticationPath + 'loginAsAdminUser';
const getCurrentUserPath = authenticationPath + 'checkLogin';
const logoutPath = authenticationPath + 'logout';

module.exports = {
  // authentication
  login: require(loginPath),
  getCurrentUser: require(getCurrentUserPath),
  logout: require(logoutPath),
};
