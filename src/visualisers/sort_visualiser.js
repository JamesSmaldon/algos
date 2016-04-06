define(['utils/func_utils',
        'utils/data_utils',
        'data_structs/operations'], function(fu, DU, Ops) {
    var SortVisData = function(seq_len) {
        this.type = 'chartdata';
        this.focus = null; 
        this.index_map = fu.range(0, seq_len);
        this.finished = fu.repeat(seq_len, false);
    }

    SortVisData.prototype.set_focus = function(idx) {
        this.focus = idx;
    }

    SortVisData.prototype.unset_focus = function(idx) {
        this.focus = null;
    }

    SortVisData.prototype.set_finished = function(idx) {
        this.finished[idx] = true;
    }

    SortVisData.prototype.set_unfinished = function(idx) {
        this.finished[idx] = false; 
    }

    SortVisData.prototype.handle_swap = function(a_idx, b_idx) {
        DU.swap(this.index_map, a_idx, b_idx);
    }

    SortVisData.set_focus_handler = function () {
        return new Ops.ObjHandler(SortVisData.prototype.set_focus, 
                                SortVisData.prototype.unset_focus);
    }

    SortVisData.unset_focus_handler = function () { 
        return new Ops.ObjHandler(SortVisData.prototype.unset_focus, 
                                SortVisData.prototype.set_focus);
    }

    SortVisData.swap_handler = function () {
        return new Ops.ObjHandler(SortVisData.prototype.handle_swap, 
                                SortVisData.prototype.handle_swap);    
    }

    SortVisData.finished_handler = function () {
        return new Ops.ObjHandler(SortVisData.prototype.set_finished,
                                    SortVisData.prototype.set_unfinished);
    }

    SortVis = function(ctx, width, height) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.type = 'algochart';
        this.bar_sep_width = 5;
    }

    SortVis.prototype.render_bar = function(x_offset, val, style) {
        this.ctx.fillStyle = style;
        var height = (val / this.max_val) * this.height;
        var top = this.height - height;
        this.ctx.fillRect(x_offset, top, this.bar_width, height);
    }

    SortVis.prototype.render = function(seq, chart_data) {
        this.max_val = Math.max.apply(null, seq);
        var sep_space = this.bar_sep_width * (seq.length);
        this.bar_width = (this.width - sep_space) / seq.length;
        this.data = seq;

        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.height);

        var x = this.bar_sep_width / 2;

        for (var i=0; i<this.data.length; ++i){
            colour = 'grey';

            if (seq[i] == i)
                colour = 'green';

            if (chart_data.focus != null)
            {
                var fidx = chart_data.index_map[i];   
                if (fidx == chart_data.focus)
                    colour = 'red';
            } 

            this.render_bar(x, this.data[i], colour);
            x += this.bar_width + this.bar_sep_width;
        } 
    }

    return {
        SortVisData: SortVisData,
        SortVis: SortVis
    }
});
