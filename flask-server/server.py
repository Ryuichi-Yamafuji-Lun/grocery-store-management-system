from flask import Flask, request, jsonify
import products_dao
from sql_connection import get_mysql_connection

app = Flask(__name__)

connection = get_mysql_connection()

@app.route('/getProducts', methods=['GET'])
def get_products():
    
    products = products_dao.get_all_products(connection)
    response = jsonify(products)
    response.headers.get('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(debug=True)