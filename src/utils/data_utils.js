define(['data_structs/operations'], function(Ops){
    function valid_idx(arr, i) {
        return i >= 0 && i < arr.length;
    };

    function swap(arr, a_idx, b_idx) {
        if (valid_idx(arr, a_idx) && valid_idx(arr, b_idx)) {
            var tmp = arr[a_idx];
            arr[a_idx] = arr[b_idx];
            arr[b_idx] = tmp;
        }
    };

    return {
        valid_idx: valid_idx,
        swap: swap,

        array_swap_handler: function() {
            // Undoing a swap just means swapping the same indices again.
            return new Ops.Handler(swap, swap);
        },

        shuffle: function(array, rnd_index_f) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            if (rnd_index_f === undefined) {
                rnd_index_f = function(current_index) {
                                    return Math.floor(Math.random() * current_index); 
                              }; 
            }
          
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
          
              // Pick a remaining element...
              randomIndex = rnd_index_f(currentIndex);
              currentIndex -= 1;
          
              // And swap it with the current element.
              swap(array, currentIndex, randomIndex);
            }
          
            return array;
        }
    };
});


