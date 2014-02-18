console.log('before work');
workSomething(function (err, message) {
	console.log('after work');

	if (err) {
		throw err;
		return;
	}

	console.log(message);
});

function workSomething (callback) {
	var nSec = (Math.random() * 10) + 1;

	setTimeout(function () {
		callback(null, 'work is done.');
	}, nSec*1000);
}
