import mysql.connector

__cnx = None

def get_mysql_connection():
    global __cnx
    if __cnx == None:
        __cnx = mysql.connector.connect(user='root', password='root',
                                    host='127.0.0.1',
                                    database='grocerystore')
    return __cnx