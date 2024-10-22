

const headTab = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

document.addEventListener("DOMContentLoaded", () => {
    const spreadsheet = document.getElementById("table");
    const rows = 13; 
    const cols = 14; 

    const head = spreadsheet.createTHead(); 
    const headerRow = head.insertRow(); 
    for (let j = 0; j < cols; j++) {
        const th = document.createElement("th"); 
        th.textContent = headTab[j];
        th.classList.add("thead_th");
        headerRow.appendChild(th); 
    }

    const body = spreadsheet.createTBody(); 
    for (let i = 0; i < rows; i++) {
        const row = body.insertRow();
        
        for (let j = 0; j < cols; j++) {
            const cell = row.insertCell(); 
            cell.contentEditable = true;  
            cell.draggable = true;

            cell.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData('text/plain', event.target.textContent);
                event.target.classList.add('selected');
            });

            cell.addEventListener("dragend", (event) => {
                event.target.classList.remove('selected');
            });

            cell.addEventListener("dragover", (event) => {
                event.preventDefault(); // Prevent default to allow drop
                event.target.classList.add('dropzone');
            });

            cell.addEventListener("dragleave", (event) => {
                event.target.classList.remove('dropzone');
            });

            cell.addEventListener("drop", (event) => {
                event.preventDefault();
                const data = event.dataTransfer.getData('text/plain');
                const droppedCell = event.target;
                if (droppedCell !== null) {
                    droppedCell.textContent = data; // Set data to the target cell
                }
                event.target.classList.remove('dropzone');
            });


            cell.addEventListener('dblclick', () => {
                cell.textContent = ''; // Clear the cell content
            });


        }
    }
})