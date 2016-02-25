var Algos = Algos || {};
Algos.Sorting = Algos.Sorting || {};

Algos.Sorting.bubble_sort = function(ops_tracker, seq, cmp){
    var work_seq = seq.slice(0);
    Ops.tag(work_seq, 'array');

    var n = work_seq.length;
    
    var swapped = false;
    do {
        swapped = false;
        for (var i=1; i<n; ++i) {
            if (cmp.gt(work_seq[i-1], work_seq[i]))  {
                ops_tracker.doOp(work_seq, Ops.swap(i-1, i));
                swapped = true;
            }
        }
    } while (swapped);

    return work_seq;
}

Algos.Sorting.lomuto_partition = function(ops_tracker, seq, cmp, lo, hi){
    var i = lo;
    
    for (var j=lo; j<hi;++j){
        if (cmp.lte(seq[j], seq[hi])) {
            ops_tracker.doOp(seq, Ops.swap(i, j));
            i++;
        }
    }

    ops_tracker.doOp(seq, Ops.swap(i, hi));

    return i;
}

Algos.Sorting.quick_sort_ = function(ops_tracker, seq, cmp, partition_func, lo, hi) {
    if (lo < hi) {
        var p = partition_func(ops_tracker, seq, cmp, lo, hi);
        this.quick_sort_(ops_tracker, seq, cmp, partition_func, lo, p-1);
        this.quick_sort_(ops_tracker, seq, cmp, partition_func, p+1, hi);
    } 
}

Algos.Sorting.quick_sort = function(ops_tracker, seq, cmp, partition_func) {
    var work_seq = seq.slice(0);
    Ops.tag(work_seq, 'array');
    
    Algos.Sorting.quick_sort_(ops_tracker, work_seq, cmp, partition_func, 0, seq.length-1);

    return work_seq;
}

