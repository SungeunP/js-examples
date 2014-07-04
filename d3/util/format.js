/**
*
*/
'use strict';

var appendVal = function (format, value) {
    var tr = d3.select('table#str').select('tbody').append('tr');
    tr.append('th').text(format);
    tr.append('td').text(value);
    tr.append('td').text(d3.format(format)(value));
};
var appendTime = function (format, value) {
    var tr = d3.select('table#time').select('tbody').append('tr');
    tr.append('th').text(format);
    tr.append('td').text(d3.time.format('%Y/%m/%d %X')(value));
    tr.append('td').text(d3.time.format(format)(value));
};

appendVal('02d', 1);
appendVal('+d', 4);
appendVal('.5f', Math.PI);
appendVal('e', Math.pow(2, 10));
appendVal('.5g', Math.PI);
appendVal('.5r', Math.PI);
appendVal('.2%', 0.2554);
appendVal('2s', Math.pow(10, 10));
appendVal('2s', Math.pow(10, 10));

/**
*   time formatting
*/

var now = new Date();

appendTime('%a', now); // abbreviated weekday name.
appendTime('%A', now); // full weekday name.
appendTime('%b', now); // abbreviated month name.
appendTime('%B', now); // full month name.
appendTime('%c', now); // date and time, as "%a %b %e %H:%M:%S %Y".
appendTime('%d', now); // zero-padded day of the month as a decimal number [01,31].
appendTime('%e', now); // space-padded day of the month as a decimal number [ 1,31]; equivalent to %_d.
appendTime('%H', now); // hour (24-hour clock) as a decimal number [00,23].
appendTime('%I', now); // hour (12-hour clock) as a decimal number [01,12].
appendTime('%j', now); // day of the year as a decimal number [001,366].
appendTime('%m', now); // month as a decimal number [01,12].
appendTime('%M', now); // minute as a decimal number [00,59].
appendTime('%p', now); // either AM or PM.
appendTime('%S', now); // second as a decimal number [00,61].
appendTime('%U', now); // week number of the year (Sunday as the first day of the week) as a decimal number [00,53].
appendTime('%w', now); // weekday as a decimal number [0(Sunday),6].
appendTime('%W', now); // week number of the year (Monday as the first day of the week) as a decimal number [00,53].
appendTime('%x', now); // date, as "%m/%d/%y".
appendTime('%X', now); // time, as "%H:%M:%S".
appendTime('%y', now); // year without century as a decimal number [00,99].
appendTime('%Y', now); // year with century as a decimal number.
appendTime('%Z', now); // time zone offset, such as "-0700".
appendTime('%%', now); // a literal "%" character.


var parseDate = d3.time.format("%d-%b-%y").parse;
var d = '30-Apr-12';

console.log(parseDate(d));
