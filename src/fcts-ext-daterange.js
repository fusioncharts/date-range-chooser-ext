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
  }

  /**
   * An object representing the start and end dates.
   * @type {DateRange.range}
   */
  get range () {
    return this.dateRange;
  }

  set range (range) {
    if (range.startDate < range.endDate) {
      this.dateRange.startDate = range.startDate;
      this.dateRange.endDate = range.endDate;
    }
  }
}

module.exports = DateRange;
