const InvoicePayment = require('../../../models/invoicePayment');

const isInvoicePaymentIdValid = async (id) => {
    const [data, error] = await InvoicePayment.getInvoiceById({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('invoice_payment_id ' + id + ' does not exist!');
};

module.exports = isInvoicePaymentIdValid;
