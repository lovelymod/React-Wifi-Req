const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "gong",
    host: "localhost",
    password:"gong1234",
    database: "wifireq2"
})

app.get('/wifirequest', (req,res) => {
    db.query('SELECT * FROM wifireq2' , (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    })
})



app.post('/create', (req,res) => {
    const fname = req.body.firstname
    const lname = req.body.lastname;
    const utype = req.body.usertype;
    const tel = req.body.tel;
    const email = req.body.email;
    const dtype = req.body.dtype;
    // const etc = req.body.etc;
    const dbrand = req.body.dbrand;
    const dname = req.body.dname;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;
    const remark = req.body.remark;

    db.query("INSERT INTO wifireq2 (firstname, lastname, usertype, tel, email, dtype, dbrand, dname, startdate, enddate, remark) VALUES (?,?,?,?,?,?,?,?,?,?,?)", 
    [fname,lname,utype,tel,email,dtype,dbrand,dname,startdate,enddate,remark],
    (err,result) => {
        if(err){
            console.log(err);
        } else {
            res.send('Value Inserted');
        }
    }
    );

})

app.listen('3001', () => {
    console.log('Server running on port 3001');
})