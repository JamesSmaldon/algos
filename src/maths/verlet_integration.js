define([], {
    integrate: function(prev_pos, pos, force, dt) {
        var vel_inc = pos.sub(prev_pos).add(force.scale(dt*dt));
        return pos.add(vel_inc);
    }
});

