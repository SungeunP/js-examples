'use strict';
var el = document.getElementById('canvas1');
var cell = {};
cell.size = {width: 1, height: 1};

var context = el.getContext('2d');

if (!context) {
    console.log('그릴 수 없다.');
}

var widthCount = 700 / cell.size.width;
var heightCount = 700 / cell.size.height;
var i = 0 , j = 0;
while(j < heightCount*cell.size.height) {
    while(i < widthCount*cell.size.width) {
        context.fillStyle = "#FF" + ~~(Math.random() * 100) + "00";
        context.moveTo(i,j);
        i += cell.size.width;
        context.fillRect(i,j, cell.size.width, cell.size.height);

    }
    i = 0;
    j += cell.size.height;
}



