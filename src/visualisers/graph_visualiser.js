var View = View || {}

View.GraphVisualiser = function(ctx, width, height) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.type = 'graphrenderer';
}

View.GraphVisualiser.prototype.render_node = function(node) {
    this.ctx.strokeStyle = "black";

    this.ctx.beginPath();
    this.ctx.arc(node.pos.data[0], node.pos.data[1], 10.0, 0.0, 2.0 * Math.PI, true);
    this.ctx.closePath();
    this.ctx.stroke();
}

View.GraphVisualiser.prototype.render = function(graph) {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.width, this.height);

    for (var i=0; i<graph.nodes.length; ++i) {
        this.render_node(graph.nodes[i]);
    }
}
