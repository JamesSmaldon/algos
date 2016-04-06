define(['utils/func_utils'], function(fu) {
    var handlers = {};

    var doOp = function(thing, op) {
        if (handlers[thing.type] !== undefined) {
            if (handlers[thing.type][op.type] !== undefined) {
                handlers[thing.type][op.type].doOp(op, thing);
            }
        }
    };

    var undoOp = function(thing, op) {
        if (handlers[thing.type] !== undefined) {
            if (handlers[thing.type][op.type] !== undefined) {
                handlers[thing.type][op.type].undoOp(op, thing);
            }
        }
    };

    var Handler = function(do_f, undo_f) {
        this.do_f = do_f;
        this.undo_f = undo_f;
    }

    Handler.prototype.doOp = function(op, a_thing) {
        this.do_f.apply(this, [a_thing].concat(op.args));
    }

    Handler.prototype.undoOp = function(op, a_thing) {
        this.undo_f.apply(this, [a_thing].concat(op.args));
    }

    var ObjHandler = function(do_f, undo_f) {
        this.do_f = do_f;
        this.undo_f = undo_f;
    }

    ObjHandler.prototype = new Handler;
    ObjHandler.prototype.constructor = ObjHandler;
    ObjHandler.prototype.doOp = function(op, a_thing) {
        this.do_f.apply(a_thing, op.args);
    }

    ObjHandler.prototype.undoOp = function(op, a_thing) {
        this.undo_f.apply(a_thing, op.args);
    }


    var OpTracker = function() {
        this.operations = [];
    }

    OpTracker.prototype.doOp = function(thing, op) {
        doOp(thing, op);
        this.addOp(op);
    }

    OpTracker.prototype.addOp = function(op) {
        this.operations.push(op);
    }

    var IterOps = function(ops) {
        this.ops = ops.slice(0);
        this.current_op = Math.max(this.ops.length-1, 0);
    }

    IterOps.prototype.next = function() {
        if (this.ops.length > 0 && (this.current_op != (this.ops.length-1)))
        {
            this.current_op++;
            return this.ops[this.current_op];
        }

        return null;
    }

    IterOps.prototype.prev = function() {
        if ((this.ops.length > 0) && (this.current_op >= 0))
        {
            var op = this.ops[this.current_op];
            this.current_op--;
            return op;
        }

        return null;
    }

    IterOps.prototype.initial_state = function(a_thing) {
        var that=this;
        fu.until_false(function(){
            op = that.prev();
            if (op !== null) {
                doOp(a_thing, op);
                return true;
            }
            return false; 
        });
    }

    IterOps.prototype.last_state = function(a_thing) {
        var that=this;
        fu.until_false(function(){ 
            op = that.next();
            if (op !== null) {
                doOp(a_thing, op);
                return true;
            }
            return false; 
        });
    }

    return {
        IterOps: IterOps,
        Handler: Handler,
        ObjHandler: ObjHandler,
        OpTracker: OpTracker,
        IterOps: IterOps,

        set_op_handler: function(thing_type, op_type, handler) {
            if (handlers[thing_type] === undefined)
            {
                handlers[thing_type] = {};
            }
            handlers[thing_type][op_type] = handler;
        },

        tag: function(thing, thing_type) {
            thing.type = thing_type;
        },

        doOp: doOp,
        undoOp: undoOp,

        swap: function(a_idx, b_idx) {
            return { 'type': 'swap', 'args': [a_idx, b_idx] };
        },

        partition: function(start_idx, middle_idx, end_idx) {
            return { 'type': 'partition', 'args': [start_idx, middle_idx, end_idx] };
        },

        join: function(start_idx, middle_idx, end_idx) {
            return { 'type': 'join', 'args': [start_idx, middle_idx, end_idx] };
        },

        focus: function(idx) {
            return { 'type': 'focus', 'args': [idx] };
        },

        unfocus: function(idx) { 
            return { 'type': 'unfocus', 'args': [idx] };
        },

        finished: function(idx) {
            return { 'type': 'finished', 'args': [idx] };
        }
    };
});

