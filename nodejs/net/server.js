var net = require('net');

var server = net.createServer();
server.on('connection', function(client) {
    console.log('client connected.');

    client
        .on('readable', function() {
            console.log('Event: "readable"');
            var buf = client.read();

            if (buf) {
                var data = buf.toString();
                console.log('Recv[' + data.length + ']: ' + data);

                console.log('Echo: ' + data);
                client.write(data);
            }
        })
        .on('end', function() {
            console.log('Event: "end"');
            // The other end of the socket sends a FIN packet.
        })
        .on('error', function(exception) {
            console.log('Event: "error"');
            console.error(exception);
        })
        .on('drain', function() {
            console.log('Event: "drain"');
            // Write buffer is empty.
        })
        .on('close', function(had_error) {
            console.log('Event: "close"');
            if (had_error) {
                // The socket had a transmission error.
            }
        });
})
.listen(3030, function() {
    console.log('server listening: ' + 3030);
});
