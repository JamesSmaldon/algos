QUnit.test("loop.until loops until the function returns true", function(assert) {
    var x = 0;
    var f = function() {
        x++;
        return x == 5;
    };

    func_utils.until(f);

    assert.ok(x == 5);
});

QUnit.test("loop.until_false loops until the function returns false", function(assert) {
    var x = 0;
    var f = function() {
        x++;
        return x < 5;
    }

    func_utils.until_false(f);

    assert.ok(x == 5);
});
