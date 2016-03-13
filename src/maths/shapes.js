var M = M || {}

M.LineSegment = function(start, end) {
    this.type = "line_segment";
    this.start = start;
    this.end = end;
}

M.Plane = function(normal, origin) {
    this.type = "plane";
    this.normal = normal;
    this.origin = origin;
}

M.Triangle = function(p1, p2, p3) {
    this.type = "triangle";
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    this.points = [p1, p2, p3];
}

M.intersection = function(a, b) {
    var line_plane = function(line, plane) {
        var w = line.start.sub(plane.origin);
        var u = line.end.sub(line.start);
        var n = plane.normal;

        return n.scale(-1).dot(w) / n.dot(u);
    }

    var func_table = {};
    func_table['line_segment'] = {'plane': line_plane};
    func_table['plane'] = {'line_segment': fu.swap(line_plane)};

    if (func_table[a.type] !== undefined && 
            func_table[a.type][b.type] !== undefined) {
        return func_table[a.type][b.type](a,b);
    }

    return null;
}
