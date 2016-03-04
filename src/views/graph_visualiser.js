var View = View || {}

View.GraphVisNode = function(node) {
    this.node = node;
    this.pos = M.Vector(0.0, 0.0, 0.0);
}

View.GraphVisualiser = function(ctx, width, height) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.type = 'graphrenderer';
}

View.GraphVisualiser.prototype.render = function(graph, graph_data) {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.strokeStyle = "black";

    this.ctx.beginPath();
    this.ctx.arc(this.width / 2, this.height / 2, 10.0, 0.0, 2.0 * Math.PI, true);
    this.ctx.closePath();
    this.ctx.stroke();
}
