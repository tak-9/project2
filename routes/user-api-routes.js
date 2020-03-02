var db = require("../models");
var passport = require("../config/passport");
//routes
module.exports = function (app) {

  //post method for the sign in ..
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });
  //post route for sign up

  app.post("/api/signup", async function (req, res) {
    var student = req.body.student;
    var guardian = req.body.guardian;

    // console.log("student", student);
    // console.log("guardian", guardian);
    
    // 1. Insert gurdian data into 'parents' table'. (Skip 1,2 if guardian email is not supplied)
    // 2. Then, get the 'id' of the new gurdian from 'parents' table.
    // 3. Insert student data into 'student' table with parentId.
    
    if (guardian.email !== "") {
      await db.Parent.create(guardian)
      .then((data)=>{
        student.ParentId = data.id;
      })
      .catch(() => {
        res.status(500).json({"msg":"Error in inserting parent."});
      })  
    }

    //console.log("student to insert",student);

    await db.User.create(student)
    .then((data) => {
      res.status(201).json({});
    })
    .catch(function (err) {
      console.log("catch create student", err);
      res.status(500).json({"msg": "Error in creating student."});
    });
  })

  //put route for the student to update his details 
  app.put("/api/signup", function (req, res) {
    db.User.update(
      req.sbody,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbsign) {
        res.json(dbsign);
      }).catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};