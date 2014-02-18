var fs = require('fs');

var str = 'hello world!!';

fs.writeFile('temp.txt', str, 'utf8', function (err) {
	if (err) {
		throw err;
		return;
	}

	fs.readFile('temp.txt', 'utf8', function (err, data) {
		if (err) {
			throw err;
			return;
		}

		console.log(data);
	});
});
