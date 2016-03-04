var M = M || {};

//Note: Variadic args
M.Vector = function() {
    this.data = Array.apply(null, arguments); 
}

M.Vector.prototype.size = function() {
    return this.data.length();
}

M.Vector.prototype.add(other) {
    var addf = function(result, x_y) {
        result.push(x_y[0] + x_y[1]);
        return result;
    }
    return fu.fold(addf, [], fu.zip(this.data, other.data));
}


