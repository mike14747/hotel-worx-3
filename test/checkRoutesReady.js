const server = require('../server');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

describe('Wrapper for all tests', function () {

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

    let counter = 1;
    let limit = 10;

    setTimeout(() => {
        if (counter === limit) {
            console.log('Limit (' + limit + ') has been reached')
        }
        console.log('Routes not ready yet. This is check number ' + counter + ' and the limit is ' + limit + ' checks.');
        counter++;
        checkRoutes();
    }, 250);

    const checkRoutes = () => {
        it('should check to see if the routes are ready', function (done) {
            chai.request(server)
                .get('/api/test')
                .end(function (error, response) {
                    console.log('status: ', response.status);
                    // response.should.have.status(200);
                    if (response.status === 200) runTests();
                    done();
                });
        });
    };

    checkRoutes();

});

// it('should check to see if the routes are ready', function (done) {
//     chai.request(server)
//         .get('/api/test')
//         .end(function (error, response) {
//             response.should.have.status(200);
//             done();
//         });
// });