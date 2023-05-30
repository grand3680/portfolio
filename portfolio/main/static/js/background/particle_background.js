const canvas = document.querySelector(".canvas_particle-background");
var ctx = canvas.getContext("2d");
var arrPoint = [];

var configJson = {
    "name": "particle_canvas",
    "size": 2.5,
    "max_velocity": 0.75,
    "count": 150,     
    "touchLength": 125,
    "colors": [
        "#DFDFDD",
        "#2B3128",
        "#F8F3E7"
    ],
    "strokeColor": "150, 150, 50"
}

// get random int from randing from -max to max
function getRandomVelocity(max) {
    let number = ((Math.random() < 0.5) ? -1 : 1) * (Math.random() * max);
    return ((number == 0) ? getRandomVelocity(max) : number);
}


// get random int from randing
function getRandomCords() {
    canvas.width = 1200;    
    canvas.height = 1200 - 400;  

    let cordX = Math.floor(Math.random() * canvas.width );
    let cordY = Math.floor(Math.random() * canvas.height);

    return [cordX, cordY];
}

function drawParticle(array) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    array.forEach(iter => {
        let x = iter[0];
        let y = iter[1];
        let size = iter[5];
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);

        ctx.fillStyle = iter[2];

        ctx.fill();
        ctx.closePath();
    });

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (array[i] == array[j]) continue;
            //                            x1              x2                 y1             y2
            let dictance = Math.sqrt(((array[i][0] - array[j][0])**2) + ((array[i][1] - array[j][1])**2));
            if (dictance < configJson.touchLength) {
                ctx.beginPath();
                ctx.strokeStyle = `rgb(${configJson.strokeColor}, ${0.6 / (dictance / 10)})`;
                ctx.lineWidth = 0.5 + configJson.size / (dictance / 10);
                
                ctx.moveTo(array[j][0], array[j][1]);
                ctx.lineTo(array[i][0], array[i][1]);        
                ctx.stroke(); 
            } 
        }
    } 
}


function particleMove(arra) {
    // if (!Array.isArray(arra)) return console.log(arra); debuger
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
    update();
}


function update() {
    particleMove(arrPoint);   
    window.requestAnimationFrame(update);  
}

makeCanvas();