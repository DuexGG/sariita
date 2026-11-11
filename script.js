
const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const buttonsArea = document.getElementById('buttonsArea');
const success = document.getElementById('success');
const hint = document.getElementById('hint');


// BOTÓN NO ESCAPISTA

function moveNoButton() {

    const area = buttonsArea.getBoundingClientRect();

    const width = noButton.offsetWidth;
    const height = noButton.offsetHeight;

    const maxX = area.width - width;
    const maxY = area.height - height;

    const yes = yesButton.getBoundingClientRect();

    let x, y;
    let attempts = 0;

    do {

        x = Math.random() * maxX;
        y = Math.random() * maxY;

        const newPosition = {
            left: area.left + x,
            right: area.left + x + width,
            top: area.top + y,
            bottom: area.top + y + height
        };

        const overlaps =
            newPosition.left < yes.right + 15 &&
            newPosition.right > yes.left - 15 &&
            newPosition.top < yes.bottom + 15 &&
            newPosition.bottom > yes.top - 15;

        if (!overlaps) break;

        attempts++;

    } while (attempts < 100);

    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;

    hint.textContent = 'JAJAJA, ¡casi! Inténtalo otra vez 😂';

}


// Cuando el ratón se acerca

noButton.addEventListener('pointerenter', moveNoButton);


// Cuando intenta pulsarlo

noButton.addEventListener('click', (event) => {

    event.preventDefault();

    moveNoButton();

});


// En móviles

noButton.addEventListener('touchstart', (event) => {

    event.preventDefault();

    moveNoButton();

}, { passive: false });


// BOTÓN SÍ

yesButton.addEventListener('click', () => {

    success.classList.add('active');

    createStars(45);

});


// VOLVER A EMPEZAR

document.getElementById('backButton').addEventListener('click', () => {

    success.classList.remove('active');

    hint.textContent = 'Piensa bien tu respuesta...';

    noButton.style.left = '57%';
    noButton.style.top = '25px';

});


// ESTRELLAS Y CONFETI

function createStars(amount) {

    const emojis = ['⭐', '✨', '🌟', '🎉', '🎊', '☁️'];

    for (let i = 0; i < amount; i++) {

        const star = document.createElement('span');

        star.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        star.style.position = 'fixed';

        star.style.left = Math.random() * 100 + 'vw';

        star.style.top = '105vh';

        star.style.fontSize =
            (15 + Math.random() * 25) + 'px';

        star.style.pointerEvents = 'none';

        star.style.zIndex = '50';

        document.body.appendChild(star);

        const duration = 2000 + Math.random() * 2500;

        star.animate([

            {
                transform: 'translateY(0) rotate(0deg)',
                opacity: 1
            },

            {
                transform: `translateY(-120vh) rotate(360deg)`,
                opacity: 0
            }

        ], {

            duration: duration,
            easing: 'ease-out'

        });

        setTimeout(() => {
            star.remove();
        }, duration);

    }

}


// ESTRELLITAS CONTINUAS

setInterval(() => {

    if (!success.classList.contains('active')) return;

    createStars(2);

}, 800);
