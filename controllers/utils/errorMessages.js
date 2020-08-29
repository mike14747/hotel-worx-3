const postError = 'An error occurred trying to add the new record.';
const putError = 'An error occurred trying to update the record.';
const deleteError = 'An error occurred trying to delete the record.';
const activeError = 'The "active" field serves as a boolean and must be either 0 or 1.';
const taxableError = 'The "taxable" field serves as a boolean and must be either 0 or 1.';
const taxExemptError = 'The "tax_exempt" field serves as a boolean and must be either 0 or 1.';
const dateError = 'The "date" must be a valid ISO 8601 date and in YYYY-MM-DD format.';

module.exports = {
    postError,
    putError,
    deleteError,
    activeError,
    taxableError,
    taxExemptError,
    dateError,
};
