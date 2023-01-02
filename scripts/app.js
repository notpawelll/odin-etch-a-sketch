const GRID_WIDTH = 480;
const GRID_CELL_BORDER = 1;
const GRID_DEFAULT_SIZE = 16;
const COLOR_CLEAR = "#f5f5f5";
const BORDER_CLEAR = "1px solid #cccccc";
const COLOR_FILL = "#292929";
const BORDER_FILL = "1px solid #000000";
const HUE_MIN = 0;
const HUE_MAX = 360;
const HUE_DELTA = 10;

const gridContainer = document.querySelector("#grid-container");
const gridSizeButton = document.querySelector("#button-grid-size");
const gridDefaultButton = document.querySelector("#button-default");
const gridRainbowButton = document.querySelector("#button-rainbow");
const gridGradientButton = document.querySelector("#button-gradient");
const gridClearButton = document.querySelector("#button-grid-clear");

// used by fillRainbow to fill next rainbow color
let rainbowHue = 0;

// used by grid cell "mouseover" event listener to choose cell fill color
let getHoverColors = fillDefault;

// converts css-style rgb string to rgb object
// "rgb([0-255], [0-255], [0-255])" -> {r: [0-255], g: [0-255], b: [0-255]}
function rgbStrToInt(rgbStr) {
  const rgbSplit = rgbStr.split(",");
  const rArr = rgbSplit[0].split("(")
  const r = parseInt(rArr[rArr.length - 1]);
  const g = parseInt(rgbSplit[1]);
  const b = parseInt(rgbSplit[2].split(")")[0]);
  return {
    r: r,
    g: g,
    b: b
  };
}

// converts hsl object to css-style string
// {h: [0-359], s: [0-100], l: [0-100]} -> "hsl([0-359], [0-100]%, [0-100]%)"
function toHSLStr(hsl) {
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
}

// converts css-style rgb string to hsl object
// "rgb([0-255], [0-255], [0-255])" -> {h: [0-359], s: [0-100], l: [0-100]}
// https://css-tricks.com/converting-color-spaces-in-javascript/
function HSLtoRGB(rgbStr) {
  let {r, g, b} = rgbStrToInt(rgbStr);
  r /= 255.0;
  g /= 255.0;
  b /= 255.0;

  let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  // hue
  if (delta === 0) {
    h = 0;
  }
  else if (cmax === r) {
    h = ((g - b)/delta) % 6;
  }
  else if (cmax === g) {
    h = (b - r)/delta + 2;
  }
  else if (cmax === b) {
    h = (r - g)/delta + 4;
  }

  // hue -> [0, 360)
  h = Math.round(60*h);
  if (h < 0) {
    h += 360;
  }

  // lightness
  l = (cmax + cmin)/2;

  // saturation
  s = delta === 0 ? 0 : delta/(1 - Math.abs(2*l - 1));

  // s, l -> percentage
  s = +(100*s).toFixed(1);
  l = +(100*l).toFixed(1);

  return {
    h: parseInt(h),
    s: parseInt(s),
    l: parseInt(l)
  };
}

// returns default colors for grid cell fill
// default: darksmoke + black
function fillDefault(e) {
  return {
    hoverColor: COLOR_FILL,
    hoverBorder: BORDER_FILL
  };
}

// returns rainbow colors for grid cell fill
function fillRainbow(e) {
  const colorFill = `hsl(${rainbowHue}, 100%, 50%)`
  const colorBorder = `hsl(${rainbowHue}, 100%, 30%)`
  rainbowHue = (rainbowHue + HUE_DELTA) % HUE_MAX;
  return {
    hoverColor: `${colorFill}`,
    hoverBorder: `1px solid ${colorBorder}`
  };
}

// returns input grid cell color, minus 10% lightness, for grid cell fill
function fillGradient(e) {
  const target = e.target;
  const backgroundHSL = HSLtoRGB(target.style.backgroundColor);
  const borderHSL = HSLtoRGB(target.style.borderColor);
  backgroundHSL.l = Math.max(0, backgroundHSL.l - 10);
  borderHSL.l = Math.max(0, borderHSL.l - 10);
  return {
    hoverColor: toHSLStr(backgroundHSL),
    hoverBorder: `1px solid ${toHSLStr(borderHSL)}`
  };
}

// generates grid of size [numCells, numCells]
function generateGrid(numCells) {
  // removes all children if no arguments provided
  gridContainer.replaceChildren();

  // generate grid of cells
  for (let i = 0; i < numCells; i++) {
    let row = document.createElement("div");
    row.className = "grid-row";
    for (let j = 0; j < numCells; j++) {
      let cell = document.createElement("div");
      cell.classList.add("grid-cell", "tight-layout");
      cell.style.width = `${(1/numCells)*GRID_WIDTH - 2*GRID_CELL_BORDER}px`
      cell.style.height = `${(1/numCells)*GRID_WIDTH - 2*GRID_CELL_BORDER}px`
      cell.style.backgroundColor = COLOR_CLEAR;
      cell.style.border = BORDER_CLEAR;
      row.appendChild(cell);
    }
    gridContainer.appendChild(row);
  }

  // attach mouseover listener to all cells
  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((gridCell) => {
    gridCell.addEventListener("mouseover", (e) => {
      const {hoverColor, hoverBorder} = getHoverColors(e);
      gridCell.style.backgroundColor = hoverColor;
      gridCell.style.border = hoverBorder;
    });
  });
}

gridSizeButton.addEventListener("click", (e) => {
  const newGridSize = prompt("please enter new grid size in range [1, 100]:");
  const newGridSizeInt = parseInt(newGridSize);
  if (isNaN(newGridSizeInt) || newGridSizeInt < 1 || newGridSize > 100) {
    alert(`please enter an integer in range [1, 100]!\nyour input: ${newGridSize}`);
  }
  else {
    generateGrid(newGridSizeInt);
  }
});

gridDefaultButton.addEventListener("click", (e) => {
  getHoverColors = fillDefault;
});

gridRainbowButton.addEventListener("click", (e) => {
  rainbowHue = 0;
  getHoverColors = fillRainbow;
});


gridGradientButton.addEventListener("click", (e) => {
  getHoverColors = fillGradient;
})

gridClearButton.addEventListener("click", (e) => {
  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((gridCell) => {
    gridCell.style.backgroundColor = COLOR_CLEAR;
    gridCell.style.border = BORDER_CLEAR;
  });
}) 

generateGrid(GRID_DEFAULT_SIZE);
