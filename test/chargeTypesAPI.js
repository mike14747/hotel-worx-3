const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Charge Types API', function () {
    it('should get all charge_types', function (done) {
        chai.request(server)
            .get('/api/charge-types')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.have.property('charge_type_id').and.to.be.a('number');
                    element.should.have.property('charge_type').and.to.be.a('string');
                    element.should.have.property('active').and.to.be.a('number').and.oneOf([0, 1]);
                });
                done();
            });
    });
    
    it('should get a single charge_type by id', function (done) {
        chai.request(server)
            .get('/api/charge-types/1')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(1);
                response.body[0].should.have.property('charge_type_id').and.to.be.a('number');
                response.body[0].should.have.property('charge_type').and.to.be.a('string');
                response.body[0].should.have.property('active').and.to.be.a('number').and.oneOf([0, 1]);
                done();
            });
    });

    it('should get a status 200 and an empty array because charge_type id 0 should not match any charges', function (done) {
        chai.request(server)
            .get('/api/charge-types/0')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });
    
    it('should FAIL to get a single charge_type and instead return a status 400 because the charge_type id is not an integer', function (done) {
        chai.request(server)
            .get('/api/charge-types/1a')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    let insertId = 0;
    
    it('should POST a new charge_type with the provided params body and return the insertId', function (done) {
        const paramsObj = {
            "charge_type": "Some charge type",
            "active": 1
        };
        chai.request(server)
            .post('/api/charge-types')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('insertId').and.to.be.a('number');
                if (response.body.insertId) insertId = response.body.insertId;
                done();
            });
    });
    
    it('should FAIL to POST a new charge_type and return an error because 2 parameters were invalid', function (done) {
        const paramsObj = {
            "charge_type": 0,
            "active": 2
        };
        chai.request(server)
            .post('/api/charge-types')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(2);
                done();
            });
    });
    
    it('should update the just created new charge_type with these new parameters', function (done) {
        const paramsObj = {
            "charge_type_id": insertId,
            "charge_type": "Updated Charge Type",
            "active": 1
        };
        chai.request(server)
            .put('/api/charge-types')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
    
    it('should FAIL to update the just created new charge_type and return 3 errors because all 3 parameters are invalid', function (done) {
        const paramsObj = {
            "charge_type_id": 0,
            "charge_type": "",
            "active": 2
        };
        chai.request(server)
            .put('/api/charge-types')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(3);
                done();
            });
    });

    it('should FAIL to update the just created new charge_type and return an error object because charge_type_id is not an interger', function (done) {
        const paramsObj = {
            "charge_type_id": "d",
            "charge_type": "Restaurant",
            "active": 1
        };
        chai.request(server)
            .put('/api/charge-types')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should FAIL to delete the newly created charge_type because the charge_type id is invalid', function (done) {
        chai.request(server)
            .delete('/api/charge-types/0')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should delete the newly created charge_type using the insertId', function (done) {
        chai.request(server)
            .delete('/api/charge-types/' + insertId)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
});
