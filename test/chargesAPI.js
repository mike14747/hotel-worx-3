const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Charges API', function () {
    describe('GET /api/charges', function () {
        it('should get all the charges and their ids/names/rates/taxable', function (done) {
            chai.request(server)
                .get('/api/charges')
                .end(function (error, response) {
                    if (error) console.log(error);
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
    });

    describe('GET /api/charges/1', function () {
        it('should get a single charge by id and its id/names/taxable', function (done) {
            chai.request(server)
                .get('/api/charges/1')
                .end(function (error, response) {
                    if (error) console.log(error);
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
    });

    describe('GET /api/charges/0', function () {
        it('should return an empty array since 0 should not match any charge ids', function (done) {
            chai.request(server)
                .get('/api/charges/0')
                .end(function (error, response) {
                    if (error) console.log(error);
                    response.should.have.status(200);
                    response.body.should.be.a('array').that.is.empty;
                    done();
                });
        });
    });

    describe('GET /api/charges/1a', function () {
        it('should get a status 404 because the charge id param is not an integer', function (done) {
            chai.request(server)
                .get('/api/charges/1a')
                .end(function (error, response) {
                    if (error) console.log(error);
                    response.should.have.status(404);
                    done();
                });
        });
    });
});
