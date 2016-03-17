var View = View || {}

View.LineGraph = function(canvas, width, height, f, df, x_start, x_end, n_samples) {
    this.canvas = canvas;
    this.canvas_rect = new M.Rect(0, 0, width, height);
    this.ctx = canvas.getContext('2d');
    this.f = f;
    this.df = df;
    this.x_start = x_start;
    this.x_end = x_end;
    this.n_samples = n_samples;    
    this.mouse_x_pos = null;
    this.func_rect = this.calc_function_bounds();
    this.render();
}

View.LineGraph.prototype.handle_mouse_move = function(e) {
    var rect = this.canvas.getBoundingClientRect();
    this.mouse_x_pos = e.clientX - rect.left;
    this.render();
}

View.LineGraph.prototype.calc_function_bounds = function() {
    var maxy = 0.0;
    var miny = Number.MAX_VALUE;
    var xrange = this.x_end - this.x_start;
    var inc = xrange / this.n_samples;
    var func_bounds = new M.Rect(this.x_start, 0.0, xrange, 0.0);

    for (var i=this.x_start; i<=this.x_end; i+=inc) {
        var y = this.f(i);
        if (!isFinite(y))
            throw "Got infinity for value: " + i;

        if (y > maxy)
            maxy = y;
        if (y < miny)
            miny = y;
    }

    func_bounds.y = miny;
    func_bounds.height = maxy - miny;

    return func_bounds;
}

View.LineGraph.prototype.handle_mouse_out = function(e) {
    this.mouse_x_pos = null; 
    this.render();
}

View.LineGraph.prototype.render = function() {
    this.ctx.clearRect(0,0,this.canvas_rect.width, this.canvas_rect.height);

    var samples = [];
    var inc = this.func_rect.width / this.n_samples;

    var zero = new M.Vector(0.0, 0.0);
    var canvas_zero = this.canvas_rect.map(zero, this.func_rect);

    if (canvas_zero.data[1] >= 0.0) {
        var y = this.canvas_rect.height - canvas_zero.data[1];
        this.ctx.beginPath();
        this.ctx.moveTo(0.0, y);
        this.ctx.strokeStyle = 'blue';
        this.ctx.lineTo(this.canvas_rect.width, y);
        this.ctx.stroke();
    }

    if (canvas_zero.data[0] >= 0.0) {
        var x = canvas_zero.data[0];

        this.ctx.beginPath();
        this.ctx.moveTo(x, 0.0);
        this.ctx.strokeStyle = 'blue';
        this.ctx.lineTo(x, this.canvas_rect.height);
        this.ctx.stroke();
    }

    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();

    var sample_rect = new M.Rect(0, 0, this.n_samples, 0);

    for (var i=0; i<this.n_samples; ++i) {
        var x = this.func_rect.map(new M.Vector(i, 0), sample_rect); 
        var y = this.f(x.data[0]);

        var canv_pos = this.canvas_rect.map(new M.Vector(x.data[0],y), this.func_rect);
        this.ctx.lineTo(canv_pos.data[0], this.canvas_rect.height - canv_pos.data[1]);
    }
     
    this.ctx.stroke();

    if (this.mouse_x_pos !== null) {

        var half_grad_len = this.func_rect.width * 0.1 * 0.5;

        var func_coord = this.func_rect.map(new M.Vector(this.mouse_x_pos, 0.0), this.canvas_rect);
        func_coord.data[1] = this.f(func_coord.data[0]);

        var grad = this.df(func_coord.data[0]);
        var dy = half_grad_len * grad;

        var start = this.canvas_rect.map(func_coord.add(new M.Vector(-half_grad_len, -dy)), this.func_rect); 
        var middle = this.canvas_rect.map(func_coord, this.func_rect);
        var end = this.canvas_rect.map(func_coord.add(new M.Vector(half_grad_len, dy)), this.func_rect);


        this.ctx.strokeStyle = 'red';
        this.ctx.beginPath(); 
        var unit = end.sub(middle).unit();
        start = unit.scale(100).add(middle);
        end = unit.scale(-100).add(middle);

        this.ctx.moveTo(start.data[0], this.canvas_rect.height - start.data[1]);
        this.ctx.lineTo(end.data[0], this.canvas_rect.height - end.data[1]);
        this.ctx.stroke();

        this.ctx.font = "10px Ariel";
        this.ctx.fillStyle = "green";
        this.ctx.fillText("x: " + func_coord.data[0].toFixed(2), middle.data[0] + 30, this.canvas_rect.height - middle.data[1]);
        this.ctx.fillText("y: " + func_coord.data[1].toFixed(2), middle.data[0] + 30, this.canvas_rect.height - middle.data[1]+10);
        this.ctx.fillText("dy/dx: " + dy.toFixed(2), middle.data[0] + 30, this.canvas_rect.height - middle.data[1]+20);

        this.ctx.beginPath();
        this.ctx.arc(middle.data[0], this.canvas_rect.height - middle.data[1], 5, 0, 2.0 * Math.PI);
        this.ctx.fill();
    }
}
