
/**
 * Module Dependencies
 */

var netrc = require('netrc');
var path = require('path');
var fs = require('fs');
var env = process.env;

/**
 * Locals.
 */

var home = env.HOME || env.HOMEPATH;

/**
 * Exports.
 */

exports = module.exports = read;
exports.update = update;
exports.file = path.join(home, '.netrc');

/**
 * Read the contents of $HOME/.netrc. The default behavior is to return the
 * entire file's parsed contents. If a `host` is specified, it will only return
 * that host's config.
 *
 * @param {String} [host]
 * @return {Object}
 */

function read(host) {
  var hosts = netrc(exports.file);
  if (!host) return hosts;
  if (host in hosts) return hosts[host];
  return false;
}

/**
 * Update $HOME/.netrc to have the given `host` config (ie: `data`)
 *
 * NOTE: this reads from disk just before writing again, so it is a merge
 *       and not a full replacement!
 *
 * @param {String} host
 * @param {Object} data
 */

function update(host, data) {
  var hosts = netrc(exports.file);
  if (data) {
    hosts[host] = data;
  } else {
    delete hosts[host];
  }
  fs.writeFileSync(exports.file, netrc.format(hosts), 'utf8');
}
