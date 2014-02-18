var spawn = require('child_process').spawn, 
	exec = require('child_process').exec;

var nodeVer = spawn('node', [ '-v' ]);
var pyVer = spawn('python', [ '-V']);

stdEvents(nodeVer);
stdEvents(pyVer);

// exec('unknown command', execCallback);
exec('cat *.js | wc -l', execCallback);

////////////////////////////// functions //////////////////////////////

function stdEvents (child) {
	child.stdout.on('data', function (chunk) {
		console.log(child.pid + ' stdout: ' + chunk.toString());
	});
	child.stderr.on('data', function (chunk) {
		console.error(child.pid + ' stderr: ' + chunk.toString());
	});

	child.on('exit', function (code) {
		console.log(child.pid + ' exit code: ' + code);
	});
}

function execCallback (error, stdout, stderr) {
	if (error) {
		throw error;
		return;
	}

	console.log('exec stdout: ' + stdout);
	console.error('exec stderr: ' + stderr);
}
