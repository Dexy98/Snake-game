const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

const scoreElement = document.querySelector('#score');

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


//variabili
let appleImg = new Image();
appleImg.src = "/apple.png"
const eatingSound = new Audio('/eating.mp3')
const gameOverSound = new Audio('/gameOver.mp3')

let speed = 5; //velocità serpente da modificare nel tempo inizia con 5

let score = scoreElement.textContent = 0


let headX = 10;
let headY = 10;

const snakeParts = []
let tailLenght = 0

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2; // dimensione dei blocchi 

let appleX = 5
let appleY = 5

let xVelocity = 0
let yVelocity = 0




drawGame()
//game loop
function drawGame() {
    changeSnakePosition()
    let result = isGameOver()
    if (result) {
        return;
    }

    clearScreen()
    checkAppleCollision()

    drawApple()
    drawSnake()

    setTimeout(drawGame, 1000 / speed);

}

function isGameOver() {
    let gameOver = false
    //wall gameOver
    if (headX < 0) {
        gameOver = true
    } else if (headX === tileCount) {
        gameOver = true
    } else if (headY < 0) {
        gameOver = true
    } else if (headY === tileCount) {
        gameOver = true
    }
    //eat itself
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i]
        if (part.x === headX && part.y === headY) {
            gameOver = true
        }
    }


    if (gameOver) {
        gameOverSound.play()
        alert("Game over")
        location.reload();
    }
    return gameOver
}

function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}

function drawSnake() {
    ctx.fillStyle = "green";
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX, headY))
    while (snakeParts.length > tailLenght) {
        snakeParts.shift()
    }

    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}

function changeSnakePosition() {
    headX = headX + xVelocity
    headY = headY + yVelocity
}

function drawApple() {
    ctx.drawImage(appleImg, appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        eatingSound.play()
        scoreElement.textContent = 1 + score++;
        tailLenght++
        speed = speed + .5
    }
}



//movimento snake position
document.body.addEventListener("keydown", keyDown)
function keyDown(event) {
    if (event.key === "ArrowUp" || event.key === "w") {
        if (yVelocity === 1) return;
        yVelocity = -1
        xVelocity = 0
    }
    if (event.key === "ArrowDown" || event.key === "s") {
        if (yVelocity === -1) return;
        yVelocity = 1
        xVelocity = 0
    }
    if (event.key === "ArrowLeft" || event.key === "a") {
        if (xVelocity === 1) return;
        yVelocity = 0
        xVelocity = -1
    }
    if (event.key === "ArrowRight" || event.key === "d") {
        if (xVelocity === -1) return;
        yVelocity = 0
        xVelocity = 1
    }
}
