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
    })

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

    let insertId = 0

    it('should POST a new tax type and return the insertId', function (done) {
        const paramsObj = {
            "tax_name": "Special Tax",
            "tax_rate": 1.375,
            "active": 1
        };
        chai.request(server)
            .post('/api/taxes')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('insertId').and.to.be.a('number');
                if (response.body.insertId) insertId = response.body.insertId;
                done();
            });
    });

    it('should get the newly created single tax by id with its id/names/ratesactive', function (done) {
        chai.request(server)
            .get('/api/taxes/' + insertId)
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

    it('should FAIL to POST a new tax type and and return 3 errors because all 3 parameters are invalid', function (done) {
        const paramsObj = {
            "tax_name": "",
            "tax_rate": "b1.375",
            "active": 2
        };
        chai.request(server)
            .post('/api/taxes')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(3);
                done();
            });
    });

    it('should update the just created new tax with these new parameters', function (done) {
        const paramsObj = {
            "tax_id": insertId,
            "tax_name": "Special Tax",
            "tax_rate": 1.250,
            "active": 0
        };
        chai.request(server)
            .put('/api/taxes')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
    
    it('should FAIL to update the just created new tax and return 4 errors because all 4 parameters are invalid', function (done) {
        const paramsObj = {
            "tax_id": 0,
            "tax_name": "",
            "tax_rate": "a1.375",
            "active": 2
        };
        chai.request(server)
            .put('/api/taxes')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(4);
                done();
            });
    });

    it('should FAIL to update the just created new tax and return an error object because tax_id is not an integer', function (done) {
        const paramsObj = {
            "tax_id": "e",
            "tax_name": "City",
            "tax_rate": 1.375,
            "active": 1
        };
        chai.request(server)
            .put('/api/taxes')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });

    // -----

    it('should FAIL to delete the newly created tax because the tax id is invalid', function (done) {
        chai.request(server)
            .delete('/api/taxes/0')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should delete the newly created tax using the insertId', function (done) {
        chai.request(server)
            .delete('/api/taxes/' + insertId)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
});
