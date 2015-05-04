var alasql = require('alasql');

var db = new alasql.Database();

db.exec('CREATE TABLE test(one INT, two INT)');

db.tables.test.data = [
	{one: 3, two: 4},
	{one: 5, two: 6}
]

var test = db.exec('SELECT * FROM test');

console.log('원본: ', alasql('SELECT * FROM ?', [test]), '\n');

console.log('쿼리: SELECT * FROM test ORDER BY two DESC')
console.log('결과: ', db.exec('SELECT * FROM test ORDER BY two DESC'), '\n');

db.exec('SELECT * FROM test', function(data) {
	console.log(data);
})

console.log('data push: {one: 7, two: 8}');
db.tables.test.data.push({one: 7, two: 8});

console.log('결과: ', db.exec('SELECT * FROM test'), '\n');

console.log('쿼리: INSERT INTO test VALUES(9, 10)');
db.exec('INSERT INTO test VALUES(9, 10)');

console.log('결과: ', db.exec('SELECT * FROM test'), '\n');

var data  = [{a:1, b: 1}, {a:2, b:2}, {a:3, b:3}, {a:4, b:4}];
console.log('원본: ', data);
console.log('쿼리: SELECT * FROM data WHERE a >= 3')
console.log('결과: ', alasql('SELECT * FROM ? WHERE a >= ?', [data, 3]), '\n');

alasql('SELECT * INTO CSV("data.csv", {headers:true}) FROM ?', [data]);

var apollo=[];
alasql('SELECT * INTO ? FROM CSV("apollo.csv", {headers:true}) WHERE enb_id = ?', [apollo, 74786]);
setTimeout(function() {
	console.log(alasql('SELECT * FROM ?', [apollo]));
}, 1000);



