/**
*
*/
var path = require('path'),
    _ = require('underscore');

var winston = require('winston');
/**
*   simple
*/
winston.log('info', 'Hello distributed log files!');
winston.info('Hello again distributed logs');
/**
*   diff console.log
*/
console.log('------------------------------');

console.log('winston.transports', _.keys(winston.transports));
winston.log('info', 'winston.transports', _.keys(winston.transports));
/**
*   instance
*/
var logLv = process.argv[2] || 'error';

var logger = new (winston.Logger)({
    transports: [
        // Console transport 추가
        new (winston.transports.Console)({
            level: logLv,
            json: false,
            colorize: true,
            prettyPrint: true
        }),

        // File transport 추가
        new (winston.transports.File)({
            // filename property 지정
            level: logLv,
            filename: path.join(__dirname, './out.log'),
            // maxsize: 9999900, // 약 9.5 MB
            maxsize: 1024,
            maxFiles: 10,
            json: false,
            prettyPrint: false,
            timestamp: true
        })
    ],

    exceptionHandlers: [
        // File transport 추가
        new (winston.transports.File)({
            filename: path.join(__dirname, './err.log'),
            // maxsize: 9999900, // 약 9.5 MB
            maxsize: 1024,
            maxFiles: 10,
            json: false,
            prettyPrint: true
        })
    ]
});

var levels = _.clone(winston.config.syslog.levels);
// invert number
var num = _.size(levels);
for (var k in levels) {
    levels[k] = --num;
}
logger.setLevels(levels);

console.log('------------------------------');

console.log('log level:', logLv);
logger.debug('debug log');
logger.info('info log');
logger.notice('notice log');
logger.warning('warning log');
logger.error('error log');
logger.crit('crit log');
logger.alert('alert log');
logger.emerg('emerg log');


console.log('------------------------------');

// setInterval(function () {
//     logger.debug('test Logrolling ' + Math.random());
// }, 50);
