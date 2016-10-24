const DateRange = require('./fcts-ext-daterange');
const StartDateInput = require('./fcts-ext-startdateinput');
const FusionCharts = require('../lib/fusioncharts');

var fc = new FusionCharts();

fc.register('extension', ['date-range-chooser', function (id) {
  var global = this;
  var extAPI = global.extAPI;

  // var otherAPI = fc.getExtComponent(id, 'api', 'legacyextapi');
  // var toolBoxApi = fc.getComponent('api', 'toolbox');

  extAPI({
    init: function (require) {
      require('X-Axis', 'Y-Axis', 'lol', function (x, y) {
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
      console.log('dassd');
      var stDtInp = new StartDateInput();
      console.log(stDtInp.date);
    },
    draw: function () {
      // draw extension
    },
    dispose: function () {
      // dispose extension
    }
  });
}]);
