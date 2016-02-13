QUnit.test("quick_sort", function(assert) {
    var sorted = Algos.Sorting.quick_sort(new DS.TrackedArray([1,2,3,4]), Algos.Sorting.lomuto_partition);
    assert.deepEqual(sorted.asArray(), [1,2,3,4]);

    sorted = Algos.Sorting.quick_sort(new DS.TrackedArray([4,3,2,1]), Algos.Sorting.lomuto_partition);
    assert.deepEqual(sorted.asArray(), [1,2,3,4]);

    sorted = Algos.Sorting.quick_sort(new DS.TrackedArray(), Algos.Sorting.lomuto_partition);
    assert.deepEqual(sorted.asArray(), []);
});
