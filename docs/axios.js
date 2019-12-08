axios.get('/user?ID=12345')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (err) {
        // handle err
        console.log(err);
    })
    .finally(function () {
        // always executed
    });

// ------------------------------------------------------

axios.all([
    axios.get('/api/reservations/' + id),
    axios.get('/api/reservations/' + id + 'res_rooms')
])
    .then(axios.spread((reservation, resRooms) => {
        this.setState({
            reservationData: reservation.data,
            resRoomsData: resRooms.data,
        });
    }))
    .catch((err) => {
        console.log(err);
    });

// ------------------------------------------------------

axios.get('/api/rooms/housekeeping-status', params)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });

// ------------------------------------------------------

axios.get('/user', {
    params: {
        ID: 12345
    }
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (err) {
        console.log(err);
    })
    .then(function () {
        // always executed
    });

// ------------------------------------------------------

axios.all([
    axios.put('/api/reservations/res-rooms/' + this.state.res_room_id + 'check-out'),
    axios.put('/api/rooms/' + this.state.room_id + 'checked-out'),
    axios.post('/api/invoices', {
        res_room_id: this.state.res_room_id,
        num_nights: this.state.num_nights,
        rate: this.state.rate,
        total_due: this.state.total_due,
        // this.state.taxes will be an array of tax objects
        taxes: this.state.taxes,
        // this.state.payments will be an array of payment objects
        payments: this.state.payments,
    }),
])
    .then(axios.spread((resRoom, room, invoice) => {
        // do something to make sure all completed successfully
    }))
    .catch(function (err) {
        console.log(err);
    });

// ------------------------------------------------------

// to get an invoice and everything associated with it
state = {
    invoice: {},
    charges: [],
    taxes: [],
    payments: [],
    res_room_id: 1001,
    invoice_id: 1,
}

componentDidMount() {
    axios.all([
        axios.get('/api/invoices/id/' + this.state.invoice_id),
        axios.get('/api/charges/res-room/id/' + this.state.res_room_id),
        axios.get('/api/invoices/invoice-taxes/id/' + this.state.invoice_id),
        axios.get('/api/invoices/invoice-payments/id/' + this.state.invoice_id),
    ])
        .then(axios.spread((invoice, charges, taxes, payments) => {
            this.setState({ invoice: invoice.data[0], charges: charges.data, taxes: taxes.data, payments: payments.data });
        }))
        .catch((err) => {
            console.log(err);
        });
}