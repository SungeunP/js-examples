/**
 * https://github.com/dominictarr/split
 * Customize for Node.js v0.10
 *
 * - remove through module
    https://github.com/dominictarr/through/blob/master/index.js
 * - use stream.Duplex (StreamV2)
 *
 * @author nanhapark
 * @twitter @nanhapark
 * @hompage http://nodeqa.com
 */
var stream = require('stream'), fs = require('fs');
function split() {
  var soFar = '', matcher = '\n';
  //
  // use stream2, duplex
  //
  var dest = new stream.Duplex();
  dest._read = function(size) {};
  dest._write = function(chunk, encoding, cb) {
    var pieces = (soFar + chunk).split(matcher);
    soFar = pieces.pop();
    for (var i = 0; i < pieces.length; i++) {
      var piece = pieces[i];
      this.push(piece);
    }
    cb();
  };
  dest.end = function() {
    if (soFar)
      this.push(soFar);
  };
  return dest;
}
// fs.createReadStream(__filename)
//   .pipe(split())
//   .on('data', function (line) {
//     console.log(line.toString());
//   });
module.exports = split;
