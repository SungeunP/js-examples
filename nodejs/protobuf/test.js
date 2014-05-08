/**
*
*/
'use strict';

var fs = require('fs');

var Simple = require('./simple');

var packet = {
    type: 0,
    message: 'test pb',
    array: [ 1, 3, 55, 2, 462 ] /*_.range(10)*/
};

try {
	var serialized = Simple.Request.serialize(packet);
	// console.log('serialized:', serialized);
}
catch (e) {
	console.error(e);
}

if (!serialized) {
	return;
}

fs.writeFile('./packet.dat', serialized, function (err) {
	if (err) {
		throw err;
		return;
	}

	fs.readFile('./packet.dat', function (err, data) {
		try {
			var parsed = Simple.Request.parse(data);
			console.log('parsed: ', parsed);
		}
		catch (e) {
			console.error(e);
		}
	});
});
