const envelopeWrapper = document.getElementById("envelope-wrapper");
const envelope = document.getElementById("envelope");
const fullscreenLetter = document.getElementById("fullscreen-letter");
const closeBtn = document.getElementById("close-btn");
const heartsContainer = document.getElementById("hearts-container");
const floatingHearts = document.getElementById("floating-hearts");

// Corazones cayendo aleatoriamente (efecto lluvia)
function createFallingHeart() {
    const heart = document.createElement("i");
    heart.className = "fas fa-heart heart-fall";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 16 + Math.random() * 24 + "px";
    heart.style.animationDuration = 5 + Math.random() * 5 + "s";
    heartsContainer.appendChild(heart);

    heart.addEventListener("animationend", () => {
        heart.remove();
    });
}

// Corazones flotantes en posiciones aleatorias (solo animación de fondo)
function createFloatingHeart() {
    const heart = document.createElement("i");
    heart.className = "fas fa-heart floating-heart";
    heart.style.left = Math.random() * 90 + "vw";
    heart.style.top = 80 + Math.random() * 15 + "vh";
    heart.style.animationDuration = 6 + Math.random() * 4 + "s";
    floatingHearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

let heartsInterval = null;
let floatingHeartsInterval = null;

function startHearts() {
    if (!heartsInterval) {
        heartsInterval = setInterval(createFallingHeart, 300);
    }
    if (!floatingHeartsInterval) {
        floatingHeartsInterval = setInterval(createFloatingHeart, 2000);
    }
}

function stopHearts() {
    clearInterval(heartsInterval);
    clearInterval(floatingHeartsInterval);
    heartsInterval = null;
    floatingHeartsInterval = null;
}

function openLetter() {
    envelope.classList.add("open");
    startHearts();
    // Mostrar la carta fullscreen con delay para permitir la animación del sobre
    setTimeout(() => {
        fullscreenLetter.classList.add("active");
    }, 700);
}

function closeLetter() {
    fullscreenLetter.classList.remove("active");
    envelope.classList.remove("open");
    stopHearts();
}

envelopeWrapper.addEventListener("click", () => {
    openLetter();
});

closeBtn.addEventListener("click", () => {
    closeLetter();
});

// Opcional: cerrar carta si haces clic fuera del contenido
fullscreenLetter.addEventListener("click", (e) => {
    if (e.target === fullscreenLetter) {
        closeLetter();
    }
});

// Iniciar la lluvia de corazones desde el inicio
window.addEventListener('load', () => {
    startHearts();
});


// NUEVO: Corazones que siguen el dedo o mouse al mover o tocar la pantalla
function createHeartAt(x, y) {
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart floating-heart';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.position = 'fixed';
    heart.style.pointerEvents = 'none';
    heart.style.animationDuration = 4000 + Math.random() * 2000 + 'ms';
    floatingHearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

function onPointerMove(e) {
    if (e.touches) {
        for (let touch of e.touches) {
            createHeartAt(touch.clientX, touch.clientY);
        }
    } else {
        createHeartAt(e.clientX, e.clientY);
    }
}

// Escuchar movimientos
window.addEventListener('mousemove', onPointerMove);
window.addEventListener('touchmove', onPointerMove, { passive: true });
