QUnit.test("BubbleSort.sort", function(assert) {
    var a = new DS.TrackedArray([1,2,3,4]);
    var bsort = new Algos.Sorting.BubbleSort(a);

    var sorted = bsort.sort();
    assert.deepEqual(sorted, new DS.TrackedArray([1,2,3,4]));

    bsort = new Algos.Sorting.BubbleSort(new DS.TrackedArray([4,3,2,1]));
    sorted = bsort.sort();
    assert.deepEqual(sorted, new DS.TrackedArray([1,2,3,4]));
});
