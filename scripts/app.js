const GRID_WIDTH = 480;
const GRID_CELL_BORDER = 1;
const GRID_DEFAULT_SIZE = 16;
const COLOR_CLEAR = "#f5f5f5";
const BORDER_CLEAR = "1px solid #cccccc";
const COLOR_FILL = "#292929";
const BORDER_FILL = "1px solid black";

let hover_color = COLOR_FILL;
let hover_border = BORDER_FILL;

const gridContainer = document.querySelector("#grid-container");
const gridSizeButton = document.querySelector("#button-grid-size");
// const gridDefaultButton = document.querySelector("#button-default");
// const gridRainbowButton = document.querySelector("#button-rainbow");
// const gridGradientButton = document.querySelector("#button-gradient");
const gridClearButton = document.querySelector("#button-grid-clear");

function generateGrid(numCells) {
  // removes all children if no arguments provided
  gridContainer.replaceChildren();

  for (let i = 0; i < numCells; i++) {
    let row = document.createElement("div");
    row.className = "grid-row";
    for (let j = 0; j < numCells; j++) {
      let cell = document.createElement("div");
      cell.classList.add("grid-cell", "tight-layout");
      cell.style.width = `${(1/numCells)*GRID_WIDTH - 2*GRID_CELL_BORDER}px`
      cell.style.height = `${(1/numCells)*GRID_WIDTH - 2*GRID_CELL_BORDER}px`
      row.appendChild(cell);
    }
    gridContainer.appendChild(row);
  }

  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((gridCell) => {
    gridCell.addEventListener("mouseover", (e) => {
      gridCell.style.backgroundColor = hover_color;
      gridCell.style.border = hover_border;
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

gridClearButton.addEventListener("click", (e) => {
  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((gridCell) => {
    gridCell.style.backgroundColor = COLOR_CLEAR;
    gridCell.style.border = BORDER_CLEAR;
  });
}) 

generateGrid(GRID_DEFAULT_SIZE);