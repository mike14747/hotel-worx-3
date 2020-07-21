const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Users API (/api/users)', function () {
    let insertId = 0;

    it('should POST a new user with the provided params body and return the insertId', function (done) {
        const paramsObj = {
            "username": "some_username",
            "password": "some_password",
            "access_id": 20,
            "active": 1
        };
        chai.request(server)
            .post('/api/users')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('insertId').and.to.be.a('number');
                if (response.body.insertId) insertId = response.body.insertId;
                done();
            });
    });

    it('should GET the newly created user by id', function (done) {
        chai.request(server)
            .get('/api/users/' + insertId)
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(1);
                response.body[0].should.have.property('user_id').and.to.be.a('number');
                response.body[0].should.have.property('username').and.to.be.a('string');
                response.body[0].should.have.property('access_id').and.to.be.a('number');
                response.body[0].should.have.property('active').and.to.be.a('number').and.oneOf([0, 1]);
                done();
            });
    });

    it('should GET all users', function (done) {
        chai.request(server)
            .get('/api/users')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.have.property('user_id').and.to.be.a('number');
                    element.should.have.property('username').and.to.be.a('string');
                    element.should.have.property('access_id').and.to.be.a('number');
                    element.should.have.property('active').and.to.be.a('number').and.oneOf([0, 1]);
                });
                done();
            });
    });

    it('should GET a status 200 and an empty array because user_id 0 should not match any users', function (done) {
        chai.request(server)
            .get('/api/users/0')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });

    it('should FAIL to GET a single user and instead return a status 400 because the user_id is not an integer', function (done) {
        chai.request(server)
            .get('/api/users/1a')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new user and return an error because 4 parameters were invalid', function (done) {
        const paramsObj = {
            "username": 0,
            "password": "",
            "access_id": "",
            "active": 2
        };
        chai.request(server)
            .post('/api/users')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(4);
                done();
            });
    });

    it('should update, via PUT, the newly created user with these new parameters', function (done) {
        const paramsObj = {
            "user_id": insertId,
            "username": "new_username",
            "password": "new_password",
            "access_level": 30,
            "active": 1
        };
        chai.request(server)
            .put('/api/users')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });

    it('should FAIL to update, via PUT, the newly created user and return 5 errors because all 5 parameters are invalid', function (done) {
        const paramsObj = {
            "user_id": 0,
            "username": "",
            "password": 0,
            "access_level": 0,
            "active": 2
        };
        chai.request(server)
            .put('/api/users')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(5);
                done();
            });
    });

    it('should FAIL to update, via PUT, the newly created user and return an error object because user_id is not an interger', function (done) {
        const paramsObj = {
            "user_id": "abc",
            "username": "new_username",
            "password": "new_password",
            "access_level": 30,
            "active": 1
        };
        chai.request(server)
            .put('/api/users')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to DELETE the newly created user because the user_id is invalid', function (done) {
        chai.request(server)
            .delete('/api/users/0')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to DELETE the newly created user because the user_id is not an integer', function (done) {
        chai.request(server)
            .delete('/api/users/abc')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });

    it('should DELETE the newly created user using the insertId', function (done) {
        chai.request(server)
            .delete('/api/users/' + insertId)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
});
