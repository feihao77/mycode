// 获取画布和绘图上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 新增：获取显示分数的元素
const scoreDisplay = document.getElementById('scoreDisplay');

// 定义蛇的初始位置和大小
let snake = [
  { x: 10, y: 10 }
];
let direction = 'right';

// 定义食物的初始位置
let food = {
  x: Math.floor(Math.random() * 40) * 10,
  y: Math.floor(Math.random() * 40) * 10
};

// 定义分数
let score = 0;

// 定义游戏循环
function gameLoop() {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 移动蛇
  moveSnake();

  // 绘制蛇
  drawSnake();

  // 绘制食物
  drawFood();

  // 检查是否吃到食物
  checkEatFood();

  // 检查是否撞到墙壁或自己
  if (checkCollision()) {
    // 游戏结束
    alert(`游戏结束！你的分数是: ${score}`);
    location.reload();
    return;
  }

  // 定时调用游戏循环
  setTimeout(gameLoop, 100);
}

// 移动蛇
function moveSnake() {
  let head = { ...snake[0] };
  switch (direction) {
    case 'right':
      head.x += 10;
      break;
    case 'left':
      head.x -= 10;
      break;
    case 'up':
      head.y -= 10;
      break;
    case 'down':
      head.y += 10;
      break;
  }
  snake.unshift(head);
  snake.pop();
}

// 绘制蛇
function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = 'green';
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });
}

// 绘制食物
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, 10, 10);
}

// 检查是否吃到食物
function checkEatFood() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    // 蛇变长
    snake.push({ ...snake[snake.length - 1] });
    // 生成新的食物
    food = {
      x: Math.floor(Math.random() * 40) * 10,
      y: Math.floor(Math.random() * 40) * 10
    };
    // 增加分数
    score++;
    // 新增：更新分数显示
    scoreDisplay.textContent = `分数: ${score}`;
  }
}

// 检查是否撞到墙壁或自己
function checkCollision() {
  let head = snake[0];
  // 检查是否撞到墙壁
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return true;
  }
  // 检查是否撞到自己
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// 监听键盘事件
document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
  }
});

// 开始游戏循环
gameLoop();