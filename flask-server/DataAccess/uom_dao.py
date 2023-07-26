import mysql.connector

def get_uoms(connection):
    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM uom"
            cursor.execute(query)

            # Create a dictionary for each UOM record and append it to the response list
            response = []
            for (uom_id, uom_name) in cursor:
                response.append({
                    'uom_id': uom_id,
                    'uom_name': uom_name
                })

            return response

    except mysql.connector.Error as e:
        print("Error executing MySQL query:", e)
        return {"error": "An error occurred while fetching data from the database"}
