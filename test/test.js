import { describe, it } from 'mocha';
import { expect } from 'chai';

const DateRange = require('../src/fcts-ext-daterange');

describe('DateRange', function () {
  describe('#range', function () {
    it('should be an object', function () {
      expect(new DateRange().range).to.be.a('object');
    });
  });
});
