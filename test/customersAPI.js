const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Customers API', function () {
    it('should get all customers', function (done) {
        chai.request(server)
            .get('/api/customers')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.have.property('customer_id').and.to.be.a('number');
                    element.should.have.property('first_name').and.to.be.a('string');
                    element.should.have.property('last_name').and.to.be.a('string');
                    element.should.have.property('address').and.to.be.a('string');
                    element.should.have.property('city').and.to.be.a('string');
                    element.should.have.property('state').and.to.be.a('string');
                    element.should.have.property('zip').and.to.be.a('string');
                    element.should.have.property('country').and.to.be.a('string');
                    element.should.have.property('email').and.to.be.a('string');
                    element.should.have.property('phone').and.to.be.a('string');
                    element.should.have.property('creditCardLastFour').and.to.be.a('string');
                    element.should.have.property('cc_expiration').and.to.be.a('string');
                });
                done();
            });
    })

    it('should get a status 200 and an empty array because customer id 0 should not match any customers', function (done) {
        chai.request(server)
            .get('/api/customers/0')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });

    it('should FAIL to get a single customer and instead return a status 400 because the customer id is not an integer', function (done) {
        chai.request(server)
            .get('/api/customers/1a')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });

    let insertId = 0;

    it('should POST a new customer with the provided params body and return the insertId', function (done) {
        const paramsObj = {
            "first_name": "Jamar",
            "last_name": "Wilkerson",
            "address": "7193 Valley St",
            "city": "Lexington",
            "state": "NC",
            "zip": "27292",
            "country": "USA",
            "email": "rgiersig@yahoo.com",
            "phone": "806-427-8083",
            "credit_card_num": "4444111122223333",
            "cc_expiration": "10 / 22"
        };
        chai.request(server)
            .post('/api/customers')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('insertId').and.to.be.a('number');
                if (response.body.insertId) insertId = response.body.insertId;
                done();
            });
    });

    it('should get the newly created single customer by id', function (done) {
        chai.request(server)
            .get('/api/customers/' + insertId)
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(1);
                response.body[0].should.have.property('customer_id').and.to.be.a('number');
                response.body[0].should.have.property('first_name').and.to.be.a('string');
                response.body[0].should.have.property('last_name').and.to.be.a('string');
                response.body[0].should.have.property('address').and.to.be.a('string');
                response.body[0].should.have.property('city').and.to.be.a('string');
                response.body[0].should.have.property('state').and.to.be.a('string');
                response.body[0].should.have.property('zip').and.to.be.a('string');
                response.body[0].should.have.property('country').and.to.be.a('string');
                response.body[0].should.have.property('email').and.to.be.a('string');
                response.body[0].should.have.property('phone').and.to.be.a('string');
                response.body[0].should.have.property('creditCardLastFour').and.to.be.a('string');
                response.body[0].should.have.property('cc_expiration').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new customer and return 11 errors because all 11 parameters are invalid', function (done) {
        const paramsObj = {
            "first_name": "",
            "last_name": 111,
            "address": "",
            "city": 222,
            "state": "",
            "zip": 333,
            "country": "",
            "email": 444,
            "phone": "",
            "credit_card_num": 555,
            "cc_expiration": ""
        };
        chai.request(server)
            .post('/api/customers')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(11);
                done();
            });
    });

    it('should update the just created new customer with these new parameters', function (done) {
        const paramsObj = {
            "customer_id": insertId,
            "first_name": "Jamar",
            "last_name": "Wilkerson",
            "address": "7193 Valley St",
            "city": "Lexington",
            "state": "NC",
            "zip": "27292",
            "country": "USA",
            "email": "rgiersig@yahoo.com",
            "phone": "806-427-8083",
            "credit_card_num": "4444111122223333",
            "cc_expiration": "10 / 22"
        };
        chai.request(server)
            .put('/api/customers')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });

    it('should FAIL to update the just created new customer and return 12 errors because all 12 parameters are invalid', function (done) {
        const paramsObj = {
            "customer_id": 0,
            "first_name": "",
            "last_name": 111,
            "address": "",
            "city": 222,
            "state": "",
            "zip": 333,
            "country": "",
            "email": 444,
            "phone": "",
            "credit_card_num": 555,
            "cc_expiration": ""
        };
        chai.request(server)
            .put('/api/customers')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(12);
                done();
            });
    });

    it('should FAIL to update the just created new customer and return an error object because customer_id is not an interger', function (done) {
        const paramsObj = {
            "customer_id": "abc",
            "first_name": "Jamar",
            "last_name": "Wilkerson",
            "address": "7193 Valley St",
            "city": "Lexington",
            "state": "NC",
            "zip": "27292",
            "country": "USA",
            "email": "rgiersig@yahoo.com",
            "phone": "806-427-8083",
            "credit_card_num": "4444111122223333",
            "cc_expiration": "10 / 22"
        };
        chai.request(server)
            .put('/api/customers')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to delete the newly created customer because the customer id is invalid', function (done) {
        chai.request(server)
            .delete('/api/customers/0')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });

    it('should delete the newly created customer using the insertId', function (done) {
        chai.request(server)
            .delete('/api/customers/' + insertId)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
});