from datetime import datetime
import mysql.connector

def get_all_orders(connection):
    try:
        cursor = connection.cursor()

        query = ("Select * FROM grocerystore.orders")

        cursor.execute(query)

        response = []

        for (order_id, customer_name, total, date) in cursor:
             response.append({
                  'order_id': order_id,
                  'customer_name': customer_name,
                  'total': total,
                  'date': date.strftime('%m-%d-%Y'),
             })
        
        cursor.close()
        return response

    except mysql.connector.Error as e:
            print("Error executing MySQL query:", e)
            return {"error": "An error occurred while fetching data from the database"}