'use strict';
var StartDateInput = require('./fcts-ext-startdateinput');
var EndDateInput = require('./fcts-ext-enddateinput');
var FusionCharts = require('../lib/fusioncharts');

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
      var formattedStartDate = FusionCharts.getFormattedDate(range.startDate);
      console.log(formattedStartDate);
      this.startText.attr('text', formattedStartDate);

      this.dateRange.endDate = range.endDate;
      var formattedEndDate = FusionCharts.getFormattedDate(range.endDate);
      this.endText.attr('text', formattedEndDate);

      var sdi = new StartDateInput();
      sdi.timestamp = this.dateRange.startDate;

      var edi = new EndDateInput();
      edi.timestamp = this.dateRange.endDate;
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
    var startRect = paper.rect(50, 10, 90, 25);
    startRect.attr('stroke', '#000');
    this.startText = paper.text(95, 22, FusionCharts.getFormattedDate(range.startDate));
    this.startText.attr('font-family', 'sans-serif');
    this.startText.attr('fill', '#000');

    var endLabel = paper.text(170, 22, 'To: ');
    endLabel.attr('font-family', 'sans-serif');
    endLabel.attr('fill', '#000');
    var endRect = paper.rect(190, 10, 90, 25);
    endRect.attr('stroke', '#000');
    this.endText = paper.text(235, 22, FusionCharts.getFormattedDate(range.endDate));
    this.endText.attr('font-family', 'sans-serif');
    this.endText.attr('fill', '#000');
  }

  dispose () {
    // TODO: dispose extension
  }

  /**
   * Swaps the start date and the end date of the date range
   * @private
   */
  swapDates () {
    let temp = this.dateRange.startDate;
    this.dateRange.startDate = this.dateRange.endDate;
    this.dateRange.endDate = temp;
  }

  /**
   * Syncs the daterange shown by the FusionCharts time series chart and the Date Range Chooser
   * @private
   */
  syncRange () {}

  /**
   * Returns a formatted date string from FusionCharts when given a UNIX timestamp
   * @param  {number} timestamp - A UNIX timestamp to be converted to a date string
   * @return {string} A date string which is equivalent to the given timestamp
   */
  getFormattedDate (timestamp) {
    return '12/12/2012';
  }

  /**
   * Returns a UNIX timestamp from FusionCharts when given a formatted date string
   * @param  {string} dateString - A date string to be converted to a UNIX timestamp
   * @return {number} A UNIX timestamp which is equivalent to the given date string
   */
  getTimestamp (dateString) {
    return 6745123;
  }

  /**
   * Sets the configurable options of the extension (e.g. cosmetics)
   * @param {Object} configObj The configuration object containing various extension options
   */
  setConfig (configObj) {}

  /**
   * Gets the configurable options of the extension (e.g. cosmetics)
   * @return {object} configObj The configuration object containing various extension options
   */
  getConfig () {
    return {
      color: '#000000'
    };
  }
}

module.exports = DateRange;
