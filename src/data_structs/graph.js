define(['utils/func_utils'], function(fu) {
    var Node = function(id, value) {
        this.id = id;
        this.value = value;
        this.edges = [];
    }

    Node.prototype.add_edge = function(edge) {
        this.edges.push(edge);
    }

    var Edge = function(id, node_a, node_b) {
        this.id = id;
        this.node_a = node_a;
        this.node_b = node_b;

        this.node_a.add_edge(this);
        this.node_b.add_edge(this);
    }

    var Graph = function() {
        this.nodes = [];
        this.edges = [];

        this.id_to_node = {};
        this.id_to_edge = {};
    }

    Graph.prototype.add_node = function(node) {
        if (this.id_to_node[node.id] !== undefined)
            throw "Node with ID already exists in graph.";

        this.nodes.push(node);
        this.id_to_node[node.id] = node;
    }

    Graph.prototype.add_edge = function(edge) {
        if (this.id_to_edge[edge.id] !== undefined)
            throw "Edge with ID already exists in graph.";

        this.edges.push(edge);
        this.id_to_edge[edge.id] = edge;
    }

    Graph.prototype.get_node = function(id) {
        return this.id_to_node[id];
    }

    Graph.prototype.get_edge = function(id) {
        return this.id_to_edge[id];
    }

    Graph.prototype.clone = function() {
        var g = new Graph();

        function new_node(old_node) {
            return new Node(old_node.id, old_node.value);
        }

        function new_edge(old_edge) {
            var new_a = g.get_node(old_edge.node_a.id);
            var new_b = g.get_node(old_edge.node_b.id);

            return new Edge(old_edge.id, new_a, new_b);
        }

        fu.map(fu.compose(new_node, fu.obind(g.add_node, g)), this.nodes);
        fu.map(fu.compose(new_edge, fu.obind(g.add_edge, g)), this.edges);

        return g;
    }

    function create_cycle(size) {
        if (size < 3)
            throw "Cannot create a cycle of less than 3 nodes.";

        var g = new Graph();

        for (var i=0; i<size; ++i) {
            var n = new Node(i, i);
            g.add_node(n);
        }

        for (var i=0; i<size; ++i) {
            var j=(i+1) % size;
            var e = new Edge(i, g.nodes[i], g.nodes[j]);
            g.add_edge(e);
        }

        return g;
    }

    return {
        Node: Node,
        Edge: Edge,
        Graph: Graph,
        create_cycle: create_cycle
    }
});

