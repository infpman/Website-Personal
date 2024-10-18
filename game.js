const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const unitSize = 20;
const rows = canvas.height / unitSize;
const cols = canvas.width / unitSize;

let snake = [{x: 5 * unitSize, y: 5 * unitSize}];
let food = {x: Math.floor(Math.random() * cols) * unitSize, y: Math.floor(Math.random() * rows) * unitSize};
let direction = {x: 0, y: 0};
let gameOver = false;

// Gambar ular dan makanan
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Gambar ular
    snake.forEach(part => {
        ctx.fillStyle = "green";
        ctx.fillRect(part.x, part.y, unitSize, unitSize);
    });
    
    // Gambar makanan
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, unitSize, unitSize);
}

// Pindahkan ular
function moveSnake() {
    const head = {x: snake[0].x + direction.x * unitSize, y: snake[0].y + direction.y * unitSize};
    
    // Jika ular keluar dari batas, game over
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        gameOver = true;
    }
    
    // Jika ular menabrak dirinya sendiri
    snake.forEach(part => {
        if (head.x === part.x && head.y === part.y) {
            gameOver = true;
        }
    });
    
    if (gameOver) {
        alert("Game Over!");
        document.location.reload();
    }
    
    // Tambahkan kepala baru
    snake.unshift(head);
    
    // Jika ular makan makanan
    if (head.x === food.x && head.y === food.y) {
        food = {x: Math.floor(Math.random() * cols) * unitSize, y: Math.floor(Math.random() * rows) * unitSize};
    } else {
        snake.pop();  // Hapus ekor jika tidak makan
    }
}

// Kontrol ular
window.addEventListener("keydown", e => {
    switch(e.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = {x: 0, y: -1};
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = {x: 0, y: 1};
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = {x: -1, y: 0};
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = {x: 1, y: 0};
            break;
    }
});

// Game loop
function gameLoop() {
    if (!gameOver) {
        setTimeout(() => {
            moveSnake();
            draw();
            gameLoop();
        }, 100);
    }
}

// Mulai game
gameLoop();
