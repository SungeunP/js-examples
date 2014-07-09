    // 좌표축 유념하시기 바랍니다.
    // 우리가 일상적으로 익숙한 좌표축으로 변경합니다. [0, height]가 아닌 [height, 0]으로 변경
    function d3text(svg, string) {
        var text = svg.append("text")
            .attr("x", "200")
            .attr("y", "400")
            .attr("font-size", "50")
            .style("fill-opacity", '1.0')
            .style("fill", "black")
            .text(string);
        return text;
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

        var path = svg.append("path")
            .datum(input)
            .style("stroke-opacity", 1)
            .style("stroke", "blue")
            .style("stroke-width", 2)
            .attr("d", line);

        return path;
    }

    // config
    var width = 500,
        height = 500;
    var domain = [0, width];
    var range = [height, 0];
    // 데이터는 리니어 하게 만들자.(input)
    var input = [];
    for (var i = 0; i <= width; i = i + 10) {
        input.push(i);
    }

    var linear = d3.scale.linear()
        .domain(domain)
        .range(range);
    var svg = addCanvas();
    addline(svg, linear, input);
    var t = d3text(svg, "linear");

    // transition style, attr 예제
    svg.transition()
        .duration(2000)
        .style("background-color", '#000')
        .attr("width", "10"); // width 안된다.

    // delay 예제
    t.transition()
        .delay(1000)
        .duration(3000)
        .attr("font-size", "80")
        .style("fill", "green");

    // d3.scale.sqrt
    var sqrt = d3.scale.sqrt()
        .domain(domain)
        .range(range);
    var svg = addCanvas();
    var p = addline(svg, sqrt, input);
    var t = d3text(svg, "sqrt");

    // remove - 끝난뒤 엘리먼트 제거 
    p.transition()
        .duration(5000)
        .ease("bounce")
    // .style("stroke-opacity", 1)
    .style("stroke", "red")
        .style("stroke-width", 30)
        .remove();

    t.transition()
        .attr("x", "20")
        .attr("y", "100");
        
    // 
    // d3.scale.pow
    var pow = d3.scale.pow()
        .exponent(3)
        // .exponent(0.1)
        .domain(domain)
        .range(range);

    var svg = addCanvas();
    addline(svg, pow, input);
    d3text(svg, "pow");