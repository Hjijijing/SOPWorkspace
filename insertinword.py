INSERTION-SORT(A)
for j = 2 to A.length
    key = A[j]
    i = j - 1
    while i > 0 and A[i] > key
        A[i+1] = A[i]
        i = i - 1
    A[i+1] = key



MERGE(A,p,q,r)
n1 = q - p + 1
n2 = r - q
lad L[1..n1+1] og R[1..n2+1] være nye lister
for i = 1 to n1
    L[i] = A[p + i - 1]
for j = 1 to n2
    R[i] = A[q+j]
L[n1+1] = ∞
R[n2+1] = ∞
i = 1
j = 1
for k = p to r
    if L[i] <= R[j]
        A[k] = L[i]
        i = i + 1
    else
        A[k] = R[j]
        j = j + 1



MERGE-SORT(A,p,r)
if p < r
    q = ⌊(p+r)/2⌋
    MERGE-SORT(A, p, q)
    MERGE-SORT(A, q+1, r)
    MERGE(A, p, q, r)
