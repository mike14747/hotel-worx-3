const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Taxes API', function () {
    describe('GET /api/taxes', function () {
        it('should get all the taxes and their ids/names/rates/active', function (done) {
            chai.request(server)
                .get('/api/taxes')
                .end(function (error, response) {
                    if (error) console.log(error);
                    response.should.have.status(200);
                    response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                    response.body.forEach(function (element) {
                        element.should.have.all.keys('tax_id', 'tax_name', 'tax_rate', 'active');
                        element.tax_id.should.be.a('number');
                        element.tax_name.should.be.a('string');
                        Number(element.tax_rate).should.be.a('number');
                        element.active.should.be.a('number').and.oneOf([0, 1]);
                    });
                    done();
                });
        });
    });

    describe('GET /api/taxes/1', function () {
        it('should get a single tax by id and its id/names/ratesactive', function (done) {
            chai.request(server)
                .get('/api/taxes/1')
                .end(function (error, response) {
                    if (error) console.log(error);
                    response.should.have.status(200);
                    response.body.should.be.an('array').and.have.lengthOf(1);
                    response.body[0].should.have.all.keys('tax_id', 'tax_name', 'tax_rate', 'active');
                    response.body[0].tax_id.should.be.a('number');
                    response.body[0].tax_name.should.be.a('string');
                    Number(response.body[0].tax_rate).should.be.a('number');
                    response.body[0].active.should.be.a('number').and.oneOf([0, 1]);
                    done();
                });
        });
    });

    describe('GET /api/taxes/0', function () {
        it('should return an empty array since 0 should not match any tax ids', function (done) {
            chai.request(server)
                .get('/api/taxes/0')
                .end(function (error, response) {
                    if (error) console.log(error);
                    response.should.have.status(200);
                    response.body.should.be.a('array').that.is.empty;
                    done();
                });
        });
    });

    describe('GET /api/taxes/1a', function () {
        it('should get a status 404 because the tax id param is not an integer', function (done) {
            chai.request(server)
                .get('/api/taxes/1a')
                .end(function (error, response) {
                    if (error) console.log(error);
                    response.should.have.status(404);
                    done();
                });
        });
    });
});
