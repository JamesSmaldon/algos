var DS = DS || {}

DS.CountedComparison = function() {
    this.comparison_count = 0;
}

DS.CountedComparison.prototype.eq = function(a, b) {
    this.comparison_count++;
    return a === b;
}

DS.CountedComparison.prototype.neq = function(a, b) {
    this.comparison_count++;
    return a !== b;
}

DS.CountedComparison.prototype.lt = function(a, b) {
    this.comparison_count++;
    return a < b;
}

DS.CountedComparison.prototype.lte = function(a, b) {
    this.comparison_count++;
    return a <= b;
}

DS.CountedComparison.prototype.gt = function(a, b) {
    this.comparison_count++;
    return a > b;
}

DS.CountedComparison.prototype.gte = function(a, b) {
    this.comparison_count++;
    return a >= b;
}

