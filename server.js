// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/grades-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);

// For creating dummy data
var seed = require("./db/seed.js");

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({force:true}).then(function() {
  app.listen(PORT, async function() {
    // now create dummy users
    await new Promise(resolve => setTimeout(resolve, 5000));
    seed.createDummyData();
    console.log("==> Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
