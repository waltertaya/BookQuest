# BookQuest

BookQuest is a simple web application built with Flask and Elasticsearch that allows users to search for books by title. It provides a dynamic search interface with autocomplete suggestions as you type and displays search results with book details such as title, author, and cover image.

## Features
- Full-text search for books by title.
- Autocomplete suggestions while typing in the search bar.
- Displays book details like title, author, and cover image.
- Simple and clean frontend using HTML, CSS, and JavaScript.

## Technologies Used
- **Flask**: Python web framework for the backend.
- **Elasticsearch**: Distributed search engine for indexing and searching books.
- **HTML/CSS/JavaScript**: Simple frontend for displaying book results and search functionality.

## Project Structure
```
/bookquest
    /templates
        /index.html          # Frontend HTML for search interface
    /static
        /style.css           # Optional: If you want to separate CSS styles
    /app.py                  # Main Flask application and API endpoints
    /README.md               # Project overview and instructions
    /requirements.txt        # Python dependencies
```

## Prerequisites
Before you begin, make sure you have the following installed:
- **Python 3.x**
- **Elasticsearch** (running locally or on a server)
- **Flask** and **Elasticsearch Python Client**

You can install the required Python packages using:
```bash
pip install Flask elasticsearch
```

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/waltertaya/bookquest.git
cd bookquest
```

### 2. Set Up Elasticsearch
Ensure you have Elasticsearch running locally or on a server. You can download Elasticsearch from the official website: https://www.elastic.co/downloads/elasticsearch

### 3. Configure Elasticsearch Index
Create the `books` index with the appropriate mappings for autocompletion:

```bash
curl -X PUT "http://localhost:9200/books" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "title": { "type": "text" },
      "author": { "type": "text" },
      "image": { "type": "text" },
      "title_suggest": {
        "type": "completion"
      }
    }
  }
}'
```

### 4. Run the Flask Application
To start the Flask server, run the following command:
```bash
python app.py
```

The server will start running at `http://127.0.0.1:5000/`.

### 5. Add Book Data
To add book data to Elasticsearch, you can use Postman, Curl, or any REST client. Example:
```bash
curl -X POST "http://127.0.0.1:5000/add-book" -H "Content-Type: application/json" -d '{
  "title": "Harry Potter and the Sorcerer\'s Stone",
  "author": "J.K. Rowling",
  "image": "https://example.com/harry_potter.jpg",
  "title_suggest": {"input": ["Harry Potter and the Sorcerer\'s Stone"]}
}'
```

### 6. Search for Books
Open your browser and go to `http://127.0.0.1:5000/`. Type a book title in the search bar, and you'll see autocomplete suggestions as you type. Once you submit a search, the matching books will be displayed.

## Example Book Data

You can add more book data following this structure:
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "image": "https://example.com/great_gatsby.jpg",
  "title_suggest": {"input": ["The Great Gatsby"]}
}
```

## Future Enhancements
- **User Authentication**: Allow users to create accounts and save their favorite books.
- **Advanced Filters**: Filter books by categories such as genre, year, or rating.
- **Pagination**: Implement pagination for search results.
- **Book Reviews**: Allow users to leave reviews or ratings for books.

## Author

- [waltertaya](https://github.com/waltertaya)
