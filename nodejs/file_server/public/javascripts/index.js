$(function () {
    'use strict';

    $.get('/list', function (list) {
        var $ul = $('#list');
        var $lis = [];
        for (var i=0, l=list.length; i<l; i++) {
            var item = list[i],
                $li = $('<li></li>'),
                $a = $('<a></a>');
            $a.text(item).attr('href', '/download/' + encodeURIComponent(item));
            $lis.push($li.append($a));
        }
        $ul.append($lis);
    });
});
