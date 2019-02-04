var Social = require('../lib/Social');
var chai = require("chai");
var expect = chai.expect;
var assert = chai.assert;
var sinon = require('sinon');
var chaiAsPromised = require('chai-as-promised');  // 5.0.1
chai.use(chaiAsPromised);


describe('Social', function () {

  var url = '1269';

  afterEach(function () {
    Social.callAPI.restore()
  });

  it('should getTwitterCount function', function(){
    expect(Social.getTwitterCount).to.be.a('function')
  });

  it('should have twitter url', function () {
    expect(Social).to.have.property('twitter_url')
  });

  it('should have facebook url', function () {
    expect(Social).to.have.property('facebook_url')
  });

  // Spy (work...)
  it('should call API', function () {
    sinon.spy(Social, 'callAPI')
    Social.getTwitterCount(url);
    expect(Social.callAPI.withArgs(Social.twitter_url + url).calledOnce).to.be.true
    Social.callAPI.restore()
  });


  it('should return count', function (done) {
    Social.getTwitterCount(url).then(function (numFound) {
      expect(numFound).to.be.equal(1269);
      done()
    });
  });

  it('should return promise', function () {
    var stub = sinon.stub(Social, 'callAPI');
    var Promise = require('promise');
    stub.returns(new Promise(function (resolve, reject) {
      resolve({response: {numFound: 151269}})
    }));

    Social.getTwitterCount(url).then(function (numFound) {
      expect(numFound).to.be.equal(1);
    });

  });


  // stub - It's OK (work)
  it('should return chaiAsPromised', function (done) {
    var stub = sinon.stub(Social, 'callAPI');
    stub.resolves({response: {numFound: 1269}});
    expect(Social.getTwitterCount(url)).to.eventually.be.equal(1269).notify(done);
  });

  // mock - It's OK (work)
  it('should return mocks', function (done) {
    var mock = sinon.mock(Social);
    mock.expects('callAPI')
      .once()
      .withArgs(Social.twitter_url + url)
      .resolves({response: {numFound: 1269}})
    expect(Social.getTwitterCount(url)).to.eventually.be.equal(1269).notify(done);    // mock.verify();
    // mock.restore()
    // mock.verify()
  });


});
