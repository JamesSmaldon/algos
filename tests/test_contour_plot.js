QUnit.module("contour_plot");

/*
 * Given a 2D function and a list of contour heights, we want to generate
 * a list of line segments representing the contours when rendered on 
 * the canvas.
 */

QUnit.test("contour_line_for_triangle non intersecting cases", function (assert) {
    // Non intersecting cases:
    // --------------------------------------------------------------- 
    // This means that the triangle doesn't intersect with the contour plane.
    // so the function should return null.
    //
    // All vertices above the contour level
    var a = new M.Triangle(new M.Vector(0,1.5,5), 
                            new M.Vector(1.5,0,5),
                            new M.Vector(0,-1.5,5));
    var line = View.contour_line_for_triangle(a, 4);
    
    assert.deepEqual(line, null);

    // All vertices below the contour level
    var b = new M.Triangle(new M.Vector(0,1.5,5), 
                            new M.Vector(1.5,0,5),
                            new M.Vector(0,-1.5,5));

    line = View.contour_line_for_triangle(b, 6);

    assert.deepEqual(line, null);

    // 1 on the contour, two above
    var c1 = new M.Triangle(new M.Vector(0,1.5,3), 
                            new M.Vector(1.5,0,5),
                            new M.Vector(0,-1.5,5));
    var c2 = new M.Triangle(new M.Vector(0,1.5,5), 
                            new M.Vector(1.5,0,3),
                            new M.Vector(0,-1.5,5));
    var c3 = new M.Triangle(new M.Vector(0,1.5,5), 
                            new M.Vector(1.5,0,5),
                            new M.Vector(0,-1.5,3));
    
    assert.deepEqual(View.contour_line_for_triangle(c1, 3), null);
    assert.deepEqual(View.contour_line_for_triangle(c2, 3), null);
    assert.deepEqual(View.contour_line_for_triangle(c3, 3), null);

    // 1 on the contour, two below
    var c1 = new M.Triangle(new M.Vector(0,1.5,3), 
                            new M.Vector(1.5,0,2),
                            new M.Vector(0,-1.5,2));
    var c2 = new M.Triangle(new M.Vector(0,1.5,2), 
                            new M.Vector(1.5,0,3),
                            new M.Vector(0,-1.5,2));
    var c3 = new M.Triangle(new M.Vector(0,1.5,2), 
                            new M.Vector(1.5,0,2),
                            new M.Vector(0,-1.5,3));
    
    assert.deepEqual(View.contour_line_for_triangle(c1, 3), null);
    assert.deepEqual(View.contour_line_for_triangle(c2, 3), null);
    assert.deepEqual(View.contour_line_for_triangle(c3, 3), null);

    // Intersecting cases:
    // --------------------------------------------------------------- 
    // Should return a line segment
});
