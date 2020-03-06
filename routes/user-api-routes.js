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



  // This is for sending message
  app.post("/api/message", function(req, res) {
    //console.log("********** req ********  ", req);
    
    var phoneNumber = req.body.numberToSend;
    var messageToSend = req.body.messageToSend;
    
    // Get APIKEY and APIUSERNAME from environment variables.
    var APIKEY = process.env.APIKEY;
    var APIUSERNAME = process.env.APIUSERNAME;
    console.log(APIKEY, APIUSERNAME)
    console.log("phone", phoneNumber);
    console.log("messageToSend", messageToSend);

    var txt; 
    try {
      txt = new TMClient(APIUSERNAME, APIKEY);
    } catch (err) {
      // When APIKEY is not given, error thrown from TMClient.
      console.log("TMCClient ERROR: ",err);
      res.status(400).json({msg: err});
      return;
    }

    txt.Messages.send({
      text: messageToSend, 
      phones: phoneNumber
    }, function(error, response){
      console.log('Messages.send()xxxx', error, response);
      if (error){
        res.status(400).json({msg: error.message});
      } else {
        res.json({msg: "Message sent."});
      }
    });

  });

};