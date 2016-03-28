define({
    float_eq: function(a, b, delta) {
        if (delta === undefined)
            delta = 0.00000001;

        return Math.abs(a - b) <= delta;
    }
});

