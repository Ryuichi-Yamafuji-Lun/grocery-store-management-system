from flask import Flask, jsonify, request
from flask_cors import CORS
import products_dao
from sql_connection import get_mysql_connection

app = Flask(__name__)
CORS(app)

@app.route('/getProducts', methods=['GET'])
def get_products():
    connection = get_mysql_connection()
    if connection is None:
        return jsonify({"error": "Database connection error"}), 500

    products = products_dao.get_all_products(connection)
    connection.close()

    if "error" in products:
        return jsonify(products), 500

    return jsonify(products)

@app.route('/addProduct', methods=['POST'])
def add_product():
    connection = get_mysql_connection()
    if connection is None:
        return jsonify({"error": "Database connection error"}), 500

    try:
        product_data = request.get_json()
        product_id = products_dao.insert_new_product(connection, product_data)
        connection.close()

        if product_id is not None:
            return jsonify({"product_id": product_id}), 201
        else:
            return jsonify({"error": "Failed to insert product"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/deleteProduct/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    connection = get_mysql_connection()
    if connection is None:
        return jsonify({"error": "Database connection error"}), 500

    try:
        products_dao.delete_product(connection, product_id)
        connection.close()

        return jsonify({"message": "Product deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=8080, debug=True)
