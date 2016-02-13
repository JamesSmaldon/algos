var Algos = Algos || {};
Algos.Sorting = Algos.Sorting || {};

Algos.Sorting.bubble_sort = function(seq){
    var work_seq = seq.copy();
    var n = work_seq.length;
    
    var swapped = false;
    do {
        swapped = false;
        for (var i=1; i<n; ++i) {
            if (work_seq.gt(i-1, i))  {
                work_seq.swap(i-1, i);
                swapped = true;
            }
        }
    } while (swapped);

    return work_seq;
}


