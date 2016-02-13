//Data structures namespace
var DS = DS || {};

DS.TrackedArray = function(values) {
    if (typeof values !== "undefined")
    {
        this._data = values.slice();
    }
    else
    {
        this._data = [];
    }

    this.length = this._data.length;
    this.comparisons = 0;
    this.swaps = 0;
    this.gets = 0;
}

DS.TrackedArray.prototype.push = function(val) {
    this._data.push(val);
    this.length = this._data.length;
}

DS.TrackedArray.prototype.pop = function(val) {
    var val = this._data.pop();
    this.length = this._data.length;
    return val;
}

DS.TrackedArray.prototype.asArray = function() {
    return this._data.slice();
}

DS.TrackedArray.prototype.at = function(index) {
    if (this.valid_idx(index))
        this.gets++;

    return this._data[index];
}

DS.TrackedArray.prototype.valid_idx = function(index) {
    return index >=0 && index < this.length;
}

DS.TrackedArray.prototype.swap = function(a_idx, b_idx) {
    if (this.valid_idx(a_idx) && this.valid_idx(b_idx)) {
        var tmp = this._data[a_idx];
        this._data[a_idx] = this._data[b_idx];
        this._data[b_idx] = tmp;
    } 
}

DS.TrackedArray.prototype.copy = function() {
    return new DS.TrackedArray(this._data.slice());
}

DS.TrackedArray.prototype.gt = function(a_idx, b_idx) {
    if (!this.valid_idx(a_idx) || !this.valid_idx(b_idx))
        throw "Invalid index for gt: " + a_idx + "," + b_idx;

    this.comparisons++;

    return this.at(a_idx) > this.at(b_idx);
}
