/**
*
*/
'use strict';

var testArr = [
    ['# d3.split(array[, function])', 'test'],
    ['', 'test'],
    ['Splits the specified array into multiple arrays at breakpoints identified by the specified function. If no breakpoint function is specified, the array will be split at any null or undefined values, equivalent to the following function:', 'test'],
    ['', 'test'],
    ['function breakpoint(d) {', 'test'],
    ['  return d == null;', 'test'],
    ['}', 'test'],
    ['Elements that are identified as breakpoints, as by the function returning a truthy value, will not be included in the returned arrays. (In the future, a more general API might use a breakpoint function that takes two arguments and decides whether to split them, and also gives some indication as to whether to include those two values in the split arrays…)', 'test'],
    ['', 'test'],
    ['This method is often used in conjunction with the line shape, such that missing data points are elided; each contiguous slice of the array where the data is defined is rendered as a line segment.', 'test'],
];
console.log(d3.keys(d3));

// d3.split is undefined

console.log(d3.merge(testArr));

console.log(d3.range(1, -30, -2));
// 1, 3, 5, 7, 9, ...
// 1, 

var cols = ["site", "yield", "variety"],
	yields = [
		{ "site": 34, "variety": 32, "yield": 2 },
		{ "site": 2, "variety": 32, "yield": 2 },
		{ "site": 1, "variety": 54, "yield": 8 }
	];
var thead = d3.select('thead'),
	tbody = d3.select('tbody');

thead.selectAll('th').data(cols)
    .enter().append('th').text(function (d) { return d.toUpperCase(); });
tbody.selectAll('tr').data(yields)
    .enter().append('tr').selectAll('td').data(function (row) { return d3.permute(row, cols); })
        .enter().append('td').text(function (d) { return d; });

console.log(d3.zip(testArr));

