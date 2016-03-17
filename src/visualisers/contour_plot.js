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

    var plane = new M.Plane(new M.Vector(0,0,1), new M.Vector(0,0,contour_height));
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
                                           return new M.LineSegment(c_pts[0], intersect_pt); 
                                       }
                                   }

                                   return null;
                                }],
                     [fu.eq(0), function(v) {
                                   var above_pts = above(triangle);  
                                   var below_pts = below(triangle);

                                   if (above_pts.length === 1 && below_pts.length === 2) {
                                       var l1 = new M.LineSegment(below_pts[0], above_pts[0]);
                                       var l2 = new M.LineSegment(below_pts[1], above_pts[0]);

                                       var i1 = M.intersection(l1, plane);
                                       var i2 = M.intersection(l2, plane);

                                       return new M.LineSegment(i1, i2);
                                   }
                                   else if (above_pts.length === 2 && below_pts.length == 1) {
                                       var l1 = new M.LineSegment(below_pts[0], above_pts[0]);
                                       var l2 = new M.LineSegment(below_pts[0], above_pts[1]);

                                       var i1 = M.intersection(l1, plane);
                                       var i2 = M.intersection(l2, plane);

                                       return new M.LineSegment(i1, i2);
                                   }
                                
                                   return null;
                                }]], c_pts.length);
}

View.GridSampler = function(sample_rect, cell_size, f) {
    this.sample_rect = sample_rect;
    this.cell_size = cell_size;
    this.i = 0;
    this.x_samples = (sample_rect.width / cell_size);
    this.y_samples = (sample_rect.height / cell_size);
    this.x = 0;
    this.y = 0;
    this.maxi = this.x_samples * this.y_samples;
    this.f = f;
}

View.GridSampler.prototype.has_next = function() {
    return this.i < (this.maxi-1);
}

View.GridSampler.prototype.next = function() {
    this.i += 1;
    this.x += 1;

    if (this.x >= this.x_samples) {
        this.y += 1;
        this.x = 0;
    }

    var x_c = this.sample_rect.x + this.x * this.cell_size; 
    var y_c = this.sample_rect.y + this.y * this.cell_size;
    
    var bl = new M.Vector(x_c, y_c, f(x_c, y_c));
    var br = new M.Vector(x_c + this.cell_size, y_c, f(x_c+this.cell_size, y_c));
    var tl = new M.Vector(x_c, y_c + this.cell_size, f(x_c, y_c + this.cell_size));
    var tr = new M.Vector(x_c + this.cell_size, y_c + this.cell_size, f(x_c + this.cell_size, y_c + this.cell_size));
    var mid = new M.Vector(x_c + this.cell_size * 0.5, y_c + this.cell_size * 0.5, f(x_c + this.cell_size * 0.5, y_c + this.cell_size * 0.5));

    return [new M.Triangle(bl, br, mid), new M.Triangle(tl, bl, mid), new M.Triangle(tl, tr, mid), new M.Triangle(tr, br, mid)];
}

View.generate_contour_lines = function(sample_rect, cell_size, f, contour_heights) {
    var gs = new View.GridSampler(sample_rect, cell_size, f);

    line_segs = [];
    while (gs.has_next()) {
        var tris = gs.next();

        for (var h=0; h < contour_heights.length; ++h) {
            for (var t=0; t < tris.length; ++t) {
                var cl = View.contour_line_for_triangle(tris[t], contour_heights[h]);
                if (cl != null)
                    line_segs.push(cl);
            }
        }
    }

    return line_segs;
}
