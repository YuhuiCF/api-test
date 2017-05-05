'use strict';

module.exports = {
  login: require('../api/com.uv.smp.taxonomy.services.auth.impl.controllers.AuthController/authenticate'),
  getCurrentUser: require('../api/com.uv.smp.taxonomy.services.auth.impl.controllers.AuthController/current'),
  logout: require('../api/com.uv.smp.taxonomy.services.auth.impl.controllers.AuthController/logout'),

  listCountries: require('../api/com.uv.smp.taxonomy.services.locales.impl.controllers.CountryControllerImpl/list'),
};
