let gameActive = false;
let snake = [{x: 10, y: 10}];
let direction = {x: 0, y: 0};
let food = {x: 15, y: 15};
let score = 0;
let gameOver = false;
let gameLoop;

const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const tileCount = canvas.width / gridSize;

function activateSnake() {
    document.getElementById('gameContainer').classList.add('active');
    gameActive = true;
    resetGame();
    if (!gameLoop) {
        gameLoop = setInterval(updateGame, 100);
    }
}

function closeGame() {
    document.getElementById('gameContainer').classList.remove('active');
    gameActive = false;
}

function resetGame() {
    snake = [{x: 10, y: 10}];
    direction = {x: 1, y: 0};
    score = 0;
    gameOver = false;
    placeFood();
    document.getElementById('gameOverText').style.display = 'none';
    updateScore();
}

function updateGame() {
    if (!gameActive || gameOver) return;

    // Move snake
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    // Check wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        endGame();
        return;
    }

    // Check self collision
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            endGame();
            return;
        }
    }

    snake.unshift(head);

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        updateScore();
        placeFood();
    } else {
        snake.pop();
    }

    draw();
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = '#4CAF50';
    for (let segment of snake) {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    }

    // Draw food
    ctx.fillStyle = '#ff5252';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };

    // Make sure food doesn't spawn on snake
    for (let segment of snake) {
        if (food.x === segment.x && food.y === segment.y) {
            placeFood();
            return;
        }
    }
}

function updateScore() {
    document.getElementById('score').textContent = 'Score: ' + score;
}

function endGame() {
    gameOver = true;
    document.getElementById('gameOverText').style.display = 'block';
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (!gameActive) return;

    if (gameOver && e.key === ' ') {
        resetGame();
        return;
    }

    if (e.key === 'ArrowUp' && direction.y === 0) {
        direction = {x: 0, y: -1};
    } else if (e.key === 'ArrowDown' && direction.y === 0) {
        direction = {x: 0, y: 1};
    } else if (e.key === 'ArrowLeft' && direction.x === 0) {
        direction = {x: -1, y: 0};
    } else if (e.key === 'ArrowRight' && direction.x === 0) {
        direction = {x: 1, y: 0};
    }
});