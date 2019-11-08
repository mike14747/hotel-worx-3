const connection = require('../config/connection');

const Generic = {
    getSomeData: (id, cb) => {
        const queryString = 'SELECT some_fields FROM some_table AS some_alias WHERE some_condition=?;';
        const queryParams = [id];
        connection.execute(queryString, queryParams, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = Generic;
