var M = M || {};

//Note: Variadic args
M.Vector = function() {
    if (arguments.length === 1 && arguments[0] instanceof Array) {
        this.data = arguments[0].slice(0);
    }
    else {
        this.data = Array.apply(null, arguments); 
    }
}

M.Vector.prototype.size = function() {
    return this.data.length;
}

M.Vector.prototype.eq = function(other) {
    if (this.size() !== other.size())
        return false;

    for (var i=0; i<this.size(); ++i){
        if (Math.abs(this.data[i] - other.data[i]) > 0.00000001)
            return false;
    }

    return true;
}

M.Vector.prototype.add = function(other) {
    var addf = function(result, x_y) {
        result.push(x_y[0] + x_y[1]);
        return result;
    }
    return new M.Vector(fu.fold(addf, [], fu.zip(this.data, other.data)));
}

