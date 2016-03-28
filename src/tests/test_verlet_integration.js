define(['maths/vector','maths/verlet_integration'], function(Vector, Verlet) {
    module("Verlet");

    test("current position term", function(assert) {
        // Check the current position term (it should be doubled)
        var pos = new Vector(1,1,1); 
        var prev_pos = new Vector(0,0,0);
        var force = new Vector(0,0,0);
        var res = Verlet.integrate(prev_pos, pos, force, 1.0);

        assert.deepEqual(res, new Vector(2,2,2));
    });

    test("previous position term subtracted", function(assert) {
        // Check the previous position term 
        // (it should be subtracted from the doubled pos)
        var pos = new Vector(1,1,1); 
        var prev_pos = new Vector(2,2,2);
        var force = new Vector(0,0,0);
        var res = Verlet.integrate(prev_pos, pos, force, 1.0);

        assert.deepEqual(res, new Vector(0,0,0));
    });

    test("Acceleration term added", function(assert) {
        // Check the acceleration is added to the other terms
        var pos = new Vector(1,1,1); 
        var prev_pos = new Vector(2,2,2);
        var force = new Vector(-1,1,-1);
        var res = Verlet.integrate(prev_pos, pos, force, 1.0);

        assert.deepEqual(res, new Vector(-1,1,-1));
    });

    test("Acceleration term scaled by dt^2", function(assert) {
        // Check the acceleration is added to the other terms
        var pos = new Vector(1,1,1); 
        var prev_pos = new Vector(2,2,2);
        var force = new Vector(-1,1,-1);
        var res = Verlet.integrate(prev_pos, pos, force, 2.0);

        assert.deepEqual(res, new Vector(-4,4,-4));
    });
});

