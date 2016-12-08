'use strict';

// const FusionCharts = require('fusioncharts'),
//   DateRangeExt = require('../src/fcts-ext-daterange.js');

// require('fusioncharts/fusioncharts.timeseries')(FusionCharts);

// var DateTimeFormatter;

// FusionCharts.register('extension', ['private', 'test-date-range-chooser', function () {
//   DateTimeFormatter = this.hcLib.DateTimeFormatter;
// }]);

var webdriverio = require('webdriverio');

describe('Webdriverio tests', function () {
  var client;

  beforeAll(function () {
    client = webdriverio.remote({
      desiredCapabilities: [{
        browserName: 'chrome'
      }, {
        browserName: 'firefox'
      }]
    });
    return client.init();
  });

  it('DateRangeChooser test', function () {
    client
      .url('http://localhost/date-range-chooser-ext')
      .getTitle().then(function (title) {
        expect(title).toBe('FCTS Date Range Extension');
      });
    // var result = client.execute((a) => {
    //   expect(tsChart).toBe(12);
    // }, 12);
  });

  afterAll(function () {
    return client.end();
  });
});

// describe('DateRange', () => {
//   let DateRange = DateRangeExt({
//       FusionCharts: FusionCharts,
//       DateTimeFormatter: DateTimeFormatter
//     }),
//     dateRange = new DateRange();
//   it('Should be able to create a new instance', () => {
//     expect(dateRange).toBeInstanceOf(DateRange);
//   });

//   describe('#createConfig()', () => {
//     let mockDefaultConfig = {
//         'disabled': false,
//         'layout': 'inline',
//         'orientation': 'horizontal',
//         'position': 'top',
//         'alignment': 'right',
//         'dateFormat': '%d-%m-%Y',
//         'fromText': 'From:',
//         'fromTooltipText': 'From Date',
//         'toText': 'To:',
//         'toTooltipText': 'To Date',
//         'styles': {
//           'width': 120,
//           'height': 22,

//           'font-family': '"Lucida Grande", sans-serif',
//           'font-size': 13,
//           'font-color': '#4B4B4B',

//           'input-fill': '#FFFFFF',
//           'input-border-thickness': 1,
//           'input-border-color': '#CED5D4',
//           'input-border-radius': 1,
//           'input-shadow-fill': '#000000',
//           'input-shadow-opacity': 0.35,

//           'input-focus-fill': '#FFFFFF',
//           'input-focus-border-thickness': 1,
//           'input-focus-border-color': '#1E1F1F',

//           'input-error-fill': '#FFEFEF',
//           'input-error-border-thickness': 1,
//           'input-error-border-color': '#D25353',
//           'input-error-tooltip-font-color': '#FF0000'
//         }
//       }, mockInputConfig = {
//         'disabled': false,
//         'layout': 'inline',
//         'orientation': 'vertical',
//         'position': 'right',
//         'alignment': 'top',
//         'dateFormat': '%d-%m-%Y',
//         'fromText': 'From:',
//         'fromTooltipText': 'From Date',
//         'toText': 'To:',
//         'toTooltipText': 'To Date',
//         'styles': {
//           'width': 120,
//           'height': 22,

//           'font-family': '"Lucida Grande", sans-serif',
//           'font-size': 13,
//           'font-color': '#4B4B4B',

//           'input-fill': '#FFFFFF',
//           'input-border-thickness': 1,
//           'input-border-color': '#CED5D4',
//           'input-border-radius': 1,
//           'input-shadow-fill': '#000000',
//           'input-shadow-opacity': 0.35,

//           'input-focus-fill': '#FFFFFF',
//           'input-focus-border-thickness': 1,
//           'input-focus-border-color': '#1E1F1F',

//           'input-error-fill': '#FFEFEF',
//           'input-error-border-thickness': 1,
//           'input-error-border-color': '#D25353',
//           'input-error-tooltip-font-color': '#FF0000'
//         }
//       }, mockInputConfigNoStyle = {
//         'disabled': false,
//         'layout': 'inline',
//         'orientation': 'horizontal',
//         'position': 'top',
//         'alignment': 'right',
//         'dateFormat': '%d-%m-%Y',
//         'fromText': 'From:',
//         'fromTooltipText': 'From Date',
//         'toText': 'To:',
//         'toTooltipText': 'To Date'
//       };
//     dateRange.config = dateRange.createConfig({});
//     it('Should create a valid default configuration object when not given any configuration', () => {
//       expect(dateRange.config).toEqual(mockDefaultConfig);
//     });
//     it('Should create a valid configuration when given a configuration', () => {
//       expect(dateRange.createConfig(mockInputConfig)).toEqual(mockInputConfig);
//     });
//     it('Should create a valid configuration when given a configuration with no style', () => {
//       expect(dateRange.createConfig(mockInputConfigNoStyle)).toEqual(mockDefaultConfig);
//     });
//   });
//   describe('#getTimestamp()', () => {
//     it('Should return 0 when the given date is "01-01-1970"', () => {
//       expect(dateRange.getTimestamp('01-01-1970'))
//       .toBe(new Date('01-01-1970').getTimezoneOffset() * 60 * 1000);
//     });
//   });
// });
