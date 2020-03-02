// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  console.log("isStudent.js ", req.user);
  if (req.user) {
    // If the user is logged in, continue with the request to the restricted route
    if (req.user.userType === "student") {
      return next();
    } else {
      return res.status(401).send("<h1>401 Unauthorized</h1>");  
    }
  } else {
    return res.status(401).send("<h1>401 Unauthorized</h1>");
  }
};
