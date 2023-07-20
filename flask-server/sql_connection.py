import mysql.connector

def get_mysql_connection():
    try:
        connection = mysql.connector.connect(
            user='root',
            password='root',
            host='127.0.0.1',
            database='grocerystore'
        )
        return connection
    except mysql.connector.Error as e:
        print("Error connecting to MySQL:", e)
        return None
