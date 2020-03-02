var db = require("../models");
var passport = require("../config/passport");
//routes
module.exports = function (app) {

  //post method for the sign in ..
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.User);
  });
  //post route for sign up

  app.post("/api/signup", function (req, res) {
    db.User.create(req.body).then(function (dbSign) {

      res.json(dbSign);
     // res.redirect(307, "/api/login");
    })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

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