const container = document.querySelector('.svg-container');
const audio = document.getElementById('audio');
const path = document.querySelector('#exitime');
const svg = document.querySelector('svg');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const volumeSlider = document.getElementById('volumeSlider');

const colors = [
    'rgb(0, 133, 66)',
    'rgb(255, 224, 0)',
    'rgb(231, 0, 1)'
];

const bpm = 55;
const beatInterval = (60 / bpm) * 1000;
const weakBeatOffset = beatInterval / 2;

let pulseInterval = null;
let colorIndex = 0;
let originalColor = '#000';

function pulse() {
    path.style.fill = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    
    const start = performance.now();
    const duration = 300;
    
    function animateScale(time) {
        const elapsed = time - start;
        const progress = elapsed / duration;
        
        if (progress < 1) {
            const scale = 1 + 0.1 * Math.sin(progress * Math.PI);
            svg.style.transform = `scale(${scale})`;
            requestAnimationFrame(animateScale);
        } else {
            svg.style.transform = 'scale(1)';
        }
    }
    
    requestAnimationFrame(animateScale);
    
    setTimeout(() => {
        path.style.fill = originalColor;
    }, 200);
}

function startMusic() {
    audio.play();
    
    setTimeout(() => {
        pulse();
        pulseInterval = setInterval(pulse, beatInterval);
    }, weakBeatOffset);
    
    playPauseBtn.style.display = 'none';
}

function stopMusic() {
    audio.pause();
    clearInterval(pulseInterval);
    path.style.fill = originalColor;
    svg.style.transform = 'scale(1)';
    pulseInterval = null;
    
    playPauseBtn.style.display = 'flex';
}

// Громкость
if (volumeSlider && audio) {
    audio.volume = volumeSlider.value;
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value;
    });
}

if (audio && path) {
    // Клик по кнопке (только Play)
    playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audio.paused) {
            startMusic();
        }
    });
    
    // Клик в любом месте экрана (Play/Pause), кроме слайдера и кнопки
    document.body.addEventListener('click', (e) => {
        if (e.target === volumeSlider || e.target === playPauseBtn || playPauseBtn.contains(e.target)) {
            return;
        }
        
        if (audio.paused) {
            startMusic();
        } else {
            stopMusic();
        }
    });
    
    audio.addEventListener('ended', stopMusic);
}