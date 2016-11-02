'use strict';
var StartDateInput = require('./fcts-ext-startdateinput');
var EndDateInput = require('./fcts-ext-enddateinput');

/**
 * Class representing the DateRange.
 */
class DateRange {
  constructor () {
    /**
     * @private
     */
    this.startDt = 0;
    this.endDt = 0;
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
  get startDate () {
    return this.startDt;
  }

  set startDate (startDt) {
    if (startDt <= this.endDt) {
      this.startDt = startDt;
      var formattedStartDate = this.getFormattedDate(this.startDt);
      this.startText.attr('text', formattedStartDate);

      var sdi = new StartDateInput();
      sdi.timestamp = this.startDt;
    }
  }

  get endDate () {
    return this.endDt;
  }

  set endDate (endDt) {
    if (endDt >= this.startDt) {
      this.endDt = endDt;
      var formattedEndDate = this.getFormattedDate(this.endDt);
      this.endText.attr('text', formattedEndDate);

      var edi = new EndDateInput();
      edi.timestamp = this.endDt;
    }
  }

  init (require) {
    var self = this;
    require('X-Axis', 'graphics', 'chart', function (x, graphics, chart) {
      self.x = x;
      self.paper = graphics;
      self.chart = chart;
    });
  }

  placeInCanvas () {
    this.range = {
      startDate: 12,
      endDate: 23
    };
  }

  draw () {
    var paper = this.paper;

    var startLabel = paper.text(20, 22, 'From: ');
    startLabel.attr('font-family', 'sans-serif');
    startLabel.attr('fill', '#000');
    var startRect = paper.rect(50, 10, 90, 25);
    startRect.attr('stroke', '#000');
    this.startText = paper.text(95, 22, this.getFormattedDate(this.startDate));
    this.startText.attr('font-family', 'sans-serif');
    this.startText.attr('fill', '#000');

    var endLabel = paper.text(170, 22, 'To: ');
    endLabel.attr('font-family', 'sans-serif');
    endLabel.attr('fill', '#000');
    var endRect = paper.rect(190, 10, 90, 25);
    endRect.attr('stroke', '#000');
    this.endText = paper.text(235, 22, this.getFormattedDate(this.endDate));
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
   * @return {string} - A date string which is equivalent to the given timestamp
   */
  getFormattedDate (timestamp) {
    return this.chart.getFormattedDate(timestamp);
  }

  /**
   * Returns a UNIX timestamp from FusionCharts when given a formatted date string
   * @param  {string} dateString - A date string to be converted to a UNIX timestamp
   * @return {number} A UNIX timestamp which is equivalent to the given date string
   */
  getTimestamp (dateString) {
    return this.chart.getTimestamp(dateString);
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
      calendarVisible: 'false'
    };
  }
}

module.exports = DateRange;
