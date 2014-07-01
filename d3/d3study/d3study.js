// 1. d3.select
{
    // var res1 = d3.select('p#result1').html("result1"); // <- 이방식도 된다.
    // var res1 = d3.select('p').html("처음 하나만 변한다"); // 처음 하나만 된다.
    d3.selectAll('p')
        .html("다 변한다");
    ///NOT: res1.html = "result1"; <- 이런방식은 안된다.

 

    d3.select('p')
        .classed("newClass", "새로운 클래스"); // 왜 ed가 붙었는지 모르겠지만, class 바꾸는 것 맞음

   // d3.select('p') .attr("background-color", "#FF35AA"); // 이런 방식으로 안된다. 왜냐면 attr이기 때문이다.

    d3.select('p#result3')
        .style("color", "#FF35AA"); //

    // attributes나 styles로 접근 불가능한 attr이 존재한다.(text field,value, checkbox,checked)
    // d3.select('input').property("checked", false);
    d3.select('input')
        .attr("checked", false);

    // text, html의 차이점은? 둘 다 제대로 동작하는데?
    // d3.selectAll('p').html("html로 바꿈");
    d3.selectAll('p')
        .text("text로 바꿈");

    // append 사용예
    d3.select('div')
        .append("svg")
        .append("svg:rect")
        .attr('width', 200)
        .attr('height', 300);

    var svg = d3.select('svg');
    svg.append("svg:circle")
        .attr('cx', 100)
        .attr('cy', 100)
        .attr('r', 30)
        .attr('class', 'c1');
    svg.append("svg:circle")
        .attr('cx', 200)
        .attr('cy', 200)
        .attr('r', 50)
        .attr('class', 'c2');

    ///NOT 밑의 방식으로 하면 동작하지 않는다.
    /*var c2 = d3.select('.c2');
    svg.insert("svg:rect", c2.node())
        .attr('width', 100)
        .attr('height', 200)
        .attr('top', 100)
        .attr('left', 100);*/

    // insert 사용예 - 어떻게 변하는지 확인해보자.
    // svg.insert("svg:rect", '.c1')
    svg.insert("svg:rect", '.c2')
    // svg.insert("svg:rect")
    .attr('width', 200)
        .attr('height', 200)
        .attr('x', 100)
        .attr('y', 100)
        .attr('rx', 10)
        .attr('ry', 10);

    // remove 사용예
    d3.select('.c2')
        .remove();
    // d3.select('div').append("svg");  

    // data 사용예
    var data = [1, 3, 5, 7, 9, 15];
    ///의문점: 먼저 selectAll할 때는 tr이 없다. 그런데 어떻게 select이 되는가?
    var tr = d3.select("body")
        .append("table")
        .selectAll("tr") // 제거해도 이 예제에서는 문제가 없다. 그러나 이것처럼 따로 할 때에는 없으면 문제가 생긴다.
        .data(data);
    tr.enter()
        .append("tr")
        .text(function(d) {
            return d + '입니다';
        });

    // exit 사용예 - 같은 것이 있는데 없어진다고 exit되는 것이 아니고, 데이터량이 본래 데이터보다 없을 경우 어떻게 처리할 지 정한다.
    tr.data([1, 3, 7])
        .exit()
    // tr.data([1,3,7,10,15]).exit()
    .text(function(d) {
        return 'exit' + d;
    });

    // filter 사용예 
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var tab = d3.select("body")
        .append("table")
        .selectAll("tr") // 제거해도 이 예제에서는 문제가 없다. 그러나 이것처럼 따로 할 때에는 없으면 문제가 생긴다.
        .data(data)
        .enter()
        .append("tr")
        .text(function(d) {
            return '필터예제' + d;
        });

    // var even = tab.filter(":nth-child(even)");
    var even = tab.filter(function(d, i) {
        return (d % 3) === 0
    });

    var tab = d3.select("body")
        .append("table")
        .selectAll("tr") // 제거해도 이 예제에서는 문제가 없다. 그러나 이것처럼 따로 할 때에는 없으면 문제가 생긴다.
        .data(even.data())
        .enter()
        .append("tr")
        .text(function(d) {
            return '필터링 : ' + d;
        });

    // datum 사용예 - 아직까지 data와 다른 점이 정확이 뭔지 모르겠지만, api 문서를 보면 아래와 같은 경우 유용하다고 한다.
    // "언제냐 하면 html5 custom data attributes에 접근할 경우 유용하다." - api문서
    // ㄴsort 사용도 같이
    d3.selectAll("#list li")
        .datum(function() {
            return this.dataset
        })
        .sort(function(a, b) {
            return d3.ascending(a.username, b.username);
        });

    // on 사용예 / event 사용예
    var tab = d3.selectAll("#list li")
        .on("mouseover", function(d) {
            d3.selectAll('tr')
                .html("마우스 지나갑니다 : " + d.username + d3.event);
        })
        .on("click", function(d) {
            var message = 'x : ' + d3.event.clientX + 'y : ' + d3.event.clientY + '위치에서 클릭되었습니다.';
            d3.selectAll('tr')
                .html(message);
        });

    // transition 사용예/ transform 사용예
    d3.selectAll('rect')
        .interrupt()
        .transition()
        .style("fill", "yellow")
        .style("stroke", "green")
        .attr("width", 250)
        .attr("height", 200)
        .attr("transform", "translate(200,0) rotate(45)") // scale도 가능.
    .duration(3000);


    // scale 사용예

    // linear
    var linear = d3.scale.linear()
        .domain([-100, 100])
        .range([0, 100]);
    var res = [];
    var i;
    for(i = -100; i <= 100; i = i + 10) {
        res.push(Math.round(linear(i)));
    }
    console.log('linear :\t' + res.join(',  '));

    // d3.scale.sqrt
    var sqrt = d3.scale.sqrt()
    .domain([-100, 100])
    .range([0, 100]);
      var res = [];
    var i;
    for(i = -100; i <= 100; i = i + 10) {
        res.push(Math.round(sqrt(i)));
    }
    console.log('sqrt :\t\t' + res.join(',  '));

     // d3.scale.pow
    var pow = d3.scale.pow()
    .exponent(3)
    // .exponent(0.1)
    .domain([-100, 100])
    .range([0, 100]);
      var res = [];
    var i;
    for(i = -100; i <= 100; i = i + 10) {
        res.push(Math.round(pow(i)));
    }
    console.log('pow :\t\t' + res.join(',  '));     

         // d3.scale.log
    var log = d3.scale.log()
    .base(1000)
    .domain([1, 100]) // domain이 -이면 안된다.
    .range([0, 100]);
      var res = [];
    var i;
    for(i = 1; i <= 200; i = i + 10) {
        res.push(Math.round(log(i)));
    }
    console.log('log :\t\t' + res.join(',  '));  

    // d3.scale.quantize - 모호한 경계를 몇가지 영역으로 나눌때 쓰면 요긴해 보인다.
    var quantize = d3.scale.quantize()
    .domain([-100, 100]) // domain은 number
    .range([0, 5, '수요일', '목요일']);
      var res = [];
    var i;
    for(i = -100; i <= 100; i = i + 10) {
        res.push(Math.round(quantize(i)));
    }
    console.log('quantize :\t' + res.join(',  '));  

    // d3.scale.quantile - 잘 모르겠다.
    var quantile = d3.scale.quantile()
    .domain([-100, 100]) // domain은 number
    .range([0, 5, 55, 100]);
      var res = [];
    var i;
    for(i = -100; i <= 100; i = i + 10) {
        res.push(Math.round(quantile(i)));
    }
    console.log('quantile :\t' + res.join(',  '));  

    // invert 예제
    var linear = d3.scale.linear()
        .domain([-100, 0])
        .range([0, 300]);
    var res = [];
    var i;
    for(i = 0; i <= 300; i = i + 10) {
        res.push(Math.round(linear.invert(i)));
    }
    console.log('linear invert :\t' + res.join(',  '));

        // rangeRound 예제
    var sqrt = d3.scale.sqrt()
    .domain([-100, 100])
    .range([0, 100.599205])
    // .rangeRound([0, 100.599205])
    ;
      var res = [];
    var i;
    for(i = -100; i <= 100; i = i + 10) {
        res.push(sqrt(i));
    }
    console.log('sqrt rangeRound:\t\t' + res.join(',  '));

    // clamp 예제 - 넘어가는 것이 고정된 다는 것을 보여준다.
    var sqrt = d3.scale.sqrt()
    .domain([-100, 100])
    .range([0, 100])
    .clamp(true)
    ;
    
    var res = [];
    var i;
    for(i = 80; i <= 120; i = i + 10) {
        res.push(sqrt(i));
    }
    console.log('sqrt clamp:\t' + res.join(',  '));

    // nice 예제
    var sqrt = d3.scale.sqrt()
    .domain([-100.123, 100.33576])
    .range([0, 100])
    // .nice([-100, 100])
    ;
    
    var res = [];
    var i;
    res.push(sqrt(-100));
    res.push(sqrt(0));
    res.push(sqrt(100));

    console.log('sqrt nice:\t' + res.join(',  '));

}