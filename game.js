//canvas(html5 api) to render game

//get canvas
let canvas = document.getElementById('myCanvas');
let gameH = canvas.height, gameW = canvas.width;
let pen = canvas.getContext('2d');
let gameOver = false;
//pen.fillRect(10,10,10,10);
//pen.fillStyle="red";
//pen.fillRect(120,120,60,20);
//JSON
let enemy = { //represents enemy
    //co-ordinates
    x: 150,
    y: 150,
    //height and width
    w: 60,
    h: 60,
    speed: 5
}

let enemyImg = new Image;
enemyImg.src = "images/enemyImg.png";
let playerImg = new Image;
playerImg.src = "images/playerImg.png";

let player = { //represents player
    //co-ordinates
    x: 0,
    y: gameH / 2 - 30,
    //height and width
    w: 60,
    h: 60,
    speed: 8,
    isMoving: false
}

//register event listener on canvas
canvas.addEventListener('mousedown', function () {
    player.isMoving = true;
});

canvas.addEventListener('mouseup', function () {
    player.isMoving = false;
});

function isColliding(r1, r2) {
    let side = r1.w;
    if (Math.abs(r1.x - r2.x) <= side && Math.abs(r1.y - r2.y) <= side) {
        return true;
    }
    return false;
}

function draw() {
    //console.log("Draw");
    //clear old frame and then draw
    pen.clearRect(0, 0, gameW, gameH);
    //pen.fillStyle="red";
    //pen.fillRect(enemy.x,enemy.y,enemy.w,enemy.h);
    pen.drawImage(enemyImg, enemy.x, enemy.y, enemy.w, enemy.h)
    pen.drawImage(playerImg, player.x, player.y, player.w, player.h)
}

function update() {
    //console.log("Update")
    enemy.y += enemy.speed;
    if (enemy.y == gameH - enemy.h || enemy.y == 0)
        enemy.speed *= -1;
    //
    if (player.isMoving == true)
        player.x += player.speed;
}

function render() {
    draw();
    update();
    console.log("Inside render");
    if (isColliding(enemy, player)) {
        alert("Game Over!");
        gameOver = true;
    }
    if (player.x > gameW - player.w) {
        alert("You won!");
        gameOver = true;
    }
    if (!gameOver) {
        window.requestAnimationFrame(render); //will call render only 60times in 1s
    }
}
render();
