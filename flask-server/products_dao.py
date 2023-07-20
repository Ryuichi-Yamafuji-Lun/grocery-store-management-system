import mysql.connector

def get_all_products(connection):
    try:
        cursor = connection.cursor()

        query = ("SELECT products.product_id, products.name, products.uom_id, products.price_per_unit, uom.uom_name "
                 "FROM grocerystore.products INNER JOIN grocerystore.uom ON products.uom_id = uom.uom_id")

        cursor.execute(query)

        response = []
        for (product_id, name, uom_id, price_per_unit, uom_name) in cursor:
            response.append({
                'product_id': product_id,
                'name': name,
                'uom_id': uom_id,
                'price_per_unit': price_per_unit,
                'uom_name': uom_name
            })

        cursor.close()
        return response

    except mysql.connector.Error as e:
        print("Error executing MySQL query:", e)
        return {"error": "An error occurred while fetching data from the database"}

def insert_new_product(connection, product):
    try:
        cursor = connection.cursor()

        query = ("INSERT INTO grocerystore.products (name, uom_id, price_per_unit) VALUES (%s, %s, %s)")

        data = (product['product_name'], product['uom_id'], product['price_per_unit'])

        cursor.execute(query, data)
        connection.commit()

        cursor.close()
        return cursor.lastrowid

    except mysql.connector.Error as e:
        print("Error executing MySQL query:", e)
        return None

def delete_product(connection, product_id):
    try:
        cursor = connection.cursor()

        query = ("DELETE FROM grocerystore.products WHERE product_id = %s")
        data = (product_id,)
        cursor.execute(query, data)

        connection.commit()
        cursor.close()

    except mysql.connector.Error as e:
        print("Error executing MySQL query:", e)

