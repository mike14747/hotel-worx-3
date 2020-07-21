describe('Delay the tests.', function () {
    before(done => setTimeout(done, 500));

    it('should delay starting tests by 1 second', function (done) {
        done();
    });
});
