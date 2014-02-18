'use strict';
/**
*
*/
var filename = process.argv[2];
var crypto = require('crypto');
var fs = require('fs');

/**
*
*/
var shasum = crypto.createHash('md5');

var s = fs.ReadStream(filename);
s.on('data', function (chunk) {
    shasum.update(chunk);
});

s.on('end', function () {
    var d = shasum.digest('hex');
    console.log(d + '  ' + filename);
});
