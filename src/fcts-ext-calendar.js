/**
 * Class representing a calendar.
 */
class Calendar {
  constructor () {
    /**
     * @private
     * @type {string}
     */
    this.currentDate = '';
    /**
     * @private
     * @type {object}
     */
    this.fullRange = {};
  }

  /**
   * Shows the calendar at a particular date input.
   * @param {DateInput.input} dateInput - The DateInput at which to show the calendar.
   */
  showCalendar (dateInput) {
    return 'Calendar shown.';
  }

  /**
   * Hides the calendar.
   */
  hideCalendar () {
    return 'Calendar hidden.';
  }
}

module.exports = Calendar;
