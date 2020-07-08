const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Rooms API', function () {
    it('should get all rooms and their data', function (done) {
        chai.request(server)
            .get('/api/rooms')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.have.property('room_id').and.to.be.a('number');
                    element.should.have.property('room_num').and.to.be.a('string');
                    element.should.have.property('description').and.to.be.a('string');
                    element.should.have.property('num_beds').and.to.be.a('number');
                    element.should.have.property('clean').and.to.be.a('number').and.oneOf([0, 1]);
                    element.should.have.property('occupied').and.to.be.a('number').and.oneOf([0, 1]);
                    element.should.have.property('active').and.to.be.a('number').and.oneOf([0, 1]);
                    element.should.have.property('room_type_id').and.to.be.a('number');
                    element.should.have.property('type').and.to.be.a('string');
                    Number(element.rate).should.be.a('number');
                });
                done();
            });
    });
    
    it('should get a single room by id and its data', function (done) {
        chai.request(server)
            .get('/api/rooms/1')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(1);
                response.body[0].should.have.property('room_id').and.to.be.a('number');
                response.body[0].should.have.property('room_num').and.to.be.a('string');
                response.body[0].should.have.property('description').and.to.be.a('string');
                response.body[0].should.have.property('num_beds').and.to.be.a('number');
                response.body[0].should.have.property('clean').and.to.be.a('number').and.oneOf([0, 1]);
                response.body[0].should.have.property('occupied').and.to.be.a('number').and.oneOf([0, 1]);
                response.body[0].should.have.property('active').and.to.be.a('number').and.oneOf([0, 1]);
                response.body[0].should.have.property('room_type_id').and.to.be.a('number');
                response.body[0].should.have.property('type').and.to.be.a('string');
                Number(response.body[0].rate).should.be.a('number');
                done();
            });
    });

    it('should get a status 400 since the room id param is not an integer', function (done) {
        chai.request(server)
            .get('/api/rooms/1a')
            .end(function (error, response) {
                response.should.have.status(400);
                done();
            });
    });

    it('should return status 200 and an empty array since 0 should not match any room ids', function (done) {
        chai.request(server)
            .get('/api/rooms/0')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });

    it('should get all rooms with only their room_id and room_num', function (done) {
        chai.request(server)
            .get('/api/rooms/all-ids-nums')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.have.property('room_id').and.to.be.a('number');
                    element.should.have.property('room_num').and.to.be.a('string');
                });
                done();
            });
    });

    it('should get cumulative totals for hotel-wide house status', function (done) {
        chai.request(server)
            .get('/api/rooms/house-status')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(1);
                response.body[0].should.have.property('roomsToSell').and.to.be.a('number');
                response.body[0].should.have.property('cleanOccupied').and.to.be.a('number');
                response.body[0].should.have.property('cleanVacant').and.to.be.a('number');
                response.body[0].should.have.property('dirtyOccupied').and.to.be.a('number');
                response.body[0].should.have.property('dirtyVacant').and.to.be.a('number');
                done();
            });
    });

    it('should get all rooms that meet the query params and their housekeeping status data', function (done) {
        chai.request(server)
            .get('/api/rooms/housekeeping-status')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                response.body.forEach(function (element) {
                    element.should.have.property('room_num').and.to.be.a('string');
                    element.should.have.property('clean').and.to.be.a('number').and.oneOf([0, 1]);
                    element.should.have.property('occupied').and.to.be.a('number').and.oneOf([0, 1]);
                    element.should.have.property('active').and.to.be.a('number').and.oneOf([0, 1]);
                    element.should.have.property('type').and.to.be.a('string');
                    element.should.have.property('checked_in').and.to.be.a('number').and.oneOf([0, 1]);
                    element.should.have.property('checked_out').and.to.be.a('number').and.oneOf([0, 1]);
                    element.should.have.property('room_id').and.to.be.a('number');
                    element.should.have.property('departure').and.to.be.a('number').and.oneOf([0, 1]);
                    element.should.have.property('stayover').and.to.be.a('number').and.oneOf([0, 1]);
                });
                done();
            });
    });
});