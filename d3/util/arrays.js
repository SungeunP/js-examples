/**
*
*/
'use strict';

var arrNum = [];
for (var i=0; i<21; i++) {
    arrNum.push(Math.round(Math.random()*100+1));
}
var arrObj = [];
for (var i=0; i<21; i++) {
    arrObj.push({ index: i, value: arrNum[i] });
}

var trHeader = d3.select('tr#header');
trHeader.append('td');
trHeader.selectAll('th')
    .data(arrNum)
    .enter()
    .append('th')
    .text(function (d, i) { return i+''; });

var appendSet = function (id, arr) {
    var tr = d3.select('tbody').append('tr').attr('id', id);
    tr.append('th').text(id);
    tr.selectAll('td')
        .data(arr)
      .enter()
        .append('td')
        .text(function (d) { return d; });
};

var appendVal = function (id, val) {
    var tr = d3.select('tbody').append('tr').attr('id', id);
    tr.append('th').text(id);
    tr.append('td')
        .text(val);
};

appendSet('origin', arrNum);
appendSet('sort', arrNum.sort());
appendSet('sort_ascending', arrNum.sort(d3.ascending));
appendSet('sort_descending', arrNum.sort(d3.descending));

// for domain or range
appendVal('min', d3.min(arrObj, function (d) { return d.value; }));
appendVal('max', d3.max(arrObj, function (d) { return d.value; }));
appendVal('extent', JSON.stringify(d3.extent(arrObj, function (d) { return d.value; })));
appendVal('sum', d3.sum(arrObj, function (d) { return d.value; }));
appendVal('mean', d3.mean(arrObj, function (d) { return d.value; }));
appendVal('median', d3.median(arrObj, function (d) { return d.value; }));

var sortedNum = arrNum.sort(d3.ascending);
appendVal('quantile_1per4', d3.quantile(sortedNum, 0.25));
appendVal('quantile_2per4', d3.quantile(sortedNum, 0.5));
appendVal('quantile_3per4', d3.quantile(sortedNum, 0.75));

// for splice
appendVal('bisectLeft', d3.bisectLeft(arrNum, arrNum[12]));
appendVal('bisect', d3.bisect(arrNum, arrNum[12]));
appendVal('bisectRight', d3.bisectRight(arrNum, arrNum[12]));

appendSet('shuffle_before', sortedNum);
appendSet('shuffle_after', d3.shuffle(sortedNum));

// d3.first is undefined
// d3.last is undefined

console.log(d3.keys(d3));
console.log(d3.values(arrObj[0]));
console.log(d3.entries(arrNum));
