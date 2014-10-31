(function ($, _) {
'use strict';

function clone (obj) {
    return _.clone(obj);
    // return _.extend({}, obj);
    // return $.extend({}, obj);
}

function deepClone(src) {
    var ret = ((src instanceof Array) ? [] : {});
    for (var key in src) {
        if (src.hasOwnProperty(key)) {
            var val = src[key];
            if (val && (typeof val) === 'object') {
                val = deepClone(val);
            }
            ret[key] = val;
        }
    }
    return ret;
}

var arr = [
    {
        "enb_id": "34017",
        "yyyymmddhh": "2014081900",
        "prb_usage": "0.333875",
        "active_user": "1.374875",
        "active_user2": "1.374875"
    },
    {
        "enb_id": "34017",
        "yyyymmddhh": "2014081901",
        "prb_usage": "0.778785714286",
        "active_user": "3.13278571429",
        "active_user2": "3.13278571429"
    },
    {
        "enb_id": "34017",
        "yyyymmddhh": "2014081902",
        "prb_usage": "0.2654",
        "active_user": "0.9244",
        "active_user2": "0.9244"
    }
];
var obj = {
    width: 960,
    height: 500,
    xAxis: {
        grid: true,
        label: 'PRB USAGE',
        map: 'x'
    },
    yAxis: {
        grid: true,
        label: 'ACTIVE USER',
        map: 'y'
    },
    radius: {
        map: 'size',
        range: [1, 80]
        // min: 1, max: 80
    },
    series: {
        map: 'year'
    },
    key: 'name',
    slider: {
        tickFormat: '%Hh'
    },
    tooltip: {
        format: function (d) {
            return JSON.stringify(d);
        }
    }
};

var copied;

console.log('origin arr:', arr);
copied = deepClone(arr);
copied[0].enb_id = 'testtesttesttesttest';
console.log('copied arr:', copied);

console.log('\n');

console.log('origin obj:', obj);
copied = deepClone(obj);
copied.tooltip.format = 'test';
console.log('copied obj:', copied);
})($, _);
