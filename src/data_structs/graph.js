var DU = DU || {};

DU.Node = function(value) {
    this.value = value;
    this.edges = [];
}

DU.Node.prototype.add_edge(edge) {
    this.edges.push(edge);
}

DU.Edge = function(node_a, node_b) {
    this.node_a = node_a;
    this.node_b = node_b;

    this.node_a.add_edge(this);
    this.node_b.add_edge(this);
}

DU.Graph = function() {
    this.nodes = [];
    this.edges = [];
}

DU.Graph.prototype.add_node(node) {
    this.nodes.push(node);
}

DU.Graph.prototype.add_edge(edge) {
    this.edges.push(edge);
}

DU.Graph.create_cycle(size) {
    if (size < 3)
        throw "Cannot create a cycle of less than 3 nodes.";

    var g = new DU.Graph();

    for (var i=0; i<size; ++i) {
        var n = new Node(i);
        g.add_node(n);
    }

    for (var i=0; i<size; ++i) {
        var j=(i+1) % size;
        var e = new Edge(g.nodes[i], g.nodes[j]);
        g.add_edge(e);
    }

    return g;
}
