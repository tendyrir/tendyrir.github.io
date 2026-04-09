const left = document.querySelector('.left');
const right = document.querySelector('.right');
const center = document.querySelector('.center');
const audio = document.getElementById('audio');
const playlist = document.getElementById('playlist');
const nowPlaying = document.getElementById('nowPlaying');

let isOpen = false;

// Функция открытия
function openSplit() {
    left.classList.add('open');
    right.classList.add('open');
    center.classList.add('open');
    isOpen = true;
}

// Функция закрытия
function closeSplit() {
    left.classList.remove('open');
    right.classList.remove('open');
    center.classList.remove('open');
    isOpen = false;
    
    // Останавливаем воспроизведение
    audio.pause();
    audio.currentTime = 0;
    
    // Убираем активный класс с песен
    const activeSong = document.querySelector('.song-item.active');
    if (activeSong) {
        activeSong.classList.remove('active');
    }
    
    // Очищаем текст "Сейчас играет"
    if (nowPlaying) {
        nowPlaying.textContent = '';
    }
}

// Единый обработчик клика
document.body.addEventListener('click', function(e) {
    // Если открыто и клик НЕ по центру (плееру)
    if (isOpen && !center.contains(e.target)) {
        closeSplit();
    } 
    // Если закрыто
    else if (!isOpen) {
        openSplit();
    }
});

// Воспроизведение песен из списка
const songItems = document.querySelectorAll('.song-item');

songItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation(); // ОЧЕНЬ ВАЖНО: не даём закрыть плеер при клике на песню
        
        // Убираем активный класс у всех
        songItems.forEach(song => song.classList.remove('active'));
        // Добавляем активный класс текущей
        this.classList.add('active');
        
        const songFile = this.dataset.song;
        const songName = this.textContent;
        
        audio.src = songFile;
        audio.play();
        
        if (nowPlaying) {
            nowPlaying.textContent = `Сейчас играет: ${songName}`;
        }
    });
});

// Автоматическое переключение на следующий трек
audio.addEventListener('ended', function() {
    let currentActive = document.querySelector('.song-item.active');
    if (currentActive) {
        let nextSong = currentActive.nextElementSibling;
        if (nextSong) {
            nextSong.click();
        } else {
            // Если это последний трек, возвращаемся к первому
            songItems[0].click();
        }
    }
});