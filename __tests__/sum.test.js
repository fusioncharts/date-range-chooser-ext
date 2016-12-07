'use strict';

const FusionCharts = require('fusioncharts'),
  DateRange = require('../src/fcts-ext-daterange.js');

require('fusioncharts/fusioncharts.timeseries')(FusionCharts);

var DateTimeFormatter,
  dateRange;

FusionCharts.register('extension', ['private', 'test-date-range-chooser', function () {
  DateTimeFormatter = this.hcLib.DateTimeFormatter;
}]);

dateRange = new (DateRange({
  FusionCharts: FusionCharts,
  DateTimeFormatter: DateTimeFormatter
}))();

dateRange.config = dateRange.createConfig({});

describe('DateRange', () => {
  it('Should return 0 when the given date is "01-01-1970"', () => {
    expect(dateRange.getTimestamp('01-01-1970'))
    .toBe(new Date('01-01-1970').getTimezoneOffset() * 60 * 1000);
  });
});
