// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  console.log("isStudent.js ", req.user);
  if (req.user) {
    // If the user is logged in, continue with the request to the restricted route
    console.log("A")
    if (req.user.userType === "student") {
      console.log("B")
      next();
    } else {
      console.log("C")
      return res.status(401).send("<h1>401 Unauthorized</h1>");  
    }
  } else {
    console.log("D")
    return res.status(401).send("<h1>401 Unauthorized</h1>");
  }
};
