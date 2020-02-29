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
    console.log("app.get / req ", req.User);
    if (req.User.userType === "student") {
      res.redirect("/student");
    } else if (req.User.userType === "staff") {
      res.redirect("/staff");

    } else {
      res.sendFile(path.join(__dirname, "../public/home.html"));
    }
  });

  app.get("/login", function (req, res) {
    if (req.User.userType === "student") {
      res.redirect("/student");
    } else if (req.User.userType === "staff") {
      res.redirect("/staff");
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));

  });

  app.get("/staff",isStaff, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/staff.html"));
  });

  app.get("/student",isStudent, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/student.html"));
  });

  app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  // grades for students by staff only 
  app.get("/studentgrades",isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/grades.html"));
  });
  //the grade page for one student
  app.get("/grade",isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/grade.html"));
  });


};