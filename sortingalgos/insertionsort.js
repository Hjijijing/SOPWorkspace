function insertionSort(array) {
  for (let j = 1; j < array.length; j++) {
    let key = array[j];
    let i = j - 1;
    while (i >= 0 && array[i] > key) {
      array[i + 1] = array[i];
      i -= 1;
    }

    array[i + 1] = key;
  }
}

export default insertionSort;

export async function insertionSortDraw(array, drawFunction) {
  for (let j = 1; j < array.length; j++) {
    let key = array[j];
    let i = j - 1;
    while (i >= 0 && array[i] > key) {
      array[i + 1] = array[i];
      await drawFunction({ highlightIndex: i + 1, highlightKey: key });
      i -= 1;
    }

    array[i + 1] = key;
    await drawFunction(i + 1);
  }
}
