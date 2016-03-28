define(['maths/shapes', 
            'maths/vector', 
            'visualisers/contour_plot'], 
       function(Shapes, Vector, CPlot) {
    module("contour_plot");

    /*
     * Given a 2D function and a list of contour heights, we want to generate
     * a list of line segments representing the contours when rendered on 
     * the canvas.
     */

    test("contour_line_for_triangle non intersecting cases", function (assert) {
        // Non intersecting cases:
        // --------------------------------------------------------------- 
        // This means that the triangle doesn't intersect with the contour plane.
        // so the function should return null.
        //
        // All vertices above the contour level
        var a = new Shapes.Triangle(new Vector(0,1.5,5), 
                                    new Vector(1.5,0,5),
                                    new Vector(0,-1.5,5));
        var line = CPlot.contour_line_for_triangle(a, 4);
        
        assert.deepEqual(line, null);

        // All vertices below the contour level
        var b = new Shapes.Triangle(new Vector(0,1.5,5), 
                                    new Vector(1.5,0,5),
                                    new Vector(0,-1.5,5));

        line = CPlot.contour_line_for_triangle(b, 6);

        assert.deepEqual(line, null);

        // 1 on the contour, two above
        var c1 = new Shapes.Triangle(new Vector(0,1.5,3), 
                                    new Vector(1.5,0,5),
                                    new Vector(0,-1.5,5));
        var c2 = new Shapes.Triangle(new Vector(0,1.5,5), 
                                    new Vector(1.5,0,3),
                                    new Vector(0,-1.5,5));
        var c3 = new Shapes.Triangle(new Vector(0,1.5,5), 
                                    new Vector(1.5,0,5),
                                    new Vector(0,-1.5,3));
        
        assert.deepEqual(CPlot.contour_line_for_triangle(c1, 3), null);
        assert.deepEqual(CPlot.contour_line_for_triangle(c2, 3), null);
        assert.deepEqual(CPlot.contour_line_for_triangle(c3, 3), null);

        // 1 on the contour, two below
        var c1 = new Shapes.Triangle(new Vector(0,1.5,3), 
                                    new Vector(1.5,0,2),
                                    new Vector(0,-1.5,2));
        var c2 = new Shapes.Triangle(new Vector(0,1.5,2), 
                                    new Vector(1.5,0,3),
                                    new Vector(0,-1.5,2));
        var c3 = new Shapes.Triangle(new Vector(0,1.5,2), 
                                    new Vector(1.5,0,2),
                                    new Vector(0,-1.5,3));
        
        assert.deepEqual(CPlot.contour_line_for_triangle(c1, 3), null);
        assert.deepEqual(CPlot.contour_line_for_triangle(c2, 3), null);
        assert.deepEqual(CPlot.contour_line_for_triangle(c3, 3), null);

        // Intersecting cases:
        // --------------------------------------------------------------- 
        // Should return a line segment
        
        // 1 above the contour, two on the contour.
        var c1 = new Shapes.Triangle(new Vector(0,1.5,4), 
                                    new Vector(1.5,0,3),
                                    new Vector(0,-1.5,3));
        var c2 = new Shapes.Triangle(new Vector(0,1.5,3), 
                                    new Vector(1.5,0,4),
                                    new Vector(0,-1.5,3));
        var c3 = new Shapes.Triangle(new Vector(0,1.5,3), 
                                    new Vector(1.5,0,3),
                                    new Vector(0,-1.5,4));
        
        assert.deepEqual(CPlot.contour_line_for_triangle(c1, 3), new Shapes.LineSegment(c1.p2, c1.p3));
        assert.deepEqual(CPlot.contour_line_for_triangle(c2, 3), new Shapes.LineSegment(c2.p1, c2.p3));
        assert.deepEqual(CPlot.contour_line_for_triangle(c3, 3), new Shapes.LineSegment(c3.p1, c3.p2));

        // 1 below the contour, two on the contour.
        var c1 = new Shapes.Triangle(new Vector(0,1.5,2), 
                                    new Vector(1.5,0,3),
                                    new Vector(0,-1.5,3));
        var c2 = new Shapes.Triangle(new Vector(0,1.5,3), 
                                    new Vector(1.5,0,2),
                                    new Vector(0,-1.5,3));
        var c3 = new Shapes.Triangle(new Vector(0,1.5,3), 
                                    new Vector(1.5,0,3),
                                    new Vector(0,-1.5,2));
        
        assert.deepEqual(CPlot.contour_line_for_triangle(c1, 3), new Shapes.LineSegment(c1.p2, c1.p3));
        assert.deepEqual(CPlot.contour_line_for_triangle(c2, 3), new Shapes.LineSegment(c2.p1, c2.p3));
        assert.deepEqual(CPlot.contour_line_for_triangle(c3, 3), new Shapes.LineSegment(c3.p1, c3.p2));

        // 1 on, 1 above, 1 below.
        var c1 = new Shapes.Triangle(new Vector(0,1.5,2), 
                                    new Vector(1.5,0,3),
                                    new Vector(0,-1.5,4));

        assert.deepEqual(CPlot.contour_line_for_triangle(c1, 3), 
                new Shapes.LineSegment(new Vector(1.5,0,3), new Vector(0,0,3)));

        // 1 above, two below.
        var c1 = new Shapes.Triangle(new Vector(0, 1.5, 4),
                                   new Vector(1.5, 0, 2),
                                   new Vector(0, -1.5, 2));

        assert.deepEqual(CPlot.contour_line_for_triangle(c1, 3),
                new Shapes.LineSegment(new Vector(0.75,0.75,3),
                                  new Vector(0,0,3)));

        // 1 below, two above.
        var c1 = new Shapes.Triangle(new Vector(0, 1.5, 2),
                                   new Vector(1.5, 0, 4),
                                   new Vector(0, -1.5, 4));

        assert.deepEqual(CPlot.contour_line_for_triangle(c1, 3),
                new Shapes.LineSegment(new Vector(0.75,0.75,3),
                                  new Vector(0,0,3)));
        
    });
});
