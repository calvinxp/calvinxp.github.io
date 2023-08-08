const canvas = document.getElementById("myCanvas"); // Get the canvas element
const ctx = canvas.getContext("2d"); // Get the 2D rendering context
canvas.width = 1024;
canvas.height = 576;


ctx.fillStyle = "lightblue"; // Set your desired background color
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.moveTo(50, 70);
ctx.lineTo(50, 50);
ctx.stroke();

let keyMap = {};
let mouseX = 0;
let mouseY = 0;

let x = 0;
let y = 0;

let map = {};

for (let i = 0; i < 576; i++) {
    map[i] = Math.floor(Math.random() * 2);
}

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

ctx.moveTo(50, 70);
ctx.lineTo(900, 50);
ctx.stroke();


document.addEventListener("mousemove", function(event) {
    const rect = canvas.getBoundingClientRect(); // Get the bounding rectangle of the canvas
    mouseX = event.clientX - rect.left;    // Subtract the left offset
    mouseY = event.clientY - rect.top;     // Subtract the top offset
});


// =============================================================
// start of actual code

function loop() {

    // console.log(mouseX, mouseY);

    if (keyMap["ArrowUp"]) {
        y -= 32;
    }
    if (keyMap["ArrowDown"]) {
        y += 32;
    }
    if (keyMap["ArrowLeft"]) {
        x -= 32;
    }
    if (keyMap["ArrowRight"]) {
        x += 32;
    }

    ctx.fillStyle = "lightblue"; // Set your desired background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 576; i++) {
        if (map[i] === 1) {
            ctx.fillStyle = "green";
            ctx.fillRect((i % 32) * 32, (Math.floor(i / 18)) * 32, 32, 32);
        }
    }

    ctx.fillStyle = "black";
    ctx.fillRect(x, y, 32, 32);



    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
