const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Charges API (/api/charges)', function () {
    let insertId = 0;
    
    it('should POST a new charge with the provided params body and return the insertId', function (done) {
        const paramsObj = {
            "res_room_id": 1200,
            "charge_type_id": 3,
            "charge_amount": 43.12,
            "taxable": 1
        };
        chai.request(server)
            .post('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('insertId').and.to.be.a('number');
                if (response.body.insertId) insertId = response.body.insertId;
                done();
            });
    });

    it('should GET the newly created charge by id', function (done) {
        chai.request(server)
            .get('/api/charges/' + insertId)
            .end(function (error, response) {
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
        chai.request(server)
            .get('/api/charges')
            .end(function (error, response) {
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
        chai.request(server)
            .get('/api/charges/0')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });

    it('should FAIL to GET a charge and instead return a status 400 because the charge_id param is not an integer', function (done) {
        chai.request(server)
            .get('/api/charges/1a')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should POST a second new charge with the provided params body and return the insertId', function (done) {
        const paramsObj = {
            "res_room_id": 1100,
            "charge_type_id": 2,
            "charge_amount": 29.87,
            "taxable": 1
        };
        chai.request(server)
            .post('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('insertId').and.to.be.a('number');
                done();
            });
    });
    
    it('should FAIL to POST a new charge and return 4 errors because all 4 parameters are invalid', function (done) {
        const paramsObj = {
            "res_room_id": 0,
            "charge_type_id": 0,
            "charge_amount": "a43.12",
            "taxable": 2
        };
        chai.request(server)
            .post('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(4);
                done();
            });
    });
    
    it('should update, via PUT, one of the newly created charge with these new parameters', function (done) {
        const paramsObj = {
            "charge_id": insertId,
            "res_room_id": 1200,
            "charge_type_id": 2,
            "charge_amount": 53.12,
            "taxable": 1
        };
        chai.request(server)
            .put('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
    
    it('should FAIL to update, via PUT, one of the newly created charges and return 5 errors because all 5 parameters are invalid', function (done) {
        const paramsObj = {
            "charge_id": 0,
            "res_room_id": 0,
            "charge_type_id": 0,
            "charge_amount": "a53.12",
            "taxable": 2
        };
        chai.request(server)
            .put('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(5);
                done();
            });
    });

    it('should FAIL to update, via PUT, one of the newly created charges and return an error object because one or more ids are not integers', function (done) {
        const paramsObj = {
            "charge_id": 'a',
            "res_room_id": 'b',
            "charge_type_id": 'c',
            "charge_amount": 53.12,
            "taxable": 1
        };
        chai.request(server)
            .put('/api/charges')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should FAIL to DELETE the newly created charge because the charge_id is invalid', function (done) {
        chai.request(server)
            .delete('/api/charges/0')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should FAIL to DELETE all charges associated with a res_room_id because the res_room id is not an integer', function (done) {
        chai.request(server)
            .delete('/api/charges/res-rooms/abc')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should DELETE the newly created charge using the insertId', function (done) {
        chai.request(server)
            .delete('/api/charges/' + insertId)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
    
    it('should DELETE all charges associated with a res_room_id', function (done) {
        chai.request(server)
            .delete('/api/charges/res-rooms/1100')
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
});
