'use strict';
import { describe, it } from 'mocha';
import { expect } from 'chai';

var DateRange = require('../src/fcts-ext-daterange');
  // Fusioncharts = require('../bower_components/fusioncharts/fusioncharts');

describe('DateRange', function () {
  var self = this;
  self.dr = new DateRange();
  describe('#range', function () {
    it('should be unchanged if startDate is set greater than endDate', function () {
      self.dr.startDate = 1117000;
      expect(self.dr.startDate).to.equal(0);
    });
  });
});
