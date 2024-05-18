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
               <div class="image-container">
                <img src="${news.imageUrl}" alt="Imagen de la noticia">
              </div>
                <div>
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
               </div>
            `;

                //<button class="more-btn">Ver más</button>          

                container_card.appendChild(card);

                container.appendChild(container_card);

            });

            const btns = document.querySelectorAll("#show-more")  // Se adquiere a los botones de cada una de las tarjetas creadas
            const hoverDescription = document.querySelector('.hover_description');  // Se adquiere la descripción de cada una de las tarjetas creadas
            const containerCards = document.querySelectorAll('.contenedor');

            for (let button of btns) {
                const buttonText = button.querySelector('.button_text');  // Se accede al texto del elemento button
                const containerCard = button.closest('.contenedor');  // Se accede al contenedor de la tarjeta que se seleccione
                const card = containerCard.querySelector('.news-card');  // Se accede al contenido de la tarjeta seleccionada
                const hoverDescription = card.querySelector('.hover_description');  // Se accede a la descripción de la tarjeta seleccionada

                button.addEventListener('click', () => {  // Se le agrega un evento a los elementos buttons
                 
                    console.log(buttonText.textContent);
                    if(buttonText.textContent === 'Ver más'){  // Si se selecciona una noticia

                        buttonText.textContent = 'Ver menos';

                        for(let container of containerCards){
                            if(container !== containerCard){
                                container.style.display = 'none';
                            }else{
                                containerCard.classList.replace('contenedor', 'contenedor-alterado');
                                hoverDescription.style.maxHeight = '70rem';
                                hoverDescription.style.transform = 'none';
                            }
                        }
                    }else{  // Si se desea volver a ver las demás noticias
                        buttonText.textContent = 'Ver más';
                        for(let container of containerCards){
                            if(container !== containerCard){
                                container.style.display = 'flex';
                            }else{
                                containerCard.classList.replace('contenedor-alterado', 'contenedor');
                                hoverDescription.style.maxHeight = '0';
                                hoverDescription.style.transform = 'translateY(1em)';
                            }
                        }
                    }

         
                    
                    // Se imprime la descripción de la tarjeta
                    //console.log(`Descripción: ${hoverDescription.textContent}`);

                    
                    
                });
            }


        })
        .catch(error => console.error('Error fetching news:', error));

});

