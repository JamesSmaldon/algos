define(['algorithms/sorting', 
            'utils/data_utils', 
            'data_structs/counted_comparison',
            'data_structs/operations'],
        function(Sorting, DU, CountedComparison, Ops) {
    module("quick_sort");
    test("quick_sort", function(assert) {
        Ops.set_op_handler('array', 'swap', DU.array_swap_handler());

        var sorted = Sorting.quick_sort(Sorting.lomuto_partition, new Ops.OpTracker(), new CountedComparison(), [1,2,3,4]); 
        assert.deepEqual(sorted, [1,2,3,4]);

        sorted = Sorting.quick_sort(Sorting.lomuto_partition, new Ops.OpTracker(), new CountedComparison(), [4,3,2,1]);
        assert.deepEqual(sorted, [1,2,3,4]);

        sorted = Sorting.quick_sort(Sorting.lomuto_partition, new Ops.OpTracker(), new CountedComparison(), []);
        assert.deepEqual(sorted, []);
    });
});
