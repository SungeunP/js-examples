/**
*   Global variable
*/

global.rootpath = __dirname;

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.argv[2] || 3030);
app.set('views', __dirname + '/public');
app.locals.basedir = __dirname + '/public';
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
// app.get('/views/*', routes.views);
app.get('/view/*', routes.appView);

app.get('/document/appList', user.appList);
app.get('/document/apps', user.apps);

var testCRUD = require('./routes/test_crud');
app.post('/document/node', testCRUD.create);
app.get('/document/node/:nid?', testCRUD.read);
app.put('/document/node/:nid', testCRUD.update);
app.del('/document/node/:nid', testCRUD.delete);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
