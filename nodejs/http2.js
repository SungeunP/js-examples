var http = require('http');

var data = JSON.stringify({
	filename: 'http.md',
	contents: '# test express'
});

var options = {
	hostname: '127.0.0.1',
	port: 3030,
	path: '/docs',
	method: 'POST',
	headers: {
		'Content-Type': 'application/json;',
		'Content-Length': Buffer.byteLength(data)
	}
};

var req = http.request(options, function(res) {
	console.log('STATUS: ' + res.statusCode);
	// console.log('HEADERS: ' + JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data', function (chunk) {
		console.log('BODY: ' + chunk);
	});
});

req.on('error', function(e) {
	console.log('problem with request: ' + e.message);
});

// write data to request body
req.end(data);
