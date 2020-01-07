const socket = io();
const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d')

// y direction velocity increaser
const grav = 0.05;
const gap = 125;
let score = 0;

// listens for space and makes bird jump
document.addEventListener('keydown', function(evt) {
    if (evt.which === 32) {
        evt.preventDefault();
        bird.vy -= 2;
    }
})
    
const bird = {
    x: 250,
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

const bottomPipe = {
    x: 1200,
    y: Math.floor(Math.random() * (900 - 400 + 1) + 300),
    vx: 4,
    draw: function() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, 100, 1000);
    }
}

const topPipe = {
    x: 1200,
    y: bottomPipe.y - gap,
    vx: 4,
    draw: function() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, 100, -this.y);
    }
}

function init() {
    bird.draw();
    window.requestAnimationFrame(draw);
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    bird.draw();
    bottomPipe.draw();
    topPipe.draw();
    bottomPipe.x -= bottomPipe.vx;
    topPipe.x -= topPipe.vx;
    bird.vy += grav;
    bird.y += bird.vy;
    // Let's generate a new set of pipes and add to the score
    if (bottomPipe.x <= -100) {
        bottomPipe.x = 1200;
        topPipe.x = 1200;
        bottomPipe.y = Math.floor(Math.random() * (900 - 400 + 1) + 300);
        topPipe.y = bottomPipe.y - gap;
        score++;
        document.getElementById('score').innerHTML = `Score: ${score}`
    }
    // We can rotate the bird by checking if vy is positive or negative
    if (bird.y > canvas.height || bird.y < 0) {
        location.reload();
    }
    window.requestAnimationFrame(draw);
}



init()

