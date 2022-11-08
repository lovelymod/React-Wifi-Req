const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password:"",
    database: "wifireq"
})

app.get('/wifirequest', (req,res) => {
    db.query('SELECT * FROM wifirequest' , (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

app.post('/create', (req,res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const utype = req.body.utype;
    const tel = req.body.tel;
    const email = req.body.email;
    const dtype = req.body.dtype;
    const etc = req.body.etc;
    const dbrand = req.body.dbrand;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;
    const remark = req.body.remark;

    db.query("INSERT INTO wifirequest (firstname, lastname, country, lastname, wage) VALUES (?,?,?,?,?)",)
})

app.listen('3001', () => {
    console.log('Server running on port 3001');
})