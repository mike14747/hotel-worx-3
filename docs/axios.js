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