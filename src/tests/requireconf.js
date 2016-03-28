QUnit.config.autostart = false;

require.config({
    baseUrl: "../"
});

require(
    ['tests/test_vector',
     'tests/test_func_utils',
     'tests/test_data_utils',
     'tests/test_bubble_sort',
     'tests/test_quick_sort',
     'tests/test_counted_comparison',
     'tests/test_contour_plot',
     'tests/test_verlet_integration'],

    function() {
        QUnit.start();
    }
);
