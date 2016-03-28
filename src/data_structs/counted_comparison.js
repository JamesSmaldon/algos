define([], function() {
    var CountedComparison = function() {
        this.comparison_count = 0;
    }

    CountedComparison.prototype.eq = function(a, b) {
        this.comparison_count++;
        return a === b;
    }

    CountedComparison.prototype.neq = function(a, b) {
        this.comparison_count++;
        return a !== b;
    }

    CountedComparison.prototype.lt = function(a, b) {
        this.comparison_count++;
        return a < b;
    }

    CountedComparison.prototype.lte = function(a, b) {
        this.comparison_count++;
        return a <= b;
    }

    CountedComparison.prototype.gt = function(a, b) {
        this.comparison_count++;
        return a > b;
    }

    CountedComparison.prototype.gte = function(a, b) {
        this.comparison_count++;
        return a >= b;
    }

    return CountedComparison;
});
