import { describe, it } from 'mocha';
import { expect } from 'chai';

// import DateRange from '../src/fcts-ext-daterange';
const DateRange = require('../src/fcts-ext-daterange');

describe('DateRange', function () {
  describe('#getStartDate()', function () {
    it('should return a number', function () {
      expect(new DateRange().getStartDate()).to.be.a('number');
    });
  });

  describe('#getEndDate()', function () {
    it('should return a number', function () {
      expect(new DateRange().getEndDate()).to.be.a('number');
    });
  });

  describe('#getRange()', function () {
    it('should return an object', function () {
      expect(new DateRange().getRange()).to.be.a('object');
    });
  });
});
