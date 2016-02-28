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

fu.until_false = function(f){
    this.until(this.not(f));
}

fu.range = function(start, end) {
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
    var x = arr_copy.shift();
    return [arr.length > 0, x, xs]; 
}

fu.zero = function(val) {
    return [val === 0];
}

fu.n = function(val) {
    return [val !== 0, val];
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
    var args = Array.apply(null, arguments);
    args.shift();

    return function() {
        var other_args = Array.apply(null, arguments);
        return f.apply(null, args.concat(other_args));
    }
}
