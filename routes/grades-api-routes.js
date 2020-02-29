// Requiring our models
var db = require("../models");


// Routes
// =============================================================
module.exports = function (app) {


  app.get("/api/grades/:homeworkid", function (req, res) {
    var query = {};
    if (req.params.homeworkId) {
      query.homeworkId = req.params.homeworkId;
    }
    console.log("req.query " + JSON.stringify(req.query))
    db.Grades.findAll({
      where: query,
      include: [db.Homework, db.Course, db.User]
    }).then(function (dbHomework) {
      res.json(dbHomework);
    })
  });

  //put methodes for updating student grade

  app.put("/api/grades/", function (req, res) {
    db.Grades.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbgrade) {
        res.json(dbgrade);
      });
  });

  //get method for getting all the grades for spisific student
  app.get("/api/grades/:studentid", function (req, res) {
    var query = {};
    if (req.params.studentId) {
      query.studentId = req.params.studentId;
    }
    console.log("req.query " + JSON.stringify(req.query))
    db.Enrolment.findAll({
      where: query,
      include: [db.Course, db.Course, db.User]
    }).then(function (dbHomework) {
      res.json(dbHomework);
    });
  });



}