const headTab = [ "","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y"];

document.addEventListener("DOMContentLoaded", () => {
  const spreadsheet = document.getElementById("table");
  const rows = 16;
  const cols = headTab.length;

  const head = spreadsheet.createTHead();
  head.classList.add('thead_main')

  const headerRow = head.insertRow();

  headTab.map((head) => {
    const th = document.createElement("th");
    th.textContent = head;
    head[0] ? th.classList.add("thead_th") : th.classList.add("thead_start");
    headerRow.appendChild(th);
    return th;
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
});
