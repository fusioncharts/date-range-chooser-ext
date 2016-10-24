const DateInput = require('./fcts-ext-dateinput');

/**
 * A concrete representation of DateInput for the start date.
 * @extends DateInput
 */
class StartDateInput extends DateInput {
  constructor () {
    super();
    /**
     * @private
     */
    this.date = '12/12/2012';
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
