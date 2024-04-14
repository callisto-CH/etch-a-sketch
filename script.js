function createGrid(num, clearGrid) {
    if (num > 100 || num < 1) {
        alert(`Please enter a number between 1 and 100.`);
        createGridHandler();
    }
    else {
        const container = document.querySelector(`.container`)
        const size = (960 / num) - 1; 
        if (clearGrid) {
            const boxes = document.querySelectorAll(".container div")
            boxes.forEach((box) => {
                container.removeChild(box)
            })
        };
        for (i = 1; i <= num**2; i++) {
            const box = document.createElement(`div`);
            box.style.cssText = `
                border-right: solid black 1px;
                border-bottom: solid black 1px;
                flex: none;
                height: ${size}px;
                width: ${size}px`
            box.addEventListener(`mouseover`, hoverHandler)
            container.appendChild(box);
        };
    };
}

function hoverHandler(event) {
    event.target.style.backgroundColor = `black`;
}

function createGridHandler() {
    createGrid(prompt(`Enter the number of cells on each side of the new grid:`, ``), true);
}

const button = document.querySelector("button");
button.addEventListener(`click`, createGridHandler);

createGrid(16, false);