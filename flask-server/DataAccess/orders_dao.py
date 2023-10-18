# Order
import mysql.connector
from datetime import datetime

DATE_FORMAT = '%m-%d-%Y'

def format_date(date):
    return date.strftime(DATE_FORMAT)

def calculate_order_total(order_id, connection):
    try:
        with connection.cursor() as cursor:
            query = "SELECT SUM(quantity * price_per_unit) AS total FROM order_detail " \
                    "LEFT JOIN products ON order_detail.product_id = products.product_id " \
                    "WHERE order_detail.order_id = %s"
            data = (order_id,)
            cursor.execute(query, data)
            result = cursor.fetchone()
            if result and result[0]:
                return float(result[0])
            return 0.0
        
    except mysql.connector.Error as e:
        raise Exception("Error calculating order total:", e)

def get_order_by_id(connection, order_id):
    try:
        with connection.cursor() as cursor:
            query = "SELECT order_id, customer_name, date FROM orders WHERE order_id = %s"
            data = (order_id,)
            cursor.execute(query, data)
            result = cursor.fetchone()
            if result:
                order = {
                    'order_id': result[0],
                    'customer_name': result[1],
                    'date': format_date(result[2]),
                    'total': calculate_order_total(order_id, connection),
                    'order_details': get_order_details(connection, order_id),
                }
                return order
            
            else:
                return {"error": "Order not found"}
    except mysql.connector.Error as e:
        raise Exception("Error executing MySQL GET ORDER BY ID query:", e)

def get_all_orders(connection):
    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM orders"
            cursor.execute(query)

            rows = cursor.fetchall()

            response = []
            for (order_id, customer_name, date) in rows:
                total = calculate_order_total(order_id, connection)
                response.append({
                    'order_id': order_id,
                    'customer_name': customer_name,
                    'date': format_date(date),
                    'total': total,
                    'order_details': get_order_details(connection, order_id),
                })

            return response
        
    except mysql.connector.Error as e:
        raise Exception("Error executing MySQL GET ALL ORDERS query:", e)

def get_recent_orders(connection):
    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM orders ORDER BY date DESC LIMIT 5"
            cursor.execute(query)

            rows = cursor.fetchall()

            response = []
            for (order_id, customer_name, date) in rows:
                total = calculate_order_total(order_id, connection)
                response.append({
                    'order_id': order_id,
                    'customer_name': customer_name,
                    'date': format_date(date),
                    'total': total,
                    'order_details': get_order_details(connection, order_id),
                })

            return response
        
    except mysql.connector.Error as e:
        raise Exception("Error executing MySQL GET RECENT ORDERS query:", e)


def get_order_details(connection, order_id):
    try:
        with connection.cursor() as cursor:
            query = "SELECT order_detail.order_id, order_detail.quantity, " \
                    "products.name, products.price_per_unit FROM order_detail " \
                    "LEFT JOIN products ON order_detail.product_id = products.product_id " \
                    "WHERE order_detail.order_id = %s"

            data = (order_id,)
            cursor.execute(query, data)

            records = []
            for (order_id, quantity, product_name, price_per_unit) in cursor:
                records.append({
                    'order_id': order_id,
                    'quantity': quantity,
                    'product_name': product_name,
                    'price_per_unit': price_per_unit
                })

            return records
    except mysql.connector.Error as e:
        raise Exception("Error executing MySQL GET ORDER_DETAIL query:", e)

def insert_order(connection, order):
    try:
        with connection.cursor() as cursor:
            # Insert the order information into the 'orders' table
            order_query = "INSERT INTO grocerystore.orders (customer_name, date) VALUES (%s, %s)"
            order_data = (order['customer_name'], format_date(datetime.now()))
            cursor.execute(order_query, order_data)
            connection.commit()

            # Get the auto-generated order ID from the last insert
            order_id = cursor.lastrowid

            # Prepare the order details data to be inserted into the 'order_detail' table
            order_details_query = "INSERT INTO grocerystore.order_detail (order_id, product_id, quantity) VALUES (%s, %s, %s)"
            order_details_data = []

            for order_detail_record in order['order_details']:
                product_id = int(order_detail_record['product_id'])
                quantity = int(order_detail_record['quantity'])
                order_details_data.append([
                    order_id,
                    product_id,
                    quantity,
                ])

            # Insert multiple order details records using executemany
            cursor.executemany(order_details_query, order_details_data)

            # Commit the transaction if all queries are successful
            connection.commit()

            # Return the order ID for reference or further processing
            return order_id
    except mysql.connector.Error as e:
        # Rollback the transaction in case of an error
        connection.rollback()
        raise Exception("Error executing MySQL INSERT ORDER query:", e)

def delete_order(connection, order_id):
    try:
        with connection.cursor() as cursor:
            # Delete associated order details first
            delete_order_details_query = "DELETE FROM grocerystore.order_detail WHERE order_id = %s"
            data = (order_id,)
            cursor.execute(delete_order_details_query, data)

            # SQL query to delete an order from the 'orders' table
            query = "DELETE FROM grocerystore.orders WHERE order_id = %s"
            data = (order_id,)
            cursor.execute(query, data)

            connection.commit()
    except mysql.connector.Error as e:
        raise Exception("Error executing MySQL DELETE ORDER query:", e)
