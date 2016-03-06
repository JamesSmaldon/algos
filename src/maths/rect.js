var M = M || {};

M.Rect = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

M.Rect.prototype.map = function(v, v_rect) {
    var norm_x = (v.data[0] - v_rect.x) / v_rect.width;
    var norm_y = (v.data[1] - v_rect.y) / v_rect.height;

    return new M.Vector(this.x + norm_x * this.width,
                        this.y + norm_y * this.height);
}
