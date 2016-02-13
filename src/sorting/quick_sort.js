var Algos = Algos || {};
Algos.Sorting = Algos.Sorting || {};

Algos.Sorting.lomuto_partition = function(seq, lo, hi){
    var i = lo;
    
    for (var j=lo; j<hi;++j){
        if (seq.lteq(j, hi)) {
            seq.swap(i, j);
            i++;
        }
    }

    seq.swap(i, hi);

    return i;
}

Algos.Sorting.quick_sort_ = function(seq, partition_func, lo, hi) {
    if (lo < hi) {
        p = partition_func(seq, lo, hi);
        this.quick_sort_(seq, partition_func, lo, p-1);
        this.quick_sort_(seq, partition_func, p+1, hi);
    } 
}

Algos.Sorting.quick_sort = function(seq, partition_func) {
    var work_seq = seq.copy();
    
    Algos.Sorting.quick_sort_(work_seq, partition_func, 0, seq.length-1);

    return work_seq;
}
