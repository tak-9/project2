var db = require("../models");

// Delete all from user, then insert dummy data.
cleanUpDb();

async function cleanUpDb(){
    await db.User.destroy({ where: {} })
    await db.Parent.destroy({ where: {} })
    createUsers();
}

async function createUsers() {
    await db.User.create({
        userFirstName: "FirstTeacher",
        userLastName: "LastTeacher",
        //    userName: "teacher",
        password: "123",
        street: "teacher st",
        suburb: "teacher suburb",
        school: "teacher's school",
        birthdate: "date",
        phoneNumber: "1234567890",
        email: "teacher@test.com",
        yeargroup: "1",
        userType: "staff"
    })

    await db.User.create({
        userFirstName: "FirstStudent",
        userLastName: "LastStudent",
        //    userName: "Student",
        password: "123",
        street: "Student st",
        suburb: "Student suburb",
        school: "Student's school",
        birthdate: "date",
        phoneNumber: "0237890",
        email: "student@test.com",
        yeargroup: "1",
        userType: "student"
    })
    createParent();
} 

async function createParent(){
    db.User.findOne({
        where: {
            email: "student@test.com"
        }
    })
    .then((data)=>{
        //console.log(data);
        db.Parent.create({
            firstName: "firstParent",
            lastName: "lastParent",
            phone: "1123",
            email: "parent@test.com",
            studentid: data.id
        })
    })
}
