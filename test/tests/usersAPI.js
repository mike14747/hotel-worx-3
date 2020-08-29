const agent = require('../utils/serverInit');

describe('Users API (/api/users)', function () {
    let insertId = 0;

    it('should POST a new user with the provided params body and return the insertId', function (done) {
        const paramsObj = {
            "username": "some_user",
            "password": "some_password",
            "email": "some_email@gmail.com",
            "access_id": 2,
            "active": 1
        };
        agent
            .post('/api/users')
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

    it('should GET the newly created user by id', function (done) {
        agent
            .get('/api/users/' + insertId)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(1);
                response.body[0].should.have.property('user_id').and.to.be.a('number');
                response.body[0].should.have.property('username').and.to.be.a('string');
                response.body[0].should.have.property('email').and.to.be.a('string');
                response.body[0].should.have.property('access_id').and.to.be.a('number');
                response.body[0].should.have.property('active').and.to.be.a('number').and.oneOf([0, 1]);
                done();
            });
    });

    it('should GET all users', function (done) {
        agent
            .get('/api/users')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.have.property('user_id').and.to.be.a('number');
                    element.should.have.property('username').and.to.be.a('string');
                    element.should.have.property('email').and.to.be.a('string');
                    element.should.have.property('access_id').and.to.be.a('number');
                    element.should.have.property('active').and.to.be.a('number').and.oneOf([0, 1]);
                });
                done();
            });
    });

    it('should GET a status 200 and an empty array because user_id 0 should not match any users', function (done) {
        agent
            .get('/api/users/0')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });

    it('should FAIL to GET a single user and instead return a status 400 because the user_id is not an integer', function (done) {
        agent
            .get('/api/users/1a')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new user and return an error because the username parameter is invalid', function (done) {
        const paramsObj = {
            "username": "u",
            "password": "some_password",
            "email": "some@test.com",
            "access_id": 1,
            "active": 1
        };
        agent
            .post('/api/users')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new user and return an error because the password parameter is invalid', function (done) {
        const paramsObj = {
            "username": "some_user",
            "password": "s",
            "email": "some@test.com",
            "access_id": 1,
            "active": 1
        };
        agent
            .post('/api/users')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new user and return an error because the email parameter is invalid', function (done) {
        const paramsObj = {
            "username": "some_user",
            "password": "some_password",
            "email": "some@test",
            "access_id": 1,
            "active": 1
        };
        agent
            .post('/api/users')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new user and return an error because the username already exists', function (done) {
        const paramsObj = {
            "username": "some_user",
            "password": "some_password",
            "email": "some@test.com",
            "access_id": 1,
            "active": 1
        };
        agent
            .post('/api/users')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to POST a new user and return an error because one or more parameters are invalid', function (done) {
        const paramsObj = {
            "username": "another_user",
            "password": "some_password",
            "email": "some@test.com",
            "access_id": 0,
            "active": 2
        };
        agent
            .post('/api/users')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should update, via PUT, the newly created user with these new parameters', function (done) {
        const paramsObj = {
            "user_id": insertId,
            "username": "new_user",
            "password": "new_password",
            "email": "some_other@test.com",
            "access_id": 2,
            "active": 1
        };
        agent
            .put('/api/users')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(204);
                done();
            });
    });

    it('should FAIL to update, via PUT, any user and return an error because one or more parameters are invalid', function (done) {
        const paramsObj = {
            "user_id": insertId,
            "username": "another_user",
            "password": "some_password",
            "email": "some_other@test.com",
            "access_id": 0,
            "active": 2
        };
        agent
            .put('/api/users')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, any user and return an error because user_id is not an integer', function (done) {
        const paramsObj = {
            "user_id": "abc",
            "username": "new_user",
            "password": "new_password",
            "email": "some_other@test.com",
            "access_id": 2,
            "active": 1
        };
        agent
            .put('/api/users')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, any user and return an error because the user_id does not exist', function (done) {
        const paramsObj = {
            "user_id": 0,
            "username": "new_user",
            "email": "some_other@test.com",
            "password": "new_password",
            "access_id": 2,
            "active": 1
        };
        agent
            .put('/api/users')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, any user and return an error because the access_id does not exist', function (done) {
        const paramsObj = {
            "user_id": 1,
            "username": "new_user",
            "password": "new_password",
            "email": "some_other@test.com",
            "access_id": 0,
            "active": 1
        };
        agent
            .put('/api/users')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to DELETE any user and return an error because the user_id does not exist', function (done) {
        agent
            .delete('/api/users/0')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to DELETE the newly created user because the user_id is not an integer', function (done) {
        agent
            .delete('/api/users/abc')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should DELETE the newly created user using the insertId', function (done) {
        agent
            .delete('/api/users/' + insertId)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(204);
                done();
            });
    });
});
