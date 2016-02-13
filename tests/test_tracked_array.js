QUnit.test("TrackedArray constructor can take an array parameter", function(assert) {
    var a = new DS.TrackedArray([1,2,3,4]);
    assert.deepEqual([1,2,3,4], a.asArray());
});

QUnit.test("TrackedArray.asArray returns empty array for new TrackedArray", function(assert) {
    var a = new DS.TrackedArray();
    assert.deepEqual([], a.asArray());
});

QUnit.test("TrackedArray.push adds element to array.", function(assert) {
    var a = new DS.TrackedArray();
    a.push(1);
    assert.deepEqual([1], a.asArray());
});

QUnit.test("TrackedArray.length holds length of array.", function(assert) {
    var a = new DS.TrackedArray();
    a.push(1);
    assert.ok(1 == a.length);
    a.push(2);
    assert.ok(2 == a.length);
    a.push(3);
    assert.ok(3 == a.length);
    a.push(4);
    assert.ok(4 == a.length);
    a.pop();
    assert.ok(3 == a.length);
    a.pop();
    assert.ok(2 == a.length);
    a.pop();
    assert.ok(1 == a.length);
    a.pop();
    assert.ok(0 == a.length);
    a.pop();
    assert.ok(0 == a.length);
});

QUnit.test("TrackedArray.at behaves like array[].", function(assert) {
    var a = new DS.TrackedArray([1,2,5]);
    console.log(a.asArray());

    assert.ok(a.at(0) == 1);
    assert.ok(a.at(1) == 2);
    assert.ok(a.at(2) == 5);
    assert.ok(a.at(3) == undefined);
    assert.ok(a.at(-1) == undefined);
});

QUnit.test("TrackedArray.valid_idx", function(assert) {
    var a = new DS.TrackedArray([1,2,3]);

    assert.ok(a.valid_idx(0));
    assert.notOk(a.valid_idx(3));
    assert.notOk(a.valid_idx(-1));
});

QUnit.test("TrackedArray.swap", function(assert) {
    var a = new DS.TrackedArray([1,2,3,4]);
    a.swap(0,1);
    assert.deepEqual([2,1,3,4], a.asArray());
    a.swap(-1,-1);
    assert.deepEqual([2,1,3,4], a.asArray());
});

QUnit.test("TrackedArray.gt", function(assert) {
    var a = new DS.TrackedArray([1,2,3,4]);
    assert.ok(a.gt(1,0));
    assert.notOk(a.gt(0,1));
    assert.notOk(a.gt(0,0));
    assert.throws(function () {
        a.gt(-1, 0);
    });
});

QUnit.test("TrackedArray.gt increments comparison and get counts", function(assert) {
    var a = new DS.TrackedArray([1,2,3,4]);
    a.gt(0,1);
    assert.ok(a.comparisons == 1);
    assert.ok(a.gets == 2);
});

