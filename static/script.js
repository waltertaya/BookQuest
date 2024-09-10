function searchSuggestions() {
    const query = document.getElementById('search-bar').value;
    if (query.length < 2) return;

    fetch(`/suggest?q=${query}`)
        .then(response => response.json())
        .then(data => {
            const suggestions = document.getElementById('suggestions');
            suggestions.innerHTML = '';
            data.forEach(book => {
                const li = document.createElement('li');
                li.textContent = book.title;
                li.onclick = () => searchBooks(book.title);
                suggestions.appendChild(li);
            });
        });
}


function searchBooks(query) {
    fetch(`/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            const booksDiv = document.getElementById('books');
            booksDiv.innerHTML = '';

            data.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.className = 'book';

                const img = document.createElement('img');
                img.src = book._source.image;
                bookDiv.appendChild(img);

                const title = document.createElement('h3');
                title.textContent = book._source.title;
                bookDiv.appendChild(title);

                const author = document.createElement('p');
                author.textContent = 'Author: ' + book._source.author;
                bookDiv.appendChild(author);

                booksDiv.appendChild(bookDiv);
            });
        });
}