var chart;

var vis_node = function(node, pos) {
    this.node = node;
    this.prev_pos = pos;
    this.pos = pos;
    this.force = new M.Vector(0,0);
}

function create_vis_graph(graph) {
    var g = new DU.Graph();

    fu.map(function (n) { g.add_node(new vis_node(n, new M.Vector(0,0))); }, graph.nodes);
    g.edges = graph.edges.slice();

    return g;
}

function set_initial_pos(graph) {
    graph.nodes[0].pos = new M.Vector(300, 200);
    graph.nodes[1].pos = new M.Vector(400, 300);
    graph.nodes[2].pos = new M.Vector(300, 400);
    graph.nodes[3].pos = new M.Vector(200, 300);
    graph.nodes[0].prev_pos = new M.Vector(300, 200);
    graph.nodes[1].prev_pos = new M.Vector(400, 300);
    graph.nodes[2].prev_pos = new M.Vector(300, 400);
    graph.nodes[3].prev_pos = new M.Vector(200, 300);
}

var g = undefined;

function create_graph_vis(graph) {
    var ctx = document.getElementById("graph_canvas").getContext("2d");
    chart = new View.GraphVisualiser(ctx, 600, 600);

    g = create_vis_graph(DU.create_cycle(4));
    set_initial_pos(g);

    chart.render(g);
}

function update() {
    for (var i=0; i<g.nodes.length; ++i) {
        g.nodes[i].force = new M.Vector(0,0);
    }

    for (var i=0; i<g.nodes.length; ++i) {
        for (var j=i+1; j<g.nodes.length; ++j) {
            var f = g.nodes[i].pos.sub(g.nodes[j].pos).unit();
            g.nodes[i].force = g.nodes[i].force.add(f);
            g.nodes[j].force = g.nodes[j].force.sub(f);
        }
    }

    for (var i=0; i<g.nodes.length; ++i) {
        var pp = g.nodes[i].pos;
        g.nodes[i].pos = Verlet.integrate(g.nodes[i].prev_pos, g.nodes[i].pos, g.nodes[i].force, 0.05);
        g.nodes[i].prev_pos = pp;
    }

    chart.render(g);
}

window.onload = function () {
    create_graph_vis(null);
    window.setInterval(update, 16);
}
