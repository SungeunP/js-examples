(function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var raf;
    var running = true;
    var gravity = false;
    /**
    *   ball instance
    */
    var ball = {
        x: 100,
        y: 100,
        vx: 5,
        vy: 1,
        radius: 25,
        color: 'blue',
        init: function () {
            this.x = 100;
            this.y = 100;
            this.vx = 5;
            this.vy = 1;
        },
        draw: function() {
            var cWidth = canvas.width,
                cHeight = canvas.height,
                radius = this.radius;

            if (running) {
                if (this.x > cWidth - radius) {
                    this.x = cWidth - radius;
                }
                else if (this.x < radius) {
                    this.x = radius;
                }
                if (this.y > cHeight - radius) {
                    this.y = cHeight - radius;
                }
                else if (this.y < radius) {
                    this.y = radius;
                }
            }

            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2, true);
            ctx.closePath();

            ctx.fillStyle = this.color;
            ctx.fill();
        }
    };
    /**
    *   fns
    */
    function clear() {
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function draw() {
        var radius = ball.radius;

        // redraw
        clear();
        ball.draw();

        // move ball
        ball.y += ball.vy;
        ball.x += ball.vx;

        // calc vx, vy
        var afterY = ball.y + ball.vy;
        var afterX = ball.x + ball.vx;

        if (afterY > (canvas.height - radius) || afterY < radius) {
            ball.vy = -ball.vy;
        }
        if (afterX > (canvas.width - radius) || afterX < radius) {
            ball.vx = -ball.vx;
        }

        if (gravity) {
            ball.vx *= .999;

            ball.vy *= .99;
            ball.vy += .25;
        }

        if (Math.abs(ball.vx) > 0.01 || Math.abs(ball.vy) > 0.01) {
            raf = window.requestAnimationFrame(draw);
        }
    }
    /**
    *   events
    */
    canvas.addEventListener('mousemove', function(e) {
        if (!running) {
            clear();
            ball.x = e.layerX;
            ball.y = e.layerY;
            ball.draw();
        }
    });

    // canvas.addEventListener('mouseout', function(e) {
    //     window.cancelAnimationFrame(raf);
    //     running = false;
    // });
    /**
    *   start animation
    */
    ball.draw();

    function onbtnClick (e) {
        var type = e.target.textContent;
        
        switch (type) {
            case 'bounds':
                window.cancelAnimationFrame(raf);

                ball.init();
                gravity = false;
                running = true;

                raf = window.requestAnimationFrame(draw);
                break;
            case 'gravity':
                window.cancelAnimationFrame(raf);

                ball.init();
                gravity = true;
                running = true;

                raf = window.requestAnimationFrame(draw);
                break;
            case 'track mouse':
                window.cancelAnimationFrame(raf);

                running = false;
                break;
            case 'reset':
                window.cancelAnimationFrame(raf);

                clear();
                ball.init();
                ball.draw();
                running = true;
                break;
        }
    }

    var btns = document.getElementsByTagName('button');

    for (var i = btns.length - 1; i >= 0; i--) {
        btns[i].addEventListener('click', onbtnClick);
    };
})();
