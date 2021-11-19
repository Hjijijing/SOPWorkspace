function mergeSort(A, p, r) {
  if (p < r) {
    let q = Math.floor((p + r) / 2);
    mergeSort(A, p, q);
    mergeSort(A, q + 1, r);
    merge(A, p, q, r);
  }
}

function merge(A, p, q, r) {
  let n1 = q - p + 1;
  let n2 = r - q;
  let L = [];
  let R = [];
  for (let i = 1; i <= n1; i++) {
    L[i] = A[p + i - 1];
  }
  for (let j = 1; j <= n2; j++) {
    R[j] = A[q + j];
  }
  L[n1 + 1] = Infinity;
  R[n2 + 1] = Infinity;

  let i = 1;
  let j = 1;
  for (let k = p; k <= r; k++) {
    if (L[i] <= R[j]) {
      A[k] = L[i];
      i += 1;
    } else {
      A[k] = R[j];
      j += 1;
    }
  }
}

async function mergeDraw(A, p, q, r, drawArray) {
  let n1 = q - p + 1;
  let n2 = r - q;
  let L = [];
  let R = [];
  for (let i = 1; i <= n1; i++) {
    L[i] = A[p + i - 1];
  }
  for (let j = 1; j <= n2; j++) {
    R[j] = A[q + j];
  }
  L[n1 + 1] = Infinity;
  R[n2 + 1] = Infinity;

  let i = 1;
  let j = 1;
  for (let k = p; k <= r; k++) {
    if (L[i] <= R[j]) {
      A[k] = L[i];
      await drawArray({
        highlightIndex: k,
        highlightKey: A[k],
        sortData: { mergeSortBounds: [p, r] },
      });
      i += 1;
    } else {
      A[k] = R[j];
      await drawArray({
        highlightIndex: k,
        highlightKey: A[k],
        sortData: { mergeSortBounds: [p, r] },
      });
      j += 1;
    }
  }
}

export async function mergeSortDraw(A, p, r, drawArray) {
  if (p < r) {
    let q = Math.floor((p + r) / 2);
    await mergeSortDraw(A, p, q, drawArray);
    await mergeSortDraw(A, q + 1, r, drawArray);
    await mergeDraw(A, p, q, r, drawArray);
  }
}

export default mergeSort;
