'use strict';

const pathPrefix = '../api/';

// authentication
const authenticationPath = pathPrefix + 'com.uv.smp.authentication.api.impl.controllers.AuthenticationController/';
const loginPath = authenticationPath + 'loginAsAdminUser';
const getCurrentUserPath = authenticationPath + 'checkLogin';
const logoutPath = authenticationPath + 'logout';

// offerSearch
const offersearchesPath = pathPrefix + 'com.uv.smp.modules.offer2.impl.controller.SearchConfigController/';
const createOfferSearchPath = offersearchesPath + 'create';

// valuation
const valuationPath = pathPrefix + 'com.uv.smp.modules.dat.evaluation.impl.controllers.VehicleEvaluationController/';
const createValuationPath = valuationPath + 'valuateVehicle';

module.exports = {
  // authentication
  login: require(loginPath),
  getCurrentUser: require(getCurrentUserPath),
  logout: require(logoutPath),

  // offerSearch
  createOfferSearch: require(createOfferSearchPath),

  // valuation
  createValuation: require(createValuationPath),
};

