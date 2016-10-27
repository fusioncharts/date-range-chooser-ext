'use strict';
const DateInput = require('./fcts-ext-dateinput');

/**
 * A concrete representation of DateInput for the end date.
 * @extends DateInput
 * @private
 */
class EndDateInput extends DateInput {
  /**
   * Validate the given timestamp
   * @return {boolean} Whether the given timestamp is valid or not
   */
  validateDate (timestamp) {
    return true;
  }
}

module.exports = EndDateInput;
