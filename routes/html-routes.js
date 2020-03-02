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

  app.get("/staff",isStaff, function (req, res) {
    res.sendFile(path.join(__dirname, "../private/staff.html"));
  });

  app.get("/staff/view_student_list",isStaff, function (req, res) {
    /*
    //This need to be changed
    // Get the studnet and gurdian data. Assign it to hsbObject.
    burger.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };
      res.render("view_student_list", hbsObject);
    });
    */  
  });

  app.get("/staff/view_quiz_result",isStaff, function (req, res) {
    // Query quiz result.
    // Pass query result to handlebar and rendar it.
  });

  app.get("/staff/view_quiz_result",isStaff, function (req, res) {
    // Query quiz result.
    // Use handlebar to rendar it.
  });

  app.get("/staff/enter_quiz_results",isStaff, function (req, res) {
    // Use handlebar to rendar it.
  });

  app.get("/student",isStudent, function (req, res) {
    res.sendFile(path.join(__dirname, "../private/student.html"));
  });

  /*var dummyStudent = {
    name: "jack",
    age: 12
  }*/
  app.get("/student/view_student_details",isStudent, function (req, res) {
    // Get id of currently logged in student.
    console.log("app.get / req.user", req.user);
    if(req.User){ 
      var query = {};
    if (req.User.id) {
      query.studentId = req.User.id;
    } 
      db.User.findOne({
        where: query,
        include: [db.Parent]
      }).then(function (dbUserDetails) { 
        res.json(dbUserDetails);
        //res.sendFile(path.join(__dirname, "../private/student.html"));
        res.render("studentsDetails", {
          student: User,
          parents: Parent
        })
      });
    }
    // Query student details for the student and gurdian.

    // Use handlebar to rendar it.
  });

  app.get("/student/view_quiz",isStudent, function (req, res) {
    // Use handlebar to rendar it.
  });


  app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  // grades for students by staff only 
  app.get("/studentgrades",isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../private/grades.html"));
  });
  //the grade page for one student
  app.get("/grade",isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../private/grade.html"));
  });


};