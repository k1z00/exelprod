import { v4 as uuidv4 } from "uuid";

const buttonAddRow = document.getElementById("button_row");
const buttonAddColumn = document.getElementById("button_column");
const buttonRemoveRow = document.getElementById("button_delete_row");
const buttonRemoveColumn = document.getElementById("button_delete_column");

const headTab = ["", "1", "2", "3", "4"];
let bodyTab = Array.from({ length: 1 }, () =>
  Array.from({ length: headTab.length }, () => ({ value: "", id: uuidv4() }))
);

export function renderTable() {
  const spreadsheet = document.getElementById("table");
  spreadsheet.innerHTML = "";

  const rows = bodyTab.length;
  const cols = headTab.length;

  const head = spreadsheet.createTHead();
  head.classList.add("thead_main");

  const headerRow = head.insertRow();
  headTab.forEach((headContent) => {
    const th = document.createElement("th");
    th.textContent = headContent;
    headContent[0]
      ? th.classList.add("thead_th")
      : th.classList.add("thead_start");
    headerRow.appendChild(th);
  });

  const body = spreadsheet.createTBody();
  for (let i = 0; i < rows; i++) {
    const row = body.insertRow();

    for (let j = 0; j < cols; j++) {
      const cell = row.insertCell();
      cell.contentEditable = true;
      cell.draggable = true;

      if (j === 0) {
        cell.textContent = i + 1;
        cell.draggable = false;
        cell.contentEditable = false;
        cell.classList.add("tbody_start");
      } else {
        const cellValue =  bodyTab[i][j - 1].value.trim();
        cell.textContent =  cellValue;
        cell.id = bodyTab[i][j - 1].id;
      }

      cell.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", event.target.textContent);
        event.target.classList.add("selected");
      });

      cell.addEventListener("dragend", (event) => {
        event.target.classList.remove("selected");
      });

      cell.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.target.classList.add("dropzone");
      });

      cell.addEventListener("dragleave", (event) => {
        event.target.classList.remove("dropzone");
      });

      cell.addEventListener("drop", (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");
        const droppedCell = event.target;
        if (droppedCell !== null) {
          droppedCell.textContent = data;
          const rowIndex = droppedCell.parentElement.rowIndex;
          const colIndex = droppedCell.cellIndex - 1;
          bodyTab[rowIndex][colIndex].value = data;
        }
        event.target.classList.remove("dropzone");
      });

      cell.addEventListener("dblclick", () => {
        if (j === 0) return;
        cell.textContent = "";
        const rowIndex = cell.parentElement.rowIndex;
        const colIndex = cell.cellIndex - 1;
        bodyTab[rowIndex][colIndex].value = cell.textContent;
      });

      cell.addEventListener("input", (event) => {
        const rowIndex = cell.parentElement.rowIndex;
        const colIndex = cell.cellIndex - 1;
        bodyTab[rowIndex][colIndex].value = cell.textContent;
      });
    }
  }
}

function addRowOrColumn(isRow) {
  if (isRow) {
    const newRow = Array.from(
      { length: headTab.length },
      () => ({ value: "", id: uuidv4() })
    );
    
    bodyTab = [...bodyTab, newRow];
  } else {
    headTab.push(headTab.length.toString());
    bodyTab.forEach((row) => {
      row.push({ value: "", id: uuidv4() });
    });
    console.log(bodyTab);
  }
  renderTable();
}

function removeRowOrColumn(isRow) {
  if (isRow) {
    if (bodyTab.length > 1) {
      bodyTab.pop();
    }
  } else {
    if (headTab.length > 1) {
      headTab.pop();
      bodyTab.forEach((row) => row.pop());
    }
  }
  renderTable();
}


export function setupEventListeners() {
  buttonAddRow.addEventListener("click", () => addRowOrColumn(true));
  buttonAddColumn.addEventListener("click", () => addRowOrColumn(false));
  buttonRemoveRow.addEventListener("click", () => removeRowOrColumn(true));
  buttonRemoveColumn.addEventListener("click", () => removeRowOrColumn(false));
}

console.log("headTab:", headTab);
console.log("bodyTab:", bodyTab);