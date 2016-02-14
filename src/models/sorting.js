var arr;
var chart;
var animate_timer;

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
        labels: DS.loop.range(0, 50),

        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(0,0,220,0.9)",
                strokeColor: "rgba(220,220,220,0.0)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: seq.asArray()
            },
        ]
    };

    return data;
}

function update_chart(chart, seq) {
    var data = seq.asArray();
    for (var i=0; i<data.length; ++i)
    {
        chart.datasets[0].bars[i].value = data[i];
    }
    chart.update();
}

function next_step() {
    var result = arr.next_state();
    update_chart(chart, arr);
    return result;
}

function prev_step() {
    arr.prev_state();
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
    arr.initial_state();
    update_chart(chart, arr);
}

function create_chart(arr) {
    var ctx = document.getElementById("sort_canvas").getContext("2d");
    data = chart_data(arr)

    Chart.defaults.global.animation=false;
    chart = new Chart(ctx).Bar(data);
}

function do_bubble_sort() {
    arr = Algos.Sorting.bubble_sort(arr);
    arr.initial_state();
    create_chart(arr);
}

function do_quick_sort() {
    arr = Algos.Sorting.quick_sort(arr, Algos.Sorting.lomuto_partition);
    arr.initial_state();
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
        nums_to_sort = DS.loop.range(0,50);
        shuffle(nums_to_sort);
    }
    else if (this.value == "reversed") {
        nums_to_sort = DS.loop.range(0,50);
        nums_to_sort.reverse();
    }
    else if (this.value == "sorted") {
        nums_to_sort = DS.loop.range(0,50);
    }

    arr = new DS.TrackedArray(nums_to_sort);

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
    var data_selectbox = init_data_selectbox();
    var algo_selectbox = init_algo_selectbox();
    data_selectbox.onchange();
    algo_selectbox.onchange(); 
}
