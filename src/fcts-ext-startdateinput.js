'use strict';
const DateInput = require('./fcts-ext-dateinput');

/**
 * A concrete representation of DateInput for the start date.
 * @extends DateInput
 * @private
 */
class StartDateInput extends DateInput {
  validateDate () {}
}

module.exports = StartDateInput;
