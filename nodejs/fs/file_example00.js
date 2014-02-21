/**
*	폴더를 입력으로 주면 그 폴더의 내용을 출력하기
*/
var fs = require('fs'),
    path = require('path');

var filepath = process.argv[2];
if (!filepath) {
	console.error('usage: node ' + process.argv[1] + ' <filepath>');
	return;
}

// filepath: 파일을 실행할때 arg로 줄 것이다.
fs.readdir(filepath, function(err,files){
	if (err) { throw err; }
	files.forEach(function(file){
		console.log(file);
		var fullpath = path.join(filepath, file);
		// fs.stat(fullpath, function(err,stats){
		//	if (err) { throw err; }
		//	console.log(stats);
		//});
	});
});

