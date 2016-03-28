define(['data_structs/counted_comparison'], function(CountedComparison) {
    module("CountedComparison");
    test("CountedComparison initial count zero", function(assert) {
        var cmp = new CountedComparison();
        assert.equal(0, cmp.comparison_count);
    });

    test("CountedComparison.eq", function(assert) {
        var cmp = new CountedComparison();
        assert.ok(cmp.eq(1,1));
        assert.equal(1, cmp.comparison_count);
        assert.notOk(cmp.eq(0,1));
        assert.equal(2, cmp.comparison_count);
    });

    test("CountedComparison.neq", function(assert) {
        var cmp = new CountedComparison();
        assert.notOk(cmp.neq(1,1));
        assert.equal(1, cmp.comparison_count);
        assert.ok(cmp.neq(0,1));
        assert.equal(2, cmp.comparison_count);
    });

    test("CountedComparison.lt", function(assert) {
        var cmp = new CountedComparison();
        assert.ok(cmp.lt(1,2));
        assert.equal(1, cmp.comparison_count);
        assert.notOk(cmp.lt(2,1));
        assert.equal(2, cmp.comparison_count);
        assert.notOk(cmp.lt(2,2));
        assert.equal(3, cmp.comparison_count);
    });

    test("CountedComparison.lte", function(assert) {
        var cmp = new CountedComparison();
        assert.ok(cmp.lte(1,1));
        assert.equal(1, cmp.comparison_count);
        assert.ok(cmp.lte(1,2));
        assert.equal(2, cmp.comparison_count);
        assert.notOk(cmp.lte(2,1));
        assert.equal(3, cmp.comparison_count);
    });

    test("CountedComparison.gt", function(assert) {
        var cmp = new CountedComparison();
        assert.ok(cmp.gt(2,1));
        assert.equal(1, cmp.comparison_count);
        assert.notOk(cmp.gt(1,1));
        assert.equal(2, cmp.comparison_count);
        assert.notOk(cmp.gt(1,2));
        assert.equal(3, cmp.comparison_count);
    });

    test("CountedComparison.gte", function(assert) {
        var cmp = new CountedComparison();
        assert.ok(cmp.gte(1,1));
        assert.equal(1, cmp.comparison_count);
        assert.ok(cmp.gte(2,1));
        assert.equal(2, cmp.comparison_count);
        assert.notOk(cmp.gte(1,2));
        assert.equal(3, cmp.comparison_count);
    });
});

