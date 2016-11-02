'use strict';
const DateRange = require('./fcts-ext-daterange');

;(function (factory) {
  factory(FusionCharts);
})(function (FC) {
  FC.register('extension', ['date-range-chooser', function (id) {
    var global = this;
    var extAPI = global.extAPI;

    // var otherAPI = FC.getExtComponent(id, 'api', 'legacyextapi');
    // var toolBoxApi = FC.getComponent('api', 'toolbox');

    window.dr = new DateRange();
    extAPI(window.dr);
  }]);
});
