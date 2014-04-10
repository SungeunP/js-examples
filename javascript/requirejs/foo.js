define([ './bar.js' ], function (barFn) {
	return {
		test: 'hello world',
		bar: barFn
	};
});