var path = require("path");


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

  app.get("/staff", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/staff.html"));
  });

  app.get("/student", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/student.html"));
  });

  app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  // grades for students by staff only 
  app.get("/studentgrades", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/grades.html"));
  });
  //the grade page for one student
  app.get("/grade", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/grade.html"));
  });


};