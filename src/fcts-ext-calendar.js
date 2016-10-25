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
    console.log(dateInput);
  }

  /**
   * Hides the calendar.
   */
  hideCalendar () {
    console.log('Calendar hidden');
  }
}

module.exports = Calendar;
