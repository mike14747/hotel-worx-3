const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

const paramsObj = {
    "company_id": 1,
    "company_name": "Union Sand",
    "address": "234 Bank St",
    "city": "Painesville",
    "state": "Ohio",
    "zip": "44077",
    "country": "USA",
    "email": "u.sand@yahoo.net",
    "phone": "800-555-1212",
    "credit_card_num": "1234567890123456",
    "cc_expiration": "11 / 24",
    "tax_exempt": 0,
};

describe('Companies API', function () {
    it('should get all companies', function (done) {
        chai.request(server)
            .get('/api/companies')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.have.property('company_id').and.to.be.a('number');
                    element.should.have.property('company_name').and.to.be.a('string');
                    element.should.have.property('address').and.to.be.a('string');
                    element.should.have.property('city').and.to.be.a('string');
                    element.should.have.property('state').and.to.be.a('string');
                    element.should.have.property('zip').and.to.be.a('string');
                    element.should.have.property('country').and.to.be.a('string');
                    element.should.have.property('email').and.to.be.a('string');
                    element.should.have.property('phone').and.to.be.a('string');
                    element.should.have.property('credit_card_num').and.to.be.a('string');
                    element.should.have.property('cc_expiration').and.to.be.a('string');
                    element.should.have.property('tax_exempt').and.to.be.a('number').and.oneOf([0, 1]);
                });
                done();
            });
    });

    it('should get a single company by id', function (done) {
        chai.request(server)
            .get('/api/companies/1')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(1);
                response.body[0].should.have.property('company_id').and.to.be.a('number');
                response.body[0].should.have.property('company_name').and.to.be.a('string');
                response.body[0].should.have.property('address').and.to.be.a('string');
                response.body[0].should.have.property('city').and.to.be.a('string');
                response.body[0].should.have.property('state').and.to.be.a('string');
                response.body[0].should.have.property('zip').and.to.be.a('string');
                response.body[0].should.have.property('country').and.to.be.a('string');
                response.body[0].should.have.property('email').and.to.be.a('string');
                response.body[0].should.have.property('phone').and.to.be.a('string');
                response.body[0].should.have.property('credit_card_num').and.to.be.a('string');
                response.body[0].should.have.property('cc_expiration').and.to.be.a('string');
                response.body[0].should.have.property('tax_exempt').and.to.be.a('number').and.oneOf([0, 1]);
                done();
            });
    });

    it('should get a status 200 and an empty array because company id 0 should not match any companies', function (done) {
        chai.request(server)
            .get('/api/companies/0')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });

    it('should FAIL to get a single company and instead return a status 400 because the company id is not an integer', function (done) {
        chai.request(server)
            .get('/api/companies/1a')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });

    // let insertId = 0;

    // it('should POST a new charge_type with the provided params body and return the insertId', function (done) {
    //     const paramsObj = {
    //         "charge_type": "Some charge type",
    //         "active": 1
    //     };
    //     chai.request(server)
    //         .post('/api/charge-types')
    //         .send(paramsObj)
    //         .end(function (error, response) {
    //             response.should.have.status(201);
    //             response.body.should.be.an('object');
    //             response.body.should.have.property('insertId').and.to.be.a('number');
    //             if (response.body.insertId) insertId = response.body.insertId;
    //             done();
    //         });
    // });

    // it('should FAIL to POST a new charge_type and return an error because parameter was invalid', function (done) {
    //     const paramsObj = {
    //         "charge_type": 0,
    //         "active": 2
    //     };
    //     chai.request(server)
    //         .post('/api/charge-types')
    //         .send(paramsObj)
    //         .end(function (error, response) {
    //             response.should.have.status(400);
    //             response.body.should.be.an('object');
    //             response.body.should.have.property('message').and.to.be.a('string');
    //             response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(2);
    //             done();
    //         });
    // });

    // it('should update the just created new charge_type with these new parameters', function (done) {
    //     const paramsObj = {
    //         "charge_type_id": insertId,
    //         "charge_type": "Updated Charge Type",
    //         "active": 1
    //     };
    //     chai.request(server)
    //         .put('/api/charge-types')
    //         .send(paramsObj)
    //         .end(function (error, response) {
    //             response.should.have.status(204);
    //             done();
    //         });
    // });

    // it('should FAIL to update the just created new charge_type and return 3 errors because all 3 parameters are invalid', function (done) {
    //     const paramsObj = {
    //         "charge_type_id": 0,
    //         "charge_type": "",
    //         "active": 2
    //     };
    //     chai.request(server)
    //         .put('/api/charge-types')
    //         .send(paramsObj)
    //         .end(function (error, response) {
    //             response.should.have.status(400);
    //             response.body.should.be.an('object');
    //             response.body.should.have.property('message').and.to.be.a('string');
    //             response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(3);
    //             done();
    //         });
    // });

    // it('should FAIL to update the just created new charge_type and return an error object because charge_type_id is not an interger', function (done) {
    //     const paramsObj = {
    //         "charge_type_id": "d",
    //         "charge_type": "Restaurant",
    //         "active": 1
    //     };
    //     chai.request(server)
    //         .put('/api/charge-types')
    //         .send(paramsObj)
    //         .end(function (error, response) {
    //             response.should.have.status(400);
    //             response.body.should.be.an('object');
    //             response.body.should.have.property('message').and.to.be.a('string');
    //             done();
    //         });
    // });

    // it('should FAIL to delete the newly created charge_type because the charge_type id is invalid', function (done) {
    //     chai.request(server)
    //         .delete('/api/charge-types/0')
    //         .end(function (error, response) {
    //             response.should.have.status(400);
    //             response.body.should.be.an('object');
    //             response.body.should.have.property('message').and.to.be.a('string');
    //             done();
    //         });
    // });

    // it('should delete the newly created charge_type using the insertId', function (done) {
    //     chai.request(server)
    //         .delete('/api/charge-types/' + insertId)
    //         .end(function (error, response) {
    //             response.should.have.status(204);
    //             done();
    //         });
    // });
});
