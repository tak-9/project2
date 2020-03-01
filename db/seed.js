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
        name: "TeacherName",
        //    userName: "teacher",
        password: "123",
        address: "teacher st teacher suburb",
        school: "teacher's school",
        birthdate: "date",
        phoneNumber: "1234567890",
        email: "teacher@test.com",
        yeargroup: "1",
        userType: "staff"
    })

    await db.User.create({
        name: "StudentName",
        password: "123",
        address: "Student st Student suburb",
        school: "Student's school",
        birthdate: "date",
        phoneNumber: "0237890",
        email: "student@test.com",
        yeargroup: "1",
        userType: "student"
    })
    // A student must be created before you can create a parent
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
            name: "lastParent",
            phone: "1123",
            email: "parent@test.com",
            studentid: data.id
        })
    })
}
