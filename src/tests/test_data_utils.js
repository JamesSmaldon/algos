define(['utils/data_utils'], function(DU) {
    module("data_utils");
    test("valid idx", function(assert) {
        assert.notOk(DU.valid_idx([], 0));
        assert.notOk(DU.valid_idx([], 1));
        assert.ok(DU.valid_idx([1], 0));
        assert.notOk(DU.valid_idx([1],1));
    });

    test("swap", function(assert) {
        var arr = [1,2,3,4];
        DU.swap(arr, 0, 1);
        assert.deepEqual(arr, [2,1,3,4]);
        arr = [1,2,3,4];
        DU.swap(arr, 0, 0);
        assert.deepEqual(arr, [1,2,3,4]);
        arr = [1,2,3,4];
        DU.swap(arr, -1, 0);
        assert.deepEqual(arr, [1,2,3,4]);
        arr = [1,2,3,4];
        DU.swap(arr, 0, -1);
        assert.deepEqual(arr, [1,2,3,4]);
    });

    test("shuffle", function(assert) {
        // should leave the array intact
        var test_array = [1,2,3,4,5];
        var rnd_index_f = function(current_index) {
            return current_index-1;
        };
        assert.deepEqual(DU.shuffle(test_array, rnd_index_f), [1,2,3,4,5]);

        // should shift the last element to the front 
        test_array = [1,2,3,4,5];
        rnd_index_f = function(current_index) {
            return Math.max(0, current_index-2);
        };

        assert.deepEqual(DU.shuffle(test_array, rnd_index_f), [5,1,2,3,4]);

        // should reverse the array
        test_array = [1,2,3,4,5];
        rnd_index_f = function(current_index) {
            if (current_index > 3)
                return test_array.length - current_index;
            else
                return current_index-1;
        };

        assert.deepEqual(DU.shuffle(test_array, rnd_index_f), [5,4,3,2,1]);

        assert.deepEqual(DU.shuffle([]), []);
    });
});

