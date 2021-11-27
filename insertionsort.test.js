import insertionSort from "./sortingalgos/insertionsort.js";
import mergeSort from "./sortingalgos/mergesort2.js";
import createDataSet, { checkArray } from "./dataset.js";

const [datasetInsertion, comparison] = createDataSet(100);
const datasetMerge = [...datasetInsertion];

insertionSort(datasetInsertion);
mergeSort(datasetMerge, 0, datasetMerge.length - 1);

let fail = false;
if (!checkArray(datasetInsertion, comparison)) {
  console.log("Insertion sort failed");
  fail = true;
}

if (!checkArray(datasetMerge, comparison)) {
  console.log("Merge sort failed");
  fail = true;
}

if (!fail) {
  console.log("Both completed");
}
