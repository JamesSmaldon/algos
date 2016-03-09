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
    if (this.size() !== other.size())
        throw "Vectors are different sizes";

    var addf = function(result, x_y) {
        result.push(x_y[0] + x_y[1]);
        return result;
    }
    return new M.Vector(fu.fold(addf, [], fu.zip(this.data, other.data)));
}

M.Vector.prototype.sub = function(other) {
    if (this.size() !== other.size())
        throw "Vectors are different sizes";

    var result = [];

    for (var i=0; i<this.size(); ++i) {
        result.push(this.data[i] - other.data[i]);
    }

    return new M.Vector(result);
}

M.Vector.prototype.dot = function(other) {
    if (this.size() !== other.size())
        throw "Vectors are different sizes";

    var result = 0.0;
    for (var i = 0; i<this.size(); ++i) {
        result += this.data[i] * other.data[i]; 
    }

    return result;
}

M.Vector.prototype.scale = function(val) {
    var result = [];

    for (var i=0; i<this.size(); ++i) {
        result.push(this.data[i] * val);
    }

    return new M.Vector(result);
}

M.Vector.prototype.length = function() {
    return Math.sqrt(this.dot(this)); 
}

M.Vector.prototype.unit = function() {
    var len = this.length();

    if (len == 0.0)
        return new M.Vector(0.0, 0.0, 0.0);
    
    return this.scale(1.0 / len);
}
