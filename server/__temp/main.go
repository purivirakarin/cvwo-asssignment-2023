package main

import (
    "fmt"
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
)

func main() {
    fmt.Println("Go MySQL Tutorial")

    // Open up our database connection.
    // I've set up a database on my local machine using phpmyadmin.
    // The database is called testDb
    db, err := sql.Open("mysql", "root:Home2002@tcp(127.0.0.1:3306)/mydb")

    // if there is an error opening the connection, handle it
    if err != nil {
        panic(err.Error())
    }

    // defer the close till after the main function has finished
    // executing
    defer db.Close()

	insert, err := db.Query("INSERT INTO test VALUES ( 2, 'TEST' )")

	if err != nil {
        panic(err.Error())
    }
    // be careful deferring Queries if you are using transactions
    defer insert.Close()

}