const InvoiceTax = require('../../../models/invoiceTax');

const isInvoiceTaxIdValid = async (id) => {
    const [data, error] = await InvoiceTax.getInvoiceById({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('invoice_tax_id ' + id + ' does not exist!');
};

module.exports = isInvoiceTaxIdValid;
