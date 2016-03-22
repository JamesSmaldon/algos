QUnit.module("Verlet");

QUnit.test("current position term", function(assert) {
    // Check the current position term (it should be doubled)
    var pos = new M.Vector(1,1,1); 
    var prev_pos = new M.Vector(0,0,0);
    var force = new M.Vector(0,0,0);
    var res = Verlet.integrate(prev_pos, pos, force, 1.0);

    assert.deepEqual(res, new M.Vector(2,2,2));
});

QUnit.test("previous position term subtracted", function(assert) {
    // Check the previous position term 
    // (it should be subtracted from the doubled pos)
    var pos = new M.Vector(1,1,1); 
    var prev_pos = new M.Vector(2,2,2);
    var force = new M.Vector(0,0,0);
    var res = Verlet.integrate(prev_pos, pos, force, 1.0);

    assert.deepEqual(res, new M.Vector(0,0,0));
});

QUnit.test("Acceleration term added", function(assert) {
    // Check the acceleration is added to the other terms
    var pos = new M.Vector(1,1,1); 
    var prev_pos = new M.Vector(2,2,2);
    var force = new M.Vector(-1,1,-1);
    var res = Verlet.integrate(prev_pos, pos, force, 1.0);

    assert.deepEqual(res, new M.Vector(-1,1,-1));
});

QUnit.test("Acceleration term scaled by dt^2", function(assert) {
    // Check the acceleration is added to the other terms
    var pos = new M.Vector(1,1,1); 
    var prev_pos = new M.Vector(2,2,2);
    var force = new M.Vector(-1,1,-1);
    var res = Verlet.integrate(prev_pos, pos, force, 2.0);

    assert.deepEqual(res, new M.Vector(-4,4,-4));
});

