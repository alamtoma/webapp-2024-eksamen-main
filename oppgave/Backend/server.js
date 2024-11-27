const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:" ",
    database:"booking"
})

app.get('/', (re,res)=>{
    return res.json("From Backenden side");

})
app.get('/user', (req,res)=>{
    const sql = 'SELECT * FROM user';
    db.query(sql,(err, data) =>{
        if(er) return res.json(err);
        return res.json(data);
    })
})
app.listen(8081, ()=>{
    console.log("listening")
})