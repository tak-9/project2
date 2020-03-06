// Requiring our models
var db = require("../models");


// Routes
// =============================================================
module.exports = function (app) {

  // Returns name and grades for specified homework id
  app.get("/api/grades/:courseid/:homeworkid", function (req, res) {
    var homeworkid;
    var courseid;
    if (req.params.homeworkid) {
      homeworkid = req.params.homeworkid;
    }
    if (req.params.courseid) {
      courseid = req.params.courseid
    }

    console.log("homeworkid", homeworkid);
    // Given courseid and homeworkid
    // Returns userid, user_name, grade for enrolled students
    var sqlStr = 
    "select distinct user_id, user_name, grade " +
    "from users_view " + 
    "left join grades on users_view.user_id = grades.UserId and HomeworkId = " + homeworkid + 
    " where course_id = " + courseid ;

    //console.log("******",sqlStr);
    db.sequelize.query(sqlStr)
    .then((dbResult)=>{
        result = dbResult[0];
        console.log(result);
        res.json(result);

      })

  });

  app.post("/api/grades", function (req, res) {
    console.log("post /api/grades", req.body)
    var gradesArray = req.body.grades;
    for (var i=0; i<gradesArray.length; i++){
      // Currently, this just inserts new data only. 
      // TODO: Check if there is any existing data and then decide insert or update it. 
      db.Grades.create(gradesArray[i])
      .then(()=>{
        console.log("create ok");
        res.json({});
      })
      .catch(()=>{
        res.status(500).json({"msg": "Database Error."});
      })
    }
  });
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
        //console.log(outputJSON);
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
        res.json(homeworkJSON)
      });
  });

  /*
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
  */

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