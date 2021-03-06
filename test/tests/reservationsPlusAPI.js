const agent = require('../utils/serverInit');

describe('Charges API (/api/charges)', function () {
    let insertId = 0;
    let reservationId = 0;
    let customerId = 0;
    let resRoomId = 0;

    it('should POST a new reservation, so there will be a res_room_id to apply a charge to', function (done) {
        const paramsObj = {
            "customerObj": {
                "first_name": "Peter",
                "last_name": "Pan",
                "address": "1111 FairyTale Lane",
                "city": "Fantasyland",
                "state": "Vermont",
                "zip": "23456",
                "country": "USA",
                "email": "p.pan@yahoo.net",
                "phone": "800-555-1212",
                "credit_card_num": "1234567890123456",
                "cc_expiration": "11 / 21"
            },
            "reservationObj": {
                "company_id": undefined,
                "user_id": 1,
                "comments": "test reservation comment"
            },
            "resRoomsArr": [
                {
                    "room_type_id": 2,
                    "check_in_date": "2021-12-12",
                    "check_out_date": "2021-12-15",
                    "adults": 2,
                    "room_rate": 119.99,
                    "comments": "need a good view",
                    "allow_charges": 1
                }
            ]
        };
        agent
            .post('/api/reservations')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('reservation_id').and.to.be.a('number');
                reservationId = response.body.reservation_id;
                response.body.should.have.property('customer_id').and.to.be.a('number');
                customerId = response.body.customer_id;
                response.body.should.have.property('res_room_id').and.to.be.a('number');
                resRoomId = response.body.res_room_id;
                done();
            });
    });

    it('should POST a new charge with the provided params body and return the insertId', function (done) {
        const paramsObj = {
            "res_room_id": resRoomId,
            "charge_type_id": 3,
            "charge_amount": 43.12,
            "taxable": 1
        };
        agent
            .post('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('insertId').and.to.be.a('number');
                if (response.body.insertId) insertId = response.body.insertId;
                done();
            });
    });

    it('should GET the newly created charge by id', function (done) {
        agent
            .get('/api/charges/' + insertId)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(1);
                response.body[0].should.have.all.keys('charge_id', 'charge_type', 'res_room_id', 'charge_amount', 'taxable');
                response.body[0].charge_id.should.be.a('number');
                response.body[0].charge_type.should.be.a('string');
                response.body[0].res_room_id.should.be.a('number');
                Number(response.body[0].charge_amount).should.be.a('number');
                response.body[0].taxable.should.be.a('number').and.oneOf([0, 1]);
                done();
            });
    });

    it('should GET all the charges', function (done) {
        agent
            .get('/api/charges')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.have.all.keys('charge_id', 'charge_type', 'res_room_id', 'charge_amount', 'taxable');
                    element.charge_id.should.be.a('number');
                    element.charge_type.should.be.a('string');
                    element.res_room_id.should.be.a('number');
                    Number(element.charge_amount).should.be.a('number');
                    element.taxable.should.be.a('number').and.oneOf([0, 1]);
                });
                done();
            });
    })

    it('should GET a status 200 and an empty array because charge_id 0 should not match any charges', function (done) {
        agent
            .get('/api/charges/0')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });

    it('should FAIL to GET a charge and instead return a status 400 because the charge_id param is not an integer', function (done) {
        agent
            .get('/api/charges/1a')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should POST a second new charge with the provided params body and return the insertId', function (done) {
        const paramsObj = {
            "res_room_id": resRoomId,
            "charge_type_id": 2,
            "charge_amount": 29.87,
            "taxable": 1
        };
        agent
            .post('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('insertId').and.to.be.a('number');
                done();
            });
    });

    it('should FAIL to POST a new charge and return an error because res_room_id is invalid', function (done) {
        const paramsObj = {
            "res_room_id": undefined,
            "charge_type_id": 1,
            "charge_amount": 43.12,
            "taxable": 1
        };
        agent
            .post('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new charge and return an error because res_room_id does not exist', function (done) {
        const paramsObj = {
            "res_room_id": 0,
            "charge_type_id": 1,
            "charge_amount": 43.12,
            "taxable": 1
        };
        agent
            .post('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new charge and return an error because charge_type_id is invalid', function (done) {
        const paramsObj = {
            "res_room_id": resRoomId,
            "charge_type_id": undefined,
            "charge_amount": 43.12,
            "taxable": 1
        };
        agent
            .post('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new charge and return an error because charge_type_id does not exist', function (done) {
        const paramsObj = {
            "res_room_id": resRoomId,
            "charge_type_id": 0,
            "charge_amount": 43.12,
            "taxable": 1
        };
        agent
            .post('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new charge and return an error because charge_amount is invalid', function (done) {
        const paramsObj = {
            "res_room_id": resRoomId,
            "charge_type_id": 1,
            "charge_amount": undefined,
            "taxable": 1
        };
        agent
            .post('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new charge and return an error because taxable is invalid', function (done) {
        const paramsObj = {
            "res_room_id": resRoomId,
            "charge_type_id": 1,
            "charge_amount": 43.12,
            "taxable": undefined
        };
        agent
            .post('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should update, via PUT, one of the newly created charges with these new parameters', function (done) {
        const paramsObj = {
            "charge_id": insertId,
            "res_room_id": resRoomId,
            "charge_type_id": 2,
            "charge_amount": 53.12,
            "taxable": 1
        };
        agent
            .put('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(204);
                done();
            });
    });

    it('should FAIL to update, via PUT, any charges and return an error because the charge_id does not exist', function (done) {
        const paramsObj = {
            "charge_id": 0,
            "res_room_id": resRoomId,
            "charge_type_id": 2,
            "charge_amount": 53.12,
            "taxable": 1
        };
        agent
            .put('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, any charges and return an error because res_room_id is invalid', function (done) {
        const paramsObj = {
            "charge_id": insertId,
            "res_room_id": undefined,
            "charge_type_id": 1,
            "charge_amount": 43.12,
            "taxable": 1
        };
        agent
            .put('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, any charges and return an error because res_room_id does not exist', function (done) {
        const paramsObj = {
            "charge_id": insertId,
            "res_room_id": 0,
            "charge_type_id": 1,
            "charge_amount": 43.12,
            "taxable": 1
        };
        agent
            .put('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, any charges and return an error because charge_type_id is invalid', function (done) {
        const paramsObj = {
            "charge_id": insertId,
            "res_room_id": resRoomId,
            "charge_type_id": undefined,
            "charge_amount": 43.12,
            "taxable": 1
        };
        agent
            .put('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, any charges and return an error because charge_type_id does not exist', function (done) {
        const paramsObj = {
            "charge_id": insertId,
            "res_room_id": resRoomId,
            "charge_type_id": 0,
            "charge_amount": 43.12,
            "taxable": 1
        };
        agent
            .put('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, any charges and return an error because charge_amount is invalid', function (done) {
        const paramsObj = {
            "charge_id": insertId,
            "res_room_id": resRoomId,
            "charge_type_id": 1,
            "charge_amount": undefined,
            "taxable": 1
        };
        agent
            .put('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, any charges and return an error because taxable is invalid', function (done) {
        const paramsObj = {
            "charge_id": insertId,
            "res_room_id": resRoomId,
            "charge_type_id": 1,
            "charge_amount": 43.12,
            "taxable": undefined
        };
        agent
            .put('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });


    it('should FAIL to DELETE any charge and return an error because the charge_id does not exist', function (done) {
        agent
            .delete('/api/charges/0')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to DELETE any charge and return an error because the charge_id param was not included', function (done) {
        agent
            .delete('/api/charges')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(404);
                done();
            });
    });

    it('should FAIL to DELETE any charge associated with a res_room_id and return an error because the res_room_id param was not included', function (done) {
        agent
            .delete('/api/charges/res-rooms')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to DELETE all charges associated with a res_room_id return an error because the res_room_id does not exist', function (done) {
        agent
            .delete('/api/charges/res-rooms/0')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to DELETE all charges associated with a res_room_id because the res_room id is not an integer', function (done) {
        agent
            .delete('/api/charges/res-rooms/abc')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should DELETE the newly created charge using the insertId', function (done) {
        agent
            .delete('/api/charges/' + insertId)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(204);
                done();
            });
    });

    it('should DELETE all charges associated with a res_room_id', function (done) {
        agent
            .delete('/api/charges/res-rooms/' + resRoomId)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(204);
                done();
            });
    });

    it('should DELETE the newly created reservation', function (done) {
        agent
            .delete('/api/reservations/' + reservationId)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(204);
                done();
            });
    });

    it('should DELETE the newly created customer', function (done) {
        agent
            .delete('/api/customers/' + customerId)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(204);
                done();
            });
    });
});
