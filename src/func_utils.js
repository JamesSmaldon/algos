var func_utils = func_utils || {};

func_utils.until = function(f){
    var ret = false;

    while (!ret)
    {
        ret = f();
    }
}

func_utils.not = function(f){
    return function() { return !f() };
}

func_utils.until_false = function(f){
    this.until(this.not(f));
}

func_utils.range = function(start, end) {
    var result = [];

    var i = start;
    var f = function() {
        result.push(i);
        return ++i == end;
    };

    this.until(f);

    return result;
}

