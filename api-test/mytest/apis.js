'use strict';

const pathPrefix = '../api/';

// offerSearch
const offersearchesPath = pathPrefix + 'com.uv.smp.modules.offer2.impl.controller.SearchConfigController/';
const createOfferSearchPath = offersearchesPath + 'create';

// valuation
const valuationPath = pathPrefix + 'com.uv.smp.modules.dat.evaluation.impl.controllers.VehicleEvaluationController/';
const createValuationPath = valuationPath + 'valuateVehicle';

module.exports = {
  // offerSearch
  createOfferSearch: require(createOfferSearchPath),

  // valuation
  createValuation: require(createValuationPath),
};
