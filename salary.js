// 初始化变量
let startTimestamp = Date.now();
let lastEarnings = 0;

// 获取DOM元素
const inputs = document.querySelectorAll('.dashboard input');
const earningsDisplay = document.getElementById('earnings');
const animationContainer = document.getElementById('animation-container');

// 创建粒子背景
function createParticles() {
  for(let i = 0; i < 200; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    Object.assign(particle.style, {
      position: 'absolute',
      width: '2px',
      height: '2px',
      background: 'radial-gradient(circle at 30% 30%, #FFD700 0%, #FFA500 70%, rgba(255,165,0,0.3) 100%)',
      borderRadius: '50%'
    });
    animationContainer.appendChild(particle);
    
    gsap.to(particle, {
      x: Math.random() * innerWidth,
      y: () => Math.random() * innerHeight * (0.5 + Math.sin(Date.now()/1000)*0.3),
      duration: 1 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }
}

// 计算实时工资
function calculateEarnings() {
  const monthlySalary = parseFloat(document.getElementById('monthlySalary').value) || 0;
  const workDays = parseFloat(document.getElementById('workDays').value) || 0;
  
  const [startHour, startMinute] = document.getElementById('startTime').value.split(':');
  const [endHour, endMinute] = document.getElementById('endTime').value.split(':');
  
  const dailyMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
  const hourlyRate = monthlySalary / (workDays * dailyMinutes / 60);
  
  const secondsWorked = (Date.now() - startTimestamp) / 1000;
  return (hourlyRate / 3600) * secondsWorked;
}

// 金币掉落动画
function createCoin() {
  const coin = document.createElement('div');
  coin.className = 'coin';
  
  gsap.fromTo(coin, 
    { y: -50, rotation: 0, opacity: 1 },
    {
      y: innerHeight + 100,
      rotation: 360,
      opacity: 0,
      duration: 3,
      onComplete: () => coin.remove(),
      ease: 'power1.in'
    }
  );
  
  gsap.to(coin, {
    x: gsap.utils.random(-100, 100),
    duration: 0.5,
    repeat: -1,
    yoyo: true
  });
  
  animationContainer.appendChild(coin);
}

// 更新显示
function updateDisplay() {
  const currentEarnings = calculateEarnings();
  earningsDisplay.textContent = `${currentEarnings.toFixed(2)} 元`;
  
  // 触发金币雨效果
  if (Math.floor(currentEarnings / 10) > Math.floor(lastEarnings / 10)) {
    for(let i = 0; i < 10; i++) {
      setTimeout(createCoin, i * 100);
    }
  }
  lastEarnings = currentEarnings;
  
  // 更新数字动画
  gsap.to(earningsDisplay, {
    scale: 1.1,
    duration: 0.3,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut'
  });
}

// 初始化
createParticles();
setInterval(updateDisplay, 100);

// 输入变化时重置计时器
inputs.forEach(input => {
  input.addEventListener('input', () => {
    startTimestamp = Date.now();
    lastEarnings = 0;
  });
});