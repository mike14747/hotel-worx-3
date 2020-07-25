const agent = require('../utils/serverInit');

describe('Companies API (/api/companies)', function () {
    let insertId = 0;

    it('should POST a new company with the provided params body and return the insertId', function (done) {
        const paramsObj = {
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
        agent
            .post('/api/companies')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('insertId').and.to.be.a('number');
                if (response.body.insertId) insertId = response.body.insertId;
                done();
            });
    });

    it('should GET the newly created company by id', function (done) {
        agent
            .get('/api/companies/' + insertId)
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

    it('should GET all companies', function (done) {
        agent
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
    })

    it('should GET a status 200 and an empty array because company_id 0 should not match any companies', function (done) {
        agent
            .get('/api/companies/0')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });

    it('should FAIL to GET a single company and instead return a status 400 because the company_id is not an integer', function (done) {
        agent
            .get('/api/companies/1a')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new company and return 11 errors because all 11 parameters are invalid', function (done) {
        const paramsObj = {
            "company_name": "",
            "address": 111,
            "city": "",
            "state": 222,
            "zip": "",
            "country": 333,
            "email": "",
            "phone": 444,
            "credit_card_num": "",
            "cc_expiration": 555,
            "tax_exempt": 2,
        };
        agent
            .post('/api/companies')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(11);
                done();
            });
    });

    it('should update, via PUT, the newly created company with these new parameters', function (done) {
        const paramsObj = {
            "company_id": insertId,
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
        agent
            .put('/api/companies')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });

    it('should FAIL to update, via PUT, the newly created company and return 12 errors because all 12 parameters are invalid', function (done) {
        const paramsObj = {
            "company_id": 0,
            "company_name": "",
            "address": 111,
            "city": "",
            "state": 222,
            "zip": "",
            "country": 333,
            "email": "",
            "phone": 444,
            "credit_card_num": "",
            "cc_expiration": 555,
            "tax_exempt": 2,
        };
        agent
            .put('/api/companies')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(12);
                done();
            });
    });

    it('should FAIL to update, via PUT, the newly created company and return an error object because the company_id is not an interger', function (done) {
        const paramsObj = {
            "company_id": "abc",
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
        agent
            .put('/api/companies')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to DELETE the newly created company because the company_id is invalid', function (done) {
        agent
            .delete('/api/companies/0')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to DELETE the newly created company because the company_id is not an integer', function (done) {
        agent
            .delete('/api/companies/abc')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });

    it('should DELETE the newly created company using the insertId', function (done) {
        agent
            .delete('/api/companies/' + insertId)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
});
