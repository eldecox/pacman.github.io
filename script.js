// Definir constantes
const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = "white";
const PACMAN_COLOUR = 'yellow';
const PACMAN_SPEED = 2;

// Obtener referencia al canvas y establecer su contexto
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Establecer las propiedades del jugador Pacman
let pacman = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 30,
  mouth: {
    startAngle: 0.2,
    endAngle: 1.8
  },
  dx: PACMAN_SPEED,
  dy: PACMAN_SPEED,
  direction: 'right'
};

// Establecer las propiedades de los fantasmas
let ghosts = [
  {
    x: 100,
    y: 100,
    radius: 25,
    dx: 1.5,
    dy: 1.5
  },
  {
    x: 200,
    y: 200,
    radius: 25,
    dx: -2,
    dy: 2
  },
  {
    x: 300,
    y: 300,
    radius: 25,
    dx: 2,
    dy: -2
  }
];

// Función para dibujar el jugador Pacman
function drawPacman() {
  ctx.beginPath();
  ctx.arc(pacman.x, pacman.y, pacman.radius, pacman.mouth.startAngle * Math.PI, pacman.mouth.endAngle * Math.PI);
  ctx.lineTo(pacman.x, pacman.y);
  ctx.fillStyle = PACMAN_COLOUR;
  ctx.fill();
  ctx.closePath();
}

// Función para dibujar los fantasmas
function drawGhosts() {
  ghosts.forEach((ghost, index) => {
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, ghost.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgb(${index * 80}, ${255 - index * 80}, 255)`;
    ctx.fill();
    ctx.closePath();
  });
}

// Función para detectar colisiones entre el jugador Pacman y los fantasmas
function detectCollisions() {
  ghosts.forEach((ghost) => {
    const distance = Math.sqrt(Math.pow(pacman.x - ghost.x, 2) + Math.pow(pacman.y - ghost.y, 2));
    if (distance < pacman.radius + ghost.radius) {
      alert("¡Perdiste!");
      location.reload();
    }
  });
}

// Función para actualizar la posición del jugador Pacman y los fantasmas
function update() {
  // Actualizar la posición del jugador Pacman
  if (pacman.direction === 'right') {
    pacman.x += pacman.dx;
  } else if (pacman.direction === 'left') {
    pacman.x -= pacman.dx;
  } else if (pacman.direction === 'up') {
    pacman.y -= pacman.dy;
  } else if (pacman.direction === 'down') {
    pacman.y += pacman.dy;
  }

  // Actualizar la posición de los fantasmas
  ghosts.forEach((ghost) => {
    // Cambiar la dirección del fantasma cuando se acerca al borde del canvas
    if (ghost.x + ghost.radius > canvas.width || ghost.x
