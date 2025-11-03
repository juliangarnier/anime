import anime from '../../src/anime.js';

const container = document.getElementById('container');
const trigger = document.getElementById('trigger');

// Configuration
const config = {
  particleCount: 50,
  particleSize: { min: 4, max: 12 },
  explosionRadius: 300,
  duration: 1500,
  colors: [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B500', '#FF69B4', '#00CED1', '#FFD700'
  ]
};

/**
 * Create a single particle element
 */
function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Random size
  const size = Math.random() * (config.particleSize.max - config.particleSize.min) + config.particleSize.min;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  
  // Random color
  const color = config.colors[Math.floor(Math.random() * config.colors.length)];
  particle.style.backgroundColor = color;
  particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
  
  // Initial position
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  
  container.appendChild(particle);
  return particle;
}

/**
 * Create particle explosion animation
 */
function createExplosion(x, y) {
  const particles = [];
  const animations = [];
  
  // Create particles
  for (let i = 0; i < config.particleCount; i++) {
    particles.push(createParticle(x, y));
  }
  
  // Animate each particle
  particles.forEach((particle, index) => {
    // Random angle for explosion direction
    const angle = (Math.PI * 2 * index) / config.particleCount;
    
    // Random distance
    const distance = Math.random() * config.explosionRadius + 50;
    
    // Calculate target position
    const targetX = x + Math.cos(angle) * distance;
    const targetY = y + Math.sin(angle) * distance;
    
    // Create animation
    const animation = anime({
      targets: particle,
      translateX: targetX - x,
      translateY: targetY - y,
      scale: [
        { value: [0, 1.5], duration: config.duration * 0.2, easing: 'easeOutExpo' },
        { value: 0, duration: config.duration * 0.8, easing: 'easeInExpo' }
      ],
      opacity: [
        { value: 1, duration: config.duration * 0.3 },
        { value: 0, duration: config.duration * 0.7, easing: 'easeInQuad' }
      ],
      rotate: anime.random(-180, 180),
      duration: config.duration,
      easing: 'easeOutExpo',
      complete: () => {
        particle.remove();
      }
    });
    
    animations.push(animation);
  });
  
  return animations;
}

/**
 * Create ripple effect
 */
function createRipple(x, y) {
  const ripple = document.createElement('div');
  ripple.style.position = 'absolute';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.width = '0px';
  ripple.style.height = '0px';
  ripple.style.borderRadius = '50%';
  ripple.style.border = '3px solid rgba(255, 255, 255, 0.8)';
  ripple.style.transform = 'translate(-50%, -50%)';
  ripple.style.pointerEvents = 'none';
  
  container.appendChild(ripple);
  
  anime({
    targets: ripple,
    width: '400px',
    height: '400px',
    opacity: [1, 0],
    duration: 800,
    easing: 'easeOutExpo',
    complete: () => {
      ripple.remove();
    }
  });
}

/**
 * Create burst effect with multiple waves
 */
function createBurst(x, y) {
  // Create ripple
  createRipple(x, y);
  
  // Create main explosion
  createExplosion(x, y);
  
  // Create delayed secondary explosion
  setTimeout(() => {
    createExplosion(x, y);
  }, 150);
}

/**
 * Animate trigger button pulse
 */
function animateTrigger() {
  anime({
    targets: trigger,
    scale: [
      { value: 1.2, duration: 200, easing: 'easeOutExpo' },
      { value: 1, duration: 300, easing: 'easeOutElastic(1, .5)' }
    ]
  });
}

/**
 * Create spiral explosion pattern
 */
function createSpiralExplosion(x, y) {
  const spiralParticles = 30;
  const particles = [];
  
  for (let i = 0; i < spiralParticles; i++) {
    particles.push(createParticle(x, y));
  }
  
  particles.forEach((particle, index) => {
    const angle = (Math.PI * 2 * index) / spiralParticles;
    const spiralFactor = index / spiralParticles;
    const distance = 200 + spiralFactor * 100;
    
    const targetX = x + Math.cos(angle + spiralFactor * Math.PI * 4) * distance;
    const targetY = y + Math.sin(angle + spiralFactor * Math.PI * 4) * distance;
    
    anime({
      targets: particle,
      translateX: targetX - x,
      translateY: targetY - y,
      scale: [
        { value: 1.5, duration: 300 },
        { value: 0, duration: 1200, delay: index * 20 }
      ],
      opacity: [
        { value: 1, duration: 400 },
        { value: 0, duration: 800, delay: index * 20 }
      ],
      rotate: 720,
      duration: 1500,
      delay: index * 20,
      easing: 'easeOutExpo',
      complete: () => {
        particle.remove();
      }
    });
  });
}

/**
 * Create wave explosion pattern
 */
function createWaveExplosion(x, y) {
  const waves = 3;
  const particlesPerWave = 20;
  
  for (let wave = 0; wave < waves; wave++) {
    setTimeout(() => {
      const particles = [];
      
      for (let i = 0; i < particlesPerWave; i++) {
        particles.push(createParticle(x, y));
      }
      
      particles.forEach((particle, index) => {
        const angle = (Math.PI * 2 * index) / particlesPerWave;
        const distance = 150 + wave * 80;
        
        const targetX = x + Math.cos(angle) * distance;
        const targetY = y + Math.sin(angle) * distance;
        
        anime({
          targets: particle,
          translateX: targetX - x,
          translateY: targetY - y,
          scale: [1.5, 0],
          opacity: [1, 0],
          duration: 1200,
          easing: 'easeOutExpo',
          complete: () => {
            particle.remove();
          }
        });
      });
    }, wave * 200);
  }
}

// Event listeners
let explosionType = 0;

trigger.addEventListener('click', (e) => {
  e.stopPropagation();
  const rect = trigger.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  animateTrigger();
  createBurst(x, y);
});

container.addEventListener('click', (e) => {
  if (e.target === trigger) return;
  
  const x = e.clientX;
  const y = e.clientY;
  
  // Cycle through different explosion types
  switch (explosionType % 3) {
    case 0:
      createBurst(x, y);
      break;
    case 1:
      createSpiralExplosion(x, y);
      break;
    case 2:
      createWaveExplosion(x, y);
      break;
  }
  
  explosionType++;
});

// Initial animation on load
window.addEventListener('load', () => {
  anime({
    targets: trigger,
    scale: [0, 1],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutElastic(1, .6)'
  });
});
