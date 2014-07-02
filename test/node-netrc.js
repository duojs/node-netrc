/**
 * Module Dependencies
 */

var assert = require('assert');
var netrc = require('..');

/**
 * Tests
 */

describe('netrc', function() {

  it('should return a host', function() {
    var obj = netrc('api.github.com');
    assert(obj.password);
    assert(obj.login);
  })

  it('should return false if no host found', function() {
    assert(false == netrc('blah.com'));
  })

  it('should return all hosts if no host given', function() {
    var obj = netrc();
    assert(obj['api.github.com']);
    assert(obj['raw.github.com']);
  })

});
