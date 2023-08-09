class pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const canvas = document.getElementById("myCanvas"); // Get the canvas element
const ctx = canvas.getContext("2d"); // Get the 2D rendering context
canvas.width = 1024;
canvas.height = 576;

const uWide = canvas.width / 32;
const uTall = canvas.height / 32;

ctx.fillStyle = "lightblue"; // Set your desired background color
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.moveTo(50, 70);
ctx.lineTo(50, 50);
ctx.stroke();

let keyMap = {};
// let mouseX = 0;
// let mouseY = 0;

let snakeHead = new pos(2, 0)
let snakeBody = {};
snake[0] = new pos(1, 0);
snake[1] = new pos(0, 0);
// let snakeTail = new pos(0, 0)

window.addEventListener("keydown", function(event) {
    // Check if the pressed key is an arrow key (Left, Right, Up, Down)
    if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowDown") {
        // Prevent the default behavior of arrow keys (scrolling)
        event.preventDefault();
    }
});

document.addEventListener("keydown", function (event) {
    if (!keyMap[event.key]) {
        keyMap[event.key] = true;
    }
});


document.addEventListener("keyup", function (event) {
    keyMap[event.key] = false;
});


document.addEventListener("mousemove", function(event) {
    const rect = canvas.getBoundingClientRect(); // Get the bounding rectangle of the canvas
    mouseX = event.clientX - rect.left;    // Subtract the left offset
    mouseY = event.clientY - rect.top;     // Subtract the top offset
});


// =============================================================
// start of actual code

function loop(time) {

    // console.log(mouseX, mouseY);

    let lastSnakeHead = snakeHead

    if (keyMap["ArrowUp"]) {
        snakeHead -= uWide;
    }
    if (keyMap["ArrowDown"]) {
        snakeHead += uWide;
    }
    if (keyMap["ArrowLeft"]) {
        snakeHead -= 1;
    }
    if (keyMap["ArrowRight"]) {
        snakeHead += 1;
    }

    snakeBody[snakeBody.length - 1] = lastSnakeHead;

    ctx.fillStyle = "lightblue"; // Set your desired background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = "black";
    ctx.fillRect(snakeHead.x * 32, snakeHead.y * 32, 32, 32);

    for (let i = 0; i < snakeBody.length, i++;) {
        ctx.fillRect(snakeBody[i].x * 32, snakeBody[i].y * 32, 32, 32);
    }

    time = 10
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
