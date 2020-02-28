var db = require("../models");
//routes
module.exports = function (app) {

  //post method for the sign in ..

  //post route for sign up

  app.post("/api/signup", function (req, res) {
    db.User.create(req.body).then(function (dbSign) {

      res.json(dbSign);
      res.redirect(307, "/api/login");
    })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });
  //put route for the student to update his details 
  app.put("/api/signup", function (req, res) {
    db.User.update(
      req.body,
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
};