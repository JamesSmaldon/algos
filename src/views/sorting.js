var arr;
var chart;
var animate_timer;
var iter_ops;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function chart_data(seq) {
    var data = {
        labels: func_utils.range(0, 50),

        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(0,0,220,0.9)",
                strokeColor: "rgba(220,220,220,0.0)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: seq
            },
        ]
    };

    return data;
}

function update_chart(chart, seq) {
    var data = seq;
    for (var i=0; i<data.length; ++i)
    {
        chart.datasets[0].bars[i].value = data[i];
    }
    chart.update();
}

function next_step() {
    var result = iter_ops.next(arr);
    update_chart(chart, arr);
    return result;
}

function prev_step() {
    iter_ops.prev(arr);
    update_chart(chart, arr);
}

function start_animate() {
    var f = function() {
        if (!next_step())
        {
            stop_animate();
        }
    };
    animate_timer = setInterval(f, 5);
    document.getElementById("start_button").disabled = true;
    document.getElementById("stop_button").disabled = false;
    document.getElementById("prev_step_button").disabled = true;
    document.getElementById("next_step_button").disabled = true;
}

function stop_animate() {
    clearInterval(animate_timer);
    document.getElementById("stop_button").disabled = true;
    document.getElementById("start_button").disabled = false;
    document.getElementById("prev_step_button").disabled = false;
    document.getElementById("next_step_button").disabled = false;
}

function reset() {
    iter_ops.initial_state(arr);
    update_chart(chart, arr);
}

function create_chart(arr) {
    var ctx = document.getElementById("sort_canvas").getContext("2d");
    data = chart_data(arr)

    Chart.defaults.global.animation=false;
    chart = new Chart(ctx).Bar(data);
}

function do_bubble_sort() {
    var cmp = new DS.CountedComparison();
    var ops_tracker = new Ops.OpTracker();
    arr = Algos.Sorting.bubble_sort(ops_tracker, arr, cmp);
    iter_ops = new Ops.IterOps(ops_tracker.operations);
    iter_ops.initial_state(arr);
    create_chart(arr);
}

function do_quick_sort() {
    var cmp = new DS.CountedComparison();
    var ops_tracker = new Ops.OpTracker();
    arr = Algos.Sorting.quick_sort(ops_tracker, arr, cmp, Algos.Sorting.lomuto_partition);
    iter_ops = new Ops.IterOps(ops_tracker.operations);
    iter_ops.initial_state(arr);
    create_chart(arr);
}

function algo_selectbox_changed() {
    if (this.value == "bubble") {
        do_bubble_sort();
    }
    else if (this.value == "quick") {
        do_quick_sort();
    }
}

function data_selectbox_changed() {
    var nums_to_sort = [];

    if (this.value == "random") {
        nums_to_sort = func_utils.range(0,50);
        shuffle(nums_to_sort);
    }
    else if (this.value == "reversed") {
        nums_to_sort = func_utils.range(0,50);
        nums_to_sort.reverse();
    }
    else if (this.value == "sorted") {
        nums_to_sort = func_utils.range(0,50);
    }

    arr = nums_to_sort.slice(0);
    Ops.tag(arr, 'array');

    var algo_selectbox = document.getElementById("algo_select");
    algo_selectbox.onchange();
}

function init_algo_selectbox(){
    var select_box = document.getElementById("algo_select");
    var options = [["Bubble Sort", "bubble"], ["Quick Sort", "quick"]];

    for (var i=0; i<options.length; ++i){
        var opt = document.createElement("option");
        opt.value = options[i][1];
        opt.text = options[i][0];
        select_box.appendChild(opt);
    }

    select_box.onchange = algo_selectbox_changed;
    return select_box;
}

function init_data_selectbox(){
    var select_box = document.getElementById("data_select");
    var options = [["Random", "random"], ["Sorted", "sorted"], ["Reversed", "reversed"]];

    for (var i=0; i<options.length; ++i){
        var opt = document.createElement("option");
        opt.value = options[i][1];
        opt.text = options[i][0];
        select_box.appendChild(opt);
    }

    select_box.onchange = data_selectbox_changed;
    return select_box;
}

window.onload = function () {
    Ops.set_op_handler('array', 'swap', DS.array_swap_handler());

    var data_selectbox = init_data_selectbox();
    var algo_selectbox = init_algo_selectbox();
    data_selectbox.onchange();
}
