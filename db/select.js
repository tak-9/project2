var db = require("../models");
//var sequelize=require("sequelize");

var sqlStr = "select * from users right join parents on users.parentId = parents.id where req.user.id"
db.sequelize.query(sqlStr)
.then((dbResult)=>{
    console.log(dbResult);
})