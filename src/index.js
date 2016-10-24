const DateRange = require('./fcts-ext-daterange');
const FusionCharts = require('../lib/fusioncharts.js');

var fc = new FusionCharts();

fc.register('extension', ['date-range-chooser', function (id) {
  var global = this;
  var extAPI = global.extAPI;

  extAPI({
    init: function (require) {
      require('X-Axis', 'Y-Axis', 'lol', function (x, y) {
        global.x = x;
        global.y = y;
      });
    }
  });
}]);

var dateRange = new DateRange();
console.log(JSON.stringify(dateRange.getRange()));
