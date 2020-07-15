const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

const paramsObj = {
    "customer_id": 1,
    "first_name": "Jamar",
    "last_name": "Wilkerson",
    "address": "7193 Valley St",
    "city": "Lexington",
    "state": "NC",
    "zip": "27292",
    "country": "USA",
    "email": "rgiersig@yahoo.com",
    "phone": "806-427-8083",
    "creditCardLastFour": "0920",
    "cc_expiration": "10 / 22"
};

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
    });

    it('should get a single customer by id', function (done) {
        chai.request(server)
            .get('/api/customers/1')
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
});
