
import chai from 'chai';
const {expect} = chai;

describe('test1', function() {
  this.timeout(10000);

  before(function(done) {
    setTimeout(() => {
      done();
    }, 2000); 
  });

  it('#a', () => {
    expect(1).to.be.a('number');
  });
});
