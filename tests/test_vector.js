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

    var c = a.add(b);
    assert.ok(a.add(b).eq(new M.Vector(5,7,9)));
    assert.ok(a.add(a).eq(new M.Vector(2,4,6)));
});
