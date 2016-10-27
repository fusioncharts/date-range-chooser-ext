'use strict';
const DateRange = require('./fcts-ext-daterange');

// var fc = new FusionCharts();

FusionCharts.register('extension', ['date-range-chooser', function (id) {
  var global = this;
  var extAPI = global.extAPI;

  // var otherAPI = FusionCharts.getExtComponent(id, 'api', 'legacyextapi');
  // var toolBoxApi = FusionCharts.getComponent('api', 'toolbox');

  window.dr = new DateRange();
  extAPI(window.dr);
}]);
