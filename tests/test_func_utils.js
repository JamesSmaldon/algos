QUnit.module("fu");
QUnit.test("until loops until the function returns true", function(assert) {
    var x = 0;
    var f = function() {
        x++;
        return x == 5;
    };

    fu.until(f);

    assert.ok(x == 5);
});

QUnit.test("not returns inverse boolean function", function(assert) {
    assert.ok(fu.not(function(){return false;})());
    assert.notOk(fu.not(function(){return true;})());
    assert.ok(fu.not(fu.not(function(){return true;})));
});

QUnit.test("id function returns value passed to it.", function(assert) {
    assert.strictEqual(fu.id(3), 3);
    assert.strictEqual(fu.id("test"), "test");
});

QUnit.test("until_false loops until the function returns false", function(assert) {
    var x = 0;
    var f = function() {
        x++;
        return x < 5;
    }

    fu.until_false(f);

    assert.ok(x == 5);
});

QUnit.test("range generates correct range for valid inputs", function(assert) {
    assert.deepEqual(fu.range(0,5), [0,1,2,3,4]);   
    assert.deepEqual(fu.range(5,10), [5,6,7,8,9]);
    assert.throws(function(){fu.range(5,0)}, "throws error if start of range greater than end");
    assert.deepEqual(fu.range(0,0), []);
});

QUnit.test("empty returns true for empty array and false for non-empty array", function(assert) {
    assert.deepEqual(fu.empty([]), [true]);
    assert.deepEqual(fu.empty([1,2]), [false]);
});

QUnit.test("x_xs", function(assert) {
    assert.deepEqual(fu.x_xs([1,2,3]), [true, 1, [2,3]]);
    assert.deepEqual(fu.x_xs([1]), [true, 1, []]);
    assert.deepEqual(fu.x_xs([]), [false, undefined, []]);
});

QUnit.test("zero", function(assert) {
    assert.deepEqual(fu.zero(0), [true]);
    assert.deepEqual(fu.zero(1), [false]);
});

QUnit.test("n", function(assert) {
    assert.deepEqual(fu.n(0), [false, 0]);
    assert.deepEqual(fu.n(1), [true, 1]);
    assert.deepEqual(fu.n(2), [true, 2]);
});

QUnit.test("eq", function(assert) {
    assert.deepEqual(fu.eq(2)(2), [true, 2]);
    assert.deepEqual(fu.eq(2)(3), [false, 3]);
    assert.deepEqual(fu.eq(2)(4), [false, 4]);
});

QUnit.test("match throws exception if nothing matches", function(assert) {
    assert.throws(function() {
        fu.match([], "test");
    }, "match throws if not matchers provided");

    assert.throws(function() {
        fu.match([[fu.eq(1), function(v) {}],
                  [fu.eq(2), function(v) {}]],
                  0);
    }, "match throws if non of the matchers match");
});

QUnit.test("match applies matched function", function(assert) {
    var result = fu.match([[fu.eq(1), fu.id],
                           [fu.eq(2), fu.id]],
                           2);

    assert.strictEqual(result, 2);
});

QUnit.test("fold", function(assert) {
    assert.deepEqual(fu.fold(fu.id, [], []), []);
    assert.strictEqual(fu.fold(function(accum, x) { return accum + x; }, 0, [1,2,3,4]), 10);
});

QUnit.test("map", function(assert) {
    assert.deepEqual(fu.map(fu.id, []), []);
    assert.deepEqual(fu.map(function(v) { return v*2; }, [1,2,3,4]), [2,4,6,8]);
});

QUnit.test("zip", function(assert) {
    assert.deepEqual(fu.zip([], []), []);
    assert.deepEqual(fu.zip([1,2,3], []), []);
    assert.deepEqual(fu.zip([], [1,2,3]), []);
    assert.deepEqual(fu.zip([1,2,3], ["a", "b", "c"]), [[1,"a"], [2,"b"], [3,"c"]]);
    assert.deepEqual(fu.zip([1], ["a","b","c"]), [[1,"a"]]);
    assert.deepEqual(fu.zip([1,2,3], ["a"]), [[1, "a"]]);
});

QUnit.test("repeat", function(assert) {
    assert.deepEqual(fu.repeat(0, "a"), []);
    assert.deepEqual(fu.repeat(3, "a"), ["a", "a", "a"]);
});

QUnit.test("bind", function(assert) {
    var add = function(x, y) {
        return x + y;  
    };

    var res = fu.bind(add, 3)(4);
    assert.strictEqual(res, 7);
    assert.strictEqual(fu.bind(add, 2, 2)(), 4);
    assert.strictEqual(fu.bind(add, 2, 2, 2)(), 4);
});
