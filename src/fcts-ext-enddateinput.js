'use strict';
const DateInput = require('./fcts-ext-dateinput');

/**
 * A concrete representation of DateInput for the end date.
 * @extends DateInput
 * @private
 */
class EndDateInput extends DateInput {
  constructor () {
    super();
    /**
     * @private
     */
    this.date = '01/01/1970';
  }

  /**
   * The ending date of the TimeSeries chart.
   * @type string
   */
  get endDate () {
    return this.date;
  }

  set endDate (dateStr) {
    this.date = dateStr;
  }
}

module.exports = EndDateInput;
