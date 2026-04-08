const container = document.querySelector('.svg-container');
let direction = 1;
let position = 0;
const speed = 2;
const maxOffset = 100; // пикселей вправо от центра

function animate() {
    position += speed * direction;
    
    if (Math.abs(position) >= maxOffset) {
        direction *= -1;
    }
    
    container.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
}

animate();