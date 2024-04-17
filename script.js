function createGrid(num, erase) {
    if (num === null) {return}
    if (num < 1 || num > 100 || isNaN(+num)) {
        alert(`Please enter a number between 1 and 100.`);
        createGridHandler();
    }
    else {
        if (erase) {eraseGrid()}
        for (i = 1; i <= num; i++) {
            const row = document.createElement(`div`);
            row.style.cssText = `
                border-top: solid black 1px;
                display: flex;
                flex: 1;`
            if (i == num) {
                row.style.borderBottom = `solid black 1px`;
            }
            for (n = 1; n <= num; n++) {
                const cell = document.createElement(`div`);
                cell.style.cssText = `
                    border-left: solid black 1px;
                    flex: 1;`
                if (n == num) {
                    cell.style.borderRight = `solid black 1px`;
                }
                cell.addEventListener(`mouseenter`, penHandler);
                cell.classList.add(`cell`);
                clearCell(cell);
                row.appendChild(cell);
            }
            container.appendChild(row);
        }
    }
}

function createGridHandler() {
    createGrid(prompt(`Enter the number of cells on each side of the new grid:`, ``), true);
}

function eraseGrid() {
    const rows = document.querySelectorAll(`.container div`);
    rows.forEach((row) => {
        row.remove();
    })
}

function clearGrid() {
    const cells = document.querySelectorAll(`.cell`);
    cells.forEach((cell) => {
        clearCell(cell);
    })
}

function clearCell(cell) {
    cell.style.backgroundColor = `white`;
    cell.style.filter = `brightness(100%)`;
    cell.dataset.brightness = 100;
}

function penHandler(event) {
    if (penType == `black`) {
        event.target.style.backgroundColor = `black`;
    }
    else if (penType == `rainbow`) {
        clearCell(event.target);
        event.target.style.backgroundColor = `
        rgb(${Math.floor(Math.random()*256)}, 
        ${Math.floor(Math.random()*256)}, 
        ${Math.floor(Math.random()*256)}`;
    }
    else if (penType == `darken`) {
        let newBrightness = event.target.dataset.brightness - 10;
        if (newBrightness >= 0) {
            event.target.style.filter = `brightness(${newBrightness}%)`;
            event.target.dataset.brightness = newBrightness;
        }
    }
}

const createNewGridBtn = document.querySelector(`#create-new-grid`);
createNewGridBtn.addEventListener(`click`, createGridHandler);

const clearGridBtn = document.querySelector(`#clear-grid`);
clearGridBtn.addEventListener(`click`, clearGrid);

const penButtons = document.querySelectorAll(`.pen`);
penButtons.forEach((button) => {
    button.addEventListener(`click`, () => {penType = button.id})
})

const container = document.querySelector(`.container`);

createGrid(16, false);

let penType = `black`;

