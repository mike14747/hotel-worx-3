const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Taxes API', function () {
    it('should get all the taxes with their ids/names/rates/active', function (done) {
        chai.request(server)
            .get('/api/taxes')
            .end(function (error, response) {
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

    it('should get a single tax by id with its id/names/ratesactive', function (done) {
        chai.request(server)
            .get('/api/taxes/1')
            .end(function (error, response) {
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

    it('should get a status 200 and an empty array because tax id 0 should not match any taxes', function (done) {
        chai.request(server)
            .get('/api/taxes/0')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });

    it('should get a status 400 because the tax id param is not an integer', function (done) {
        chai.request(server)
            .get('/api/taxes/1a')
            .end(function (error, response) {
                response.should.have.status(400);
                done();
            });
    });
});
