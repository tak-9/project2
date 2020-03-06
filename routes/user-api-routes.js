var db = require("../models");
var passport = require("../config/passport");
var TMClient = require('textmagic-rest-client');

//routes
module.exports = function (app) {

  //post method for the sign in ..
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });
  //post route for sign up

  app.post("/api/signup", async function (req, res) {
    var student = req.body.student;
    var guardian = req.body.guardian;

    if (guardian.email !== "") {
      await db.Parent.create(guardian)
        .then((data) => {
          student.ParentId = data.id;
        })
        .catch(() => {
          res.status(500).json({ "msg": "Error in inserting parent." });
        })
    }

    await db.User.create(student)
      .then((data) => {
        res.status(201).json({});
      })
      .catch(function (err) {
        console.log("catch create student", err);
        res.status(500).json({ "msg": "Error in creating student." });
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

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });



  
  app.post("/api/message", function(req, res) {
    //console.log("********** req ********  ", req);
    
    var numberOfUser = req.body.numberToSend;
    var messageToSend = req.body.messageToSend;

    console.log("student", numberOfUser);
    console.log("guardian", messageToSend);

    var txt = new TMClient('danielxu', '3FRA3hlcrdRQqQm9VAM50QCpikNmTd');


    txt.Messages.send({
      text: messageToSend, 
      phones: numberOfUser
    }, function(err, res){
        console.log('Messages.send()', err, res);
    
    });
      

  });


};