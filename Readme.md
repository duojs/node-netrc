
# node-netrc

[![npm version](https://img.shields.io/npm/v/node-netrc.svg)](https://npmjs.org/package/node-netrc)
[![build status](https://img.shields.io/travis/duojs/node-netrc.svg)](https://travis-ci.org/duojs/node-netrc)

> Higher-level `~/.netrc` parser


## Example

```js
var netrc = require('node-netrc');

// read auth from ~/.netrc
var auth = netrc('api.github.com');
auth.login // ...
auth.password // ...

// merge new config into ~/.netrc
netrc.update('api.github.com', {
  login: 'user',
  password: 'pass'
});
```


## API

### netrc([host])

Return the `login` and `password` details of `host`. Or return `false`.

If no `host`, return all the hosts.

### netrc.update(host, data)

Updates the netrc with the given `data` for `host`. (`data` usually contains
`login` and `password`, but any given props will be written)

If `data` is empty, the given `host` will be removed from the file.

**NOTE:** this method merges data with what is already in place, it will **not**
affect any other hosts.


## Testing

```sh
npm install
make test
```


## License

(The MIT License)

Copyright (c) 2014 Matthew Mueller &lt;mattmuelle@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
