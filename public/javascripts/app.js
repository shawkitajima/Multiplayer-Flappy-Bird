const socket = io();
const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d')
let raf;

// y direction velocity increaser
const grav = 0.05;

// listens for space and makes bird jump
document.addEventListener('keydown', function(evt) {
    if (evt.which === 32) {
        bird.vy -= 2;
    }
})
    
const bird = {
    x: 100,
    y: 100,
    vx: 0,
    vy: 1,
    radius: 25,
    color: 'black',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

function init() {
    bird.draw();
    raf = window.requestAnimationFrame(draw);
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    bird.draw();
    bird.vy += grav;
    bird.y += bird.vy;
    if (bird.y > canvas.height || bird.y < 0) {
        console.log('fire!');
        location.reload();
    }
    raf = window.requestAnimationFrame(draw);
}



init()

