const agent = require('../utils/serverInit');

describe('Test cleanup', function () {
    it('should logout the user that was logged in during tests', function (done) {
        agent
            .get('/api/auth/logout')
            .end(function (error, response) {
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.have.property('user').and.to.be.null;
                done();
            });
    });

    after(function (done) {
        agent.close();
        done();
    });
});