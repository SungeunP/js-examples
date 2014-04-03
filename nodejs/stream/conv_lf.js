/**
*   Transform Class
*/
var util = require('util');
var Transform = require('stream').Transform;

function ConvLF (options) {
    Transform.call(this, options);
}
util.inherits(ConvLF, Transform);

ConvLF.prototype._transform = function (chunk, encoding, done) {
    this.push(chunk.toString().split('\r\n').join('\n'));
    done();
};
/**
*   Module dependencies
*/
var fs = require('fs'),
    path = require('path'),
    _ = require('underscore');
/**
*   process arguments
*/
if (process.argv.length < 3) {
    console.error(['usage: node', path.basename(__filename, '.js'), '<filepath>' ].join(' '));
    process.exit();
}

var filePath = process.argv[2];
    tempPath = filePath + '.tmp';
/**
*   run
*/
var rsFile = fs.createReadStream(filePath),
    wsTemp = fs.createWriteStream(tempPath),
    clf = new ConvLF();

rsFile.pipe(clf).pipe(wsTemp);

wsTemp.once('finish', function () {
    var rs = fs.createReadStream(tempPath),
        ws = fs.createWriteStream(filePath);

    rs.pipe(ws);
    ws.once('finish', function () {
        fs.unlink(tempPath, function (err) {
            if (err) {
                throw err;
            }

            console.log('converted(CRLF to LF):', filePath);
        });
    });
});
