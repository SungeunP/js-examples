    // 좌표축 유념하시기 바랍니다.
    // 우리가 일상적으로 익숙한 좌표축으로 변경합니다. [0, height]가 아닌 [height, 0]으로 변경
    function d3text(svg, string) {
        svg.append("text")
            .attr("x", "200")
            .attr("y", "400")
            .attr("font-size", "50")
            .style("fill-opacity", '1.0')
            .style("fill", "black")
            .text(string);
    }

    function addCanvas() {
        var svg = d3.select('body')
            .append("svg")
            .style("background-color", '#bbb')
            .style("fill-opacity", '0.0')
            .attr("width", width)
            .attr("height", height);
        return svg;
    }

    function addline(svg, func, input) {
        var line = d3.svg.line()
            .x(function(d) {
                return d;
            })
            .y(function(d) {
                return func(d);
            });

        svg.append("path")
            .datum(input)
            .style("stroke-opacity", 1)
            .style("stroke", "blue")
            .style("stroke-width", 2)
            .attr("d", line);
    }

    // config
    var width = 500,
        height = 500;
    var domain = [0, width];
    var range = [height , 0];
    var svg = addCanvas();
    // 데이터는 리니어 하게 만들자.(input)
    var input = [];
    for (var i = 0; i <= width; i = i + 10) {
        input.push(i);
    }

    // scale 사용예

    // linear
    var linear = d3.scale.linear()
        .domain(domain)
        .range(range);
    var res = [];
    var i;
    for (i = -100; i <= 100; i = i + 10) {
        res.push(linear(i));
    }
    console.log('linear :\t' + res.join(',  '));

    addline(svg, linear, input);
    d3text(svg, "linear");

    var svg = addCanvas();

    // d3.scale.sqrt
    var sqrt = d3.scale.sqrt()
        .domain(domain)
        .range(range);

    var res = [];
    var i;
    for (i = -100; i <= 100; i = i + 10) {
        res.push(Math.round(sqrt(i)));
    }
    console.log('sqrt :\t\t' + res.join(',  '));

    addline(svg, sqrt, input);
    d3text(svg, "sqrt");

    // d3.scale.pow
    var pow = d3.scale.pow()
        .exponent(3)
        // .exponent(0.1)
        .domain(domain)
        .range(range);
    var res = [];
    var i;
    for (i = 0; i <= 100; i = i + 1) {
        res.push(Math.round(pow(i)));
    }
    console.log('pow :\t\t' + res.join(',  '));
    var svg = addCanvas();
    addline(svg, pow, input);
    d3text(svg, "pow");

    // d3.scale.log
    var log = d3.scale.log()
        .base(2)
        .domain([1, width]) // domain이 -, 0이면 안된다.
        .range(range);
    var res = [];
    var i;
    for (i = 1.009; i <= width; i = i + 1) {
        res.push(Math.round(log(i)));
    }
    console.log('log :\t\t' + res.join(',  '));
    // log는 도메인 조심!
    var svg = addCanvas();
    addline(svg, log, res);
    d3text(svg, "log");

    // d3.scale.quantize - 모호한 경계를 몇가지 영역으로 나눌때 쓰면 요긴해 보인다.
    var quantize = d3.scale.quantize()
        .domain(domain) // domain은 number
        .range([ height / 5 * 4, height / 5 * 3, height / 5 * 2, height / 5 * 1, 0]);
    var res = [];
    var i;
    for (i = 0; i <= width; i = i + 10) {
        res.push(quantize(i));
    }
    console.log('quantize :\t' + res.join(',  '));
    var svg = addCanvas();
    addline(svg, quantize, input);
    d3text(svg, "quantize");

    // d3.scale.quantile - 잘 모르겠다.
    var quantile = d3.scale.quantile()
        .domain(domain) // domain은 number
        .range([ height / 5 * 4, height / 5 * 3, height / 5 * 2, height / 5 * 1, 0]);
        // .range([0, height / 5, height / 5 * 2, height / 5 * 3, height / 5 * 4]);
    var res = [];
    var i;
    for (i = -100; i <= 100; i = i + 10) {
        res.push(Math.round(quantile(i)));
    }
    console.log('quantile :\t' + res.join(',  '));
    var svg = addCanvas();
    addline(svg, quantile, input);
    d3text(svg, "quantile");

    // invert 예제
    var linear = d3.scale.linear()
        .domain([-100, 0])
        .range([0, 300]);
    var res = [];
    var i;
    for (i = 0; i <= 300; i = i + 10) {
        res.push(Math.round(linear.invert(i)));
    }
    console.log('linear invert :\t' + res.join(',  '));

    // rangeRound 예제
    var sqrt = d3.scale.sqrt()
        .domain([-100, 100])
        // .range([0, 100.599205])
        .rangeRound([0, 100.599205]);
    var res = [];
    var i;
    for (i = -100; i <= 100; i = i + 10) {
        res.push(sqrt(i));
    }
    console.log('sqrt rangeRound:\t\t' + res.join(',  '));

    // clamp 예제 - 넘어가는 것이 고정된 다는 것을 보여준다.
    var sqrt = d3.scale.sqrt()
        .domain([-100, 100])
        .range([0, 100])
        .clamp(true);

    var res = [];
    var i;
    for (i = 80; i <= 120; i = i + 10) {
        res.push(sqrt(i));
    }
    console.log('sqrt clamp:\t' + res.join(',  '));

    // nice 예제
    var sqrt = d3.scale.sqrt()
        // .domain([-100.123, 100.33576])
        .range([0, 100])
        .nice([-100.12124, 100]);

    var res = [];
    var i;
    res.push(sqrt(-100));
    res.push(sqrt(0));
    res.push(sqrt(100));

    console.log('sqrt nice:\t' + res.join(',  '));

    // ticks 예제
    var linear = d3.scale.linear()
        .domain([-100, 100])
        .range([0, 50.599205])
        .ticks(9); // <- linear는 이제 array 그리고 한글 사이트에 번역이 잘못 되어 있다. 10배수 이야기가 아니다.
    console.log('linear ticks:\t\t' + linear.join(',  '));

    // tickFormat 예제
    var linear = d3.scale.linear()
        .domain([-100, 100])
        .range([0, 50.599205])
        .tickFormat(10, ".1f");
    var res = [];
    var i;
    for (i = 80; i <= 120; i = i + 10) {
        res.push(linear(i));
    }
    console.log('sqrt tickFormat:\t' + res.join(',  '));

    // d3.scale.threshold 잘 모르겠다.
    var identity = d3.scale.identity()
        .domain([0, 90])
        .range([0, 40]);
    var res = [];
    var i;
    for (i = -1; i <= 40; i = i + 1) {
        res.push(identity(i));
    }
    console.log('identity :\t\t' + res.join(',  '));

    // d3.scale.threshold 잘 모르겠다.
    var threshold = d3.scale.threshold()
        .domain([width/3, width/3*2])
        .range([0, 250, 500]);
    var res = [];
    var i;
    for (i = -1; i <= 40; i = i + 0.234) {
        res.push(threshold(i));
    }
    console.log('threshold :\t\t' + res.join(',  '));

    var svg = addCanvas();
    addline(svg, threshold, input);
    d3text(svg, "threshold");