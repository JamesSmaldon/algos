QUnit.test("BubbleSort.sort", function(assert) {
    var cmp = new DS.CountedComparison();
    var sorted = Algos.Sorting.bubble_sort(new DS.TrackedArray([1,2,3,4]), cmp);
    assert.deepEqual(sorted.asArray(), [1,2,3,4]);

    sorted = Algos.Sorting.bubble_sort(new DS.TrackedArray([4,3,2,1]), cmp);
    assert.deepEqual(sorted.asArray(), [1,2,3,4]);

    sorted = Algos.Sorting.bubble_sort(new DS.TrackedArray(), cmp);
    assert.deepEqual(sorted.asArray(), []);
});
