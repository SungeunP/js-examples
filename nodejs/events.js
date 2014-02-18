var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

var eventName = 'something';

console.log('\n:::::test on method:::::');

// add listener
emitter.on(eventName, function (arg1, arg2) {
	console.log('\nEvent "' + eventName + '"');

	console.log('arg1: ' + arg1);
	console.log('arg2: ' + arg2);
});

emitter.emit(eventName, 'hello', 'world');
emitter.emit(eventName, 'foo');
emitter.emit(eventName, null, 'bar');

emitter.removeAllListeners(eventName);	// off
emitter.emit(eventName, 'zoo');

console.log('\n:::::test once method:::::');

// add listener
emitter.once(eventName, function (arg1, arg2) {
	console.log('\nEvent "' + eventName + '"');

	console.log('arg1: ' + arg1);
	console.log('arg2: ' + arg2);
});

emitter.emit(eventName, 'hello', 'world');
emitter.emit(eventName, 'foo');
emitter.emit(eventName, null, 'bar');
