
/*
 * GET users listing.
 */

var fs = require('fs'),
    path = require('path'),
    _ = require('underscore');

exports.appList = function (req, res) {
    var target = req.params.target;

    var dirpath = path.join(rootpath, 'public/apps')

    fs.readdir(dirpath, function (err, files) {
        if (err) {
            res.status(500).send(err.stack || err.toString());
            return;
        }

        files = _.filter(files, function (file) {
            return path.extname(file) === '.jade';
        });

        var list = _.map(files, function (file) {
            var bname = path.basename(file, '.jade');

            return { name: bname, url: '#/' + bname };
        });

        res.send(list);
    });
};

exports.apps = function (req, res) {
    readApps(function (err, infos) {
        if (err) {
            res.status(500).send(err.stack || err.toString());
            return;
        }

        res.send(infos);
    });
};

//////////////////////////////////// functions ////////////////////////////////////

function readApps (callback) {
    fs.readdir(path.join(rootpath, 'public/apps'), function (err, files) {
        if (err) {
            return callback(err);
        }

        files = _.filter(files, function (file) {
            return file[0] !== '_';
        });

        var jsfiles = _.filter(files, function (file) {
            return path.extname(file) === '.js';
        });

        var appInfos = _.map(jsfiles, function (filename) {
            var bname = path.basename(filename, '.js');

            return {
                app: bname + 'App',
                file: path.join('apps', bname),
                routes: {
                    routeUrl: '/' + bname,
                    templateUrl: path.join('view', 'apps', bname)
                }
            };
        });

        callback(null, {
            apps: _.pluck(appInfos, 'app'),
            files: _.pluck(appInfos, 'file'),
            routes: _.pluck(appInfos, 'routes')
        });
    });
}
