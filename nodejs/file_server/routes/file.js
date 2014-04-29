'use strict';
/*
 * GET users listing.
 */
var fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    async = require('async');

var multiparty = require('multiparty');
/**
*   init
*/
var DIR_PATH = './tmp';
process.env.TMPDIR = DIR_PATH;
fs.mkdir(DIR_PATH, function() {}); // ignore err

exports.list = function(req, res) {
    fs.readdir(DIR_PATH, function (err, list) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send(list);
    });
};

exports.upload = function(req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        // { upload: [ { name, path, ... }, ... ] }
        var fileInfos = _.values(files)[0];
        if (!fileInfos) {
            res.status(400).send('bad file upload.');
            return;
        }
        if (!_.isArray(fileInfos)) {
            fileInfos = [ fileInfos ];
        }

        async.eachSeries(fileInfos, function (info, cb) {
            fs.rename(info.path, path.join(DIR_PATH, info.originalFilename), cb);
        }, function (err) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.send('upload done.');
        });
    });
};

exports.download = function(req, res) {
    var filename = req.params.filename;

    res.set('Content-Disposition', 'attachment; filename="' + filename + '";');
    res.download(path.join(DIR_PATH, filename));
};
