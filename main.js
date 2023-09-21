const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext("2d");

let prevX = null;
let prevY = null;

ctx.lineWidth = 5;

let draw = false;

let drawingHistory = [];
let undoneHistory = []; // Store undone strokes

let currentStroke = {
    color: ctx.strokeStyle,
    paths: [],
};

// Function to redraw the canvas based on the drawing history
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawingHistory.forEach((stroke) => {
        ctx.strokeStyle = stroke.color;
        stroke.paths.forEach((path) => {
            ctx.beginPath();
            ctx.moveTo(path.startX, path.startY);
            ctx.lineTo(path.endX, path.endY);
            ctx.stroke();
        });
    });

    // Restore the current color
    ctx.strokeStyle = currentStroke.color;
}

let clrs = document.querySelectorAll(".clr");
clrs = Array.from(clrs);
clrs.forEach((clr) => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr;
        currentStroke.color = clr.dataset.clr; // Update the current color
    });
});

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawingHistory = []; // Clear the drawing history
    undoneHistory = []; // Clear the undone history
});

// Saving drawing as image
let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("image/png");
    let a = document.createElement("a");
    a.href = data;
    a.download = "sketch.png";
    a.click();
});

window.addEventListener("mousedown", (e) => {
    draw = true;

    // Start a new stroke with the current color
    currentStroke = {
        color: ctx.strokeStyle,
        paths: [],
    };
});

window.addEventListener("mouseup", (e) => {
    draw = false;

    // Push the current stroke into the drawing history
    if (currentStroke.paths.length > 0) {
        drawingHistory.push(currentStroke);

        // Clear the undone history when a new stroke is drawn
        undoneHistory = [];
    }

    currentStroke = {
        color: ctx.strokeStyle,
        paths: [],
    };
});

window.addEventListener("mousemove", (e) => {
    if (prevX == null || prevY == null || !draw) {
        prevX = e.clientX;
        prevY = e.clientY;
        return;
    }

    let currentX = e.clientX;
    let currentY = e.clientY;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    // Store the line segment in the current stroke
    currentStroke.paths.push({ startX: prevX, startY: prevY, endX: currentX, endY: currentY });

    prevX = currentX;
    prevY = currentY;
});

let undoBtn = document.querySelector(".undo");
undoBtn.addEventListener("click", () => {
    // Remove the last stroke from the history and store it in undoneHistory
    let lastStroke = drawingHistory.pop();
    if (lastStroke) {
        undoneHistory.push(lastStroke);
        redrawCanvas();
    }
});

let redoBtn = document.querySelector(".redo");
redoBtn.addEventListener("click", () => {
    // Redo the last undone stroke (if there's one in undoneHistory)
    let lastUndoneStroke = undoneHistory.pop();
    if (lastUndoneStroke) {
        drawingHistory.push(lastUndoneStroke);
        redrawCanvas();
    }
});
