var Percentage = require('../lib/Percentage');
require('chai').should(); //actually call the function
var assert = require("chai").assert;
var expect = require('chai').expect;


describe('Multiplication', function(){
  it('should work', function(){
    var x = 5;
    assert.equal(2*x, 10, 'Success')
  });
});

describe('Percentage', function(){
  it('should give an evolution', function(){
    Percentage.evolution(100,200).should.be.equal(100)
  });

  it('should handle 0 evolution', function(){
    assert.equal(Percentage.evolution(0,100), Infinity);
  });

  it('should undefined', function(){
    expect(Percentage.wait).to.be.a('function')
  });

  it('should await', function(done){
    Percentage.wait(30, function (test) {
      assert.equal(test, 18)
      done()
    })
  });

});