/* =========================================
   1. Данные: список фотографий (уже JPG)
   ========================================= */
const images = [
    'IMG_3378.jpg',
    'IMG_3545.jpg',
    'IMG_3595.jpg',
    'IMG_4500.jpg',
    'IMG_4754.jpg',
    'IMG_4783.jpg',
    'IMG_4788.jpg',
    'IMG_4799.jpg',
    'IMG_4801.jpg',
    'IMG_4809.jpg',
    'IMG_4888.jpg',
    'IMG_4943.jpg',
    'IMG_4959.jpg',
    'IMG_5083.jpg',
    'IMG_5097.jpg',
    'IMG_5129.jpg'
];

let currentIndex = 0;

/* =========================================
   2. Инициализация кастомного слайдера
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.getElementById('slides-container');

    // Заполняем слайды динамически
    images.forEach((filename, idx) => {
        const imgEl = document.createElement('img');
        imgEl.src = `assets/images/${filename}`;
        imgEl.alt = `Фото ${idx + 1}`;
        imgEl.classList.add('slide');
        if (idx === 0) imgEl.classList.add('active');
        imgEl.dataset.index = idx;

        // Клик по слайду → открываем Lightbox
        imgEl.addEventListener('click', () => {
            openLightbox(idx);
        });

        slidesContainer.appendChild(imgEl);
    });

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    prevBtn.addEventListener('click', () => {
        const slides = document.querySelectorAll('.slide');
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        slides[currentIndex].classList.add('active');
    });

    nextBtn.addEventListener('click', () => {
        const slides = document.querySelectorAll('.slide');
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        slides[currentIndex].classList.add('active');
    });
});

/* =========================================
   3. Lightbox-функции
   ========================================= */
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');

function openLightbox(idx) {
    currentIndex = idx;
    lightboxImage.src = `assets/images/${images[idx]}`;
    lightboxOverlay.style.display = 'flex';
}

function closeLightbox() {
    lightboxOverlay.style.display = 'none';
}

lightboxClose.addEventListener('click', closeLightbox);

lbPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImage.src = `assets/images/${images[currentIndex]}`;
});

lbNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImage.src = `assets/images/${images[currentIndex]}`;
});

lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
});

/* =========================================
   4. Скролл до галереи по кнопке
   ========================================= */
document
    .getElementById('scroll-to-gallery')
    .addEventListener('click', () => {
        document.getElementById('gallery').scrollIntoView({
            behavior: 'smooth'
        });
    });

/* =========================================
   5. Drag & Drop для букета
   ========================================= */
const draggableItems = document.querySelectorAll('.draggable-item');
const dropVase = document.getElementById('drop-vase');
const bouquetMessage = document.getElementById('bouquet-message');
let droppedCount = 0;

dropVase.addEventListener('dragover', (e) => {
    e.preventDefault();
});
dropVase.addEventListener('drop', (e) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain');
    if (item && !dropVase.dataset[item]) {
        dropVase.dataset[item] = 'placed';
        droppedCount++;
        if (droppedCount >= 2) {
            bouquetMessage.style.display = 'block';
        }
    }
});

draggableItems.forEach((el) => {
    el.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.dataset.item);
    });
});

/* =========================================
   6. Летающие зверьки (Easter Egg)
   ========================================= */
const flyingArea = document.getElementById('flying-area');

function spawnFlyingCreature() {
    const creature = document.createElement('img');
    creature.src = 'assets/icons/flying-creature.svg';
    creature.alt = 'Белка-летяга';
    creature.classList.add('flying-creature');

    // Случайная высота появления (от 10% до 60%)
    const startTop = Math.random() * 50 + 10;
    creature.style.top = `${startTop}%`;

    creature.addEventListener('click', () => {
        alert('Поймала зверька? Вот тебе секретное поздравление <3');
        creature.remove();
    });

    flyingArea.appendChild(creature);

    creature.addEventListener('animationend', () => {
        creature.remove();
    });
}

setInterval(spawnFlyingCreature, 12000);
