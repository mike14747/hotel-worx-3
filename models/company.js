const connection = require('../config/connection');

const Company = {
    getCompanyById: (id, cb) => {
        const queryString = 'SELECT co.company_id, co.company_name, co.address, co.city, co.state, co.zip, co.country, co.email, co.phone, co.credit_card_num, co.cc_expiration FROM companies AS co WHERE company_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getAllCompanies: (cb) => {
        const queryString = 'SELECT co.company_id, co.company_name, co.address, co.city, co.state, co.zip, co.country, co.email, co.phone, co.credit_card_num, co.cc_expiration FROM companies AS co;';
        connection.execute(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    addNewCompany: (paramsObj, cb) => {
        const queryString = 'INSERT INTO companies (company_name, address, city, state, zip, country, email, phone, credit_card_num, cc_expiration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const queryParams = [paramsObj.company_name, paramsObj.address, paramsObj.city, paramsObj.state, paramsObj.zip, paramsObj.country, paramsObj.email, paramsObj.phone, paramsObj.credit_card_num, paramsObj.cc_expiration];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateCompanyById: (paramsObj, cb) => {
        const queryString = 'UPDATE companies SET company_name=?, address=?, city=?, state=?, zip=?, country=?, email=?, phone=?, credit_card_num=?, cc_expiration=? WHERE company_id=?;';
        const queryParams = [paramsObj.company_name, paramsObj.address, paramsObj.city, paramsObj.state, paramsObj.zip, paramsObj.country, paramsObj.email, paramsObj.phone, paramsObj.credit_card_num, paramsObj.cc_expiration, paramsObj.customer_id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    deleteCompanyById: (id, cb) => {
        const queryString = 'DELETE FROM companies WHERE company_id=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = Company;
