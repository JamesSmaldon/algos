import unittest

from sorting import middle_element_pivot_index, partition_ranges

__author__ = 'smaldon'


class MiddleElementPivotIndex(unittest.TestCase):
    def testReturnsMinusOneForEmptySeq(self):
        self.assertEqual(middle_element_pivot_index([]), -1)

    def testReturnsZeroForOneElementSeq(self):
        self.assertEqual(middle_element_pivot_index([0]), 0)

    def testReturnsZeroForTwoElementSeq(self):
        self.assertEqual(middle_element_pivot_index([0, 1]), 0)

    def testReturnsMiddleIndexForOddSizedSeq(self):
        self.assertEqual(middle_element_pivot_index([0, 1, 2, 3, 4]), 2)

    def testReturnsLeftMiddleIndexForEvenSizedSeq(self):
        self.assertEqual(middle_element_pivot_index([0, 1, 2, 3]), 1)


class PartitionRanges(unittest.TestCase):
    def testPivotIsFirstElement(self):
        actual = partition_ranges(0, [1, 2, 3, 4])
        expected = None, (1, 3)

        self.assertEqual(actual, expected)

    def testPivotIsLastElement(self):
        actual = partition_ranges(3, [1, 2, 3, 4])
        expected = (0, 2), None

        self.assertEqual(actual, expected)

    def testPivotIsMiddleInEvenSizedSeq(self):
        actual = partition_ranges(1, [1, 2, 3, 4])
        expected = (0, 0), (2, 3)

        self.assertEqual(actual, expected)

    def testPivotIsMiddleInOddSizedSeq(self):
        actual = partition_ranges(2, [1, 2, 3, 4, 5])
        expected = (0, 1), (3, 4)

        self.assertEqual(actual, expected)

    def testPivotIsSecondToLastElement(self):
        actual = partition_ranges(6, [1, 2, 3, 4, 5, 6, 7, 8])
        expected = (0, 5), (7, 7)

        self.assertEqual(actual, expected)

    def testThrowsForSingletonSeq(self):
        with self.assertRaises(ValueError):
            partition_ranges(0, [1])

    def testThrowsForTwoElementSeq(self):
        with self.assertRaises(ValueError):
            partition_ranges(0, [1, 2])

    def testThrowsForNegativePivot(self):
        with self.assertRaises(ValueError):
            partition_ranges(-1, [1, 2])

    def testThrowsForPivotLargerThanSeq(self):
        with self.assertRaises(ValueError):
            partition_ranges(3, [0, 1, 2])

