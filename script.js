const container = document.querySelector('.svg-container');

let x = 0;
let y = 0;
let dirX = 0;
let dirY = 0;
const speed = 0.4;
const limit = 15;

function updateDirection() {
    const angle = Math.random() * Math.PI * 2;
    const targetDirX = Math.cos(angle) * speed;
    const targetDirY = Math.sin(angle) * speed;
    
    // Плавное изменение направления
    dirX += (targetDirX - dirX) * 0.1;
    dirY += (targetDirY - dirY) * 0.1;
}

function animate() {
    // Плавное обновление направления каждый кадр
    updateDirection();
    
    x += dirX;
    y += dirY;
    
    // Мягкое отражение от границ
    if (Math.abs(x) > limit) {
        dirX *= -0.9;
        x = x > 0 ? limit : -limit;
    }
    if (Math.abs(y) > limit) {
        dirY *= -0.9;
        y = y > 0 ? limit : -limit;
    }
    
    container.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animate);
}

animate();