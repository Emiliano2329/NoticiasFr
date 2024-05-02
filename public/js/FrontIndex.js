document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');

    fetch('/api/news')
    .then(response => response.json())
    .then(data => {
        data.forEach(news => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.innerHTML = `
                <img src="${news.imageUrl}" alt="Imagen de la noticia">
                <h2>${news.title}</h2>
                <p>Fecha: ${news.newsDate}</p>
                <p class="summary">${news.content.substring(0, 100)}...</p>
                <p class="full-content hidden">${news.body}</p>
                <button class="more-btn">Ver más</button>
            `;
            container.appendChild(card);

            const btn = card.querySelector('.more-btn');
            btn.addEventListener('click', function() {
                const fullContent = card.querySelector('.full-content');
                const summary = card.querySelector('.summary');

                if (fullContent.classList.contains('hidden')) {
                    // Expandir la tarjeta a pantalla completa
                    card.classList.add('fullscreen');
                    container.classList.add('darken');
                    container.classList.add('hide-others');
                    fullContent.classList.remove('hidden');
                    summary.classList.add('hidden');
                    btn.textContent = 'Ver menos';
                } else {
                    // Revertir los cambios cuando se hace clic en "Ver menos"
                    card.classList.remove('fullscreen');
                    container.classList.remove('darken');
                    container.classList.remove('hide-others');
                    fullContent.classList.add('hidden');
                    summary.classList.remove('hidden');
                    btn.textContent = 'Ver más';
                }
            });
        });
    })
    .catch(error => console.error('Error fetching news:', error));
});
