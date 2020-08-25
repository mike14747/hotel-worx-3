const message = 'Errors exist in the transmitted request body.';
const activeError = 'active parameter is a boolean and should be 0 or 1';
const taxableError = 'taxable parameter is a boolean and should be 0 or 1';
const taxExemptError = 'tax exempt parameter is a boolean and should be 0 or 1';
const boolRegEx = /^[0-1]$/;
const postError = 'An error occurred trying to add the new record.';
const putError = 'An error occurred trying to update the record.';
const deleteError = 'An error occurred trying to delete the record.';

module.exports = {
    message,
    activeError,
    taxableError,
    taxExemptError,
    boolRegEx,
    postError,
    putError,
    deleteError,
};
