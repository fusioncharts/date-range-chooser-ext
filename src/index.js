'use strict';
const DateRange = require('./fcts-ext-daterange');

window.dr = new DateRange();

;(function (env, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = env.document
       ? factory(env) : function (win) {
         if (!win.document) {
           throw new Error('Window with document not present');
         }
         return factory(win, true);
       };
  } else {
    env.DateRangeChooser = factory(env, true);
  }
})(typeof window !== 'undefined' ? window : this, function (_window, windowExists) {
  var FC = _window.FusionCharts;
  FC.register('extension', ['private', 'DateRangeChooser', function () {
    FC.registerComponent('extensions', 'DateRangeChooser', DateRange);
  }]);
});
