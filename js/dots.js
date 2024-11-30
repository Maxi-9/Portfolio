// Name: Max Schwickert
// Date: Nov 30th 2024
// MEID: MAX2155621
// For the home page: Dom, Loops, Objects, Listener

// My hacked together physics engine based on: https://dev.to/soorajsnblaze333/how-to-create-a-simple-physics-engine-part-1-2ofh
// Note: Depending on window size it may run code up to 30000 per frame. There are chunk optimization that I could add
// Workspace
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


// Resize Canvas (for logic)
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight+200;
}
resizeCanvas();


class Particle {

    // Starts with Random location, size, angle, and speed in object
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.angle = Math.random() * 360;
        this.speed = Math.random() * 0.3 + 0.1;

        // Blue color with a random amount of opacity
        this.color = `rgba(37, 99, 235, ${Math.random() * 0.4 + 0.2})`;
    }

    draw() {
        ctx.beginPath();

        // Draw Circle
        ctx.arc(this.x, this.y-scrollY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(particles) {
        // This made it seems more organic and is extremely hard to tell that it's moving in a circle
        this.angle += this.speed;

        // Move:
        this.x += Math.cos(this.angle * Math.PI / 180) * 0.5;
        this.y += Math.sin(this.angle * Math.PI / 180) * 0.5;


        // Particle Anti-Gravity
        // It checks every particle against every other particle
        // It could be optimized but with only ~100 particles it is fine
        // It calculates distance 10,000 times per frame (As each particle checks each other)
        particles.forEach(particle => {
            if (particle !== this) {
                const dx = particle.x - this.x;
                const dy = particle.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = 30; // Minimum distance before repulsion

                if (distance < minDistance) {
                    const angle = Math.atan2(dy, dx);
                    const repulsionForce = (minDistance - distance) / minDistance * 0.5; // More repulsion the closer they are
                    this.x -= Math.cos(angle) * repulsionForce;
                    this.y -= Math.sin(angle) * repulsionForce;
                    particle.x += Math.cos(angle) * repulsionForce; // Separates the x from y direction and then applies
                    particle.y += Math.sin(angle) * repulsionForce;
                }
            }
        });

        // Cool trick to wrap around and have the particles stay in bounds
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
}

let particles = [];
function init() {
    particles = [];
    // Density of particles should be 1 particle per 5000 pixels^2
    const numberOfParticles = (canvas.width * canvas.height) / 5000;
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }
}

function drawConnections() {
    const connectionDistance = 120;
    particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[j].x - particle.x;
            const dy = particles[j].y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                // Calculate opacity based on distance
                const opacity = (1 - distance / connectionDistance) * 0.5;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
                ctx.lineWidth = (1 - distance / connectionDistance);
                ctx.moveTo(particle.x, particle.y-scrollY);
                ctx.lineTo(particles[j].x, particles[j].y-scrollY);
                ctx.stroke();
            }
        }
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update then draw all particles
    particles.forEach(particle => {
        particle.update(particles);
        particle.draw();
    });

    // Draw connections between particles
    drawConnections();

    requestAnimationFrame(animate);
}

init();
animate();

// Issue: Whenever resizing the particles randomize and it looks ugly :(
window.addEventListener('resize', () => {
    resizeCanvas();
    init();
});