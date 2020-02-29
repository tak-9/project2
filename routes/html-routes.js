var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
var isStaff = require("../config/middleware/isStaff");
var isStudent = require("../config/middleware/isStudent");


//  we need to change the pages name to the right one 
/////
////
module.exports = function (app) {
  // home pages (login page)
  app.get("/", function (req, res) {
    console.log("app.get / req.User", req.User);
    console.log("app.get / req.user", req.user);
    if (req.user) {
      if (req.User.userType === "student") {
        res.redirect("/student");
      } else if (req.User.userType === "staff") {
        res.redirect("/staff");
      }
    } else {
      res.sendFile(path.join(__dirname, "../Assets/Pages/login.html"));
    }
  });

  app.get("/login", function (req, res) {
    if (req.User.userType === "student") {
      res.redirect("/student");
    } else if (req.User.userType === "staff") {
      res.redirect("/staff");
    } else {
      res.sendFile(path.join(__dirname, "../Assets/Pages/login.html"));
    }
    res.sendFile(path.join(__dirname, "../Assets/Pages/login.html"));

  });

  app.get("/staff",isStaff, function (req, res) {
    res.sendFile(path.join(__dirname, "../Assets/Pages/staff.html"));
  });

  app.get("/student",isStudent, function (req, res) {
    res.sendFile(path.join(__dirname, "../Assets/Pages/student.html"));
  });

  app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../Assets/Pages/signup.html"));
  });
  // grades for students by staff only 
  app.get("/studentgrades",isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../Assets/Pages/grades.html"));
  });
  //the grade page for one student
  app.get("/grade",isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../Assets/Pages/grade.html"));
  });


};