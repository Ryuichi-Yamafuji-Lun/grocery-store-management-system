from dotenv import load_dotenv
import mysql.connector
import os

load_dotenv()

def get_mysql_connection():
    try:
        connection = mysql.connector.connect(
            user= os.environ['DB_USER'],
            password= os.environ['DB_PASSWORD'],
            host= os.environ['DB_HOST'],
            database= os.environ['DB_NAME'],
        )
        return connection
    except mysql.connector.Error as e:
        print("Error connecting to MySQL:", e)
        return None
