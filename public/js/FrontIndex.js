document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('main');

    fetch('/api/news')
        .then(response => response.json())
        .then(data => {
            data.forEach(news => {

                const container_card = document.createElement('div');
                container_card.className = 'contenedor';

                const card = document.createElement('div');
                card.className = 'news-card';
                card.innerHTML = `
                <img src="${news.imageUrl}" alt="Imagen de la noticia">
                <h2 class = "logo">${news.title}</h2>
                <p class="hover_content h6">Fecha: ${news.newsDate}</p>
                <p class="hover_content h6">${news.content.substring(0, 100)}...</p>
                <p class="hover_description h6">${news.body}</p>
                <button class="button" id="show-more">
                    <span class="button_lg">
                        <span class="button_sl"></span>
                        <span class="button_text">Ver más</span>
                    </span>
                </button>
            `;

                //<button class="more-btn">Ver más</button>          

                container_card.appendChild(card);

                container.appendChild(container_card);


                const btn = card.querySelector('#show-more');
                const hoverDescription = card.querySelector('.hover_description');
                let band = 0;
                btn.addEventListener('click', function () {

                    console.log("Hola mi pana");

                    // Toggle (agregar o quitar) los estilos CSS directamente
                    if (band == 1) {
                        hoverDescription.style.maxHeight = '0';
                        hoverDescription.style.transform = 'translateY(1em)';
                        // hoverDescription.style.overflow = 'hidden';
                        console.log("pan");
                        band = 0;
                    } else {
                        hoverDescription.style.maxHeight = '10em';
                        hoverDescription.style.transform = 'none';
                        // hoverDescription.style.overflow = 'visible';
                        console.log("no pan");
                        band = 1;
                    }
                    // //     const fullContent = card.querySelector('.full-content');
                    // //     const summary = card.querySelector('.summary');

                    // //     if (fullContent.classList.contains('hidden')) {
                    // //         // Expandir la tarjeta a pantalla completa
                    // //         card.classList.add('fullscreen');
                    // //         container.classList.add('darken');
                    // //         container.classList.add('hide-others');
                    // //         fullContent.classList.remove('hidden');
                    // //         summary.classList.add('hidden');
                    // //         btn.textContent = 'Ver menos';
                    // //     } else {
                    // //         // Revertir los cambios cuando se hace clic en "Ver menos"
                    // //         card.classList.remove('fullscreen');
                    // //         container.classList.remove('darken');
                    // //         container.classList.remove('hide-others');
                    // //         fullContent.classList.add('hidden');
                    // //         summary.classList.remove('hidden');
                    // //         btn.textContent = 'Ver más';
                    // //     }
                });
            });
        })
        .catch(error => console.error('Error fetching news:', error));
});
