'use strict';
var StartDateInput = require('./fcts-ext-startdateinput');
var EndDateInput = require('./fcts-ext-enddateinput');
/**
 * Class representing the DateRange.
 */
class DateRange {
  /**
   * Create a DateRange.
   * @typedef {object} DateRange.range
   * @property {number} startDate - The start date of the date range.
   * @property {number} endDate - The end date of the date range.
   */
  constructor () {
    /**
     * @private
     */
    this.dateRange = {
      startDate: 0,
      endDate: 0
    };
    this.startText = {
      attr: function () {}
    };
    this.endText = {
      attr: function () {}
    };
  }

  /**
   * An object representing the start and end dates.
   * @type {DateRange.range}
   */
  get range () {
    return this.dateRange;
  }

  set range (range) {
    if (range.startDate <= range.endDate) {
      this.dateRange.startDate = range.startDate;
      this.dateRange.endDate = range.endDate;

      var sdi = new StartDateInput();
      sdi.timestamp = this.dateRange.startDate;
      this.startText.attr('text', sdi.timestamp);

      var edi = new EndDateInput();
      edi.timestamp = this.dateRange.endDate;
      this.endText.attr('text', edi.timestamp);
    }
  }

  init (require) {
    require('X-Axis', 'Y-Axis', 'graphics', function (x, y, graphics) {
      global.x = x;
      global.y = y;
      global.paper = graphics;
    });
  }

  placeInCanvas () {
    this.range = {
      startDate: 12,
      endDate: 23
    };
  }

  draw () {
    var paper = global.paper;
    var range = this.range;

    var startLabel = paper.text(20, 22, 'From: ');
    startLabel.attr('font-family', 'sans-serif');
    startLabel.attr('fill', '#000');
    var startRect = paper.rect(50, 10, 60, 25);
    startRect.attr('stroke', '#000');
    this.startText = paper.text(63, 22, range.startDate);
    this.startText.attr('font-family', 'sans-serif');
    this.startText.attr('fill', '#000');

    var endLabel = paper.text(170, 22, 'To: ');
    endLabel.attr('font-family', 'sans-serif');
    endLabel.attr('fill', '#000');
    var endRect = paper.rect(190, 10, 60, 25);
    endRect.attr('stroke', '#000');
    this.endText = paper.text(203, 22, range.endDate);
    this.endText.attr('font-family', 'sans-serif');
    this.endText.attr('fill', '#000');
  }

  dispose () {
    // TODO: dispose extension
  }

  /**
   * Swaps the start date and the end date of the date range
   */
  swapDates () {
    let temp = this.dateRange.startDate;
    this.dateRange.startDate = this.dateRange.endDate;
    this.dateRange.endDate = temp;
  }

  /**
   * @private
   */
  syncRange () {}

  getFormattedDate (timestamp) {}

  getTimestamp (dateString) {}

  setConfig (configObj) {}

  getConfig () {}
}

module.exports = DateRange;
