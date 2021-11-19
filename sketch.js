import createDataSet from "./dataset.js";
import sortNumbers from "./sort.js";

const n = 100000;

let mergeGraphics;
let insertionGraphics;

const colors = [];

function createColors() {
  const whiteColor = 256 ** 3 - 1;
  let counter = 0;
  for (let i = 0; i < n; i++) {
    colors[i] =
      "#" +
      Math.floor((i / (n - 1)) * whiteColor)
        .toString(16)
        .padStart(6, "0");
    if (colors[i] == "#ffffff") counter++;
  }

  console.log(counter);
}

window.setup = () => {
  canvas = createCanvas(innerWidth, innerHeight);
  canvas.position(0, 0);
  createColors();
  background("black");
  mergeGraphics = createGraphics(width, height);
  insertionGraphics = createGraphics(width, height);
  sortNumbers(n);
  frameRate(1);
};

function drawArray(
  array,
  graphics,
  { x: drawX, y: drawY, w: drawWidth, h: drawHeight }
) {
  graphics.background("black");

  for (let y = 0; y < graphics.height; y++) {
    for (let x = 0; x < graphics.width; x++) {
      if (x + y * graphics.width >= array.length) break;
      const e = array[x + y * graphics.width];
      graphics.stroke(colors[e]);
      graphics.point(x, y);
      //console.log(x, y, color);
    }
    if (y * graphics.width >= array.length) break;
  }

  image(graphics, drawX, drawY, drawWidth, drawHeight);

  redraw();
}

function drawInsertion(a) {
  drawArray(a, insertionGraphics, {
    x: 0,
    y: 0,
    w: width,
    h: height,
  });
}

function drawMerge(a) {}
