document.addEventListener("DOMContentLoaded", () => {
  const buttonAddRow = document.getElementById("button_row");
  const buttonAddColumn = document.getElementById("button_column");

  const headTab = ["", "1", "2", "3", "4"];
  const bodyTab = ["", "1"];

  function addRowOrColumn(isRow) {
    const headTabLength = headTab.length;
    const newValue = headTabLength.toString();
    if (isRow) {
      headTab.push(newValue);
    } else {
      bodyTab.push(newValue);
    }
    renderTable();
  }

  
  buttonAddRow.addEventListener("click", () => addRowOrColumn(true));
  buttonAddColumn.addEventListener("click", () => addRowOrColumn(false));

  function renderTable() {
    const spreadsheet = document.getElementById("table");
    spreadsheet.innerHTML = "";

    const rows = bodyTab.length;
    const cols = headTab.length;

    const head = spreadsheet.createTHead();
    head.classList.add("thead_main");

    const headerRow = head.insertRow();

    headTab.forEach((head) => {
      const th = document.createElement("th");
      th.textContent = head;
      head[0] ? th.classList.add("thead_th") : th.classList.add("thead_start");
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
          cell.contentEditable = false;
          cell.classList.add("tbody_start");
        } else {
          cell.textContent = "";
        }

        cell.addEventListener("dragstart", (event) => {
          event.dataTransfer.setData("text/plain", event.target.textContent);
          event.target.classList.add("selected");
        });

        cell.addEventListener("dragend", (event) => {
          event.target.classList.remove("selected");
        });

        cell.addEventListener("dragover", (event) => {
          event.preventDefault(); // Prevent default to allow drop
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
            droppedCell.textContent = data; // Set data to the target cell
          }
          event.target.classList.remove("dropzone");
        });

        cell.addEventListener("dblclick", () => {
          if (j === 0) return;
          cell.textContent = "";
        });
      }
    }
  }
  renderTable();
});
