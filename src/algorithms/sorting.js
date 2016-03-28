define(['data_structs/operations'], function(Ops) {
    return {
        bubble_sort: function(op_tracker, cmp, seq){
            var work_seq = seq.slice(0);
            Ops.tag(work_seq, 'array');

            var n = work_seq.length;
            
            var last_swapped = -1;
            do {
                last_swapped = -1;
                for (var i=1; i<n; ++i) {
                    if (cmp.gt(work_seq[i-1], work_seq[i]))  {
                        op_tracker.doOp(work_seq, Ops.swap(i-1, i));
                        last_swapped = i;
                    }
                }

                if (last_swapped >= 0)
                    op_tracker.addOp(Ops.finished(last_swapped));

            } while (last_swapped >= 0);

            return work_seq;
        },

        lomuto_partition: function(op_tracker, seq, cmp, lo, hi){
            var i = lo;
            
            for (var j=lo; j<hi;++j){
                if (cmp.lte(seq[j], seq[hi])) {
                    op_tracker.doOp(seq, Ops.swap(i, j));
                    i++;
                }
            }

            op_tracker.doOp(seq, Ops.swap(i, hi));

            return i;
        },

        quick_sort: function(partition_func, op_tracker, cmp, seq) {
            var quick_sort_ = function(op_tracker, seq, cmp, partition_func, lo, hi) {
                if (lo < hi) {
                    var p = partition_func(op_tracker, seq, cmp, lo, hi);
                    quick_sort_(op_tracker, seq, cmp, partition_func, lo, p-1);
                    quick_sort_(op_tracker, seq, cmp, partition_func, p+1, hi);
                } 
            }

            var work_seq = seq.slice(0);
            Ops.tag(work_seq, 'array');
            
            quick_sort_(op_tracker, work_seq, cmp, partition_func, 0, seq.length-1);

            return work_seq;
        },

        insertion_sort: function(op_tracker, cmp, seq) {
            var work_seq = seq.slice(0);
            Ops.tag(work_seq, 'array');

            for (var i=1; i<work_seq.length; ++i) {
                op_tracker.addOp(Ops.focus(i));
                for (var j=i; j >=0 && cmp.gt(work_seq[j-1], work_seq[j]); j--) {
                    op_tracker.doOp(work_seq, Ops.swap(j-1, j));
                }
                op_tracker.addOp(Ops.unfocus(i));
            }

            return work_seq;
        }
    }
});


