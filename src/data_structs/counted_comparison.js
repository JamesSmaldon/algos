var DU = DU || {}

DU.CountedComparison = function() {
    this.comparison_count = 0;
}

DU.CountedComparison.prototype.eq = function(a, b) {
    this.comparison_count++;
    return a === b;
}

DU.CountedComparison.prototype.neq = function(a, b) {
    this.comparison_count++;
    return a !== b;
}

DU.CountedComparison.prototype.lt = function(a, b) {
    this.comparison_count++;
    return a < b;
}

DU.CountedComparison.prototype.lte = function(a, b) {
    this.comparison_count++;
    return a <= b;
}

DU.CountedComparison.prototype.gt = function(a, b) {
    this.comparison_count++;
    return a > b;
}

DU.CountedComparison.prototype.gte = function(a, b) {
    this.comparison_count++;
    return a >= b;
}

