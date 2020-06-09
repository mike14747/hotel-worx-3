const pool = require('../config/connectionPool.js').getDb();

const Company = {
    getAllCompanies: async () => {
        try {
            const queryString = 'SELECT co.company_id, co.company_name, co.address, co.city, co.state, co.zip, co.country, co.email, co.phone, co.credit_card_num, co.cc_expiration, co.tax_exempt FROM companies AS co;';
            const queryParams = [];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getCompanyById: async (paramsObj) => {
        try {
            const queryString = 'SELECT co.company_id, co.company_name, co.address, co.city, co.state, co.zip, co.country, co.email, co.phone, co.credit_card_num, co.cc_expiration, co.tax_exempt FROM companies AS co WHERE company_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    addNewCompany: async (paramsObj) => {
        try {
            const queryString = 'INSERT INTO companies (company_name, address, city, state, zip, country, email, phone, credit_card_num, cc_expiration, tax_exempt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
            const queryParams = [
                paramsObj.company_name,
                paramsObj.address,
                paramsObj.city,
                paramsObj.state,
                paramsObj.zip,
                paramsObj.country,
                paramsObj.email,
                paramsObj.phone,
                paramsObj.credit_card_num,
                paramsObj.cc_expiration,
                paramsObj.tax_exempt,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateCompanyById: async (paramsObj) => {
        try {
            const queryString = 'UPDATE companies SET company_name=?, address=?, city=?, state=?, zip=?, country=?, email=?, phone=?, credit_card_num=?, cc_expiration=?, tax_exempt=? WHERE company_id=?;';
            const queryParams = [
                paramsObj.company_name,
                paramsObj.address,
                paramsObj.city,
                paramsObj.state,
                paramsObj.zip,
                paramsObj.country,
                paramsObj.email,
                paramsObj.phone,
                paramsObj.credit_card_num,
                paramsObj.cc_expiration,
                paramsObj.tax_exempt,
                paramsObj.company_id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    deleteCompanyById: async (paramsObj) => {
        try {
            const queryString = 'DELETE FROM companies WHERE company_id=?;';
            const queryParams = [
                paramsObj.id,
            ];
            const [result] = await pool.query(queryString, queryParams);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
};

module.exports = Company;
