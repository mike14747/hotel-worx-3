const Reservation = require('../../../models/reservation');

const isReservationIdValid = async (id) => {
    const [data, error] = await Reservation.getReservationById({ id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('reservation_id ' + id + ' does not exist!');
};

module.exports = isReservationIdValid;
