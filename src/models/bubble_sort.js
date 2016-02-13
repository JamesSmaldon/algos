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

function init_chart() {
    var nums_to_sort = DS.loop.range(0,50);
    shuffle(nums_to_sort);

    arr = Algos.Sorting.quick_sort(new DS.TrackedArray(nums_to_sort), Algos.Sorting.lomuto_partition);
    arr.initial_state();

    var ctx = document.getElementById("bubble_sort").getContext("2d");
    data = chart_data(arr)

    Chart.defaults.global.animation=false;
    chart = new Chart(ctx).Bar(data);
}

window.onload = function () {
    init_chart();
}
