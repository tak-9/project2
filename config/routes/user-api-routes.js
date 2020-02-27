var db = require("../models");
//routes
module.exports = function(app) {

    //post method for the sign in ..

//post route for sign up

    app.post("/api/signup", function(req, res) {
        db.User.create(req.body).then(function(dbSign) {
          res.json(dbSign);
        });
      });

      //put route for the student to update his details 
      app.put("/api/signup", function(req, res) {
        db.User.update(
          req.body,
          {
            where: {
              id: req.body.id
            }
          }).then(function(dbsign) {
          res.json(dbsign);
        });
      });
};