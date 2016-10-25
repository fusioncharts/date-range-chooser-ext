/**
 * Class representing a abstract DateInput.
 * @abstract
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
    this.time = 0;
  }

  /**
   * Represents the numeric value of the date
   * @type number
   */
  get timestamp () {
    return this.time;
  }

  set timestamp (ms) {
    this.time = ms;
  }
}

module.exports = DateInput;
