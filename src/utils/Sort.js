const defaultComparator = (a, b) => { return a - b }

const QuickSort = (
  unsortedArray,
  comparator = defaultComparator
) => {
  const sortedArray = [...unsortedArray];
  const recursiveSort = (start, end) => {
    if (end - start < 1) {
      return;
    }
    const pivotValue = sortedArray[end];
    let splitIndex = start;
    for (let i = start; i < end; i++) {
      const sort = comparator(sortedArray[i], pivotValue);
      if (sort === -1) {
        if (splitIndex !== i) {
          const temp = sortedArray[splitIndex];
          sortedArray[splitIndex] = sortedArray[i];
          sortedArray[i] = temp;
        }
        splitIndex++;
      }
    }

    sortedArray[end] = sortedArray[splitIndex];
    sortedArray[splitIndex] = pivotValue;

    recursiveSort(start, splitIndex - 1);
    recursiveSort(splitIndex + 1, end);
  };
  recursiveSort(0, unsortedArray.length - 1);
  return sortedArray;
};

module.exports = QuickSort;