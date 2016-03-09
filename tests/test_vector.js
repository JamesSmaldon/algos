QUnit.test("eq method", function(assert) {
    var a = new M.Vector(1,2,3);
    var b = new M.Vector(1,2,3);
    var c = new M.Vector(1,2,3);
    var d = new M.Vector(2,3,4);
    var e = new M.Vector(2,3,4,5);
    var f = new M.Vector([2,3,4,5]);
    assert.ok(a.eq(a));
    assert.ok(a.eq(b));
    assert.ok(b.eq(c));
    assert.ok(a.eq(c));
    assert.notOk(c.eq(d));
    assert.notOk(d.eq(e));
    assert.ok(e.eq(f));
});

QUnit.test("add method", function(assert){
    var a = new M.Vector(1,2,3);
    var b = new M.Vector(4,5,6);    

    assert.ok(a.add(b).eq(new M.Vector(5,7,9)));
    assert.ok(a.add(a).eq(new M.Vector(2,4,6)));

    assert.throws(function() {a.add(new M.Vector(1,2));});
});

QUnit.test("sub method", function (assert) {
    var a = new M.Vector(1,2,3);
    var b = new M.Vector(4,5,6);    

    assert.ok(a.sub(b).eq(new M.Vector(-3,-3,-3)));
    assert.ok(a.sub(a).eq(new M.Vector(0,0,0)));

    assert.throws(function() {a.sub(new M.Vector(1,2));});
});

QUnit.test("length method", function (assert) {
    var a = new M.Vector(1,2,3);

    assert.equal(a.length(), Math.sqrt(1*1+2*2+3*3));
    assert.equal(new M.Vector(0,0,0).length(), 0);
    assert.equal(new M.Vector(-1,-2,-3).length(), Math.sqrt(1*1+2*2+3*3));
});

QUnit.test("scale method", function (assert) {
    var a = new M.Vector(1,2,3);

    assert.deepEqual(a.scale(10), new M.Vector(10,20,30));
    assert.equal(a.scale(10).length(), a.length() * 10);
});

QUnit.test("dot method", function (assert) {
    assert.equal(new M.Vector(1,0,0).dot(new M.Vector(1.0, 0, 0)), 1.0);
    assert.equal(new M.Vector(1,0,0).dot(new M.Vector(0,1,0)), 0.0);
    assert.throws(function() { new M.Vector(1,0,0).dot(new M.Vector(1.0, 0.0)); });
});

QUnit.test("unit method", function (assert) {
    assert.deepEqual(new M.Vector(1.0, 0.0, 0.0).unit(), new M.Vector(1.0, 0.0, 0.0));
    assert.deepEqual(new M.Vector(10.0, 0.0, 0.0).unit(), new M.Vector(1.0, 0.0, 0.0));
    assert.equal(new M.Vector(1,2,3).unit().length(), 1.0);
    assert.deepEqual(new M.Vector(0.0, 0.0, 0.0).unit(), new M.Vector(0.0, 0.0, 0.0));
});
