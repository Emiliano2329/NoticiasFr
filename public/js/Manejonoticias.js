
document.addEventListener('DOMContentLoaded', function() {
    const newsList = document.getElementById('news-list');
    const editNewsForm = document.getElementById('edit-news-form');
    const editForm = document.getElementById('editForm');
    const cancelButton = document.getElementById('cancelButton');

    cancelButton.addEventListener('click', cancelEdit);
    function loadNews() {
        fetch('/api/news')
            .then(response => response.json())
            .then(newsListData => {
                renderNewsList(newsListData);
            })
            .catch(error => {
                console.error('Error loading news:', error);
                alert('Hubo un error al cargar las noticias.');
            });
    }

    function renderNewsList(newsListData) {
        newsList.innerHTML = '';
        newsListData.forEach(news => {
            const newsItem = document.createElement('div');
            newsItem.innerHTML = `
                <h3>${news.title}</h3>
                <p>${news.content}</p>
                <button id="edit-${news.id}">Editar</button>
                <button id="delete-${news.id}">Borrar</button>
            `;
            newsList.appendChild(newsItem);

            document.getElementById(`edit-${news.id}`).addEventListener('click', function() {
                editNews(news.id);
            });

            document.getElementById(`delete-${news.id}`).addEventListener('click', function() {
                deleteNews(news.id);
            });
        });
    }

    function hideNewsList() {
        newsList.style.display = 'none';
    }

    function showNewsList() {
        newsList.style.display = 'block';
    }

    function showNewsAndLoad() {
        showNewsList();
        loadNews();
    }

    function editNews(id) {
        fetch(`/api/news/${id}`)
            .then(response => response.json())
            .then(news => {
                editForm['edit-id'].value = news.id;
                editForm['edit-title'].value = news.title;
                editForm['edit-content'].value = news.content;
                editForm['edit-body'].value = news.body; 
                editForm['edit-newsDate'].value = news.newsDate;


                editNewsForm.style.display = 'block';
                hideNewsList();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al cargar la noticia para editar.');
            });
    }

    function cancelEdit() {
        editNewsForm.style.display = 'none';
        showNewsAndLoad();
    }
   

    function deleteNews(id) {
        if (confirm('¿Estás seguro de que quieres borrar esta noticia?')) {
            fetch(`/api/news/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                showNewsAndLoad();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al borrar la noticia.');
            });
        }
    }

    document.getElementById('editForm').addEventListener('submit', function(event) {
        event.preventDefault();
        submitEdit();
    });

    function submitEdit() {
        const id = editForm['edit-id'].value;
        const title = editForm['edit-title'].value;
        const content = editForm['edit-content'].value;
        const newsDate = editForm['edit-newsDate'].value;

        const data = {
            title: title,
            content: content,
            body: editForm['edit-body'].value, 
            newsDate: newsDate,
        };

        fetch(`/api/news/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            editNewsForm.style.display = 'none';
            showNewsAndLoad();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al actualizar la noticia.');
        });
    }

    loadNews();
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleFormBtn = document.getElementById('toggleFormBtn');
    const addNewsForm = document.querySelector('.form-container');
    const newsList = document.getElementById('news-list');

    toggleFormBtn.addEventListener('change', function() {
        if (this.checked) {
            addNewsForm.style.display = 'block';
            newsList.style.display = 'none';
        } else {
            addNewsForm.style.display = 'none';
            newsList.style.display = 'block';
        }
    });

    // Inicia con la configuración predeterminada según sea necesario
    addNewsForm.style.display = 'block';
    newsList.style.display = 'none';
    toggleFormBtn.checked = true; // Asegúrate de que el interruptor comience en la posición correcta
});
