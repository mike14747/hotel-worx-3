const agent = require('../utils/serverInit');

describe('Taxes API (/api/taxes)', function () {
    let insertId = 0

    it('should POST a new tax and return the insertId', function (done) {
        const paramsObj = {
            "tax_name": "Special Tax",
            "tax_rate": 1.375,
            "active": 1
        };
        agent
            .post('/api/taxes')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('insertId').and.to.be.a('number');
                if (response.body.insertId) insertId = response.body.insertId;
                done();
            });
    });

    it('should GET the newly created tax by id', function (done) {
        agent
            .get('/api/taxes/' + insertId)
            .end(function (error, response) {
                if (error) done(error);
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

    it('should GET all the taxes', function (done) {
        agent
            .get('/api/taxes')
            .end(function (error, response) {
                if (error) done(error);
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

    it('should GET a status 200 and an empty array because tax_id 0 should not match any taxes', function (done) {
        agent
            .get('/api/taxes/0')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });

    it('should GET a status 400 because the tax_id param is not an integer', function (done) {
        agent
            .get('/api/taxes/1a')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new tax and and return an error because tax_name is invalid', function (done) {
        const paramsObj = {
            "tax_name": undefined,
            "tax_rate": 1.375,
            "active": 1
        };
        agent
            .post('/api/taxes')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new tax and and return an error because tax_rate is invalid', function (done) {
        const paramsObj = {
            "tax_name": "Special Tax",
            "tax_rate": undefined,
            "active": 1
        };
        agent
            .post('/api/taxes')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new tax and and return an error because active is invalid', function (done) {
        const paramsObj = {
            "tax_name": "Special Tax",
            "tax_rate": 1.375,
            "active": undefined
        };
        agent
            .post('/api/taxes')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should update, via PUT, the newly created tax with these new parameters', function (done) {
        const paramsObj = {
            "tax_id": insertId,
            "tax_name": "Special Tax",
            "tax_rate": 1.250,
            "active": 0
        };
        agent
            .put('/api/taxes')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(204);
                done();
            });
    });
    
    it('should FAIL to update, via PUT, any tax and return an error because tax_id is invalid', function (done) {
        const paramsObj = {
            "tax_id": undefined,
            "tax_name": "Some Tax",
            "tax_rate": 1.375,
            "active": 1
        };
        agent
            .put('/api/taxes')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, any tax and return an error because tax_name is invalid', function (done) {
        const paramsObj = {
            "tax_id": insertId,
            "tax_name": undefined,
            "tax_rate": 1.375,
            "active": 1
        };
        agent
            .put('/api/taxes')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, any tax and return an error because tax_rate is invalid', function (done) {
        const paramsObj = {
            "tax_id": insertId,
            "tax_name": "Some Tax",
            "tax_rate": undefined,
            "active": 1
        };
        agent
            .put('/api/taxes')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, any tax and return an error because active is invalid', function (done) {
        const paramsObj = {
            "tax_id": insertId,
            "tax_name": "Some Tax",
            "tax_rate": 1.375,
            "active": undefined
        };
        agent
            .put('/api/taxes')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, any tax and return an error because the tax_id does not exist', function (done) {
        const paramsObj = {
            "tax_id": 0,
            "tax_name": "City",
            "tax_rate": 1.375,
            "active": 1
        };
        agent
            .put('/api/taxes')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to DELETE any tax and return an error because the tax_id does not exist', function (done) {
        agent
            .delete('/api/taxes/0')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to DELETE the any tax because the tax_id is not an integer', function (done) {
        agent
            .delete('/api/taxes/abc')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to DELETE the any tax because the tax_id param was not included', function (done) {
        agent
            .delete('/api/taxes')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(404);
                done();
            });
    });
    
    it('should DELETE the newly created tax using the insertId', function (done) {
        agent
            .delete('/api/taxes/' + insertId)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(204);
                done();
            });
    });
});
