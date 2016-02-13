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

    this.operations = [];
    this.current_op = 0;
}

DS.TrackedArray.prototype.next_op = function() {
    if (this.current_op != this.operations.length)
    {
        var op = this.operations[this.current_op];
        op.doOp(this);
        this.current_op++;
        return true;
    }

    return false;
}

DS.TrackedArray.prototype.prev_op = function() {
    if (this.current_op > 0)
    {
        var op = this.operations[current_op];
        op.undoOp(this);
        this.current_op--;

        return true;
    }

    return false;
}

DS.TrackedArray.Operation = function(do_f, do_f_args, undo_f, undo_f_args) {
    this.do_f = do_f;
    this.do_f_args = do_f_args;
    this.undo_f = undo_f;
    this.undo_f_args = undo_f_args;
    this.state = undefined;
}

DS.TrackedArray.Operation.prototype.doOp = function(tracked_array) {
    this.state = this.do_f.apply(this, [tracked_array].concat(this.do_f_args).concat([this.state])); 
}

DS.TrackedArray.Operation.prototype.undoOp = function(tracked_array) {
    this.undo_f.apply(this, [tracked_array].concat(this.undo_f_args).concat[this.state]);
}

DS.TrackedArray.prototype.push = function(val) {
    var do_f = function(arr, val) {
        arr._data.push(val);
        arr.length++;
    };

    var undo_f = function(arr) {
        var val = this._data.pop();

        if (val_ !== undefined)
        {
            this.length--;
        }
    };

    var op = new DS.TrackedArray.Operation(do_f, [val], undo_f, []);
    this.operations.push(op);

    this.next_op();
}

DS.TrackedArray.prototype.pop = function() {
    var do_f = function(arr) {
        this.state = arr._data.pop();    

        if (this.state !== undefined)
            arr.length--;
    };

    var undo_f = function(arr, val) {
        if (this.state !== undefined) {
            arr._data.push(val);
            arr.length++;
        }
    };

    var op = new DS.TrackedArray.Operation(do_f, [], undo_f, []);
    this.operations.push(op);

    this.next_op();
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