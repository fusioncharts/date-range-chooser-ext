'use strict';
/**
 * Class representing a abstract DateInput.
 * @abstract
 * @private
 */
class DateInput {
  constructor () {
    /**
     * @typedef {object} DateInput.input
     * @property {number} timestamp - The current time shown on the date input.
     */
    /**
     * @private
     */
    this.timestamp = 0;
  }

  /**
   * Represents the numeric value of the date
   * @type number
   */
  get date () {
    return this.timestamp;
  }

  set date (ms) {
    this.timestamp = ms;
  }

  displayDate () {}
}

module.exports = DateInput;
