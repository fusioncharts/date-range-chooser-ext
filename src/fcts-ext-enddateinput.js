'use strict';
const DateInput = require('./fcts-ext-dateinput');

/**
 * A concrete representation of DateInput for the end date.
 * @extends DateInput
 * @private
 */
class EndDateInput extends DateInput {
  validateDate () {}
}

module.exports = EndDateInput;
