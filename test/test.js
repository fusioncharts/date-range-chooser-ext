'use strict';
var describe =  require('mocha').describe;
var it =  require('mocha').it;
var expect =  require('chai').expect;

var DateRange = require('../src/fcts-ext-daterange');
  // Fusioncharts = require('../bower_components/fusioncharts/fusioncharts');

describe('DateRange', function () {
  var self = this;
  self.dr = new DateRange();
  describe('#startDate', function () {
    it('should be unchanged if startDate is set greater than endDate', function () {
      self.dr.startDate = 1117000;
      expect(self.dr.startDate).to.equal(1117000);
    });
  });
});
