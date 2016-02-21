var Algos = Algos || {};
Algos.Sorting = Algos.Sorting || {};

Algos.Sorting.bubble_sort = function(seq, cmp){
    var work_seq = seq.copy();
    var n = work_seq.length;
    
    var swapped = false;
    do {
        swapped = false;
        for (var i=1; i<n; ++i) {
            if (cmp.gt(work_seq.at(i-1), work_seq.at(i)))  {
                work_seq.swap(i-1, i);
                swapped = true;
            }
        }
    } while (swapped);

    return work_seq;
}

Algos.Sorting.lomuto_partition = function(seq, cmp, lo, hi){
    var i = lo;
    
    for (var j=lo; j<hi;++j){
        if (cmp.lte(seq.at(j), seq.at(hi))) {
            seq.swap(i, j);
            i++;
        }
    }

    seq.swap(i, hi);

    return i;
}

Algos.Sorting.quick_sort_ = function(seq, cmp, partition_func, lo, hi) {
    if (lo < hi) {
        var p = partition_func(seq, cmp, lo, hi);
        this.quick_sort_(seq, cmp, partition_func, lo, p-1);
        this.quick_sort_(seq, cmp, partition_func, p+1, hi);
    } 
}

Algos.Sorting.quick_sort = function(seq, cmp, partition_func) {
    var work_seq = seq.copy();
    
    Algos.Sorting.quick_sort_(work_seq, cmp, partition_func, 0, seq.length-1);

    return work_seq;
}
