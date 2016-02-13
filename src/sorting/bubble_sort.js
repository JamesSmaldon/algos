var Algos = Algos || {};
Algos.Sorting = Algos.Sorting || {};

Algos.Sorting.BubbleSort = function(sequence){
    this.seq = sequence.copy(); 
    this.comparisons = 0;
}

Algos.Sorting.BubbleSort.prototype.sort = function(seq){
    var sort_data = { comparisons: 0 };

    var n = this.seq.length;
    
    var swapped = false;
    do {
        swapped = false;
        for (var i=1; i<n; ++i) {
            var a = this.seq.at(i-1);
            var b = this.seq.at(i);

            if (a > b)  {
                this.seq.swap(i-1, i);
                swapped = true;
            }
        }
    } while (swapped);

    return this.seq;
}


