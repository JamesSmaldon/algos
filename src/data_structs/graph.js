var DU = DU || {};

DU.Node = function(id, value) {
    this.id = id;
    this.value = value;
    this.edges = [];
}

DU.Node.prototype.add_edge = function(edge) {
    this.edges.push(edge);
}

DU.Edge = function(id, node_a, node_b) {
    this.id = id;
    this.node_a = node_a;
    this.node_b = node_b;

    this.node_a.add_edge(this);
    this.node_b.add_edge(this);
}

DU.Graph = function() {
    this.nodes = [];
    this.edges = [];

    this.id_to_node = {};
    this.id_to_edge = {};
}

DU.Graph.prototype.add_node = function(node) {
    if (this.id_to_node[node.id] !== undefined)
        throw "Node with ID already exists in graph.";

    this.nodes.push(node);
    this.id_to_node[node.id] = node;
}

DU.Graph.prototype.add_edge = function(edge) {
    if (this.id_to_edge[edge.id] !== undefined)
        throw "Edge with ID already exists in graph.";

    this.edges.push(edge);
    this.id_to_edge[edge.id] = edge;
}

DU.Graph.prototype.get_node = function(id) {
    return this.id_to_node[id];
}

DU.Graph.prototype.get_edge = function(id) {
    return this.id_to_edge[id];
}

DU.Graph.prototype.clone = function() {
    var g = new DU.Graph();

    function new_node(old_node) {
        return new DU.Node(old_node.id, old_node.value);
    }

    function new_edge(old_edge) {
        var new_a = g.get_node(old_edge.node_a.id);
        var new_b = g.get_node(old_edge.node_b.id);

        return new DU.Edge(old_edge.id, new_a, new_b);
    }

    fu.map(fu.compose(new_node, fu.obind(g.add_node, g)), this.nodes);
    fu.map(fu.compose(new_edge, fu.obind(g.add_edge, g)), this.edges);

    return g;
}

DU.create_cycle = function(size) {
    if (size < 3)
        throw "Cannot create a cycle of less than 3 nodes.";

    var g = new DU.Graph();

    for (var i=0; i<size; ++i) {
        var n = new DU.Node(i, i);
        g.add_node(n);
    }

    for (var i=0; i<size; ++i) {
        var j=(i+1) % size;
        var e = new DU.Edge(i, g.nodes[i], g.nodes[j]);
        g.add_edge(e);
    }

    return g;
}
