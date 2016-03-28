var fu = fu || {};

fu.until = function(f){
    var ret = false;

    while (!ret)
    {
        ret = f();
    }
}

fu.not = function(f){
    return function() { return !f() };
}

fu.id = function(v) {
    return v;
}

fu.swap = function(f) {
    return function(a,b) {
        return f(b,a);
    }
}

fu.compose = function(f, g) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return g(f.apply(null, args));
    }
}

fu.until_false = function(f){
    this.until(this.not(f));
}

fu.range = function(start, end) {
    if (start > end)
        throw "Start of range greater than end.";

    if (start === end)
        return [];


    var result = [];

    var i = start;
    var f = function() {
        result.push(i);
        return ++i == end;
    };

    this.until(f);

    return result;
}

fu.map = function(f, xs) {
    var mapf = function(result, x) {
        result.push(f(x));
        return result;
    }
    return fu.fold(mapf, [], xs);
}

fu.filter = function(f, xs) {
    var filterf = function(result, x) {
        if (f(x)) {
            result.push(x);
        }
        return result;
    }
    return fu.fold(filterf, [], xs);
}

fu.partition = function(f, xs) {
    var filterf = function(result, x) {
        if (f(x)) {
            result[0].push(x);
        }
        else {
            result[1].push(x);
        }
        return result;
    }
    return fu.fold(filterf, [[],[]], xs);
}

fu.zip = function(xs, ys) {
    var min_idx = Math.min(xs.length, ys.length);
    var result = [];

    for (var i=0; i<min_idx; ++i){
        result.push([xs[i], ys[i]]);    
    }

    return result;
}

fu.fold = function(f, accum, xs) {
    function fold_(f, accum, xs) {
        if (xs.length === 0) {
            return accum;
        }
        else {
            var x = xs.shift();
            return fold_(f, f(accum, x), xs);
        }
    }

    // Clone the array so that it's not destroyed.
    var xs_copy = xs.slice(0);
    return fold_(f, accum, xs_copy);
} 

fu.repeat = function(count, val) {
    var repeat_ = function(count, val, result) {
        if (count === 0) {
            return result;
        }
        else {
            result.unshift(val);
            return repeat_(count-1, val, result);
        }
    }

    return repeat_(count, val, []);
}

//Note: Variadic arguments
fu.bind = function(f) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();

    return function() {
        var other_args = Array.prototype.slice.call(arguments);
        return f.apply(null, args.concat(other_args));
    }
}

//Note: Variadic arguments
fu.obind = function(f) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();

    return function() {
        var other_args = Array.prototype.slice.call(arguments);
        var all_args = args.concat(other_args);
        var o = all_args.shift();
        return f.apply(o, all_args);
    }
}
