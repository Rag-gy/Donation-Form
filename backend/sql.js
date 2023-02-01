const sqlite3 = require('sqlite3').verbose();

function connectDB(path,mode=undefined) {  // Mode is OPEN_READWRITE | OPEN_CREATE if not exists by default.
    let db = new sqlite3.Database(path, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
    });
    return db
}

function closeDB(db){
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closed the database connection.');
    });
  }


function queryAll(path,sql,callback){
    // Query all will query and return every row at the same time.
    // other types of queries : each (gives row by row control) , get (gives first row control)
    let db = connectDB(path);
    db.all(sql,(err,rows)=>{
      callback(err,rows)
    })
    closeDB(db)
  }
  // Failing constraints like ID's PRIMARY KEY constraint throws a SQLITE_CONSTRAINT error.
function displayTable(path,tableName){
    queryAll(path,`SELECT * FROM ${tableName} ORDER BY ADD_TIME ASC`,(err,data)=>{
      console.log(data);
    })
}



module.exports = { connectDB,closeDB,queryAll,displayTable };

