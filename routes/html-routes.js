var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
var isStaff = require("../config/middleware/isStaff");
var isStudent = require("../config/middleware/isStudent");
//  we need to change the pages name to the right one 

module.exports = function (app) {
  // home pages (login page)
  app.get("/", function (req, res) {
    console.log("app.get / req.user", req.user);
    if (req.user) {
      console.log(req.user);
      if (req.user.userType === "student") {
        res.redirect("/student");
      } else if (req.user.userType === "staff") {
        res.redirect("/staff");
      }
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      if (req.user.userType === "student") {
        res.redirect("/student");
      } else if (req.user.userType === "staff") {
        res.redirect("/staff");
      } else {
        res.sendFile(path.join(__dirname, "../public/login.html"));
      }
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  app.get("/staff", isStaff, function (req, res) {
    res.sendFile(path.join(__dirname, "../private/staff.html"));
  });

  app.get("/staff/view_student_list", isStaff, function (req, res) {
    sqlStr =
      "select u.id as id, u.name as name, address, school, bithdate, u.phone as phone, u.email as email, yeargroup, userType, " +
      "p.name as parentname, p.phone as parentphone, p.email as parentemail " +
      "from Users u " +
      "join Parents p on u.ParentId = p.id"

    db.sequelize.query(sqlStr)
      .then((dbResult) => {
        console.log(dbResult[0]);
        var hbsObject = { "students": dbResult[0] };
        res.render("view_student_list", hbsObject);
      })
  });

  app.get("/staff/view_quiz_result", isStaff, function (req, res) {
    // Query quiz result.
    // Pass query result to handlebar and rendar it.
  });

  app.get("/staff/view_quiz_result", isStaff, function (req, res) {
    // Query quiz result.
    // Use handlebar to rendar it.
  });

  app.get("/staff/enter_quiz_results", isStaff, function (req, res) {
    res.sendFile(path.join(__dirname, "../private/enter_quiz_results.html"));
  });

  app.get("/student", isStudent, function (req, res) {
    res.sendFile(path.join(__dirname, "../private/student.html"));
  });


  app.get("/student/view_student_details", isStudent, function (req, res) {
    console.log("get the user :  ", req.user);
    var myId = req.user.id;
    console.log("the id :", myId);
    var sqlStr =
      "select u.id as userId, u.name as username, address, school, bithdate, u.phone as userphone, u.email as useremail, yeargroup, userType, " +
      "p.name as parentname, p.phone as parentphone, p.email as parenetemail " +
      "from Users u " +
      "inner join Parents p on u.ParentId = p.id";
    db.sequelize.query(sqlStr)
      .then(function (dbUserDetails) {
        console.log("this the user details ", dbUserDetails);
        // var dbUserDetails = JSON.parse(JSON.stringify(dbUserDetails));
        var userdetail = dbUserDetails[0].filter(x => x.userId === myId);
        console.log("my user details :  ", userdetail);
        var userdetail = JSON.parse(JSON.stringify(userdetail));
        res.render("view_student_details", userdetail[0]);
      }).catch(err => console.log(err));
  });

  app.get("/student/view_student_grade", isStudent, function (req, res) {
    console.log("app.get / req.user", req.user);
    var myId = req.user.id;
    var sqlString = "SELECT Grades.UserId,grade as courseGrade,courseName as courseName,Homework.name as homeWork" +
      " FROM Grades join Homework join Courses join Enrolments" +
      " on Grades.homeworkId=Homework.id && Grades.UserId=Enrolments.UserId&& Courses.id=Enrolments.CourseId;";
    db.sequelize.query(sqlString)
      .then(function (dbUserGrades) {
        console.log("this the user Grades ", dbUserGrades[0]);
        var UserGrades = dbUserGrades[0].filter(x => x.UserId === myId);
        console.log("my user grades are : --", UserGrades);
        var UserGrades = JSON.parse(JSON.stringify(UserGrades));
        var hbsObject = { "courses": UserGrades };
        res.render("view_student_grade", hbsObject);
      }).catch(function (err) {
        // handle error;
        console.log(err)
      });
  });



  app.get("/student/view_quiz", isStudent, function (req, res) {
    // Use handlebar to rendar it.
  });


  app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  // grades for students by staff only 
  app.get("/studentgrades", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../private/grades.html"));
  });
  //the grade page for one student
  app.get("/grade", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../private/grade.html"));
  });


};