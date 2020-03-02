$(document).ready(function() {
  console.log("login.js ok");
  // Getting references to our form and inputs
  var loginBtn = $("#loginBtn");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginBtn.click("submit", function(event) {

    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    console.log("Sending ", userData);
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function(data) {
        console.log("data",  data);
        if (data.userType === "staff"){
          window.location.replace("/staff");
        } else if (data.userType === "student") {
          window.location.replace("/student");
        } else {
          alert("type is other");          
        }
      })
      .catch(function(err) {
        // If there's an error, log the error
        console.log(err);
        alert("login id or password is wrong!");
      });
  }
});
