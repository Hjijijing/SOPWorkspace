function insertionSort(A) {
  for (let j = 1; j < A.length; j++) {
    let key = A[j];
    let i = j - 1;
    while (i >= 0 && A[i] > key) {
      A[i + 1] = A[i];
      i -= 1;
    }
    A[i + 1] = key;
  }
}

export default insertionSort;

export async function insertionSortDraw(array, drawFunction) {
  for (let j = 1; j < array.length; j++) {
    let key = array[j];
    let i = j - 1;
    while (i >= 0 && array[i] > key) {
      array[i + 1] = array[i];
      await drawFunction({
        insertionHighlightIndex: i + 1,
        insertionHighlightKey: key,
      });
      i -= 1;
    }

    array[i + 1] = key;
    await drawFunction(i + 1);
  }
}
