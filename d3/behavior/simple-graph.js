/**
*
*/
/*
### SimpleGraph 기능 분석

* Drag on the canvas to translate/pan the graph.
마우스 드래그로 그래프 이동

* double-click on the canvas to zoom in
더블 클릭으로 zoom-in

* shift-double-click on the canvas to zoom out
shift + 더블 클릭으로 zoom-out

* ...
마우스 휠 버튼으로 zoom-in/out

* Drag on one of the X or Y axis numeric labels to re-scale that axis
x축, y축 드래그로 특정 축만 zoom-in/out

* click on a data point to select it
클릭으로 특정 데이터 포인트(circle) 선택

* drag a selected data point up or down to change it's Y value
선택된 데이터 포인트(circle)를 드래그로 y 값 변경

* enter the delete or backspace key to delete a selected data point
backspace 또는 delete 버튼으로 데이터 포인트(circlce) 삭제

* hold the ALT/Option key down and click an empty area of the graph to add a data point
alt + 클릭으로 해당 위치에 데이터 포인트(circle) 추가

※ 이 중 1~4번은 d3.behavior.zoom의 기능
*/

(function (d3) {
'use strict';

// ??
var registerKeyboardHandler = function(callback) {
  // var callback = callback;
  d3.select(window).on('keydown', callback);
};

// graph class
var SimpleGraph = function(elemid, options) {
  var self = this;

  var chart = this.chart = document.getElementById(elemid);
  // read element width/height
  var cx = this.cx = chart.clientWidth;
  var cy = this.cy = chart.clientHeight;

  // read option values
  // {
  //   'xmax': 60, 'xmin': 0,
  //   'ymax': 40, 'ymin': 0,
  //   ...
  // }
  this.options = options || {};
  this.options.xmax = options.xmax || 30;
  this.options.xmin = options.xmin || 0;
  this.options.ymax = options.ymax || 10;
  this.options.ymin = options.ymin || 0;
  options = this.options;

  var padding = this.padding = {
     'top':    (options.title)  ? 40 : 20,
     'right':                          30,
     'bottom': (options.xlabel) ? 60 : 10,
     'left':   (options.ylabel) ? 70 : 45
  };
  var size = this.size = {
    'width':  cx - padding.left - padding.right,
    'height': cy - padding.top  - padding.bottom
  };

  // x-scale
  var x = this.x = d3.scale.linear()
      .domain([options.xmin, options.xmax])
      .range([0, size.width]);

  // y-scale (inverted domain)
  var y = this.y = d3.scale.linear()
      .domain([options.ymax, options.ymin])
      .nice()
      .range([0, size.height])
      .nice();

  // drag x-axis logic
  this.downx = Math.NaN;
  // drag y-axis logic
  this.downy = Math.NaN;

  // dragged or selected point item
  this.dragged = this.selected = null;

  var line = this.line = d3.svg.line()
      // .x(function(d, i) { return this.x(this.points[i].x); })
      // .y(function(d, i) { return this.y(this.points[i].y); });
      .x(function(d) { return x(d.x); })
      .y(function(d) { return y(d.y); });

  var xrange =  (options.xmax - options.xmin),
      yrange2 = (options.ymax - options.ymin) / 2,
      yrange4 = yrange2 / 2,
      datacount = size.width / 30;

  // create data (random)
  var points = this.points = d3.range(datacount).map(function(i) { 
    return {
        x: i * xrange / datacount,
        y: options.ymin + yrange4 + Math.random() * yrange2
    };
  }, self);
  // console.log(points);

  // svg inner g element (layout)
  var vis = this.vis = d3.select(chart).append('svg')
      .attr('width',  cx)
      .attr('height', cy)
      .append('g')
          .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')');

  // create zoom instance
  this.zoom = d3.behavior.zoom()
      .x(x)
      .y(y)
      .on('zoom', this.redraw());
  // zoom & drag event element
  this.plot = vis.append('rect')
      .attr('width', size.width)
      .attr('height', size.height)
      // .style('fill', '#EEEEEE')
      .attr('pointer-events', 'all')
      .on('mousedown.drag', self.plot_drag())
      .on('touchstart.drag', self.plot_drag())
      .call(this.zoom);

  // inner svg??? why?
  // svg > g > svg.line > path.line
  vis.append('svg')
      .attr('class', 'line')
      .attr('top', 0)
      .attr('left', 0)
      .attr('width', size.width)
      .attr('height', size.height)
      .attr('viewBox', '0 0 ' + size.width + ' ' + size.height)
      .append('path')
          .attr('class', 'line')
          .attr('d', line(points));

  // add Chart Title
  if (options.title) {
    vis.append('text')
        .attr('class', 'axis')
        .text(options.title)
        .attr('x', size.width / 2)
        .attr('dy', '-0.8em')
        .style('text-anchor', 'middle');
  }

  // Add the x-axis label
  if (options.xlabel) {
    vis.append('text')
        .attr('class', 'axis')
        .text(options.xlabel)
        .attr('x', size.width / 2)
        .attr('y', size.height)
        .attr('dy', '2.4em')
        .style('text-anchor', 'middle');
  }

  // add y-axis label
  if (options.ylabel) {
    vis.append('g').append('text')
        .attr('class', 'axis')
        .text(options.ylabel)
        .style('text-anchor', 'middle')
        .attr('transform', 'translate(' + -40 + ' ' + size.height / 2 + ') rotate(-90)');
  }

  // set chart element(#chart) mouse events
  d3.select(chart)
      .on('mousemove.drag', self.mousemove())
      .on('touchmove.drag', self.mousemove())
      .on('mouseup.drag',   self.mouseup())
      .on('touchend.drag',  self.mouseup());

  // run draw
  this.redraw()();
};
// export
window.SimpleGraph = SimpleGraph;
  
//
// SimpleGraph methods
//
/**
*   rect에서 mouse drag 이벤트 발생시 호출
*   alt키와 조합시 그래프에 point 추가
*/
SimpleGraph.prototype.plot_drag = function() {
  var self = this;
  return function() {
    registerKeyboardHandler(self.keydown());

    // body에 style을 넣어야만 마우스가
    // chart 바깥으로 넘어갔을 때에도 cursor style이 유지된다.
    d3.select('body').style('cursor', 'move');

    // alt 키와 조합시 create point (data item)
    if (d3.event.altKey) {
      var p = d3.mouse(self.vis.node());
      var newpoint = {};

      // (0 <= p <= width or height)
      p[0] = Math.max(0, Math.min(self.size.width,  p[0]));
      p[1] = Math.max(0, Math.min(self.size.height, p[1]));
      // self.x(p) : domain -> range
      // self.x.invert(p): range -> domain
      newpoint.x = self.x.invert(p[0]);
      newpoint.y = self.y.invert(p[1]);

      // push data
      self.points.push(newpoint);
      self.points.sort(function(a, b) {
        if (a.x < b.x) { return -1; }
        if (a.x > b.x) { return  1; }
        return 0;
      });

      // select new point
      self.selected = newpoint;
      self.update();

      d3.event.preventDefault();
      d3.event.stopPropagation();
    }    
  };
};
/**
*   path, circle element에 한하여 업데이트를 수행
*   데이터(this.points)가 변경되었을 경우 호출
*/
SimpleGraph.prototype.update = function() {
  var self = this;
  // redraw path
  this.vis.select('path')
    .attr('d', this.line(this.points));
  
  // redraw circle
  var circle = this.vis.select('svg').selectAll('circle')
      // .data(this.points, function(d) { return d; });
      .data(this.points);

  // add data item, set circle attrs
  circle.enter().append('circle')
      .attr('class', function(d) { return (d === self.selected) ? 'selected' : null; })
      .attr('cx',    function(d) { return self.x(d.x); })
      .attr('cy',    function(d) { return self.y(d.y); })
      .attr('r', 10.0)
      .style('cursor', 'ns-resize')
      .on('mousedown.drag',  self.datapoint_drag())
      .on('touchstart.drag', self.datapoint_drag());

  // reset selected state
  circle
      .attr('class', function(d) { return (d === self.selected) ? 'selected' : null; })
      .attr('cx',    function(d) { 
        return self.x(d.x); })
      .attr('cy',    function(d) { return self.y(d.y); });

  // del data item, remove element
  circle.exit().remove();

  if (d3.event && d3.event.keyCode) {
    d3.event.preventDefault();
    d3.event.stopPropagation();
  }
};
/**
*   circle 위에서 drag 동작시 호출
*   해당 circle 데이터를 selected, dragged 멤버 변수 값으로 설정
*/
SimpleGraph.prototype.datapoint_drag = function() {
  var self = this;
  return function(d) {
    registerKeyboardHandler(self.keydown());

    document.onselectstart = function() { return false; };

    self.selected = self.dragged = d;
    self.update();
  };
};
/**
*   mousemove 이벤트 동작.
*   drag에 따른 redraw/update를 수행한다.
*/
SimpleGraph.prototype.mousemove = function() {
  var self = this;

  return function() {
    var p = d3.mouse(self.vis[0][0]),
        // never used...
        t = d3.event.changedTouches;

    // circle 하나를 선택(selected) & drag 시 동작
    if (self.dragged) {
      var pointY = Math.max(0, Math.min(self.size.height, p[1]));

      self.dragged.y = self.y.invert(pointY);
      self.update();
    }
    // x축에서 mousedown 이벤트가 시작된 경우
    if (!isNaN(self.downx)) {
      d3.select('body').style('cursor', 'ew-resize');

      var rupx = self.x.invert(p[0]),
          xaxis1 = self.x.domain()[0],
          xaxis2 = self.x.domain()[1],
          xextent = xaxis2 - xaxis1;

      if (rupx !== 0) {
        var changex, new_domain;
        changex = self.downx / rupx;
        new_domain = [xaxis1, xaxis1 + (xextent * changex)];

        self.x.domain(new_domain);
        self.redraw()();
      }

      d3.event.preventDefault();
      d3.event.stopPropagation();
    }
    // y축에서 mousedown 이벤트가 시작된 경우
    if (!isNaN(self.downy)) {
      d3.select('body').style('cursor', 'ns-resize');

      var rupy = self.y.invert(p[1]),
          yaxis1 = self.y.domain()[1],
          yaxis2 = self.y.domain()[0],
          yextent = yaxis2 - yaxis1;

      if (rupy !== 0) {
        var changey, new_domain;
        changey = self.downy / rupy;
        new_domain = [yaxis1 + (yextent * changey), yaxis1];

        self.y.domain(new_domain);
        self.redraw()();
      }

      d3.event.preventDefault();
      d3.event.stopPropagation();
    }
  };
};
/**
*   mouseup 이벤트 동작.
*   선택(selected)/변수 초기화 등을 수행
*/
SimpleGraph.prototype.mouseup = function() {
  var self = this;
  return function() {
    document.onselectstart = function() { return true; };

    d3.select('body').style('cursor', 'auto');
    // d3.select('body').style('cursor', 'auto');

    if (self.dragged) { 
      self.dragged = null;
    }

    if (!isNaN(self.downx)) {
      self.redraw()();
      self.downx = Math.NaN;

      d3.event.preventDefault();
      d3.event.stopPropagation();
    }

    if (!isNaN(self.downy)) {
      self.redraw()();
      self.downy = Math.NaN;

      d3.event.preventDefault();
      d3.event.stopPropagation();
    }
  };
};
/**
*   사용자의 키 입력 중 backspace와 delete 입력 처리
*   해당 키 입력시 선택한 원을 하나 삭제하고 그래프를 갱신한다.
*/
SimpleGraph.prototype.keydown = function() {
  var self = this;

  return function() {
    // no selected, nothing
    if (!self.selected) {
      return;
    }

    switch (d3.event.keyCode) {
      case 8: // backspace
      case 46: { // delete
        var i = self.points.indexOf(self.selected);
        // remove data item
        self.points.splice(i, 1);
        // before selected
        self.selected = self.points.length ? self.points[i > 0 ? i - 1 : 0] : null;
        // update element (path, circle)
        self.update();
        break;
      }
    }
  };
};
/**
*   zoom-in or scroll 동작시 호출
*   x축/y축 Regenerate 및 path/circle Regenerate(update 메서드 호출)
*/
SimpleGraph.prototype.redraw = function() {
  var self = this;

  return function() {
    var tx = function(d) { 
          return 'translate(' + self.x(d) + ',0)'; 
        },
        ty = function(d) { 
          return 'translate(0,' + self.y(d) + ')';
        },
        stroke = function(d) {
          // 축 값이 0 일 경우 선 강조 (짙은 회색)
          return (d) ? '#ccc' : '#666';
        },
        fx = self.x.tickFormat(10),
        fy = self.y.tickFormat(10);

    // Regenerate x-ticks…
    var gx = self.vis.selectAll('g.x')
        .data(self.x.ticks(10), String)
        .attr('transform', tx);

    gx.select('text')
        .text(fx);

    var gxe = gx.enter().insert('g', 'a')
        .attr('class', 'x')
        .attr('transform', tx);

    gxe.append('line')
        .attr('stroke', stroke)
        .attr('y1', 0)
        .attr('y2', self.size.height);

    gxe.append('text')
        .attr('class', 'axis')
        .attr('y', self.size.height)
        .attr('dy', '1em')
        .attr('text-anchor', 'middle')
        .text(fx)
        .style('cursor', 'ew-resize') // ↔
        .on('mouseover', function() { d3.select(this).style('font-weight', 'bold'); })
        .on('mouseout',  function() { d3.select(this).style('font-weight', 'normal'); })
        .on('mousedown.drag',  self.xaxis_drag())
        .on('touchstart.drag', self.xaxis_drag());

    gx.exit().remove();

    // Regenerate y-ticks…
    var gy = self.vis.selectAll('g.y')
        .data(self.y.ticks(10), String)
        .attr('transform', ty);

    gy.select('text')
        .text(fy);

    var gye = gy.enter().insert('g', 'a')
        .attr('class', 'y')
        .attr('transform', ty)
        .attr('background-fill', '#FFEEB6');

    gye.append('line')
        .attr('stroke', stroke)
        .attr('x1', 0)
        .attr('x2', self.size.width);

    gye.append('text')
        .attr('class', 'axis')
        .attr('x', -3)
        .attr('dy', '.35em')
        .attr('text-anchor', 'end')
        .text(fy)
        .style('cursor', 'ns-resize') // ↕
        .on('mouseover', function() { d3.select(this).style('font-weight', 'bold'); })
        .on('mouseout',  function() { d3.select(this).style('font-weight', 'normal'); })
        .on('mousedown.drag',  self.yaxis_drag())
        .on('touchstart.drag', self.yaxis_drag());

    gy.exit().remove();

    // self.plot.call(d3.behavior.zoom().x(self.x).y(self.y).on('zoom', self.redraw()));
    self.plot.call(self.zoom);
    self.update();
  };
};
/**
*   x축의 텍스트를 drag 하였을 때 호출
*   this.downx 값 설정, mousemove로 이어진다.
*/
SimpleGraph.prototype.xaxis_drag = function() {
  var self = this;
  return function() {
    document.onselectstart = function() { return false; };

    var p = d3.mouse(self.vis[0][0]);
    self.downx = self.x.invert(p[0]);
  };
};
/**
*   x축의 텍스트를 drag 하였을 때 호출
*   this.downy 값 설정, mousemove로 이어진다.
*/
SimpleGraph.prototype.yaxis_drag = function() {
  var self = this;
  return function() {
    document.onselectstart = function() { return false; };

    var p = d3.mouse(self.vis[0][0]);
    self.downy = self.y.invert(p[1]);
  };
};
})(window.d3);
