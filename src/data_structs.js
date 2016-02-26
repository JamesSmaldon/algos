//Data structures namespace
var DS = DS || {};

DS.valid_idx = function(arr, i) {
    return i >= 0 && i < arr.length;
}

DS.array_swap_handler = function() {
    var do_f = function(arr, a_idx, b_idx) {
        if (DS.valid_idx(arr, a_idx) && DS.valid_idx(arr, b_idx)) {
            var tmp = arr[a_idx];
            arr[a_idx] = arr[b_idx];
            arr[b_idx] = tmp;
        }
    };

    // Undoing a swap just means swapping the same indices again.
    return new Ops.Handler(do_f, do_f);
}

