const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.should();
chai.use(chaiHttp);

describe('Access Levels API (/api/access-levels)', function () {
    let insertId = 0;
    
    it('should POST a new access_level with the provided params body and return the insertId', function (done) {
        const paramsObj = {
            "access_level": 40,
            "access_type": "Supreme"
        };
        chai.request(server)
            .post('/api/access-levels')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('insertId').and.to.be.a('number');
                if (response.body.insertId) insertId = response.body.insertId;
                done();
            });
    });

    it('should GET the newly created access_level by id', function (done) {
        chai.request(server)
            .get('/api/access-levels/' + insertId)
            .end(function (error, response) {
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
        chai.request(server)
            .get('/api/access-levels')
            .end(function (error, response) {
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
        chai.request(server)
            .get('/api/access-levels/0')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });

    it('should FAIL to GET an access_level and instead return a status 400 because the access_id param is not an integer', function (done) {
        chai.request(server)
            .get('/api/access-levels/1a')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should FAIL to POST a new access_level and return 2 errors because both parameters are invalid', function (done) {
        const paramsObj = {
            "access_level": "a40",
            "access_type": 2
        };
        chai.request(server)
            .post('/api/access-levels')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(2);
                done();
            });
    });
    
    it('should update, via PUT, the newly created access_level with these new parameters', function (done) {
        const paramsObj = {
            "access_id": insertId,
            "access_level": 50,
            "access_type": "new access type"
        };
        chai.request(server)
            .put('/api/access-levels')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
    
    it('should FAIL to update, via PUT, the newly created access_level and return 3 errors because all 3 parameters are invalid', function (done) {
        const paramsObj = {
            "access_id": 0,
            "access_level": "a50",
            "access_type": ""
        };
        chai.request(server)
            .put('/api/access-levels')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(3);
                done();
            });
    });

    it('should FAIL to update, via PUT, the newly created access_level and return an error object because the access_id not an integer', function (done) {
        const paramsObj = {
            "access_id": "insertId",
            "access_level": 50,
            "access_type": "new access type"
        };
        chai.request(server)
            .put('/api/access-levels')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should FAIL to DELETE the newly created access_level because the access_id is invalid', function (done) {
        chai.request(server)
            .delete('/api/access-levels/0')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should FAIL to DELETE the newly created access_level because the access_id is not an integer', function (done) {
        chai.request(server)
            .delete('/api/access-levels/abc')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should DELETE the newly created access_level using the insertId', function (done) {
        chai.request(server)
            .delete('/api/access-levels/' + insertId)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
});
