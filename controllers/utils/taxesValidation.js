const Tax = require('../../models/tax');

const taxExists = async (id) => {
    try {
        if (!/^[0-9]+$/.test(id)) return [null, 'tax_id was not in the proper format... needs to be an integer'];
        const [data, error] = await Tax.getTaxById({ id });
        if (error) return [null, error];
        if (data && data.length === 1) return [data, null];
        return [null, 'tax_id does not exist'];
    } catch (error) {
        return [null, error];
    }
};

module.exports = {
    taxExists,
};
