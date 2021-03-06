import createDataSet, {
  checkArray,
  compareArrays,
  createReverseDataSet,
  createUnshuffledDataSet,
} from "./dataset.js";
import mergeSort from "./sortingalgos/mergesort.js";
import insertionSort from "./sortingalgos/insertionsort.js";
import fs from "fs";

const maxIndex = 11;
const testsPerIteration = 10;

const mergeFileName = "mergebesthigh.csv";
const insertionFileName = "insertionbesthigh2.csv";

const getNumberAmount = function (index) {
  //return 100000 * index; //Used for worst and average
  //return 1000000 * index; //Used for best
  //return 10000 * index; //Used for low
  return 10000000 * index;
};

const getDatasets = function (numberAmount) {
  //const [datasetInsertion, comparison] = createDataSet(numberAmount); //Used for average/random
  //const [datasetInsertion, comparison] = createReverseDataSet(numberAmount); //Used for worst case
  const datasetInsertion = createUnshuffledDataSet(numberAmount); //Used for best case
  const comparison = [...datasetInsertion]; //Used for best case
  const datasetMerge = [...datasetInsertion];
  return [datasetInsertion, datasetMerge, comparison];
};

startSort();

function startSort() {
  const testHeader = [];

  for (let i = 0; i < testsPerIteration; i++) {
    testHeader.push("Test " + (i + 1) + " (ms)");
  }

  const insertionRows = [["Antal test elementer", ...testHeader]];
  const mergeRows = [...insertionRows];

  for (let iteration = 0; iteration < maxIndex; iteration++) {
    const numberAmount = getNumberAmount(iteration);

    const insertionRow = [numberAmount];
    const mergeRow = [numberAmount];

    for (let testNumber = 0; testNumber < testsPerIteration; testNumber++) {
      console.log(
        `Beginning test ${
          testNumber + 1
        } of dataset with ${numberAmount} numbers`
      );

      const [datasetInsertion, datasetMerge, comparison] =
        getDatasets(numberAmount);

      console.log("Beginning insertion sort");
      const insertionTimeBefore = performance.now();
      insertionSort(datasetInsertion);
      const insertionTimeAfter = performance.now();
      const insertionTime = insertionTimeAfter - insertionTimeBefore;
      console.log(`Insertion sort completed in ${insertionTime} ms`);

      console.log("Beginning merge sort");
      const mergeTimeBefore = performance.now();
      mergeSort(datasetMerge, 0, datasetMerge.length - 1);
      const mergeTimeAfter = performance.now();
      const mergeTime = mergeTimeAfter - mergeTimeBefore;
      console.log(`Merge sort completed in ${mergeTime} ms`);

      console.log("Beginning correctness check");
      let fail = false;
      if (!compareArrays(datasetInsertion, comparison)) {
        console.log("Insertion sort failed");
        fail = true;
      }
      if (!compareArrays(datasetMerge, comparison)) {
        console.log("Merge sort failed");
        console.log(datasetMerge);
        fail = true;
      }
      if (fail) {
        console.log("Algorithm failed, aborting...");
        return;
      }
      console.log("Both arrays are sorted");

      insertionRow.push(insertionTime);
      mergeRow.push(mergeTime);

      console.log("Test complete");
    }

    insertionRows.push(insertionRow);
    mergeRows.push(mergeRow);
  }

  writeFiles(insertionRows, mergeRows);
}

function writeFiles(insertionTimes, mergeTimes) {
  let csvInsertion = "";
  for (let i = 0; i < insertionTimes.length; i++) {
    csvInsertion += insertionTimes[i].join(";") + "\n";
  }

  fs.writeFileSync(insertionFileName, csvInsertion);

  let csvMerge = "";
  for (let i = 0; i < mergeTimes.length; i++) {
    csvMerge += mergeTimes[i].join(";") + "\n";
  }

  fs.writeFileSync(mergeFileName, csvMerge);
}

let tidF??r = performance.now();
insertionSort(A);
let tidEfter = performance.now();
print(tidEfter - tidF??r);
