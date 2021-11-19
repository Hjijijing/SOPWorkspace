import createDataSet, {
  createDataSetRange,
  checkArray,
  compareArrays,
} from "./dataset.js";
import { insertionSortDraw } from "./sortingalgos/insertionsort.js";
import { mergeSortDraw } from "./sortingalgos/mergesort.js";

let maxValue;
let numberOfElements = 400;
let dataset;
let comparison;
const drawDelay = 0;
let highlight = -1;
let key = 0;
let highlightColor = "#FF0000C8";
let sortData;

window.setup = () => {
  createCanvas(innerWidth, innerHeight).position(0, 0);
  noLoop();

  maxValue = numberOfElements;
  //dataset = createDataSetRange(numberOfElements, 0, maxValue);
  [dataset, comparison] = createDataSet(numberOfElements);
  console.log(dataset);
  drawArray(dataset);

  new Promise(async (resolve, reject) => {
    console.log("Beginning sort");
    //await insertionSortDraw(dataset, drawArray);
    await mergeSortDraw(dataset, 0, dataset.length - 1, drawArray);
    resolve();
  }).then(() => {
    console.log("Sort done");
    //const correct = checkArray(dataset);
    const correct = comparison
      ? compareArrays(dataset, comparison)
      : checkArray(dataset);
    console.log(`Result: ${correct}`);
    //console.log(dataset);
  });
};

function getColor(number, index) {
  if (comparison && comparison[index] == dataset[index])
    return color(0, 255, 0);
  const ratio = (number / maxValue) * 45 + 55;
  return color(100, ratio, 255);
}

window.draw = () => {
  background("black");
  noStroke();

  //Calculates width of one bar
  const barWidth = width / dataset.length;

  for (let i = 0; i < dataset.length; i++) {
    const color = getColor(dataset[i], i);
    fill(color);
    const value = dataset[i];
    const barHeight = (value / maxValue) * height;
    rect(i * barWidth, height, barWidth, -barHeight);
  }

  //Highlight
  fill(highlightColor);
  const barHeight = (key / maxValue) * height;
  rect(highlight * barWidth, height, barWidth, -barHeight);

  //Merge sort bounds
  if (sortData && sortData.mergeSortBounds) {
    const leftBound = sortData.mergeSortBounds[0];
    const rightBound = sortData.mergeSortBounds[1];
    const barHeight = height;
    fill("white");
    rect(leftBound * barWidth, height, Math.max(1, barWidth * 0.3), -barHeight);
    rect(
      (rightBound + (1 - 0.3)) * barWidth,
      height,
      Math.max(1, barWidth * 0.3),
      -barHeight
    );
  }
};

async function drawArray({ highlightIndex, highlightKey, sortData: data }) {
  highlight = highlightIndex;
  key = highlightKey;
  sortData = data;
  redraw();

  await new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, drawDelay);
  });
}
