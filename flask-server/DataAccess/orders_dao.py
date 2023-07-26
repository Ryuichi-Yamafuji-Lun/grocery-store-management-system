import mysql.connector
from datetime import datetime

DATE_FORMAT = '%m-%d-%Y'

def format_date(date):
    return date.strftime(DATE_FORMAT)

def get_all_orders(connection):
    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM orders"
            cursor.execute(query)

            response = []
            for (order_id, customer_name, total, date) in cursor:
                response.append({
                    'order_id': order_id,
                    'customer_name': customer_name,
                    'total': total,
                    'date': format_date(date),
                })

            # Append order details in each order
            for record in response:
                record['order_details'] = get_order_details(connection, record['order_id'])

            return response

    except mysql.connector.Error as e:
        raise Exception("Error executing MySQL GET ALL ORDERS query:", e) 
    
def get_order_details(connection, order_id):
    try:
        with connection.cursor() as cursor:
            query = "SELECT order_detail.order_id, order_detail.quantity, order_detail.total_price, " \
                    "products.name, products.price_per_unit FROM order_detail " \
                    "LEFT JOIN products ON order_detail.product_id = products.product_id " \
                    "WHERE order_detail.order_id = %s"

            data = (order_id,)
            cursor.execute(query, data)

            records = []
            for (order_id, quantity, total_price, product_name, price_per_unit) in cursor:
                records.append({
                    'order_id': order_id,
                    'quantity': quantity,
                    'total_price': total_price,
                    'product_name': product_name,
                    'price_per_unit': price_per_unit
                })

            return records

    except mysql.connector.Error as e:
        raise Exception("Error executing MySQL GET ORDER_DETAIL query:", e)  

def insert_order(connection, order):
    try:
        with connection.cursor() as cursor:
            # Start a transaction
            connection.start_transaction()

            # Insert the order information into the 'orders' table
            order_query = "INSERT INTO orders (customer_name, total, date) VALUES (%s, %s, %s)"
            order_data = (order['customer_name'], order['grand_total'], datetime.now().date())
            cursor.execute(order_query, order_data)

            # Get the auto-generated order ID from the last insert
            order_id = cursor.lastrowid

            # Prepare the order details data to be inserted into the 'order_detail' table
            order_details_query = "INSERT INTO order_detail (order_id, product_id, quantity, total_price) VALUES (%s, %s, %s, %s)"
            order_details_data = []

            for order_detail_record in order['order_details']:
                order_details_data.append([
                    order_id,
                    int(order_detail_record['product_id']),
                    float(order_detail_record['quantity']),
                    float(order_detail_record['total_price'])
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