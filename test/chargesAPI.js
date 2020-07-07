const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Charges API', function () {
    it('should get all the charges with their ids/names/rates/taxable', function (done) {
        chai.request(server)
            .get('/api/charges')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.have.all.keys('charge_id', 'charge_type', 'charge_amount', 'taxable');
                    element.charge_id.should.be.a('number');
                    element.charge_type.should.be.a('string');
                    Number(element.charge_amount).should.be.a('number');
                    element.taxable.should.be.a('number').and.oneOf([0, 1]);
                });
                done();
            });
    });

    it('should get a single charge by id with its id/names/taxable', function (done) {
        chai.request(server)
            .get('/api/charges/1')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(1);
                response.body[0].should.have.all.keys('charge_id', 'charge_type', 'charge_amount', 'taxable');
                response.body[0].charge_id.should.be.a('number');
                response.body[0].charge_type.should.be.a('string');
                Number(response.body[0].charge_amount).should.be.a('number');
                response.body[0].taxable.should.be.a('number').and.oneOf([0, 1]);
                done();
            });
    });

    it('should get a status 400 because 0 should not match any charge ids', function (done) {
        chai.request(server)
            .get('/api/charges/0')
            .end(function (error, response) {
                response.should.have.status(400);
                done();
            });
    });

    it('should get a status 400 because the charge id param is not an integer', function (done) {
        chai.request(server)
            .get('/api/charges/1a')
            .end(function (error, response) {
                response.should.have.status(400);
                done();
            });
    });
});
