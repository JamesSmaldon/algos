var Ops = Ops || {};

Ops.handlers = {};

Ops.Handler = function(do_f, undo_f) {
    this.do_f = do_f;
    this.undo_f = undo_f;
}

Ops.Handler.prototype.doOp = function(op, a_thing) {
    this.do_f.apply(this, [a_thing].concat(op.args));
}

Ops.Handler.prototype.undoOp = function(op, a_thing) {
    this.undo_f.apply(this, [a_thing].concat(op.args));
}

Ops.ObjHandler = function(do_f, undo_f) {
    this.do_f = do_f;
    this.undo_f = undo_f;
}

Ops.ObjHandler.prototype = new Ops.Handler;
Ops.ObjHandler.prototype.constructor = Ops.ObjHandler;
Ops.ObjHandler.prototype.doOp = function(op, a_thing) {
    this.do_f.apply(a_thing, op.args);
}

Ops.ObjHandler.prototype.undoOp = function(op, a_thing) {
    this.undo_f.apply(a_thing, op.args);
}

Ops.set_op_handler = function(thing_type, op_type, handler) {
    if (Ops.handlers[thing_type] === undefined)
    {
        Ops.handlers[thing_type] = {};
    }
    Ops.handlers[thing_type][op_type] = handler;
}

Ops.tag = function(thing, thing_type) {
    thing.type = thing_type;
}

Ops.doOp = function(thing, op) {
    if (Ops.handlers[thing.type] !== undefined) {
        if (Ops.handlers[thing.type][op.type] !== undefined) {
            Ops.handlers[thing.type][op.type].doOp(op, thing);
        }
    }
}

Ops.undoOp = function(thing, op) {
    if (Ops.handlers[thing.type] !== undefined) {
        if (Ops.handlers[thing.type][op.type] !== undefined) {
            Ops.handlers[thing.type][op.type].undoOp(op, thing);
        }
    }
}

Ops.swap = function(a_idx, b_idx) {
    return { 'type': 'swap', 'args': [a_idx, b_idx] };
}

Ops.partition = function(start_idx, middle_idx, end_idx) {
    return { 'type': 'partition', 'args': [start_idx, middle_idx, end_idx] };
}

Ops.join = function(start_idx, middle_idx, end_idx) {
    return { 'type': 'join', 'args': [start_idx, middle_idx, end_idx] };
}

Ops.focus = function(idx) {
    return { 'type': 'focus', 'args': [idx] };
}

Ops.unfocus = function(idx) { 
    return { 'type': 'unfocus', 'args': [idx] };
}

Ops.finished = function(idx) {
    return { 'type': 'finished', 'args': [idx] };
}

Ops.OpTracker = function() {
    this.operations = [];
}

Ops.OpTracker.prototype.doOp = function(thing, op) {
    Ops.doOp(thing, op);
    this.addOp(op);
}

Ops.OpTracker.prototype.addOp = function(op) {
    this.operations.push(op);
}

Ops.IterOps = function(ops) {
    this.ops = ops.slice(0);
    this.current_op = Math.max(this.ops.length-1, 0);
}

Ops.IterOps.prototype.next = function() {
    if (this.ops.length > 0 && (this.current_op != (this.ops.length-1)))
    {
        this.current_op++;
        return this.ops[this.current_op];
    }

    return null;
}

Ops.IterOps.prototype.prev = function() {
    if ((this.ops.length > 0) && (this.current_op >= 0))
    {
        var op = this.ops[this.current_op];
        this.current_op--;
        return op;
    }

    return null;
}

Ops.IterOps.prototype.initial_state = function(a_thing) {
    var that=this;
    fu.until_false(function(){
        op = that.prev();
        if (op !== null) {
            Ops.doOp(a_thing, op);
            return true;
        }
        return false; 
    });
}

Ops.IterOps.prototype.last_state = function(a_thing) {
    var that=this;
    fu.until_false(function(){ 
        op = that.next();
        if (op !== null) {
            Ops.doOp(a_thing, op);
            return true;
        }
        return false; 
    });
}
