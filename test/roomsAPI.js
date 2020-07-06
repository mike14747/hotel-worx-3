const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Rooms API', function () {
    describe('GET /api/rooms', function () {
        it('should get all rooms and their particulars', function (done) {
            chai.request(server)
                .get('/api/rooms')
                .end(function (error, response) {
                    if (error) console.log(error);
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
    });

    describe('GET /api/rooms/1', function () {
        it('should get a single room by id and its particulars', function (done) {
            chai.request(server)
                .get('/api/rooms/1')
                .end(function (error, response) {
                    if (error) console.log(error);
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
    });

    describe('GET /api/rooms/1a', function () {
        it('should get a status 400 since the room id param is not an integer', function (done) {
            chai.request(server)
                .get('/api/rooms/1a')
                .end(function (error, response) {
                    if (error) console.log(error);
                    response.should.have.status(400);
                    done();
                });
        });
    });

    describe('GET /api/rooms/0', function () {
        it('should return status 400 since 0 should not match any room ids', function (done) {
            chai.request(server)
                .get('/api/rooms/0')
                .end(function (error, response) {
                    if (error) console.log(error);
                    response.should.have.status(400);
                    done();
                });
        });
    });

    describe('GET /api/rooms/all-ids-nums', function () {
        it('should get all rooms and only their room_id and room_num', function (done) {
            chai.request(server)
                .get('/api/rooms/all-ids-nums')
                .end(function (error, response) {
                    if (error) console.log(error);
                    response.should.have.status(200);
                    response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                    response.body.forEach(function (element) {
                        element.should.have.property('room_id').and.to.be.a('number');
                        element.should.have.property('room_num').and.to.be.a('string');
                    });
                    done();
                });
        });
    });

    describe('GET /api/rooms/house-status', function () {
        it('should get cumulative totals for house status', function (done) {
            chai.request(server)
                .get('/api/rooms/house-status')
                .end(function (error, response) {
                    if (error) console.log(error);
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
    });

    chai.Assertion.addMethod('numberOrNull', function (item) {
        return ((typeof(item) === 'number' && item === 0 || item === 1) || item === null);
    });

    describe('GET /api/rooms/housekeeping-status', function () {
        it('should get all rooms and their particulars that meet the query params', function (done) {
            chai.request(server)
                .get('/api/rooms/housekeeping-status')
                .end(function (error, response) {
                    if (error) console.log(error);
                    response.should.have.status(200);
                    response.body.should.be.an('array').and.have.lengthOf.at.least(1);
                    response.body.forEach(function (element) {
                        element.should.have.property('room_num').and.to.be.a('string');
                        element.should.have.property('clean').and.to.be.a('number').and.oneOf([0, 1]);
                        element.should.have.property('occupied').and.to.be.a('number').and.oneOf([0, 1]);
                        element.should.have.property('active').and.to.be.a('number').and.oneOf([0, 1]);
                        element.should.have.property('type').and.to.be.a('string');
                        element.should.have.property('checked_in').and.to.be.numberOrNull(element.checked_in);
                        // element.should.have.property('checked_out').and.to.be.a('number').and.oneOf([0, 1]);
                        // element.should.have.property('room_id').and.to.be.a('number');
                        // element.should.have.property('departure').and.to.be.a('number').and.oneOf([0, 1]);
                        // element.should.have.property('stayover').and.to.be.a('number').and.oneOf([0, 1]);
                    });
                    done();
                });
        });
    });
});