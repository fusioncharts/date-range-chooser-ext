'use strict';
const DateRange = require('./fcts-ext-daterange');
const StartDateInput = require('./fcts-ext-startdateinput');
const EndDateInput = require('./fcts-ext-enddateinput');
const FusionCharts = require('../lib/fusioncharts');

// var fc = new FusionCharts();

FusionCharts.register('extension', ['date-range-chooser', function (id) {
  var global = this;
  var extAPI = global.extAPI;
  console.log(id);

  // var otherAPI = FusionCharts.getExtComponent(id, 'api', 'legacyextapi');
  // var toolBoxApi = FusionCharts.getComponent('api', 'toolbox');

  extAPI({
    init: function (require) {
      require('X-Axis', 'Y-Axis', function (x, y) {
        global.x = x;
        global.y = y;
      });
    },
    placeInCanvas: function () {
      // space management
      var dateRange = new DateRange();
      dateRange.range = {
        startDate: 12,
        endDate: 23
      };
      var stDtInp = new StartDateInput();
      console.log(stDtInp.startDate);
      var endDtInp = new EndDateInput();
      console.log(endDtInp.endDate);
    },
    draw: function () {
      // draw extension
    },
    dispose: function () {
      // dispose extension
    }
  });
}]);
