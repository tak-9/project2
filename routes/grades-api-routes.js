// Requiring our models
var db = require("../models");


// Routes
// =============================================================
module.exports = function (app) {

  app.post("/api/grades", function (req, res) {
    console.log(req.body)
    var gradesArray = req.body.grades;
    for (var i=0; i<gradesArray.length; i++){
      db.Grades.create(gradesArray[i]);
    }
  });


  // Returns enrolled student for a specified course
  // Input parameter: courseId
  app.get("/api/enroledstudents/:courseId", function (req, res) {
    var courseId;
    if (req.params.courseId) {
      courseId = req.params.courseId;
    }

    sqlStr = 
    "select users.id, users.name " +
    "from users " +
    "join enrolments on users.id = enrolments.userId " +
    "where users.userType = 'student' " +
    "and enrolments.courseId = "+ courseId + ";"
    
    db.sequelize.query(sqlStr)
    .then((dbResult)=>{
        result = dbResult[0];
        var tempArr = [];
        for (var i=0; i<result.length; i++) {
            var tempJSON = {};
            tempJSON.id = result[i].id;
            tempJSON.name = result[i].name; 
            tempArr.push(tempJSON);
        }
        var outputJSON  = { "students" : tempArr };
        console.log(outputJSON);
        res.json(outputJSON);
      })
  });


  app.get("/api/courses", function (req, res){
    db.Course.findAll()
    .then((dbResult) => {
        var coursesArr = [];
        for (var i=0; i<dbResult.length; i++){
            var JSONtemp = {};
            JSONtemp.id = dbResult[i].dataValues.id; 
            JSONtemp.name = dbResult[i].dataValues.courseName;
            coursesArr.push(JSONtemp);
        }
        var coursesJSON = {courses: coursesArr};
        //console.log(coursesJSON);
        res.json(coursesJSON);
    });
  });

  app.get("/api/homeworks/:courseId", function (req, res) {
    var courseId;
    if (req.params.courseId) {
      courseId = req.params.courseId;
    }
    console.log(courseId);
    db.Homework.findAll({
      where: { CourseId: courseId }
    })
      .then((dbResult) => {
        var homeworkArr = [];
        for (var i = 0; i < dbResult.length; i++) {
          var JSONtemp = {};
          JSONtemp.id = dbResult[i].dataValues.id;
          JSONtemp.name = dbResult[i].dataValues.name;
          homeworkArr.push(JSONtemp);
        }
        var homeworkJSON = { homeworks: homeworkArr };
        //console.log(homeworkJSON);
        res.json(homeworkJSON)
      });
  });

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