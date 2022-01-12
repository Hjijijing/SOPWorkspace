export default function createDataSet(numberOfElements) {
  const result = createUnshuffledDataSet(numberOfElements);
  const comparison = [...result];
  shuffleArray(result);

  return [result, comparison];
}

export function createUnshuffledDataSet(numberOfElements) {
  let result = [];
  for (let i = 0; i < numberOfElements; i++) {
    result[i] = i;
  }
  return result;
}

export function createUnshuffledDataSetWithComparison(numberOfElements) {
  let result = createUnshuffledDataSet(numberOfElements);
  let comparison = [...result];
  return [result, comparison];
}

export function createReverseDataSet(numberofElements) {
  const result = [];
  for (let i = 0; i < numberofElements; i++) {
    result.push(numberofElements - i - 1);
  }
  const comparison = createUnshuffledDataSet(numberofElements);
  return [result, comparison];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function compare(array, numberOfElements) {
  for (let i = 0; i < numberOfElements; i++) {
    if (array[i] != i) return false;
  }
  return true;
}

export function checkArray(array) {
  if (array.length < 2) return true;
  let prev = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < prev) return false;
    prev = array[i];
  }
  return true;
}

export function compareArrays(dataset, comparison) {
  if (dataset.length != comparison.length) return false;
  for (let i = 0; i < dataset.length; i++) {
    if (dataset[i] != comparison[i]) return false;
  }
  return true;
}

export function createDataSetRange(numberOfElements, minValue, maxValue) {
  const result = [];
  for (let i = 0; i < numberOfElements; i++) {
    result.push(Math.random() * (maxValue - minValue) + minValue);
  }
  shuffleArray(result);
  return result;
}
