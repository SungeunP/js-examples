var fs = require('fs');

var str = 'hello world!!';
var filePath = './temp2.txt';

var ws = fs.createWriteStream(filePath);

ws.on('open', function () {
	console.log('open: "' + filePath + '"');

	ws.write(str);
	ws.end();
})
.on('close', function () {
	console.log('close: "' + filePath + '"');

	var rs = fs.createReadStream(filePath);
	rs.on('readable', function () {
		var buf = rs.read();

		if (buf) {
			console.log('read "' + filePath + '": ' + buf.toString());
		}
	});
});
