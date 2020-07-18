const Company = require('../../models/company');
const { message, boolRegEx, taxExemptError } = require('./generalValidation');

const isCompanyBodyValid = async (paramsObj) => {
    const errorArray = [];
    const { company_id: companyId, tax_exempt: taxExempt, ...stringParams } = paramsObj;
    if (companyId != null) {
        try {
            const [data, error] = await Company.getCompanyById({ id: paramsObj.company_id });
            if (error) errorArray.push(error);
            if (data && data.length !== 1) errorArray.push('company_id does not exist');
        } catch (error) {
            if (error) errorArray.push(error);
        }
    }
    Object.keys(stringParams).forEach(key => {
        if (typeof (stringParams[key]) !== 'string' || stringParams[key].length < 1) errorArray.push(key + ' should be a string with non-zero length');
    });
    if (!boolRegEx.test(taxExempt)) errorArray.push(taxExemptError);
    if (errorArray.length > 0) return [false, { message, errorArray }];
    return [true, null];
};

module.exports = {
    isCompanyBodyValid,
};
