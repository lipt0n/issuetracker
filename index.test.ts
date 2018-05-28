const _chai = require('chai')
const { expect } = _chai
_chai.use(require('chai-http'))
_chai.use(require('chai-like'))
_chai.use(require('chai-things'))
let srv
describe('basic rest test', function() {
    before(function(done) {
        srv = _chai.request.agent('http://localhost:9000')
        done()
    })
    it('should get /login', done => {
        srv.get('/login').end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('object')
            done()
        })
    })
    it('should get redirect / to /login', done => {
        srv.get('/')
            .redirects(0)
            .end((err, res) => {
                expect(res)
                    .to.have.status(302)
                    .and.header('Location', '/login')
                done()
            })
    })
    it('should redirect /api/new', done => {
        srv.post('/api/new')
            .redirects(0)
            .end((err, res) => {
                expect(res)
                    .to.have.status(302)
                    .and.header('Location', '/login')
                done()
            })
    })
    it('should redirect /api/changestatus', done => {
        srv.post('/api/changestatus')
            .redirects(0)
            .end((err, res) => {
                expect(res)
                    .to.have.status(302)
                    .and.header('Location', '/login')
                done()
            })
    })
    it('should redirect /api/issues', done => {
        srv.get('/api/issues')
            .redirects(0)
            .end((err, res) => {
                expect(res)
                    .to.have.status(302)
                    .and.header('Location', '/login')
                done()
            })
    })
    it('should fail to login without body', done => {
        srv.post('/api/login').end((err, res) => {
            expect(res).to.have.status(400)
            done()
        })
    })
    it('should fail to login with wrong password', done => {
        srv.post('/api/login')
            .type('json')
            .send({
                _method: 'post',
                password: 'passwd',
                username: 'user1',
            })
            .end((err, res) => {
                expect(res).to.have.status(401)
                done()
            })
    })
    it('should pass login', done => {
        srv.post('/api/login')
            .type('json')
            .send({
                _method: 'post',
                password: 'password',
                username: 'user1',
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body)
                    .to.be.a('object')
                    .like({ status: 'ok' })
                done()
            })
    })
    it('should not redirect / to /login', done => {
        srv.get('/')
            .redirects(0)
            .end((err, res) => {
                expect(res).to.not.have.status(302)
                done()
            })
    })
    it('should add new issue', done => {
        srv.post('/api/new')
            .type('json')
            .send({
                title: 'super title of super issue',
                description: 'lorem ipsum lorem lorem   ... lorem?',
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body)
                    .to.be.a('object')
                    .like({ status: 'ok' })
                done()
            })
    })
    it('should list issues', done => {
        srv.get('/api/issues').end((err, res) => {
            expect(res).to.have.status(200)
            done()
        })
    })
    it('should add issue list issues and change status twice', done => {
        srv.post('/api/new')
            .type('json')
            .send({
                title: 'something new',
                description: 'lorem ipsum lorem lorem   ... lorem?',
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                srv.get('/api/issues').end((err, res) => {
                    expect(res).to.have.status(200)
                    const newIssues = res.body.filter(i => i.status === 'open')
                    const _id = newIssues[0]._id
                    expect(_id).to.be.a('string')
                    srv.post('/api/changestatus')
                        .type('json')
                        .send({
                            _id,
                        })
                        .end((err, res) => {
                            expect(res).to.have.status(200)
                            expect(res.body)
                                .to.be.a('object')
                                .like({ status: 'ok' })
                            srv.get('/api/issues').end((err, res) => {
                                expect(res).to.have.status(200)
                                const myIssue = res.body.filter(i => i._id === _id)
                                expect(myIssue)
                                    .to.be.a('array')
                                    .with.length(1)
                                expect(myIssue[0].status).to.be.equal('pending')
                                srv.post('/api/changestatus')
                                    .type('json')
                                    .send({
                                        _id,
                                    })
                                    .end((err, res) => {
                                        expect(res).to.have.status(200)
                                        expect(res.body)
                                            .to.be.a('object')
                                            .like({ status: 'ok' })
                                        srv.get('/api/issues').end((err, res) => {
                                            expect(res).to.have.status(200)
                                            const myIssue = res.body.filter(i => i._id === _id)
                                            expect(myIssue)
                                                .to.be.a('array')
                                                .with.length(1)
                                            expect(myIssue[0].status).to.be.equal('closed')
                                            done()
                                        })
                                    })
                            })
                        })
                })
            })
    })
})
