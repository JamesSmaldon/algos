var View = View || {};

function points_on_contour(tri, contour_height) {
    return fu.partition(function(p) { return M.float_eq(p.data[2], contour_height); }, tri.points); 
} 

View.contour_line_for_triangle = function(triangle, contour_height) {
    function on(tri) {
        return fu.filter(function(p) { return M.float_eq(p.data[2], contour_height); }, tri.points);
    }

    function above(tri) {
        return fu.filter(function(p) { return p.data[2] > contour_height; }, tri.points);
    }

    function below(tri) {
        return fu.filter(function(p) { return p.data[2] < contour_height; }, tri.points);
    }

    var plane = M.Plane(M.Vector(0,1,0), M.Vector(0,contour_height, 0));
    var c_pts = on(triangle);

    return fu.match([[fu.eq(3), function(v) { return null; }],
                     [fu.eq(2), function(v) {
                                   return new M.LineSegment(c_pts[0], 
                                                            c_pts[1]);
                                }],
                     [fu.eq(1), function(v) {
                                   var above_pts = above(triangle);
                                   var below_pts = below(triangle);

                                   if (above_pts.length === 1 && below_pts.length === 1) {
                                       var l = new M.LineSegment(below_pts[0], above_pts[0]);
                                       var intersect_pt = M.intersection(l, plane);
                                       if (intersect_pt !== null) {
                                           return M.LineSegment(c_pts[0], intersect_pt); 
                                       }
                                   }

                                   return null;
                                }],
                     [fu.eq(0), function(v) {
                                   var above_pts = above(triangle);  
                                   var below_pts = below(triangle);

                                   if (above_pts.length === 1 && below_pts.length === 2) {
                                       var l1 = M.LineSegment(below_pts[0], above_pts[0]);
                                       var l2 = M.LineSegment(below_pts[1], above_pts[0]);

                                       var i1 = M.intersection(l1, plane);
                                       var i2 = M.intersection(l2, plane);

                                       return M.LineSegment(i1, i2);
                                   }
                                
                                   return null;
                                }]], c_pts.length);
}
