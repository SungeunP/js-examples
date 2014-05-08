/**
*
*/
'use strict';

var fs = require('fs'),
	path = require('path');

var Schema = require('protobuf').Schema,
    schema = new Schema(fs.readFileSync(path.join(__dirname, './simple.desc'))),
    Request = schema['com.mobigen.test.Request'],
    Response = schema['com.mobigen.test.Response'];

module.exports.Request = Request;
module.exports.Response = Response;
