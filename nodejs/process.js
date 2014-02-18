process
	.on('exit', function (code) {
		console.log('exit code: ' + code);
	})
	.on('uncaughtException', function (exception) {
		console.error(exception.stack || exception.toString());
	});

// throw new Error('raise errors');

// Signal Events
process
	.on('SIGINT', function() {
		console.log('Got SIGINT.  Press Control-D to exit.');
	});

process.stdout.write('hello process.stdout!!\n');
process.stderr.write('hello process.stderr!!\n');

process.stdin.resume();
process.stdin.on('data', function (chunk) {
	console.log('stdin: ' + chunk.toString());
});

console.log(process.argv);
console.log(process.execPath);
console.log(process.execArgv);

console.log(process.cwd());
// console.log(process.env);

console.log(process.version);
console.log(process.versions);
// console.log(process.config);

setTimeout(function () {
	process.kill(process.pid, 'SIGINT');
}, 5000);

console.log(process.pid);
console.log(process.title);
console.log(process.arch);
console.log(process.platform);

console.log(process.memoryUsage());
console.log(process.uptime());
console.log(process.hrtime());