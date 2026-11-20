let player;
let obstacles = [];
let gameOver = false;
let obstacleSpeed = 4;
let gameTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  player = {
    x: width / 2,
    y: height - 80,
    size: 40,
    speed: 7
  };
}

function draw() {
  // 背景色を時間によって変化させる
  changeBackground();

  if (gameOver) {
    fill(255, 50, 50);
    textAlign(CENTER);
    textSize(45);
    text("GAME OVER", width / 2, height / 2);

    textSize(20);
    fill(255);
    text("PRESS R TO RESTART", width / 2, height / 2 + 50);
    return;
  }

  gameTime++;

  movePlayer();
  drawPlayer();

  // 障害物を定期的に生成
  if (frameCount % 45 == 0) {
    obstacles.push({
      x: random(20, width - 40),
      y: -30,
      size: random(25, 45),
      speed: obstacleSpeed
    });
  }

  // 障害物の移動と描画
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += obstacles[i].speed;

    fill(255, 80, 80);
    rect(
      obstacles[i].x,
      obstacles[i].y,
      obstacles[i].size,
      obstacles[i].size
    );

    // 衝突判定
    if (
      player.x < obstacles[i].x + obstacles[i].size &&
      player.x + player.size > obstacles[i].x &&
      player.y < obstacles[i].y + obstacles[i].size &&
      player.y + player.size > obstacles[i].y
    ) {
      gameOver = true;
    }
  }

  // 画面外の障害物を削除
  obstacles = obstacles.filter(obstacle => obstacle.y < height);

  // 時間経過で難易度を上げる
  if (gameTime % 600 == 0) {
    obstacleSpeed += 0.5;
  }
}

function changeBackground() {
  let cycleTime = gameTime % 3600;

  if (cycleTime < 1200) {
    // 昼
    background(160, 192, 255);
  }
  else if (cycleTime < 2400) {
    // 夕方
    background(255, 170, 120);
  }
  else {
    // 夜
    background(30, 35, 80);
  }
}

// プレイヤーの移動
function movePlayer() {
  let currentSpeed = player.speed;

  // スペースキーを押している間は高速移動
  if (keyIsDown(UP_ARROW)) {
    currentSpeed = player.speed * 2;
  }

  if (keyIsDown(LEFT_ARROW)) {
    player.x -= currentSpeed;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.x += currentSpeed;
  }

  player.x = constrain(player.x, 0, width - player.size);
}

// プレイヤーの描画
function drawPlayer() {
  fill(40, 70, 180);
  rect(player.x, player.y, player.size, player.size, 8);
}

// キーボード操作
function keyPressed() {
  if (key == 'r' || key == 'R') {
    restartGame();
  }
}

// ゲームの再スタート
function restartGame() {
  player.x = width / 2;
  obstacles = [];
  obstacleSpeed = 4;
  gameTime = 0;
  gameOver = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  player.y = height - 80;
}