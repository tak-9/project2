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
    "select distinct user_id, user_name, grade, grades.id as grades_id " +
    "from users_view " + 
    "left join Grades on users_view.user_id = Grades.UserId and HomeworkId = " + homeworkid + 
    " where course_id = " + courseid ;

    //console.log("******",sqlStr);
    db.sequelize.query(sqlStr)
    .then((dbResult)=>{
        result = dbResult[0];
        console.log(result);
        res.json(result);

      })

  });

  app.post("/api/grades", async function (req, res) {
    console.log("post /api/grades", req.body)
    var gradesArray = req.body.grades;
    var createOK = true;
    var responseArray = [];
    for (var i=0; i<gradesArray.length; i++){
      console.log("gradesArray[i].grades_id", gradesArray[i].grades_id);
      if (gradesArray[i].grades_id == 'null') {
        // INSERT INTO DB if it's new entry.
        //console.log("gradesArray[",i,"]",gradesArray[i]);
        var tempJSON = {};
        tempJSON.user_id = gradesArray[i].UserId;
        tempJSON.user_name = gradesArray[i].student_name;
        tempJSON.grade = gradesArray[i].grade;
  
        await db.Grades.create(gradesArray[i])
        .then((dbResult)=>{
          //console.log("create ok",dbResult);
          console.log("create ok");
          tempJSON.grades_id = dbResult.dataValues.id; // This is the new id assigned
          responseArray.push(tempJSON);
        })
        .catch((error)=>{
          console.log("create error", error);
          createOK = false;
        })
      } else {
        var tempJSON = {};
        console.log("gradesArray[i]---", gradesArray[i]);
        tempJSON.user_id = gradesArray[i].UserId;
        tempJSON.user_name = gradesArray[i].student_name;
        tempJSON.grade = gradesArray[i].grade;
        tempJSON.grades_id = gradesArray[i].grades_id; 
        responseArray.push(tempJSON);

        // UPDATE DB if entry exists already.
        sqlStr = "UPDATE Grades "  +
        " SET grade =  " + gradesArray[i].grade +
        " WHERE id = " + gradesArray[i].grades_id;
       
        await db.sequelize.query(sqlStr)
        .then((dbResult)=>{
          console.log("update ok");
            // result = dbResult[0];
            // console.log(result);
        })
        .catch((error)=>{
          console.log("update error", error);
          createOK = false;
        })
      }
    } // End for loop


    console.log("loopend");
    if (createOK) {
      console.log("responseArray",responseArray);
      res.json(responseArray);
    } else {
      console.log("database error");
      res.status(500).json({"msg": "Database Error."});
    }
  });

  app.get("/api/enroledstudents/:courseId", function (req, res) {
    var courseId;
    if (req.params.courseId) {
      courseId = req.params.courseId;
    }

    sqlStr = 
    "select Users.id, Users.name " +
    "from Users " +
    "join Enrolments on Users.id = Enrolments.userId " +
    "where Users.userType = 'student' " +
    "and Enrolments.courseId = "+ courseId + ";"
    
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