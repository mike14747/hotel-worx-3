const server = require('../server');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

describe('Wrapper for all tests', function () {
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
        require('./tests/authLogout');
    };

    const authenticate = () => {
        describe('Authenticate a user in order to run tests on the /api routes', function () {
            it('should logout any user that might be logged in', async function () {
                const response = await chai.request(server).get('/api/auth/logout');
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.have.property('user').and.to.be.null;
            });
            it('should login a user, via POST', async function () {
                const paramsObj = {
                    "username": "admin",
                    "password": process.env.TEST_ADMIN_PASSWORD
                };
                const response = await chai.request(server).post('/api/auth/login').send(paramsObj);
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.have.property('user').and.to.be.an('object');
                if (response.status === 200) {
                    server.request.isAuthenticated = function () {
                        return true;
                    }
                    runTests();
                }
            });
        });
    };

    it('should check to see if the routes are ready', async function () {
        const response = await chai.request(server).get('/api/test');
        if (response.status === 200) authenticate();
        response.should.have.status(200);
    });
});