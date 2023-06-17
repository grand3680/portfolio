var mousePos = {
    radius : 150,
    x : null,
    y : null
}

function particleMoveWord(arra) {
    arra.forEach(i => {
        if (i[0] > canvas.width) i[0] = 0;
        if (i[1] > canvas.height) i[1] = 0;
        if (i[0] < 0) i[0] = canvas.width;
        if (i[1] < 0) i[1] = canvas.height;
        
        let dx = mousePos.x - i[0];
        let dy = mousePos.y - i[1];

        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxdistance = mousePos.radius;
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        
        let force = (maxdistance - distance) / maxdistance;
        let directionX = forceDirectionX * force * i[3];
        let directionY = forceDirectionY * force * i[4];
        
        if (distance <= maxdistance*2) {
            i[0] -= (directionX * 113); // x cords
            i[1] -= (directionY * 113); // y cords

        }

        i[0] += i[3]; // x cords
        i[1] += i[4]; // y cords

    });
    drawParticle(arra);
}



function updateWord() {
    particleMoveWord(arrPoint);   
    reqId = window.requestAnimationFrame(updateWord);  
}

setTimeout(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cancelAnimationFrame(reqId);
    updateWord();
}, 500)


window.addEventListener("mousemove", (e) => {
    mousePos.x = e.x;
    mousePos.y = e.y;    
});