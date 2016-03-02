var chart;

function create_graph_vis(graph) {
    var ctx = document.getElementById("graph_canvas").getContext("2d");
    chart = new View.GraphVisualiser(ctx, 600, 600);
    chart.render(null, null);
}

window.onload = function () {
    create_graph_vis(null);
}
