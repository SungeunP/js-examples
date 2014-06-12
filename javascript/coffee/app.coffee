'use scrict'

# crach prevention
_ = require 'underscore'

process.on 'uncaughtException', (err) =>
	console.error 'Uncaught Exception ==='
	console.error err.stack
	console.log _.keys @fire

###
	Module dependencies.
###
express = require 'express'
http = require 'http'
fs = require 'fs'
path = require 'path'
###
	Global variables
###
global.REQUEST_TIMEOUT_MS = 10000

# value
global.config = require './config'
global.version = config.version

# path
global.rootPath = path.join __dirname, '..'


#
#
MemoryStore = express.session.MemoryStore
global.sessionStore = new MemoryStore()
global.moduleConfig = {}
global.logger = require path.join rootPath, 'util/logger'
global = _.extend global, require path.join rootPath, 'util/common'


fs.mkdir tmpPath, () ->


#
fs.readFile (path.join rootPath, 'version.txt'), 'utf8', (err, data) ->
	if err
		logger.warning err
		return
	global.version = data.split '-'
		.slice 0, 1
		.join '-'

#
_.each fs.readdirSync (path.join modulePath, 'apps'), (dir) ->
	targetPath = path.join modulePath, 'apps', dir
	mConfig = readJSONSync path.join targetPath, 'config.json'

	_.each mConfig.modules, (module, name) ->
		cmd = module.command
		mpath = module.module_path
		mtimeout = module.timeout

		module.command = replaceEnv config.module.command_alias[cmd] || cmd
		return

	global.moduleConfig[dir] = 
		http: mConfig.http

if 'development' is app.get 'env'
	app.use express.errorHandler()


app.get '/test', session.test

app.get '/mobigen/*', routes.mobigen


child.autoRoutes app, session.check

###
	Web Server Listening
###
server = http.createServer app
	.listen (app.get 'port'), () ->
		port = app.get 'port'
		logger.notice "Http Server listening on port #{port}";

############################## websocket server ##############################

MSocketServer = require './lib/mserver'

socketServer = new MSocketServer()

socketServer.listen server

############################## module manager ##############################

ChildManager = require './lib/child_manager'

global.childManager = new ChildManager()

############################## server exit ##############################

exec = require 'child_process'
	.exec

process.once 'SIGINT', () ->
	async.parallel [
		(cb) ->
			logger.notice 'all child process exiting.....'
			childManager.destroy cb
		,
		(cb) ->
			logger.notice 'remote cache files.....'
			child.destroy cb
		,
		(cb) ->
			logger.notice "remove #{tmpPath} ....."
			exec "rm -rf #{tmpPath}", cb
	], (err) ->
		if err
			logger.error err

		process.exit 0

