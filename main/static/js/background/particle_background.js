var canvas = document.querySelector(".canvas_particle-background");
var ctx = canvas.getContext("2d");
var arrPoint = [];

canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;  
if ( canvas.width <= 800) canvas.width = 800, canvas.height = 1000;

include('/static/js/background/particle_config.js');
include('/static/js/background/particle_funsction.js');


function particleMove(arra) {
    arra.forEach(i => {
        if (i[0] > canvas.width) i[0] = 0;
        if (i[1] > canvas.height) i[1] = 0;
        if (i[0] < 0) i[0] = canvas.width;
        if (i[1] < 0) i[1] = canvas.height;
        
        i[0] += i[3]; // x cords
        i[1] += i[4]; // y cords
    });
    drawParticle(arra);
}


function makeCanvas() {
    arrPoint = [];
    for (let i = 0; i < configJson.count; i++) {
        let cords = getRandomCords();
        let randomColor = configJson.colors[Math.floor(Math.random() * configJson.colors.length)];
        let velocityX = getRandomVelocity(configJson.max_velocity);
        let velocityY = getRandomVelocity(configJson.max_velocity);
        arrPoint.push([cords[0], cords[1], randomColor, velocityX, velocityY, configJson.size]);
    } 
}

var reqId;

function update() {
    particleMove(arrPoint);   
    reqId = window.requestAnimationFrame(update);  
}

makeCanvas();
update();