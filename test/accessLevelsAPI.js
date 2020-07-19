const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Access Levels API', function () {
    it('should get all access_levels', function (done) {
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
    })

    it('should get a status 200 and an empty array because access_id 0 should not match any access_levels', function (done) {
        chai.request(server)
            .get('/api/access-levels/0')
            .end(function (error, response) {
                response.should.have.status(200);
                response.body.should.be.an('array').and.have.lengthOf(0);
                done();
            });
    });

    it('should FAIL to get an access_level and instead return a status 400 because the access_id param is not an integer', function (done) {
        chai.request(server)
            .get('/api/access-levels/1a')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
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

    it('should get the newly created single access_level by id', function (done) {
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
    
    it('should FAIL to POST a new access_level and return 2 errors because all 2 parameters are invalid', function (done) {
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
    
    // it('should update one of the just created new charge with these new parameters', function (done) {
    //     const paramsObj = {
    //         "charge_id": insertId,
    //         "res_room_id": 1200,
    //         "charge_type_id": 2,
    //         "charge_amount": 53.12,
    //         "taxable": 1
    //     };
    //     chai.request(server)
    //         .put('/api/charges')
    //         .send(paramsObj)
    //         .end(function (error, response) {
    //             response.should.have.status(204);
    //             done();
    //         });
    // });
    
    // it('should FAIL to update one of the just created new charge and return 5 errors because all 5 parameters are invalid', function (done) {
    //     const paramsObj = {
    //         "charge_id": 0,
    //         "res_room_id": 0,
    //         "charge_type_id": 0,
    //         "charge_amount": "a53.12",
    //         "taxable": 2
    //     };
    //     chai.request(server)
    //         .put('/api/charges')
    //         .send(paramsObj)
    //         .end(function (error, response) {
    //             response.should.have.status(400);
    //             response.body.should.be.an('object');
    //             response.body.should.have.property('message').and.to.be.a('string');
    //             response.body.should.have.property('errorArray').and.to.be.an('array').and.have.lengthOf(5);
    //             done();
    //         });
    // });

    // it('should FAIL to update one of the just created new charge and return an error object because id(s) are not integers', function (done) {
    //     const paramsObj = {
    //         "charge_id": 'a',
    //         "res_room_id": 'b',
    //         "charge_type_id": 'c',
    //         "charge_amount": 53.12,
    //         "taxable": 1
    //     };
    //     chai.request(server)
    //         .put('/api/charges')
    //         .send(paramsObj)
    //         .end(function (error, response) {
    //             response.should.have.status(400);
    //             response.body.should.be.an('object');
    //             response.body.should.have.property('message').and.to.be.a('string');
    //             done();
    //         });
    // });
    
    it('should FAIL to delete the newly created access_level because the access_id is invalid', function (done) {
        chai.request(server)
            .delete('/api/access-levels/0')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should FAIL to delete the newly created access_level because the access_id is not an integer', function (done) {
        chai.request(server)
            .delete('/api/access-levels/abc')
            .end(function (error, response) {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('message').and.to.be.a('string');
                done();
            });
    });
    
    it('should delete the newly created access_level using the insertId', function (done) {
        chai.request(server)
            .delete('/api/access-levels/' + insertId)
            .end(function (error, response) {
                response.should.have.status(204);
                done();
            });
    });
});
