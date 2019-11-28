axios.get('/user?ID=12345')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

// ------------------------------------------------------

axios.all([
    axios.get('/api/reservations/' + id),
    axios.get('/api/reservations/res_rooms/' + id)
])
    .then(axios.spread((reservation, resRooms) => {
        this.setState({
            reservationData: reservation.data,
            resRoomsData: resRooms.data,
        });
    }));

// ------------------------------------------------------

axios.get('/api/rooms/housekeeping-status', params)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
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
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });

// ------------------------------------------------------

axios.all([
    axios.put('/api/reservations/res-rooms/check-out/' + this.state.res_room_id),
    axios.put('/api/rooms/checked-out/' + this.state.room_id),
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
    .catch(function (error) {
        console.log(error);
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
        .catch((error) => {
            console.log(error);
        });
}