const pool = require('../config/pool.js');

const Company = {
    getAllCompanies: async () => {
        const queryString = 'SELECT co.company_id, co.company_name, co.address, co.city, co.state, co.zip, co.country, co.email, co.phone, co.credit_card_num, co.cc_expiration, co.tax_exempt FROM companies AS co;';
        const [result] = await pool.query(queryString);
        return result;
    },
    getCompanyById: async (id) => {
        const queryString = 'SELECT co.company_id, co.company_name, co.address, co.city, co.state, co.zip, co.country, co.email, co.phone, co.credit_card_num, co.cc_expiration, co.tax_exempt FROM companies AS co WHERE company_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    addNewCompany: async (paramsObj) => {
        const queryString = 'INSERT INTO companies (company_name, address, city, state, zip, country, email, phone, credit_card_num, cc_expiration, tax_exempt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const queryParams = [paramsObj.company_name, paramsObj.address, paramsObj.city, paramsObj.state, paramsObj.zip, paramsObj.country, paramsObj.email, paramsObj.phone, paramsObj.credit_card_num, paramsObj.cc_expiration, paramsObj.tax_exempt];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    updateCompanyById: async (paramsObj) => {
        const queryString = 'UPDATE companies SET company_name=?, address=?, city=?, state=?, zip=?, country=?, email=?, phone=?, credit_card_num=?, cc_expiration=?, tax_exempt=? WHERE company_id=?;';
        const queryParams = [paramsObj.company_name, paramsObj.address, paramsObj.city, paramsObj.state, paramsObj.zip, paramsObj.country, paramsObj.email, paramsObj.phone, paramsObj.credit_card_num, paramsObj.cc_expiration, paramsObj.tax_exempt, paramsObj.company_id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
    deleteCompanyById: async (id) => {
        const queryString = 'DELETE FROM companies WHERE company_id=?;';
        const queryParams = [id];
        const [result] = await pool.query(queryString, queryParams);
        return result;
    },
};

module.exports = Company;
