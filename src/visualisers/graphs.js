define(['maths/vector', 
        'data_structs/graph', 
        'visualisers/graph_visualiser',
        'utils/func_utils',
        'maths/verlet_integration'],
        function(Vector, Graph, GraphVisualiser, fu, Verlet) {
    var chart;

    function create_vis_graph(graph) {
        var g = graph.clone();

        function add_vis_data(node) {
            var val = node.value;
            node.value = { pos: new Vector(0,0), 
                           prev_pos: new Vector(0,0),
                           force: new Vector(0,0),
                           value: val };
        }

        fu.map(add_vis_data, g.nodes);

        return g;
    }

    function set_initial_pos(graph) {
        graph.nodes[0].value.pos = new Vector(300, 200);
        graph.nodes[1].value.pos = new Vector(400, 300);
        graph.nodes[2].value.pos = new Vector(300, 400);
        graph.nodes[3].value.pos = new Vector(200, 300);
        graph.nodes[4].value.pos = new Vector(0, 0);
        graph.nodes[0].value.prev_pos = new Vector(300, 200);
        graph.nodes[1].value.prev_pos = new Vector(400, 300);
        graph.nodes[2].value.prev_pos = new Vector(300, 400);
        graph.nodes[3].value.prev_pos = new Vector(200, 300);
        graph.nodes[4].value.prev_pos = new Vector(0, 0);
    }

    var g = undefined;

    function create_graph_vis(graph) {
        var ctx = document.getElementById("graph_canvas").getContext("2d");
        chart = new GraphVisualiser(ctx, 600, 600);

        g = create_vis_graph(Graph.create_cycle(5));
        set_initial_pos(g);

        chart.render(g);
    }

    function repulsive_force(node_a, node_b) {
        var f = pos(node_a).sub(pos(node_b)).unit();
        return f;
    }

    function pos(node) {
        return node.value.pos;
    }

    function prev_pos(node) {
        return node.value.prev_pos;
    }

    function force(node) { 
        return node.value.force;
    }

    function hookean_spring_force(node_a, node_b, ideal_length, spring_const) {
        var a_to_b = pos(node_a).sub(pos(node_b));
        var a_to_b_u = a_to_b.unit();
        var reaction = a_to_b.length() - ideal_length;
        return a_to_b_u.scale(-1 * reaction * spring_const);
    }

    function dissipative_force(node, damping_const) {
        var vel = pos(node).sub(prev_pos(node));
        return vel.scale(-1.0 * damping_const);
    }

    function update() {
        for (var i=0; i<g.nodes.length; ++i) {
            g.nodes[i].value.force = new Vector(0,0);
        }

        // Calculate repulsive force contribution for all nodes.
        for (var i=0; i<g.nodes.length; ++i) {
            for (var j=i+1; j<g.nodes.length; ++j) {
                var ni = g.nodes[i];
                var nj = g.nodes[j];

                var f = repulsive_force(ni, nj);
                ni.value.force = force(ni).add(f);
                nj.value.force = force(nj).sub(f);
            }
        }

        // Calculate edge spring contribution for all edges
        for (var i=0; i<g.edges.length; ++i) {
            var e = g.edges[i];
            var f = hookean_spring_force(e.node_a, e.node_b, 100, 7);
            e.node_a.value.force = force(e.node_a).add(f);
            e.node_b.value.force = force(e.node_b).sub(f);
        }

        // Calculate dissipation force for all nodes
        for (var i=0; i<g.nodes.length; ++i) {
            var f = dissipative_force(g.nodes[i], 10.0);
            g.nodes[i].value.force = force(g.nodes[i]).add(f);
        }

        for (var i=0; i<g.nodes.length; ++i) {
            var pp = pos(g.nodes[i]);
            g.nodes[i].value.pos = Verlet.integrate(prev_pos(g.nodes[i]), pos(g.nodes[i]), force(g.nodes[i]), 0.05);
            g.nodes[i].value.prev_pos = pp;
        }

        chart.render(g);
    }

    function onload() {
        create_graph_vis(null);
        window.setInterval(update, 16);
    }

    return { onload: onload };
});
