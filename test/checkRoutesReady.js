const server = require('../server');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

describe('Wrapper for all tests', function () {
    before(done => setTimeout(done, 1000));

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
    };

    const checkRoutes = () => {
        it('should check to see if the routes are ready', function (done) {
            chai.request(server)
                .get('/api/test')
                .end(function (error, response) {
                    response.should.have.status(200);
                    if (response.status === 200) runTests();
                    done();
                });
        });
    };

    checkRoutes();

});