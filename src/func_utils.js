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

fu.empty = function(arr) {
    return [arr.length === 0];
}

fu.x_xs = function(arr) {
    var xs = arr.slice(0);
    var x = xs.shift();
    return [arr.length > 0, x, xs]; 
}

fu.zero = function(val) {
    return [val === 0];
}

fu.n = function(val) {
    return [val !== 0, val];
}

fu.eq = function(other_val) {
    return function(val) {
        return [other_val === val, val];
    }
}

fu.match = function(match_specs, val) {
    for (var i=0; i<match_specs.length; ++i) {
        var match = match_specs[i][0](val);
        var matched = match[0];
        if (matched) {
            match.shift();
            return match_specs[i][1].apply(null, match);
        }
    }

    throw "No matches found.";
}

fu.map = function(f, xs) {
    var mapf = function(result, x) {
        result.push(f(x));
        return result;
    }
    return fu.fold(mapf, [], xs);
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
    return fu.match([[fu.empty, function()     { return accum; }],
                     [fu.x_xs,  function(x, xs){ return fu.fold(f, f(accum, x), xs); }]],
                     xs);
} 

fu.repeat = function(count, val) {
    var repeat_ = function(count, val, result) {
        return fu.match([[fu.zero, function() { return result; }],
                         [fu.n,    function(n){ result.unshift(val);
                                                return repeat_(count-1, val, result); }]],
                         count);
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
