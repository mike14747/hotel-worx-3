const Tax = require('../../models/tax');

const isTaxBodyValid = async (paramsObj) => {
    const errorArray = [];
    if (paramsObj.tax_id != null) {
        if (!/^[0-9]+$/.test(paramsObj.tax_id)) {
            errorArray.push('tax_id was not in the proper format... needs to be an integer');
        } else {
            try {
                const [data, error] = await Tax.getTaxById({ id: paramsObj.tax_id });
                if (error) errorArray.push(error);
                if (data && data.length !== 1) errorArray.push('tax_id does not exist');
            } catch (error) {
                if (error) errorArray.push(error);
            }
        }
    }
    if (typeof (paramsObj.tax_name) !== 'string' || paramsObj.tax_name.length < 1) errorArray.push('tax_name should be a string with non-zero length');
    if (isNaN(parseFloat(paramsObj.tax_rate))) errorArray.push('tax_rate is not in a valid decimal format');
    if (!/^[0-1]$/.test(paramsObj.active)) errorArray.push('active parameter is a boolean and should be 0 or 1');
    if (errorArray.length > 0) return [false, { message: 'Errors exist in the transmitted request body.', errorList: errorArray }];
    return [true, null];
};

module.exports = {
    isTaxBodyValid,
};
