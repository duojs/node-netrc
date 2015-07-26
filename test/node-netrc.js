
/**
 * Module Dependencies
 */

var assert = require('assert');
var path = require('path');
var netrc = require('..');
var fs = require('fs');
var os = require('os');

var fixture = path.resolve.bind(path, __dirname, 'fixtures');
var tmp = path.resolve(os.tmpdir(), '.netrc');

/**
 * Tests
 */

describe('netrc([host])', function () {
  var defaultFile = netrc.file;

  afterEach(function () {
    netrc.file = defaultFile;
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  });

  it('should return a host', function () {
    netrc.file = fixture('simple');

    var obj = netrc('api.github.com');

    assert(obj.password);
    assert(obj.login);
  });

  it('should return false if no host found', function () {
    netrc.file = fixture('simple');

    var obj = netrc('blah.com');

    assert.strictEqual(obj, false);
  });

  it('should return all hosts if no host given', function () {
    netrc.file = fixture('complex');

    var obj = netrc();

    assert.deepEqual(obj, {
      'api.github.com': {
        login: 'user1',
        password: 'pass1'
      },
      'raw.github.com': {
        login: 'user2',
        password: 'pass2'
      }
    });
  });

  it('should return an empty object', function () {
    netrc.file = fixture('empty');

    var obj = netrc();

    assert.deepEqual(obj, {});
  });

  describe('.update(host, data)', function () {
    it('should write to the given file', function () {
      netrc.file = tmp;
      netrc.update('api.github.com', { password: 'abc123' });
      assert.strictEqual(netrc('api.github.com').password, 'abc123');
    });

    it('should add to the file', function () {
      // copy fixture file to tmp dir
      fs.writeFileSync(tmp, fs.readFileSync(fixture('simple')), 'utf8');

      // write to the tmp file
      netrc.file = tmp;
      netrc.update('raw.github.com', { password: 'abc123' });

      assert.deepEqual(netrc(), {
        'api.github.com': {
          login: 'user',
          password: 'pass'
        },
        'raw.github.com': {
          password: 'abc123'
        }
      });
    });

    it('should merge with the file', function () {
      // copy fixture file to tmp dir
      fs.writeFileSync(tmp, fs.readFileSync(fixture('complex')), 'utf8');

      // write to the tmp file
      netrc.file = tmp;
      netrc.update('raw.github.com', { password: 'abc123' });

      assert.deepEqual(netrc(), {
        'api.github.com': {
          login: 'user1',
          password: 'pass1'
        },
        'raw.github.com': {
          password: 'abc123'
        }
      });
    });

    it('should delete the given host', function () {
      // copy fixture file to tmp dir
      fs.writeFileSync(tmp, fs.readFileSync(fixture('complex')), 'utf8');

      // write to the tmp file
      netrc.file = tmp;
      netrc.update('raw.github.com');

      assert.deepEqual(netrc(), {
        'api.github.com': {
          login: 'user1',
          password: 'pass1'
        }
      });
    });
  });

  describe('.file', function () {
    var home = process.env.HOME || process.env.HOMEPATH;

    it('should be in the home directory', function () {
      assert.equal(netrc.file, path.join(home, '.netrc'));
    });
  });
});
