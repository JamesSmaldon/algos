import unittest

from sorting import lomuto_partition

__author__ = 'smaldon'


class LomutoPartition(unittest.TestCase):
    def test_raises_value_error_for_start_index_out_of_bounds(self):
        with self.assertRaises(ValueError):
            lomuto_partition([1, 2, 3], -1, 0)

        with self.assertRaises(ValueError):
            lomuto_partition([1, 2, 3], 3, 0)

    def test_raises_value_error_for_end_index_out_of_bounds(self):
        with self.assertRaises(ValueError):
            lomuto_partition([1, 2, 3], 0, -1)

        with self.assertRaises(ValueError):
            lomuto_partition([1, 2, 3], 0, 3)

    def test_doesnt_swap_elements_in_two_element_seq(self):
        arr = [0, 1]
        new_pivot = lomuto_partition(arr, 0, 1)

        self.assertEqual(arr, [0, 1])
        self.assertEqual(new_pivot, 1)

    def test_partitions_numbers_in_seq(self):
        arr = [1, 4, 7, 2, 3, 6]

        new_pivot = lomuto_partition(arr, 0, len(arr)-1)
        self.assertEqual(new_pivot, 4)
        self.assertEqual(arr, [1, 4, 2, 3, 6, 7])

    def test_all_smaller_than_pivot(self):
        self.assertEqual(1, lomuto_partition([1, 2], 0, 1))
        self.assertEqual(2, lomuto_partition([1, 2, 3], 0, 2))
        self.assertEqual(3, lomuto_partition([1, 2, 3, 4], 0, 3))

    def test_all_larger_than_pivot(self):
        arr = [5, 6, 7, 8, 4]
        new_pivot = lomuto_partition(arr, 0, 4)

        self.assertEqual(new_pivot, 0)
        self.assertEqual(arr, [4, 6, 7, 8, 5])

    def test_all_the_same_number(self):
        arr = [0, 0, 0, 0]
        new_pivot = lomuto_partition(arr, 0, 3)

        self.assertEqual(new_pivot, 3)
        self.assertEqual(arr, [0, 0, 0, 0])
