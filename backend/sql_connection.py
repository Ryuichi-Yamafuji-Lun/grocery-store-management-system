import mysql.connector

__cnx == None

def get_mysql_connection():
    global __cnx
    if __cnx == None:
        __cnx = mysql.connector.connect(user='root', password='60ca563b5c0e',
                                    host='127.0.0.1',
                                    database='grocerystore')
    return __cnx