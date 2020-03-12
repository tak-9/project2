var db = require("../models");
//var sequelize=require("sequelize");

var sqlStr = "select * from Users right join Parents on Users.parentId = Parents.id where req.user.id"
db.sequelize.query(sqlStr)
.then((dbResult)=>{
    console.log(dbResult);
})