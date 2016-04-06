define(['data_structs/operations',
        'visualisers/sort_visualiser',
        'algorithms/sorting',
        'utils/data_utils',
        'utils/func_utils',
        'data_structs/counted_comparison'], function(Ops, View, Sorting, DU, fu, CountedComparison) {
    var arr;
    var chart_data;
    var chart;
    var animate_timer;
    var iter_ops;
    var button_down_timer;

    function next_step() {
        var op = iter_ops.next(arr);
        if (op !== null) {
            Ops.doOp(arr, op);
            Ops.doOp(chart_data, op);
            chart.render(arr, chart_data);
            return true;
        }
        return false;
    }

    function prev_step() {
        var op = iter_ops.prev(arr);
        if (op !== null) {
            Ops.undoOp(arr, op);
            Ops.undoOp(chart_data, op);
            chart.render(arr, chart_data);
            return true;
        }
        return false;
    }

    function start_animate() {
        var f = function() {
            if (!next_step())
            {
                stop_animate();
            }
        };
        animate_timer = setInterval(f, 20);
        document.getElementById("stop_button").disabled = false;
        document.getElementById("start_button").disabled = true;
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
        iter_ops.initial_state(chart_data);
        chart.render(arr, chart_data);
    }

    function create_chart(arr) {
        var ctx = document.getElementById("sort_canvas").getContext("2d");
        chart = new View.SortVis(ctx, 600, 600);
        chart_data = new View.SortVisData(arr.length);
        chart.render(arr, chart_data);
    }

    function do_sort(sortf) {
        var cmp = new CountedComparison();
        var ops_tracker = new Ops.OpTracker();
        arr = sortf(ops_tracker, cmp, arr);
        iter_ops = new Ops.IterOps(ops_tracker.operations);
        iter_ops.initial_state(arr);
        create_chart(arr);
    }

    function algo_selectbox_changed() {
        switch (this.value) {
            case "bubble":
                do_sort(Sorting.bubble_sort);
                break;
            case "quick":
                do_sort(fu.bind(Sorting.quick_sort, Sorting.lomuto_partition));
                break;
            case "insertion": 
                do_sort(Sorting.insertion_sort); 
                break;
        }
    }

    function data_selectbox_changed() {
        var nums_to_sort = [];

        switch (this.value) {
            case "random":
                nums_to_sort = fu.range(0,50);
                DU.shuffle(nums_to_sort);
                break;
            case "reversed":
                nums_to_sort = fu.range(0,50);
                nums_to_sort.reverse();
                break;
            case "sorted":
                nums_to_sort = fu.range(0,50);
                break;
        }

        arr = nums_to_sort.slice(0);
        Ops.tag(arr, 'array');

        var algo_selectbox = document.getElementById("algo_select");
        algo_selectbox.onchange();
    }

    function create_dropdown(id, value_pairs, on_change) {
        var select_box = document.getElementById(id);

        for (var i=0; i<value_pairs.length; ++i){
            var opt = document.createElement("option");
            opt.value = value_pairs[i][1];
            opt.text = value_pairs[i][0];
            select_box.appendChild(opt);
        }

        select_box.onchange = on_change;

        return select_box;
    }

    var onload = function () {
        Ops.set_op_handler('array', 'swap', DU.array_swap_handler());
        Ops.set_op_handler('chartdata', 'swap', View.SortVisData.swap_handler());
        Ops.set_op_handler('chartdata', 'focus', View.SortVisData.set_focus_handler());
        Ops.set_op_handler('chartdata', 'unfocus', View.SortVisData.unset_focus_handler());
        Ops.set_op_handler('chartdata', 'finished', View.SortVisData.finished_handler());

        var algo_options = [["Bubble Sort", "bubble"], 
                            ["Quick Sort", "quick"], 
                            ["Insertion Sort", "insertion"]];

        var algo_selectbox = create_dropdown("algo_select", 
                                                algo_options, 
                                                algo_selectbox_changed);

        var data_options = [["Random", "random"], 
                            ["Sorted", "sorted"], 
                            ["Reversed", "reversed"]];

        var data_selectbox = create_dropdown("data_select",
                                                data_options,
                                                data_selectbox_changed);

        data_selectbox.onchange();
    }

    return { onload: onload,
             next_step: next_step,
             prev_step: prev_step,
             start_animate: start_animate,
             stop_animate: stop_animate };
});
