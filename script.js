const dino = document.getElementById("dino");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("start-btn");
const instructions = document.getElementById("instructions");
const gameContainer = document.getElementById("game-container");
const scoreBoard = document.getElementById("score-board");

let isJumping = false;
let score = 0;
let gameInterval;
let obstacleInterval;

startBtn.addEventListener("click", startGame);

function startGame() {
  instructions.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  scoreBoard.classList.remove("hidden");

  score = 0;
  scoreDisplay.textContent = score;

  gameInterval = setInterval(checkCollision, 50);
  obstacleInterval = setInterval(generateObstacle, 2000);
}

document.addEventListener("keydown", function(event) {
  if (event.code === "Space" && !isJumping && !instructions.classList.contains("hidden")) {
    return; 
  }
  if (event.code === "Space" && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  dino.classList.add("jump");

  setTimeout(() => {
    dino.classList.remove("jump");
    isJumping = false;
  }, 600);
}
function generateObstacle() {
  const obstacle = document.createElement("img");
  obstacle.classList.add("obstacle");

  if (Math.random() > 0.5) {
    obstacle.src = "images/catcus.png";
    obstacle.classList.add("cactus");
    obstacle.style.width = "40px";
  } else {
    obstacle.src = "images/bird.avif";
    obstacle.classList.add("bird");
    obstacle.style.width = "60px";
  }

  gameContainer.appendChild(obstacle);

  obstacle.addEventListener("animationend", () => {
    obstacle.remove();
    score++;
    scoreDisplay.textContent = score;
  });
}


function checkCollision() {
  const dinoRect = dino.getBoundingClientRect();
  const obstacles = document.querySelectorAll(".obstacle");

  obstacles.forEach(obstacle => {
    const obsRect = obstacle.getBoundingClientRect();

    if (
      dinoRect.left < obsRect.right &&
      dinoRect.right > obsRect.left &&
      dinoRect.bottom > obsRect.top &&
      dinoRect.top < obsRect.bottom
    ) {
      gameOver();
    }
  });
}

function gameOver() {
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);

  alert("💀 Game Over! Your Score: " + score);

  document.querySelectorAll(".obstacle").forEach(o => o.remove());

  instructions.classList.remove("hidden");
  gameContainer.classList.add("hidden");
  scoreBoard.classList.add("hidden");
}
