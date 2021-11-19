import sortNumbers from "./sort.js";

const [insertion, merge] = sortNumbers(100000);

console.log(insertion, merge);

setTimeout(() => console.log(insertion, merge), 2000);
