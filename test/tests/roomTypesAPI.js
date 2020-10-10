const agent = require('../utils/serverInit');

describe('Room Types API (/api/room_types)', function () {
    let insertId = 0;
    
    it('should POST a new room_type with the provided params body and return the insertId', function (done) {
        const paramsObj = {
            "room_type": "Some room type",
            "room_rate": 119.99
        };
        agent
            .post('/api/room-types')
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

    it('should GET the newly created room_type by id', function (done) {
        agent
            .get('/api/room-types/' + insertId)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(1);
                response.body[0].should.have.property('room_type_id').and.to.be.a('number');
                response.body[0].should.have.property('room_type').and.to.be.a('string');
                response.body[0].should.have.property('room_rate');
                Number(response.body[0].room_rate).should.be.a('number');
                done();
            });
    });

    it('should GET all room_types', function (done) {
        agent
            .get('/api/room-types')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.have.property('room_type_id').and.to.be.a('number');
                    element.should.have.property('room_type').and.to.be.a('string');
                    element.should.have.property('room_rate');
                    Number(element.room_rate).should.be.a('number');
                });
                done();
            });
    });

    it('should GET a status 200 and an empty array because room_type_id 0 should not match any room_types', function (done) {
        agent
            .get('/api/room-types/0')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });
    
    it('should FAIL to GET a single room_type and instead return a status 400 because the room_type_id is not an integer', function (done) {
        agent
            .get('/api/room-types/1a')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to GET room_type availability and return an error because the data param is invalid', function (done) {
        agent
            .get('/api/room-types/availability/202-08-01')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });
    
    it('should FAIL to POST a new room_type and return an error because one or more parameters are invalid', function (done) {
        const paramsObj = {
            "room_type": 0,
            "room_rate": "abc"
        };
        agent
            .post('/api/room-types')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });
    
    it('should update, via PUT, the newly created room_type with these new parameters', function (done) {
        const paramsObj = {
            "room_type_id": insertId,
            "room_type": "Updated room Type",
            "room_rate": 129.99
        };
        agent
            .put('/api/room-types')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(204);
                done();
            });
    });
    
    it('should FAIL to update, via PUT, any room_type and return an error because one or more parameters are invalid', function (done) {
        const paramsObj = {
            "room_type_id": null,
            "room_type": "",
            "room_rate": "abc"
        };
        agent
            .put('/api/room-types')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, any room_type and return an error because the room_type_id is not an integer', function (done) {
        const paramsObj = {
            "room_type_id": "d",
            "room_type": "Restaurant",
            "room_rate": 119.99
        };
        agent
            .put('/api/room-types')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to update, via PUT, any room_type and return an error because the room_type_id does not exist', function (done) {
        const paramsObj = {
            "room_type_id": 0,
            "room_type": "Restaurant",
            "room_rate": 119.99
        };
        agent
            .put('/api/room-types')
            .send(paramsObj)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });
    
    it('should FAIL to DELETE any room_type and return an error because the room_type_id does not exist', function (done) {
        agent
            .delete('/api/room-types/0')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Invalid request').and.to.be.a('string');
                done();
            });
    });

    it('should FAIL to DELETE any room_type because the room_type_id is not an integer', function (done) {
        agent
            .delete('/api/room-types/abc')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('Validation error').and.to.be.a('string');
                done();
            });
    });
    
    it('should DELETE the newly created room_type using the insertId', function (done) {
        agent
            .delete('/api/room-types/' + insertId)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(204);
                done();
            });
    });
});
