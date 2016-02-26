var View = View || {}

View.AlgoChartData = function() {
    this.type = 'chartdata';
    this.focus = null;
}

View.AlgoChartData.prototype.set_focus = function(idx) {
    this.focus = { 'idx': idx };
}

View.AlgoChartData.prototype.unset_focus = function(idx) {
    this.focus = null;
}

View.AlgoChartData.prototype.handle_swap = function(a_idx, b_idx) {
    if (this.focus !== null) {
        if (a_idx == this.focus['idx']) {
            this.focus['idx'] = b_idx;
        }
        else if (b_idx == this.focus['idx']) {
            this.focus['idx'] = a_idx;
        }
    }
}

View.AlgoChartData.set_focus_handler = function () {
    return new Ops.ObjHandler(View.AlgoChartData.prototype.set_focus, 
                            View.AlgoChartData.prototype.unset_focus);
}

View.AlgoChartData.unset_focus_handler = function () { 
    return new Ops.ObjHandler(View.AlgoChartData.prototype.unset_focus, 
                            View.AlgoChartData.prototype.set_focus);
}

View.AlgoChartData.swap_handler = function () {
    return new Ops.ObjHandler(View.AlgoChartData.prototype.handle_swap, 
                            View.AlgoChartData.prototype.handle_swap);    
}

View.AlgoChart = function(ctx, width, height) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.type = 'algochart';
    this.bar_sep_width = 5;
}

View.AlgoChart.prototype.render_bar = function(x_offset, val, style) {
    this.ctx.fillStyle = style;
    var height = (val / this.max_val) * this.height;
    var top = this.height - height;
    this.ctx.fillRect(x_offset, top, this.bar_width, height);
}

View.AlgoChart.prototype.render = function(seq, chart_data) {
    this.max_val = Math.max.apply(null, seq);
    var sep_space = this.bar_sep_width * (seq.length);
    this.bar_width = (this.width - sep_space) / seq.length;
    this.data = seq;

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.width, this.height);

    var x = this.bar_sep_width / 2;

    for (var i=0; i<this.data.length; ++i){
        if (chart_data.focus != null && i === chart_data.focus['idx'])
            this.render_bar(x, this.data[i], 'red');
        else
            this.render_bar(x, this.data[i], 'grey');
        x += this.bar_width + this.bar_sep_width;
    } 
}


