import { describe, it } from 'mocha';
import { expect } from 'chai';

const DateRange = require('../src/fcts-ext-daterange');
// const DateInput = require('../src/fcts-ext-dateinput');

describe('DateRange', function () {
  var dr = new DateRange();
  dr.range = {
    startDate: 12000,
    endDate: 13000
  };
  describe('#range', function () {
    it('should be an object', function () {
      expect(dr.range).to.be.an('object');
    });
    it('should have the keys startDate and endDate set to zero initially', function () {
      expect(new DateRange().range.startDate).to.equal(0);
      expect(new DateRange().range.endDate).to.equal(0);
    });
    it('should have the keys startDate and endDate', function () {
      expect(dr.range).to.have.all.keys(['startDate', 'endDate']);
    });
    it('should have the value of the key startDate be at most the value of the key endDate', function () {
      expect(dr.range.startDate).to.be.at.most(dr.range.endDate);
    });
    it('should be unchanged if startDate is set greater than endDate', function () {
      dr.range = {
        startDate: 17000,
        endDate: 12000
      };
      expect(dr.range.startDate).to.equal(12000);
      expect(dr.range.endDate).to.equal(13000);
    });
    it('should set the values of startDate and endDate', function () {
      dr.range = {
        startDate: 12125,
        endDate: 18676
      };
      expect(dr.range.startDate).to.equal(12125);
      expect(dr.range.endDate).to.equal(18676);
    });
  });
  describe('#swapDates', function () {
    it('should swap the dates of the range member', function () {
      var tempStartDt = dr.range.startDate;
      var tempEndDt = dr.range.endDate;
      dr.swapDates();
      expect(dr.range.startDate).to.equal(tempEndDt);
      expect(dr.range.endDate).to.equal(tempStartDt);
    });
  });
});

// describe('DateInput', function () {
//   var di = new DateInput();
//   di.timestamp = 50;
// });
