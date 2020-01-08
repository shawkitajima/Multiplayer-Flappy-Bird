const socket = io();
const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d')

// y direction velocity increaser
const grav = 0.05;
const gap = 125;
const pipeStart = 1500;
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
    x: pipeStart,
    y: Math.floor(Math.random() * (900 - 400 + 1) + 300),
    vx: 4,
    id: 'bot',
    draw: function() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, 100, 1000);
    }
}

const topPipe = {
    x: pipeStart,
    y: bottomPipe.y - gap,
    vx: 4,
    id: 'top',
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
        bottomPipe.x = pipeStart;
        topPipe.x = pipeStart;
        bottomPipe.y = Math.floor(Math.random() * (900 - 400 + 1) + 300);
        topPipe.y = bottomPipe.y - gap;
        score++;
        document.getElementById('score').innerHTML = `Score: ${score}`
    }

    // Collision Detection!
    if (bird.y > canvas.height || bird.y < 0 || checkCollision(bird, bottomPipe) || checkCollision(bird, topPipe)) {
        location.reload();
    }
    window.requestAnimationFrame(draw);
}

function checkCollision(bird, pipe) {
    let rect;
    if (pipe.id === 'bot') {
        rect = {
            x: pipe.x,
            y: pipe.y,
            w: 100,
            h: 1000
        }
    }
    else {
        rect = {
            x: pipe.x,
            y: 0,
            w: 100,
            h: pipe.y
        }
    }
    let distX = Math.abs(bird.x - rect.x-rect.w/2);
    let distY = Math.abs(bird.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + bird.radius)) { return false; }
    if (distY > (rect.h/2 + bird.radius)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    let dx=distX-rect.w/2;
    let dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(bird.radius*bird.radius));
}

init()

