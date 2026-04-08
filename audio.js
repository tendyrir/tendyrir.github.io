// Аудио
const container = document.querySelector('.svg-container');
const audio = document.getElementById('audio');

if (container && audio) {
    container.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });
}