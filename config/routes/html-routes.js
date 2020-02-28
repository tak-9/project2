var path = require("path");


//  we need to change the pages name to the right one 
/////
////
module.exports = function(app) {
      // home pages (login page)
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
      });

      app.get("/staffmenu", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/staff.html"));
      });

      app.get("/studentmenu", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/student.html"));
      });
      
      app.get("/signup", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
      });
      // grades for students by staff only 
      app.get("/studentgrades", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/grades.html"));
      });
      //the grade page for one student
      app.get("/grade", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/grade.html"));
      });


};