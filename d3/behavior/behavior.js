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
            .attr("height", height)
            .append("svg");
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

    // drag 예제
    var drag = d3.behavior.drag()
        // .origin([10, 10])
        .on("drag", dragging);

    t.call(drag);

    function dragging(argument) {
        console.log("dragging");
        t.attr('x', d3.event.x)
            .attr('y', d3.event.y);
        console.log(drag.origin());

    }

    var ci = svg.append('circle')
        .attr("cx", 25)
        .attr("cy", 25)
        .attr("r", 20)
        .style("background-color", 'purple')
        .style("fill", "purple");

    // zoom 예제
    var zoom = d3.behavior.zoom()
        .scaleExtent([0.3, 5])
        .on('zoom', zooming);

    svg.call(zoom);

    function zooming() {
        console.log(d3.event);
        ci.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        // ci.attr("transform", "scale(" + d3.event.scale + ")");
        console.log(zoom.translate());
        console.log(zoom.scale());
    }