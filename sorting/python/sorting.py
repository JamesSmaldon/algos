__author__ = 'smaldon'


def lomuto_partition(seq, start, end):
    seq_len = len(seq)

    if start < 0 or start >= seq_len:
        raise ValueError("Invalid Start Index")

    if end < 0 or end >= seq_len:
        raise ValueError("Invalid End Index")

    pivot = seq[end]
    i = start
    for j in range(i, end):
        if seq[j] <= pivot:
            seq[j], seq[i] = seq[i], seq[j]
            i += 1

    seq[i], seq[end] = seq[end], seq[i]

    return i

def quicksort(seq):
    def quicksort_inner(seq, start, end):
        if start < end:
            pivot = lomuto_partition(seq, start, end)

            quicksort_inner(seq, 0, pivot-1)
            quicksort_inner(seq, pivot+1, end)

        return seq

    return quicksort_inner(seq, 0, len(seq)-1)
