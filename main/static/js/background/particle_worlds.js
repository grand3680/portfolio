var mousePos = {
    radius : 175,
    x : null,
    y : null
}


function particleMoveRange(arra) {
    arra.forEach(i => {
        if (i[0] > canvas.width) i[0] = 0;
        if (i[1] > canvas.height) i[1] = 0;
        if (i[0] < 0) i[0] = canvas.width;
        if (i[1] < 0) i[1] = canvas.height;

        // if (canvas.width != 800) {

        // }
        // dx = x1 - x2
        let dx = (mousePos.x - Math.abs(window.innerWidth - canvas.width)) - i[0];
        // dy = y1 - y2
        let dy = (mousePos.y - Math.abs(window.innerHeight - canvas.height)) - i[1];

        // c = a^2 + b^2
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxdistance = mousePos.radius;
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        
        let force = (maxdistance - distance) / maxdistance; // boost for a distance
        let directionX = forceDirectionX * force * 2;
        let directionY = forceDirectionY * force * 2;

        if (distance <= maxdistance) {
            i[0] -= (directionX * 5); // x cords
            i[1] -= (directionY * 5); // y cords
            i[5] = configJson.size * 1.2 + (10 / Math.floor(distance/10)); // size
            
        } else {
            i[5] = configJson.size;
        }

        i[0] += i[3]; // x cords
        i[1] += i[4]; // y cords

    });
    drawParticle(arra);
}


function updateRange() {
    particleMoveRange(arrPoint);  

    ctx.beginPath();
    let x = ( mousePos.x - Math.abs(window.innerWidth - canvas.width));
    let y = ( mousePos.y - Math.abs(window.innerHeight - canvas.height));
    let xV = x < 0 ? 0 : x;
    let yV = y < 0 ? 0 : y;
    xV = xV > canvas.width ? canvas.width : xV;
    yV = yV > canvas.height ? canvas.height : yV;
    

    ctx.fillStyle = "rgb(255, 255, 255, 0.1)";
    ctx.arc(xV, yV, mousePos.radius/10, 0, 2 * Math.PI);

    ctx.fill();
    ctx.closePath();     

    reqId = window.requestAnimationFrame(updateRange);  
}

setTimeout(() => {
    cancelAnimationFrame(reqId);
    updateRange();
}, 500)

window.addEventListener("mousemove", (e) => {
    mousePos.x = e.x;
    mousePos.y = e.y;    
});