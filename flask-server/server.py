from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from DataAccess import products_dao, orders_dao, uom_dao
from sql_connection import get_mysql_connection
import functools

app = Flask(__name__)
CORS(app)

# Decorator to handle database connection and response for each route
def handle_db_connection(route):
    # Necessary for 'add_products' to update the inner function's metadata
    @functools.wraps(route)
    def wrapper(*args, **kwargs):
        connection = get_mysql_connection()
        if connection is None:
            return jsonify({"error": "Database connection error"}), 500
        
        try:
            # Call the original route function with the database connection
            result = route(connection, *args, **kwargs)
            
            return result
        
        except Exception as e:
            error_response = {
                'error': 'An error occurred while processing the request.',
                'details': str(e)
            }
            response = make_response(jsonify(error_response), 500)
            return response

        finally:
            connection.close()

    return wrapper

# PRODUCTS
@app.route('/getProducts', methods=['GET'])
@handle_db_connection
def get_products(connection):
    products = products_dao.get_all_products(connection)

    if "error" in products:
        return jsonify(products), 500

    return jsonify(products)

@app.route('/addProduct', methods=['POST'])
@handle_db_connection
def add_product(connection):
    try:
        product_data = request.get_json()
        product_id = products_dao.insert_new_product(connection, product_data)

        if product_id is not None:
            return jsonify({"product_id": product_id}), 201
        else:
            return jsonify({"error": "Failed to insert product"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/deleteProduct/<int:product_id>', methods=['DELETE'])
@handle_db_connection
def delete_product(connection, product_id):
    try:
        products_dao.delete_product(connection, product_id)
        return jsonify({"message": "Product deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ORDERS
@app.route('/getAllOrders', methods=['GET'])
@handle_db_connection
def get_all_orders(connection):
    orders = orders_dao.get_all_orders(connection)

    if "error" in orders:
        return jsonify(orders), 500
    
    return jsonify(orders)

@app.route('/insertOrder', methods=['POST'])
@handle_db_connection
def insert_order(connection):
    try:
        request_payload = request.get_json()

        order_id = orders_dao.insert_order(connection, request_payload)

        response_data = {'order_id': order_id}

        response = make_response(jsonify(response_data), 200)
        
        return response

    except Exception as e:
        error_response = {
            'error': 'An error occurred while inserting the order into the database.',
            'details': str(e)
        }
        response = make_response(jsonify(error_response), 500)

        return response

# UNIT OF MEASUREMENTS
@app.route('/getUoM', methods=['GET'])
@handle_db_connection
def get_uom(connection):
    uom = uom_dao.get_uoms(connection)

    if "error" in uom:
        return jsonify(uom), 500
    
    return jsonify(uom)

if __name__ == "__main__":
    app.run(port=8080, debug=True)
