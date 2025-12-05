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
const initialLength = 3; // mettre en haut du fichier

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
    // position de départ de la tête
    const startX = 10;
    const startY = 10;

    snake = [];
    for (let i = 0; i < initialLength; i++) {
        // on aligne le corps vers la gauche de la tête
        snake.push({ x: startX - i, y: startY });
    }

    direction = { x: 1, y: 0 };
    score = 0;
    gameOver = false;
    placeFood();
    document.getElementById('gameOverText').style.display = 'none';
    updateScore();
    if (typeof updateLength === 'function') updateLength();
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

// -- floating snake script --
// Apparition au scroll, suit la souris, rotation selon direction, bulle et clic pour lancer le jeu
(function(){
    // créer la fonctionnalité seulement si les éléments existent
    const snakeEl = document.getElementById('floatingSnake');
    if (!snakeEl) return;
    const icon = document.getElementById('floatingSnakeIcon');
    const bubble = document.getElementById('snakeBubble');

    let hideTimer = null;
    let rafId = null;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    const target = { x: lastX, y: lastY, angle: 0, scale: 1 };

    function showTemporary() {
        snakeEl.classList.add('active');
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
            snakeEl.classList.remove('active');
            snakeEl.classList.remove('grow');
        }, 2500);
    }

    window.addEventListener('scroll', () => {
        showTemporary();
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
        showTemporary();
        const x = e.clientX;
        const y = e.clientY;
        const dx = x - lastX;
        const dy = y - lastY;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        target.x = x;
        target.y = y;
        target.angle = angle;
        lastX = x;
        lastY = y;
        if (!rafId) rafId = requestAnimationFrame(render);
    }, { passive: true });

    function render() {
        rafId = null;
        const tx = target.x;
        const ty = target.y;
        const ang = target.angle;
        const sc = target.scale;
        snakeEl.style.left = tx + 'px';
        snakeEl.style.top = ty + 'px';
        snakeEl.style.transform = `translate(-50%, -50%) rotate(${ang}deg) scale(${sc})`;
    }

    // Hover: agrandir et afficher bulle
    snakeEl.addEventListener('mouseenter', () => {
        snakeEl.classList.add('grow');
        target.scale = 1.6;
        snakeEl.classList.add('active');
        clearTimeout(hideTimer);
    });
    snakeEl.addEventListener('mouseleave', () => {
        snakeEl.classList.remove('grow');
        target.scale = 1;
    });

    // Clic: lance le mini-jeu si la fonction existe
    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof activateSnake === 'function') activateSnake();
    });
})();// -- floating snake script --
// Apparition au scroll, suit la souris, rotation selon direction, bulle et clic pour lancer le jeu
(function(){
    const snakeEl = document.getElementById('floatingSnake');
    if (!snakeEl) return;
    const icon = document.getElementById('floatingSnakeIcon');
    const bubble = document.getElementById('snakeBubble');

    let hideTimer = ;
    let rafId = ;
    let lastX = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds.Width / 2;
    let lastY = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds.Height / 2;
    const target = { x: lastX, y: lastY, angle: 0, scale: 1 };

    function showTemporary() {
        snakeEl.classList.add('active');
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
            snakeEl.classList.remove('active');
            snakeEl.classList.remove('grow');
        }, 2500);
    }

    window.addEventListener('scroll', () => {
        showTemporary();
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
        showTemporary();
        const x = e.clientX;
        const y = e.clientY;
        const dx = x - lastX;
        const dy = y - lastY;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        target.x = x;
        target.y = y;
        target.angle = angle;
        lastX = x;
        lastY = y;
        if (!rafId) rafId = requestAnimationFrame(render);
    }, { passive: true });

    function render() {
        rafId = null;
        const tx = target.x;
        const ty = target.y;
        const ang = target.angle;
        const sc = target.scale;
        snakeEl.style.left = tx + 'px';
        snakeEl.style.top = ty + 'px';
        snakeEl.style.transform = 	ranslate(-50%, -50%) rotate(deg) scale();
    }

    snakeEl.addEventListener('mouseenter', () => {
        snakeEl.classList.add('grow');
        target.scale = 1.6;
        snakeEl.classList.add('active');
        clearTimeout(hideTimer);
    });
    snakeEl.addEventListener('mouseleave', () => {
        snakeEl.classList.remove('grow');
        target.scale = 1;
    });

    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof activateSnake === 'function') activateSnake();
    });
})();
