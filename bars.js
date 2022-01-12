import createDataSet, {
  createDataSetRange,
  checkArray,
  compareArrays,
} from "./dataset.js";
import { insertionSortDraw } from "./sortingalgos/insertionsort.js";
import { mergeSortDraw } from "./sortingalgos/mergesort.js";

let maxValue;
let numberOfElements = 20;
let mergeSortDataSet;
let insertionSortDataSet;
let comparison;
const drawDelay = 100;
let mergeHighlight = -1;
let mergeKey = 0;
let insertionHighlight = -1;
let insertionKey = 0;
let highlightColor = "#FF0000C8";
let sortData;
let overlay = false;

window.setup = () => {
  createCanvas(innerWidth, innerHeight).position(0, 0);
  noLoop();

  maxValue = numberOfElements;
  //dataset = createDataSetRange(numberOfElements, 0, maxValue);
  [mergeSortDataSet, comparison] = createDataSet(numberOfElements);
  insertionSortDataSet = [...mergeSortDataSet];
  console.log(mergeSortDataSet);
  drawArray(mergeSortDataSet);

  let p1 = new Promise(async (resolve, reject) => {
    console.log("Beginning merge sort");
    //await insertionSortDraw(dataset, drawArray);
    await mergeSortDraw(
      mergeSortDataSet,
      0,
      mergeSortDataSet.length - 1,
      drawArray
    );
    resolve();
  });
  let p2 = new Promise(async (resolve, reject) => {
    console.log("Beginning insertion sort");
    //await insertionSortDraw(dataset, drawArray);
    await insertionSortDraw(insertionSortDataSet, drawArray);
    resolve();
  });

  Promise.all([p1, p2]).then(() => {
    console.log("Sort done");
    //const correct = checkArray(dataset);
    const correct = comparison
      ? compareArrays(mergeSortDataSet, comparison)
      : checkArray(mergeSortDataSet);
    console.log(`Result: ${correct}`);
    //console.log(dataset);
  });
};

function getColor(number, index, dataSet) {
  if (comparison && comparison[index] == dataSet[index])
    return color(0, 255, 0);
  const ratio = (number / maxValue) * 45 + 55;
  return color(100, ratio, 255);
}

window.draw = () => {
  background("black");

  //Calculates width of one bar
  const barWidth = width / mergeSortDataSet.length;

  if (barWidth > 10) {
    stroke("white");
    strokeWeight(barWidth * 0.1);
  } else noStroke();

  //Draw mergeSort data
  for (let i = 0; i < mergeSortDataSet.length; i++) {
    const mergeColor = getColor(mergeSortDataSet[i], i, mergeSortDataSet);
    fill(mergeColor);
    const value = mergeSortDataSet[i];
    const barHeightMerge = (value / maxValue) * (height / 2);
    rect(i * barWidth, height / 2, barWidth, -barHeightMerge);
  }

  //Draw insertion sort data
  for (let i = 0; i < insertionSortDataSet.length; i++) {
    //Draw InsertionSort data
    const insertinoColor = getColor(
      insertionSortDataSet[i],
      i,
      insertionSortDataSet
    );
    fill(insertinoColor);
    const value = insertionSortDataSet[i];
    const barHeightInsertion = (value / maxValue) * (height / 2);
    rect(i * barWidth, height, barWidth, -barHeightInsertion);
  }

  //Merge Highlight
  fill(highlightColor);
  const mergeBarHeight = (mergeKey / maxValue) * (height / 2);
  rect(mergeHighlight * barWidth, height / 2, barWidth, -mergeBarHeight);

  //Insertion Highlight
  fill(highlightColor);
  const insertionBarHeight = (insertionKey / maxValue) * (height / 2);
  rect(insertionHighlight * barWidth, height, barWidth, -insertionBarHeight);

  //Merge sort bounds
  if (sortData && sortData.mergeSortBounds) {
    const leftBound = sortData.mergeSortBounds[0];
    const rightBound = sortData.mergeSortBounds[1];
    const barHeight = height / 2;
    fill("white");
    rect(
      leftBound * barWidth,
      height / 2,
      Math.max(1, barWidth * 0.3),
      -barHeight
    );
    rect(
      (rightBound + (1 - 0.3)) * barWidth,
      height / 2,
      Math.max(1, barWidth * 0.3),
      -barHeight
    );
  }

  if (overlay) drawOverlay();
};

function drawOverlay() {
  rect(0, height / 2, width, 2);
  textAlign(LEFT, TOP);
  textSize(16);
  text("Merge Sort", 10, 0 + 10);
  text("InsertionSort", 10, height / 2 + 10);
}

async function drawArray({
  mergeHighlightIndex,
  mergeHighlightKey,
  insertionHighlightKey,
  insertionHighlightIndex,
  sortData: data,
}) {
  mergeHighlight = mergeHighlightIndex ?? mergeHighlight;
  mergeKey = mergeHighlightKey ?? mergeKey;
  insertionHighlight = insertionHighlightIndex ?? insertionHighlight;
  insertionKey = insertionHighlightKey ?? insertionKey;
  sortData = data ?? sortData;
  redraw();

  await new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, drawDelay);
  });
}
