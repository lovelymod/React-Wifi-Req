const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "gong",
  host: "localhost",
  password: "gong1234",
  database: "wifireq2",
});

app.get("/idadmin", (req, res) => {
  db.query("SELECT * FROM idadmin", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM idadmin WHERE username = ? AND passwd = ?",
    [username, password],

    (err, result) => {
      if (err) {
        // res.send(err);
        res.sendStatus(400);
      } else {
        let data = null;
        // username or password not match
        if (result.length === 0) {
          data = {
            result: result,
            message: "Wrong username or password",
          };

          // username and password not match
        } else {
          data = {
            result: result,
            message: "Matched",
          };
        }
        res.json(data);
        console.log(data);
      }
    }
  );
});

app.post("/showuser", (req, res) => {
    const id = req.body.id;
    
  
    db.query(
      "SELECT * FROM wifireq2 WHERE id = ?",
      [id],
  
      (err, result) => {
        if (err) {
          // res.send(err);
          res.sendStatus(400);
        } else {
          let data = null;
          // ID not match
          if (result.length === 0) {
            data = {
              result: result,
              message: "No Matched ID",
            };
  
            // ID match
          } else {
            data = {
              result: result,
              message: "Matched",
            };
          }
          res.json(data);
        }
      }
    );
  });

app.post("/create", (req, res) => {
  const fname = req.body.firstname;
  const lname = req.body.lastname;
  const utype = req.body.usertype;
  const tel = req.body.tel;
  const email = req.body.email;
  const dtype = req.body.dtype;
  const dbrand = req.body.dbrand;
  const dname = req.body.dname;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const remark = req.body.remark;
  const date = req.body.date;
  const time = req.body.time;

  db.query(
    "INSERT INTO wifireq2 (firstname, lastname, usertype, tel, email, dtype, dbrand, dname, startdate, enddate, remark, date ,time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      fname,
      lname,
      utype,
      tel,
      email,
      dtype,
      dbrand,
      dname,
      startdate,
      enddate,
      remark,
      date,
      time,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Value Inserted");
      }
    }
  );
});

app.get('/member', (req,res) => {
    db.query('SELECT * FROM wifireq2' , (err, result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.listen("3001", () => {
  console.log("Server running on port 3001");
});
