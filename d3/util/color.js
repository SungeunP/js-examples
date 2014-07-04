/**
*
*/
'use strict';

console.log(d3.rgb(0, 30, 255));
console.log(d3.rgb(0, 30, 255));
console.log(d3.rgb("rgb(255,255,255)"));
console.log(d3.rgb("hsl(120,50%,20%)"));
console.log(d3.rgb("#ffeeaa"));
console.log(d3.rgb("#fea"));
console.log(d3.rgb("red"));

// test brighter
var colors = [];
for (var i=-2; i<=2; i+=0.05) {
    var rgb = d3.rgb('green');
    colors.push(rgb.brighter(i));
}

d3.select('tbody').append('tr').selectAll('td')
    .data(colors)
    .enter()
    .append('td')
    .style('background', function (d) {
        return d;
    })
    .text(function (d) {
        return d3.format('.2r')(d.hsl().l);
    });

// test darker
var colors2 = [];
for (var i=-2; i<=2; i+=0.05) {
    var rgb = d3.rgb('green');
    colors2.push(rgb.darker(i));
}

d3.select('tbody').append('tr').selectAll('td')
    .data(colors2)
    .enter()
    .append('td')
    .style('background', function (d) {
        return d;
    })
    .text(function (d) {
        return d3.format('.2r')(d.hsl().l);
    });
