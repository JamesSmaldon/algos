define(['utils/func_utils', 
            'maths/utils', 
            'maths/vector', 
            'maths/shapes'], 
        function(fu, math_utils, Vector, Shapes) {

    function points_on_contour(tri, contour_height) {
        return fu.partition(function(p) { return math_utils.float_eq(p.data[2], contour_height); }, tri.points); 
    } 

    function contour_line_for_triangle(triangle, contour_height) {
        function on(tri) {
            return fu.filter(function(p) { return math_utils.float_eq(p.data[2], contour_height); }, tri.points);
        }

        function above(tri) {
            return fu.filter(function(p) { return p.data[2] > contour_height; }, tri.points);
        }

        function below(tri) {
            return fu.filter(function(p) { return p.data[2] < contour_height; }, tri.points);
        }

        var plane = new Shapes.Plane(new Vector(0,0,1), new Vector(0,0,contour_height));
        var c_pts = on(triangle);
        var num_c_pts = c_pts.length;
        var above_pts = above(triangle);
        var below_pts = below(triangle);

        switch(num_c_pts) {
            case 2:
                return new Shapes.LineSegment(c_pts[0], c_pts[1]);
            case 1:
               if (above_pts.length === 1 && below_pts.length === 1) {
                   var l = new Shapes.LineSegment(below_pts[0], above_pts[0]);
                   var intersect_pt = Shapes.intersection(l, plane);
                   if (intersect_pt !== null) {
                       return new Shapes.LineSegment(c_pts[0], intersect_pt); 
                   }
               }

               return null;
            case 0:
               if (above_pts.length === 1 && below_pts.length === 2) {
                   var l1 = new Shapes.LineSegment(below_pts[0], above_pts[0]);
                   var l2 = new Shapes.LineSegment(below_pts[1], above_pts[0]);

                   var i1 = Shapes.intersection(l1, plane);
                   var i2 = Shapes.intersection(l2, plane);

                   return new Shapes.LineSegment(i1, i2);
               }
               else if (above_pts.length === 2 && below_pts.length === 1) {
                   var l1 = new Shapes.LineSegment(below_pts[0], above_pts[0]);
                   var l2 = new Shapes.LineSegment(below_pts[0], above_pts[1]);

                   var i1 = Shapes.intersection(l1, plane);
                   var i2 = Shapes.intersection(l2, plane);

                   return new Shapes.LineSegment(i1, i2);
               }
            
               return null;
            default:
               return null;
        }
    }

    var GridSampler = function(sample_rect, cell_size, f) {
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

    GridSampler.prototype.has_next = function() {
        return this.i < (this.maxi-1);
    }

    GridSampler.prototype.next = function() {
        this.i += 1;
        this.x += 1;

        if (this.x >= this.x_samples) {
            this.y += 1;
            this.x = 0;
        }

        var x_c = this.sample_rect.x + this.x * this.cell_size; 
        var y_c = this.sample_rect.y + this.y * this.cell_size;
        
        var bl = new Vector(x_c, y_c, this.f(x_c, y_c));
        var br = new Vector(x_c + this.cell_size, y_c, this.f(x_c+this.cell_size, y_c));
        var tl = new Vector(x_c, y_c + this.cell_size, this.f(x_c, y_c + this.cell_size));
        var tr = new Vector(x_c + this.cell_size, y_c + this.cell_size, this.f(x_c + this.cell_size, y_c + this.cell_size));
        var mid = new Vector(x_c + this.cell_size * 0.5, y_c + this.cell_size * 0.5, this.f(x_c + this.cell_size * 0.5, y_c + this.cell_size * 0.5));

        return [new Shapes.Triangle(bl, br, mid), new Shapes.Triangle(tl, bl, mid), new Shapes.Triangle(tl, tr, mid), new Shapes.Triangle(tr, br, mid)];
    }

    var generate_contour_lines = function(sample_rect, cell_size, f, contour_heights) {
        var gs = new GridSampler(sample_rect, cell_size, f);

        line_segs = [];
        while (gs.has_next()) {
            var tris = gs.next();

            for (var h=0; h < contour_heights.length; ++h) {
                for (var t=0; t < tris.length; ++t) {
                    var cl = contour_line_for_triangle(tris[t], contour_heights[h]);
                    if (cl != null)
                        line_segs.push(cl);
                }
            }
        }

        return line_segs;
    }
    
    return {
        contour_line_for_triangle: contour_line_for_triangle,
        GridSampler: GridSampler,
        generate_contour_lines: generate_contour_lines
    };
});


