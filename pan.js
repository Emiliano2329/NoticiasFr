document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
        // Añade aquí más imágenes según sea necesario
    ];

    const carouselInner = document.querySelector('.carousel-inner');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    let currentIndex = 0;

    // Crear elementos del carrusel dinámicamente
    images.forEach((src, index) => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        if (index === 0) item.classList.add('active');
        const img = document.createElement('img');
        img.src = src;
        item.appendChild(img);
        carouselInner.appendChild(item);

        const indicator = document.createElement('button');
        indicator.dataset.slide = index;
        if (index === 0) indicator.classList.add('active');
        indicatorsContainer.appendChild(indicator);
    });

    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicators button');

    const showSlide = (index) => {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
            indicators[i].classList.toggle('active', i === index);
        });
        const offset = -index * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;
    };

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });

    document.getElementById('prev').addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
        showSlide(currentIndex);
    });

    document.getElementById('next').addEventListener('click', () => {
        currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
        showSlide(currentIndex);
    });

    showSlide(currentIndex);
});
