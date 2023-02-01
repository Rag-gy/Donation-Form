const express = require('express')
const sql = require('./sql.js')
let app = express()
let cors = require('cors')

app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.send("<h1>Hello Backend!</h1>")
})

app.post('/data',(req,res)=>{
    let sqlQuery = req.body.query
    sql.queryAll('./list.db',sqlQuery,(err,data)=>{
        if(err) throw err;
        res.send(data);
    })
})

const PORT = 5000
app.listen(PORT,()=>{
    console.log(`Server started at | http://localhost:${PORT}`)
})
