const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Payment Types API', function () {
    it('should get all payment_types', function (done) {
        chai.request(server)
            .get('/api/payment-types')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.have.property('payment_type_id').and.to.be.a('number');
                    element.should.have.property('payment_type').and.to.be.a('string');
                    element.should.have.property('active').and.to.be.a('number').and.oneOf([0, 1]);
                });
                done();
            });
    });

    it('should get a status 200 and an empty array because payment_type id 0 should not match any payments', function (done) {
        chai.request(server)
            .get('/api/payment-types/0')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });
    
    it('should FAIL to get a single payment_type and instead return a status 400 because the payment_type id is not an integer', function (done) {
        chai.request(server)
            .get('/api/payment-types/1a')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    let insertId = 0;
    
    it('should POST a new payment_type with the provided params body and return the insertId', function (done) {
        const paramsObj = {
            "payment_type": "Some payment type",
            "active": 1
        };
        chai.request(server)
            .post('/api/payment-types')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('insertId').and.to.be.a('number');
                if (response.body.insertId) insertId = response.body.insertId;
                done();
            });
    });

    it('should get the newly created single payment_type by id', function (done) {
        chai.request(server)
            .get('/api/payment-types/' + insertId)
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(1);
                response.body[0].should.have.property('payment_type_id').and.to.be.a('number');
                response.body[0].should.have.property('payment_type').and.to.be.a('string');
                response.body[0].should.have.property('active').and.to.be.a('number').and.oneOf([0, 1]);
                done();
            });
    });
    
    it('should FAIL to POST a new payment_type and return an error because 2 parameters were invalid', function (done) {
        const paramsObj = {
            "payment_type": 0,
            "active": 2
        };
        chai.request(server)
            .post('/api/payment-types')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(2);
                done();
            });
    });
    
    it('should update the just created new payment_type with these new parameters', function (done) {
        const paramsObj = {
            "payment_type_id": insertId,
            "payment_type": "Updated Payment Type",
            "active": 1
        };
        chai.request(server)
            .put('/api/payment-types')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
    
    it('should FAIL to update the just created new payment_type and return 3 errors because all 3 parameters are invalid', function (done) {
        const paramsObj = {
            "payment_type_id": 0,
            "payment_type": "",
            "active": 2
        };
        chai.request(server)
            .put('/api/payment-types')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(3);
                done();
            });
    });

    it('should FAIL to update the just created new payment_type and return an error object because payment_type_id is not an interger', function (done) {
        const paramsObj = {
            "payment_type_id": "d",
            "payment_type": "Updated Payment Type",
            "active": 1
        };
        chai.request(server)
            .put('/api/payment-types')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should FAIL to delete the newly created payment_type because the payment_type id is invalid', function (done) {
        chai.request(server)
            .delete('/api/payment-types/0')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should delete the newly created payment_type using the insertId', function (done) {
        chai.request(server)
            .delete('/api/payment-types/' + insertId)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
});
