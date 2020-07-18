const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Room Types API', function () {
    it('should get all room_types', function (done) {
        chai.request(server)
            .get('/api/room-types')
            .end(function (error, response) {
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

    it('should get a status 200 and an empty array because room_type id 0 should not match any room_types', function (done) {
        chai.request(server)
            .get('/api/room-types/0')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });
    
    it('should FAIL to get a single room_type and instead return a status 400 because the type id is not an integer', function (done) {
        chai.request(server)
            .get('/api/room-types/1a')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    let insertId = 0;
    
    it('should POST a new room_type with the provided params body and return the insertId', function (done) {
        const paramsObj = {
            "room_type": "Some room type",
            "room_rate": 119.99
        };
        chai.request(server)
            .post('/api/room-types')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(201);
                response.body.should.be.an('object');
                response.body.should.have.property('insertId').and.to.be.a('number');
                if (response.body.insertId) insertId = response.body.insertId;
                done();
            });
    });

    it('should get the newly created single room_type by id', function (done) {
        chai.request(server)
            .get('/api/room-types/' + insertId)
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(1);
                response.body[0].should.have.property('room_type_id').and.to.be.a('number');
                response.body[0].should.have.property('room_type').and.to.be.a('string');
                response.body[0].should.have.property('room_rate');
                Number(response.body[0].room_rate).should.be.a('number');
                done();
            });
    });
    
    it('should FAIL to POST a new room_type and return an error because 2 parameters were invalid', function (done) {
        const paramsObj = {
            "room_type": 0,
            "room_rate": "abc"
        };
        chai.request(server)
            .post('/api/room-types')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(2);
                done();
            });
    });
    
    it('should update the just created new room_type with these new parameters', function (done) {
        const paramsObj = {
            "room_type_id": insertId,
            "room_type": "Updated room Type",
            "room_rate": 129.99
        };
        chai.request(server)
            .put('/api/room-types')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
    
    it('should FAIL to update the just created new room_type and return 3 errors because all 3 parameters are invalid', function (done) {
        const paramsObj = {
            "room_type_id": 0,
            "room_type": "",
            "room_rate": "abc"
        };
        chai.request(server)
            .put('/api/room-types')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(3);
                done();
            });
    });

    it('should FAIL to update the just created new room_type and return an error object because room_type_id is not an interger', function (done) {
        const paramsObj = {
            "room_type_id": "d",
            "room_type": "Restaurant",
            "room_rate": 119.99
        };
        chai.request(server)
            .put('/api/room-types')
            .send(paramsObj)
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should FAIL to delete the newly created room_type because the room_type id is invalid', function (done) {
        chai.request(server)
            .delete('/api/room-types/0')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should delete the newly created room_type using the insertId', function (done) {
        chai.request(server)
            .delete('/api/room-types/' + insertId)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
});
