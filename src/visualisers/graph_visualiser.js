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
    this.ctx.arc(node.value.pos.data[0], node.value.pos.data[1], 10.0, 0.0, 2.0 * Math.PI, true);
    this.ctx.closePath();
    this.ctx.stroke();
}

View.GraphVisualiser.prototype.render_edge = function(edge) {
    this.ctx.beginPath();
    var node_a_pos = edge.node_a.value.pos;
    var node_b_pos = edge.node_b.value.pos;
    this.ctx.moveTo(node_a_pos.data[0], node_a_pos.data[1]);
    this.ctx.lineTo(node_b_pos.data[0], node_b_pos.data[1]);
    this.ctx.stroke();
}

View.GraphVisualiser.prototype.render = function(graph) {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.width, this.height);

    for (var i=0; i<graph.nodes.length; ++i) {
        this.render_node(graph.nodes[i]);
    }

    for (var i=0; i<graph.edges.length; ++i) {
        this.render_edge(graph.edges[i]);
    }
}
