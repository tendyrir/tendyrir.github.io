const container = document.querySelector('.svg-container');
const audio = document.getElementById('audio');

// Создаём канвас для волн поверх SVG
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
container.style.position = 'relative';
container.appendChild(canvas);

let width, height;
let waves = [];
let animationFrame = null;
const colors = ['#e74c3c', '#2ecc71', '#f1c40f'];
const bpm = 110;
const beatInterval = (60 / bpm) * 1000; // ~545ms

function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width;
    canvas.height = height;
}

function createWave() {
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
        x: width / 2,
        y: height / 2,
        radius: 10,
        maxRadius: Math.min(width, height) * 0.5,
        opacity: 1,
        color: color,
        speed: 1.5,
        lineWidth: 20
    };
}

function drawWaves() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.radius += w.speed;
        w.opacity *= 0.985;
        
        if (w.radius >= w.maxRadius || w.opacity <= 0.01) {
            waves.splice(i, 1);
            continue;
        }
        
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
        ctx.strokeStyle = w.color;
        ctx.lineWidth = w.lineWidth;
        ctx.globalAlpha = w.opacity;
        ctx.stroke();
    }
    
    if (waves.length > 0 || !audio.paused) {
        animationFrame = requestAnimationFrame(drawWaves);
    } else {
        animationFrame = null;
    }
}

function startWaves() {
    if (animationFrame) return;
    
    resizeCanvas();
    
    const waveInterval = setInterval(() => {
        if (audio.paused) {
            clearInterval(waveInterval);
            return;
        }
        waves.push(createWave());
    }, beatInterval);
    
    drawWaves();
}

if (container && audio) {
    container.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            startWaves();
        } else {
            audio.pause();
        }
    });
}

window.addEventListener('resize', () => {
    if (!audio.paused) {
        resizeCanvas();
    }
});