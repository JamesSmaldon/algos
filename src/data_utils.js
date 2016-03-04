//Data structures namespace
var DU = DU || {};

DU.valid_idx = function(arr, i) {
    return i >= 0 && i < arr.length;
}

DU.swap = function(arr, a_idx, b_idx) {
    if (DU.valid_idx(arr, a_idx) && DU.valid_idx(arr, b_idx)) {
        var tmp = arr[a_idx];
        arr[a_idx] = arr[b_idx];
        arr[b_idx] = tmp;
    }
}

DU.array_swap_handler = function() {
    // Undoing a swap just means swapping the same indices again.
    return new Ops.Handler(DU.swap, DU.swap);
}

DU.shuffle = function(array, rnd_index_f) {
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
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

