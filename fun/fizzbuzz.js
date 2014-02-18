var puts = process.stdout.write.bind(process.stdout);

for (var i=1; i<=100; i++) {
    var bThree = (i % 3 === 0 || i.toString().indexOf('3') !== -1)
      , bFive  = (i % 5 === 0 || i.toString().indexOf('5') !== -1);

    puts(i + ': ');
    bThree && puts('Fizz');
    bFive && puts('Buzz');
    puts('\n');
}
