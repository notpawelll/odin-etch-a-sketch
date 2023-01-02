const GRID_WIDTH = 480;
const GRID_CELL_BORDER = 1;

const gridContainer = document.querySelector("#grid-container");

function generateGrid(numCells) {
  for (let i = 0; i < numCells; i++) {
    let row = document.createElement("div");
    row.className = "grid-row";
    for (let j = 0; j < numCells; j++) {
      let cell = document.createElement("div");
      cell.classList.add("grid-cell", "tight-layout", "background-color-whitesmoke");
      cell.style.width = `${(1/numCells)*GRID_WIDTH - 2*GRID_CELL_BORDER}px`
      cell.style.height = `${(1/numCells)*GRID_WIDTH - 2*GRID_CELL_BORDER}px`
      // cell.innerText = i*numCells + j; 
      row.appendChild(cell);
    }
    gridContainer.appendChild(row);
  }
}

generateGrid(64);

const gridCells = document.querySelectorAll(".grid-cell");
gridCells.forEach((gridCell) => {
  gridCell.addEventListener("mouseover", (e) => {
    gridCell.classList.add("background-color-darksmoke");
    gridCell.style.border = "1px solid black";
  });
});