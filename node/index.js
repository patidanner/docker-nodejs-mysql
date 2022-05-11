const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db', //nome do container
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
const sqlCreateTable = `CREATE TABLE if not exists people (name VARCHAR(255))`
const sqlQuery = `INSERT INTO people(name) values('Pati')`

connection.query(sqlCreateTable)

app.get('/', (req,res) => {
    connection.query(sqlQuery)    
    connection.query('SELECT * FROM people', 
        function (err, results, fields) {
            if (err) throw err;
            else 
            res.send(`<h1>Full Cycle Rocks! </h1>  <br> <ul>` + results.map(name =>
                `<li>${name.name}</li>
                `
              ).join('')+`<ul>`);
        })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})