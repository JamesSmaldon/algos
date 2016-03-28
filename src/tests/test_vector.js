define(['maths/vector'], function(Vector) {
    module("Vector");
    test("eq method", function(assert) {
        var a = new Vector(1,2,3);
        var b = new Vector(1,2,3);
        var c = new Vector(1,2,3);
        var d = new Vector(2,3,4);
        var e = new Vector(2,3,4,5);
        var f = new Vector([2,3,4,5]);
        assert.ok(a.eq(a));
        assert.ok(a.eq(b));
        assert.ok(b.eq(c));
        assert.ok(a.eq(c));
        assert.notOk(c.eq(d));
        assert.notOk(d.eq(e));
        assert.ok(e.eq(f));
    });

    test("add method", function(assert){
        var a = new Vector(1,2,3);
        var b = new Vector(4,5,6);    

        assert.ok(a.add(b).eq(new Vector(5,7,9)));
        assert.ok(a.add(a).eq(new Vector(2,4,6)));

        assert.throws(function() {a.add(new Vector(1,2));});
    });

    test("sub method", function (assert) {
        var a = new Vector(1,2,3);
        var b = new Vector(4,5,6);    

        assert.ok(a.sub(b).eq(new Vector(-3,-3,-3)));
        assert.ok(a.sub(a).eq(new Vector(0,0,0)));

        assert.throws(function() {a.sub(new Vector(1,2));});
    });

    test("length method", function (assert) {
        var a = new Vector(1,2,3);

        assert.equal(a.length(), Math.sqrt(1*1+2*2+3*3));
        assert.equal(new Vector(0,0,0).length(), 0);
        assert.equal(new Vector(-1,-2,-3).length(), Math.sqrt(1*1+2*2+3*3));
    });

    test("scale method", function (assert) {
        var a = new Vector(1,2,3);

        assert.deepEqual(a.scale(10), new Vector(10,20,30));
        assert.equal(a.scale(10).length(), a.length() * 10);
    });

    test("dot method", function (assert) {
        assert.equal(new Vector(1,0,0).dot(new Vector(1.0, 0, 0)), 1.0);
        assert.equal(new Vector(1,0,0).dot(new Vector(0,1,0)), 0.0);
        assert.throws(function() { new Vector(1,0,0).dot(new Vector(1.0, 0.0)); });
    });

    test("unit method", function (assert) {
        assert.deepEqual(new Vector(1.0, 0.0, 0.0).unit(), new Vector(1.0, 0.0, 0.0));
        assert.deepEqual(new Vector(10.0, 0.0, 0.0).unit(), new Vector(1.0, 0.0, 0.0));
        assert.equal(new Vector(1,2,3).unit().length(), 1.0);
        assert.deepEqual(new Vector(0.0, 0.0, 0.0).unit(), new Vector(0.0, 0.0, 0.0));
    });
});

