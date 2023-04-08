const mysql=require('mysql'); 
const Pool=mysql.createPool({  
    host:'localhost',
    user:'root',
    password:'Shubh@7770025901',
    port:3306,
    database:'unity_new',
    connectionLimit:100

});
module.exports={
    Pool,
}