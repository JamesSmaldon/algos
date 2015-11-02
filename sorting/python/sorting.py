__author__ = 'smaldon'


def middle_element_pivot_index(seq):
    # empty sequence case
    if not seq:
        return -1

    half_seq_len = len(seq) / 2.0

    return int(half_seq_len - 0.5)


def partition_ranges(pivot, seq):
    seq_len = len(seq)

    if seq_len < 3:
        raise ValueError('partition_range sequence smaller than 2')

    if pivot < 0 or pivot >= seq_len:
        raise ValueError('partition_range invalid pivot')

    last_index = seq_len - 1
    left_part = None if pivot == 0 else (0, pivot - 1)
    right_part = None if pivot == last_index else (pivot + 1, last_index)

    return left_part, right_part

def exchange_elements(pivot, partitions, seq):
    pass

def quicksort(seq):
    pass



