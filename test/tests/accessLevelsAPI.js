const agent = require('../utils/serverInit');

describe('Access Levels API (/api/access-levels)', function () {
    let insertId = 0;
    
    it('should POST a new access_level with the provided params body and return the insertId', function (done) {
        const paramsObj = {
            "access_level": 40,
            "access_type": "Supreme"
        };
        agent
            .post('/api/access-levels')
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

    it('should GET the newly created access_level by id', function (done) {
        agent
            .get('/api/access-levels/' + insertId)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(1);
                response.body[0].should.have.all.keys('access_id', 'access_level', 'access_type');
                response.body[0].access_id.should.be.a('number');
                response.body[0].access_level.should.be.a('number');
                response.body[0].access_type.should.be.a('string');
                done();
            });
    });

    it('should GET all access_levels', function (done) {
        agent
            .get('/api/access-levels')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.have.all.keys('access_id', 'access_level', 'access_type');
                    element.access_id.should.be.a('number');
                    element.access_level.should.be.a('number');
                    element.access_type.should.be.a('string');
                });
                done();
            });
    });

    it('should GET a status 200 and an empty array because access_id 0 should not match any access_levels', function (done) {
        agent
            .get('/api/access-levels/0')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });

    it('should FAIL to GET an access_level and instead return a status 400 because the access_id param is not an integer', function (done) {
        agent
            .get('/api/access-levels/1a')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });
    
    it('should FAIL to POST a new access_level and return an error because access_level is invalid', function (done) {
        const paramsObj = {
            "access_level": undefined,
            "access_type": "some Type"
        };
        agent
            .post('/api/access-levels')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new access_level and return an error because access_type is invalid', function (done) {
        const paramsObj = {
            "access_level": 40,
            "access_type": undefined
        };
        agent
            .post('/api/access-levels')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });
    
    it('should update, via PUT, the newly created access_level with these new parameters', function (done) {
        const paramsObj = {
            "access_id": insertId,
            "access_level": 50,
            "access_type": "new access type"
        };
        agent
            .put('/api/access-levels')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(204);
                done();
            });
    });
    
    it('should FAIL to update, via PUT, the newly created access_level and return an error because access_id is invalid', function (done) {
        const paramsObj = {
            "access_id": undefined,
            "access_level": 50,
            "access_type": "Some Type"
        };
        agent
            .put('/api/access-levels')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, the newly created access_level and return an error object because access_level is invalid', function (done) {
        const paramsObj = {
            "access_id": insertId,
            "access_level": undefined,
            "access_type": "new access type"
        };
        agent
            .put('/api/access-levels')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, the newly created access_level and return an error object because access_type is invalid', function (done) {
        const paramsObj = {
            "access_id": insertId,
            "access_level": 40,
            "access_type": undefined
        };
        agent
            .put('/api/access-levels')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, the newly created access_level and return an error because the access_level_id does not exist', function (done) {
        const paramsObj = {
            "access_id": 0,
            "access_level": 50,
            "access_type": "new access type"
        };
        agent
            .put('/api/access-levels')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to DELETE any access_level and return an error because the access_level_id param was not included', function (done) {
        agent
            .delete('/api/access-levels')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(404);
                done();
            });
    });
    
    it('should FAIL to DELETE any access_level and return an error because access_level_id does not exist', function (done) {
        agent
            .delete('/api/access-levels/0')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });
    
    it('should FAIL to DELETE the newly created access_level because access_id is not an integer', function (done) {
        agent
            .delete('/api/access-levels/abc')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });
    
    it('should DELETE the newly created access_level using the insertId', function (done) {
        agent
            .delete('/api/access-levels/' + insertId)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(204);
                done();
            });
    });
});
