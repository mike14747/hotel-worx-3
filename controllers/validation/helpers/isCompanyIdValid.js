const Company = require('../../../models/company');

const isCompanyIdValid = async (id) => {
    const [data, error] = await Company.getCompanyById({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('company_id ' + id + ' does not exist!');
};

module.exports = isCompanyIdValid;
