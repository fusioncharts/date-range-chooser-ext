/**
 * Class representing the DateRange.
 */
class DateRange {
  /**
   * Create a DateRange.
   * @typedef {Object} DateRange.dateRange
   * @property {number} dateRange.startDate - The start date of the date range.
   * @property {number} dateRange.endDate - The end date of the date range.
   */
  constructor () {
    this.dateRange = {
      startDate: 126071,
      endDate: 127683
    };
  }

  /**
   * Get the range object.
   * @return {dateRange} - An object containing the start date and the end date.
   */
  getRange () {
    return this.dateRange;
  }
  /**
   * Get the start date of the date range.
   * @returns {number} dateRange.startDate - The start date of the date range.
   */
  getStartDate () {
    return this.dateRange.startDate;
  }

  /**
   * Get the end date of the date range.
   * @returns {number} dateRange.endDate - The end date of the date range.
   */
  getEndDate () {
    return this.dateRange.endDate;
  }
}

module.exports = DateRange;
