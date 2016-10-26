'use strict';
const DateRange = require('./fcts-ext-daterange');

// var fc = new FusionCharts();

FusionCharts.register('extension', ['date-range-chooser', function (id) {
  var global = this;
  var extAPI = global.extAPI;

  // var otherAPI = FusionCharts.getExtComponent(id, 'api', 'legacyextapi');
  // var toolBoxApi = FusionCharts.getComponent('api', 'toolbox');

  extAPI({
    init: function (require) {
      require('X-Axis', 'Y-Axis', 'graphics', function (x, y, graphics) {
        global.x = x;
        global.y = y;
        global.paper = graphics;
      });
      window.dateRange = new DateRange();
      window.paper = global.paper;
    },
    placeInCanvas: function () {
      // space management
      window.dateRange.range = {
        startDate: 12,
        endDate: 23
      };
    },
    draw: function () {
      var startLabel = global.paper.text(20, 22, 'From: ');
      startLabel.attr('font-family', 'sans-serif');
      startLabel.attr('fill', '#000');
      var startRect = global.paper.rect(50, 10, 60, 25);
      startRect.attr('stroke', '#000');
      var startText = global.paper.text(63, 22, window.dateRange.range.startDate);
      startText.attr('font-family', 'sans-serif');
      startText.attr('fill', '#000');

      var endLabel = global.paper.text(170, 22, 'To: ');
      endLabel.attr('font-family', 'sans-serif');
      endLabel.attr('fill', '#000');
      var endRect = global.paper.rect(190, 10, 60, 25);
      endRect.attr('stroke', '#000');
      var endText = global.paper.text(203, 22, window.dateRange.range.endDate);
      endText.attr('font-family', 'sans-serif');
      endText.attr('fill', '#000');
    },
    dispose: function () {
      // dispose extension
    }
  });
}]);
