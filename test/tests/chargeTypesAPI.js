const agent = require('../utils/serverInit');

describe('Charge Types API (/api/charge-types))', function () {
    let insertId = 0;
    
    it('should POST a new charge_type with the provided params body and return the insertId', function (done) {
        const paramsObj = {
            "charge_type": "Some charge type",
            "active": 1
        };
        agent
            .post('/api/charge-types')
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

    it('should GET the newly created charge_type by id', function (done) {
        agent
            .get('/api/charge-types/' + insertId)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(1);
                response.body[0].should.have.property('charge_type_id').and.to.be.a('number');
                response.body[0].should.have.property('charge_type').and.to.be.a('string');
                response.body[0].should.have.property('active').and.to.be.a('number').and.oneOf([0, 1]);
                done();
            });
    });

    it('should GET all charge_types', function (done) {
        agent
            .get('/api/charge-types')
            .end(function (error, response) {
                if (error) done(error);
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

    it('should GET a status 200 and an empty array because charge_type_id 0 should not match any charge_types', function (done) {
        agent
            .get('/api/charge-types/0')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });
    
    it('should FAIL to GET a single charge_type and instead return a status 400 because the charge_type_id is not an integer', function (done) {
        agent
            .get('/api/charge-types/1a')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });
    
    it('should FAIL to POST a new charge_type and return an error because one or more parameters are invalid', function (done) {
        const paramsObj = {
            "charge_type": 0,
            "active": 2
        };
        agent
            .post('/api/charge-types')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });
    
    it('should update, via PUT, the newly created charge_type with these new parameters', function (done) {
        const paramsObj = {
            "charge_type_id": insertId,
            "charge_type": "Updated Charge Type",
            "active": 1
        };
        agent
            .put('/api/charge-types')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(204);
                done();
            });
    });
    
    it('should FAIL to update, via PUT, the newly created charge_type and return an error because one or more parameters are invalid', function (done) {
        const paramsObj = {
            "charge_type_id": null,
            "charge_type": "",
            "active": 2
        };
        agent
            .put('/api/charge-types')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, the newly created charge_type and return an error object because the charge_type_id is not an interger', function (done) {
        const paramsObj = {
            "charge_type_id": "d",
            "charge_type": "Restaurant",
            "active": 1
        };
        agent
            .put('/api/charge-types')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, the newly created charge_type and return an error object because the charge_type_id is not valid', function (done) {
        const paramsObj = {
            "charge_type_id": 0,
            "charge_type": "Restaurant",
            "active": 1
        };
        agent
            .put('/api/charge-types')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });
    
    it('should FAIL to DELETE the newly created charge_type because the charge_type_id is invalid', function (done) {
        agent
            .delete('/api/charge-types/0')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to DELETE the newly created charge_type because the charge_type_id is not an integer', function (done) {
        agent
            .delete('/api/charge-types/abc')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });
    
    it('should DELETE the newly created charge_type using the insertId', function (done) {
        agent
            .delete('/api/charge-types/' + insertId)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(204);
                done();
            });
    });
});
