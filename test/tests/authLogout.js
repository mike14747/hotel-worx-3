const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.should();
chai.use(chaiHttp);

describe('Test cleanup', function () {
    it('should logout the user that was logged in during tests', function (done) {
        server.request.isAuthenticated = function () {
            return false;
        }
        chai.request(server)
            .get('/api/auth/logout')
            .end(function (error, response) {
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.have.property('user').and.to.be.null;
                done();
            });
    });
});