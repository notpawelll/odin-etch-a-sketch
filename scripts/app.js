const gridContainer = document.querySelector("#grid-container");

function generateGrid(numCells) {
  for (let i = 0; i < numCells; i++) {
    let row = document.createElement("div");
    row.className = "grid-row";
    for (let j = 0; j < numCells; j++) {
      let cell = document.createElement("div");
      cell.classList.add("grid-cell", "tight-layout", "background-color-whitesmoke");
      cell.innerText = i*numCells + j;
      row.appendChild(cell);
    }
    gridContainer.appendChild(row);
  }
}

generateGrid(16);

const gridCells = document.querySelectorAll(".grid-cell");
gridCells.forEach((gridCell) => {
  gridCell.addEventListener("mouseover", (e) => {
    gridCell.classList.add("background-color-darksmoke");
  });
});