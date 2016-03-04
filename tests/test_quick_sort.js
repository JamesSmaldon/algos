QUnit.test("quick_sort", function(assert) {
    Ops.set_op_handler('array', 'swap', DU.array_swap_handler());

    var sorted = Algos.Sorting.quick_sort(Algos.Sorting.lomuto_partition, new Ops.OpTracker(), new DU.CountedComparison(), [1,2,3,4]); 
    assert.deepEqual(sorted, [1,2,3,4]);

    sorted = Algos.Sorting.quick_sort(Algos.Sorting.lomuto_partition, new Ops.OpTracker(), new DU.CountedComparison(), [4,3,2,1]);
    assert.deepEqual(sorted, [1,2,3,4]);

    sorted = Algos.Sorting.quick_sort(Algos.Sorting.lomuto_partition, new Ops.OpTracker(), new DU.CountedComparison(), []);
    assert.deepEqual(sorted, []);
});
