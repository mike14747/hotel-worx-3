const postError = 'An error occurred trying to add the new record.';
const putError = 'An error occurred trying to update the record.';
const deleteError = 'An error occurred trying to delete the record.';
const boolError = 'serves as a boolean and must be either 0 or 1.';
const dateError = '"date" must be a valid ISO 8601 date and in YYYY-MM-DD format.';
const usernameError = '"username" must be from 6 to 12 characters in length.';
const passwordError = '"password" must be from 6 to 20 characters in length.';

module.exports = {
    postError,
    putError,
    deleteError,
    boolError,
    dateError,
    usernameError,
    passwordError,
};
