#Products
import mysql.connector

def get_all_products(connection):
    try:
        with connection.cursor() as cursor:
            # SQL query to retrieve all products along with their uom information
            query = ("SELECT products.product_id, products.name, products.uom_id, products.price_per_unit, uom.uom_name "
                     "FROM grocerystore.products INNER JOIN grocerystore.uom ON products.uom_id = uom.uom_id")
            cursor.execute(query)

            response = []
            for (product_id, name, uom_id, price_per_unit, uom_name) in cursor:
                # Append each product to the response list in a dictionary format
                response.append({
                    'product_id': product_id,
                    'name': name,
                    'uom_id': uom_id,
                    'price_per_unit': price_per_unit,
                    'uom_name': uom_name
                })

            return response

    except mysql.connector.Error as e:
        raise Exception("Error executing MySQL query:", e)

def insert_new_product(connection, product):
    try:
        with connection.cursor() as cursor:
            # SQL query to insert a new product into the 'products' table
            query = ("INSERT INTO grocerystore.products (name, uom_id, price_per_unit) VALUES (%s, %s, %s)")

            data = (product['name'], product['uom_id'], product['price_per_unit'])

            cursor.execute(query, data)
            connection.commit()

            # Return the last auto-generated product_id
            return cursor.lastrowid

    except mysql.connector.Error as e:
        raise Exception("Error executing MySQL INSERT query:", e)

def delete_product(connection, product_id):
    try:
        with connection.cursor() as cursor:
            # Delete associated order details first
            delete_order_details_query = "DELETE FROM grocerystore.order_detail WHERE product_id = %s"
            data = (product_id,)
            cursor.execute(delete_order_details_query, data)

            # SQL query to delete a product from the 'products' table
            query = ("DELETE FROM grocerystore.products WHERE product_id = %s")
            data = (product_id,)
            cursor.execute(query, data)

            connection.commit()

    except mysql.connector.Error as e:
        raise Exception("Error executing MySQL DELETE query:", e) 
    
def update_product(connection, product_id, product_data):
    try:
        with connection.cursor() as cursor:
            # SQL query to update an existing product in the 'products' table
            query = ("UPDATE grocerystore.products SET name=%s, uom_id=%s, price_per_unit=%s "
                     "WHERE product_id = %s")

            data = (product_data['name'], product_data['uom_id'], product_data['price_per_unit'], product_id)

            cursor.execute(query, data)
            connection.commit()

    except mysql.connector.Error as e:
        raise Exception("Error executing MySQL UPDATE query:", e)