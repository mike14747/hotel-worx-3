const agent = require('./utils/serverInit');

describe('Test authenticated routes', function () {
    const userCredentials = {
        "username": "admin",
        "password": process.env.TEST_ADMIN_PASSWORD
    };

    before(function (done) {
        setTimeout(() => {
            done();
        }, 1000);
    });

    const runTests = () => {
        require('./tests/accessLevelsAPI');
        require('./tests/chargesAPI');
        require('./tests/chargeTypesAPI');
        require('./tests/companiesAPI');
        require('./tests/customersAPI');
        require('./tests/paymentTypesAPI');
        require('./tests/roomsAPI');
        require('./tests/RoomTypesAPI');
        require('./tests/taxesAPI');
        require('./tests/usersAPI');
        require('./tests/cleanup');
    };

    it('should login a user, via POST', function (done) {
        agent
            .post('/api/auth/login')
            .send(userCredentials)
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.have.property('user').and.to.be.an('object');
                done();
            });
    });

    it('should check and see if the user is logged in', function (done) {
        agent
            .get('/api/auth/status')
            .end(function (error, response) {
                if (error) done(error);
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.have.property('user').and.to.be.an('object');
                if (response.status === 200) runTests();
                done();
            });
    });
});
