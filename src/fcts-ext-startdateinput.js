const DateInput = require('./fcts-ext-dateinput');

/**
 * A concrete representation of DateInput for the start date.
 * @extends DateInput
 * @private
 */
class StartDateInput extends DateInput {
  constructor () {
    super();
    /**
     * @private
     */
    this.date = '01/01/1970';
  }

  /**
   * The starting date of the TimeSeries chart.
   * @type string
   */
  get startDate () {
    return this.date;
  }

  set startDate (dateStr) {
    this.date = dateStr;
  }
}

module.exports = StartDateInput;
