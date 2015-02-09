(function () {
    'use strict';

    var el = document.getElementById('canvas1');
    var context = el.getContext('2d');

    if (!context) {
        console.log('getContext is failed.');
        return;
    }

    var cell = {
        size: {
            width: 1,
            height: 1
        }
    };
    var width = el.clientWidth;
    var height = el.clientHeight;
    var widthCount = width / cell.size.width;
    var heightCount = height / cell.size.height;
    /**
    *
    */
    function draw () {
        var i = 0,
            j = 0;

        while (j < heightCount * cell.size.height) {
            while (i < widthCount * cell.size.width) {
                // random color
                context.fillStyle = '#FF' + ~~(Math.random() * 100) + '00';
                context.moveTo(i, j);

                i += cell.size.width;
                context.fillRect(i, j, cell.size.width, cell.size.height);
            }

            i = 0;
            j += cell.size.height;
        }
    }

    // run
    draw();
    // redraw
    setInterval(draw, 3000);
})();
