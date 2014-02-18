var Socket = require('net').Socket;

var localhost = '127.0.0.1'
  , localport = '3030';

var socket = new Socket();

socket
	.on('readable', function () {
		console.log('Event: "readable"');
		var buf = socket.read();

		if (buf) {
			var data = buf.toString();
			console.log('Recv[' + data.length + ']: ' + data);
		}
		socket.end();
	})
	.on('end', function () {
		console.log('Event: "end"');
		// The other end of the socket sends a FIN packet.
	})
	.on('error', function (exception) {
		console.log('Event: "error"');
		console.error(exception);
	})
	.on('drain', function () {
		console.log('Event: "drain"');
		// Write buffer is empty.
	})
	.on('close', function (had_error) {
		console.log('Event: "close"');
		if (had_error) {
			// The socket had a transmission error.
		}
	})
	.connect(localport, localhost, function () {
		console.log('connect success.');

		socket.write('Hello TCP Socket!!');
	});