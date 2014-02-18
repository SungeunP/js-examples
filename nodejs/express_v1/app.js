
global.rootpath = __dirname;

/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.argv[2] || 3030);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

var routes = require('./routes');

app.get('/', routes.index);

// get line
var exec = require('child_process').exec;
app.get('/document/:filename/:linenum', function (req, res) {
	var filename = req.params.filename,
		linenum = req.params.linenum;

	var filepath = path.join('docs', filename);
	var child = exec('node ../example/2w', function (error, stdout, stderr) {
		if (error || stderr) {
			res.status(400).send(error || stderr);
			return;
		}

		res.send(stdout);
	});
	child.stdin.write(filepath + ',' + linenum);
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
