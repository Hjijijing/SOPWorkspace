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
  for (let i = 0; i < n1; i++) {
    L[i] = A[p + i - 1];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = A[q + j];
  }
  L[n1] = Infinity;
  R[n2] = Infinity;

  let i = 0;
  let j = 0;
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

export default mergeSort;
