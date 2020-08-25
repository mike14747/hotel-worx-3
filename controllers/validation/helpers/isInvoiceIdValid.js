const Invoice = require('../../../models/invoice');

const isInvoiceIdValid = async (id) => {
    const [data, error] = await Invoice.getInvoiceById({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('invoice_id ' + id + ' does not exist!');
};

module.exports = isInvoiceIdValid;
