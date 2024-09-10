from flask import Flask, jsonify, request, render_template
from elasticsearch import Elasticsearch

app = Flask(__name__)
es = Elasticsearch("http://localhost:9200")


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/add-book', methods=['POST'])
def add_book():
    data = request.json
    res = es.index(index="books", body=data)
    return jsonify(res)


@app.route('/search', methods=['GET'])
def search_books():
    query = request.args.get('q')
    res = es.search(index="books", body={"query": {"match": {"title": query}}})
    return jsonify(res['hits']['hits'])


@app.route('/suggest', methods=['GET'])
def suggest_books():
    query = request.args.get('q')
    res = es.search(index="books", body={
        "suggest": {
            "book-suggest": {
                "prefix": query,
                "completion": {
                    "field": "title_suggest"
                }
            }
        }
    })
    suggestions = [option['_source'] for option in res['suggest']['book-suggest'][0]['options']]
    return jsonify(suggestions)


if __name__ == '__main__':
    app.run(debug=True)
