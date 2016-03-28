define(['utils/func_utils'], function(fu) {
    module("func_utils");
    test("until loops until the function returns true", function(assert) {
        var x = 0;
        var f = function() {
            x++;
            return x == 5;
        };

        fu.until(f);

        assert.ok(x == 5);
    });

    test("not returns inverse boolean function", function(assert) {
        assert.ok(fu.not(function(){return false;})());
        assert.notOk(fu.not(function(){return true;})());
        assert.ok(fu.not(fu.not(function(){return true;})));
    });

    test("id function returns value passed to it.", function(assert) {
        assert.strictEqual(fu.id(3), 3);
        assert.strictEqual(fu.id("test"), "test");
    });

    test("until_false loops until the function returns false", function(assert) {
        var x = 0;
        var f = function() {
            x++;
            return x < 5;
        }

        fu.until_false(f);

        assert.ok(x == 5);
    });

    test("range generates correct range for valid inputs", function(assert) {
        assert.deepEqual(fu.range(0,5), [0,1,2,3,4]);   
        assert.deepEqual(fu.range(5,10), [5,6,7,8,9]);
        assert.throws(function(){fu.range(5,0)}, "throws error if start of range greater than end");
        assert.deepEqual(fu.range(0,0), []);
    });

    test("fold", function(assert) {
        assert.deepEqual(fu.fold(fu.id, [], []), []);
        assert.strictEqual(fu.fold(function(accum, x) { return accum + x; }, 0, [1,2,3,4]), 10);
    });

    test("fold doesn't consume list", function(assert) {
        var list = [1,2,3,4];
        fu.fold(fu.id, [], list);
        assert.deepEqual(list, [1,2,3,4]);
    });

    test("map", function(assert) {
        assert.deepEqual(fu.map(fu.id, []), []);
        assert.deepEqual(fu.map(function(v) { return v*2; }, [1,2,3,4]), [2,4,6,8]);
    });

    test("zip", function(assert) {
        assert.deepEqual(fu.zip([], []), []);
        assert.deepEqual(fu.zip([1,2,3], []), []);
        assert.deepEqual(fu.zip([], [1,2,3]), []);
        assert.deepEqual(fu.zip([1,2,3], ["a", "b", "c"]), [[1,"a"], [2,"b"], [3,"c"]]);
        assert.deepEqual(fu.zip([1], ["a","b","c"]), [[1,"a"]]);
        assert.deepEqual(fu.zip([1,2,3], ["a"]), [[1, "a"]]);
    });

    test("repeat", function(assert) {
        assert.deepEqual(fu.repeat(0, "a"), []);
        assert.deepEqual(fu.repeat(3, "a"), ["a", "a", "a"]);
    });

    test("bind", function(assert) {
        var add = function(x, y) {
            return x + y;  
        };

        var res = fu.bind(add, 3)(4);
        assert.strictEqual(res, 7);
        assert.strictEqual(fu.bind(add, 2, 2)(), 4);
        assert.strictEqual(fu.bind(add, 2, 2, 2)(), 4);
    });
});
