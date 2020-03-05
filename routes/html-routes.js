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
    db.User.findAll({
      include: [db.Parent],
      where: { userType: "student" }
    })
      .then((dbResult) => {
        var dbResult = JSON.parse(JSON.stringify(dbResult));
        var hbsObject = { "students": dbResult };
        res.render("view_student_list", hbsObject);
      })
      .catch((err) => {
        console.log("err", err);
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
    console.log("get the user :  ",req.user);
    var myId=req.user.id;
    console.log("the id :",myId);
    var sqlStr =
      "select u.id as userId, u.name as username, address, school, bithdate, u.phone as userphone, u.email as useremail, yeargroup, userType, " +
      "p.name as parentname, p.phone as parentphone, p.email as parenetemail " +
      "from users u " +
      "inner join parents p on u.ParentId = p.id";
    db.sequelize.query(sqlStr).then(function (dbUserDetails) {
      console.log("this the user details ", dbUserDetails);
      // var dbUserDetails = JSON.parse(JSON.stringify(dbUserDetails));
      var userdetail = dbUserDetails[0].filter(x => x.userId === myId);
      console.log("my user details :  ",userdetail);
      var userdetail = JSON.parse(JSON.stringify(userdetail));
      res.render("view_student_details", userdetail[0]);
    }).catch(err => console.log(err));
  });

  app.get("/student/view_student_grade", isStudent, function (req, res) {
    // Get id of currently logged in student.
    console.log("app.get / req.user", req.user);
    db.Grades.findOne({
      // include: [
      // db.Homework,
      // db.Course,
      // db.Enrolment],
      where: req.user.id
    }).then(function (UserGrades) {
      console.log("this the user Grades ", UserGrades);
      var UserGrades = JSON.parse(JSON.stringify(UserGrades));
      var hbsObject = { "students": UserGrades };
      res.render("view_student_grade", hbsObject);
    }).catch(function (err) {
      // handle error;
      console.log(err)
    });
    // Query student details for the student and gurdian.

    // Use handlebar to rendar it.
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