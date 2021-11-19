import createDataSet, { compare } from "./dataset.js";
import insertionSort from "./sortingalgos/insertionsort.js";
import mergeSort from "./sortingalgos/mergesort.js";

async function sortWithMergeSort(dataset) {
  console.log("Merge sort started");
  await mergeSort(dataset, 0, dataset.length - 1);
  console.log("Merge sort finished");
}

async function sortWithInsertionSort(dataset) {
  console.log("Insertion sort started");
  await insertionSort(dataset);
  console.log("Insertion sort finished");
}

export default function sortNumbers(n) {
  const datasetForInsertion = createDataSet(n);
  const datasetForMerge = [...datasetForInsertion];

  //Prints the datasets to confirm that they are randomized but also equal
  console.log(`Sorting ${n} numbers`);
  //console.log(datasetForInsertion);

  console.log("Before promise is called");

  let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      sortWithMergeSort(datasetForMerge);
      resolve();
    }, 100);
  });

  let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      sortWithInsertionSort(datasetForInsertion);
      resolve();
    }, 100);
  });

  Promise.all([p1, p2]).then(() => {
    console.log("Sorting finished");
  });

  console.log("After promise is called");
}
