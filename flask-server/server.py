from flask import Flask, request, jsonify
from flask_cors import CORS
import products_dao
from sql_connection import get_mysql_connection

app = Flask(__name__)
CORS(app)
connection = get_mysql_connection()

@app.route('/api/getProducts', methods=['GET'])
def get_products():
    response = products_dao.get_all_products(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run(port=8080, debug=True)