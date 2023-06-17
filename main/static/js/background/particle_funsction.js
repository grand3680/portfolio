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
