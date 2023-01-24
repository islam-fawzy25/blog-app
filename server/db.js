import mysql, { createConnection } from "mysql2";

  const db= mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'Semsem@25',
        database:'blog',
        port:'3306'
    }
)

export default db