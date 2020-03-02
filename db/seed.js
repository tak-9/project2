var db = require("../models");

// Delete all from user, then insert dummy data.
cleanUpDb();

async function cleanUpDb(){
    await db.Parent.destroy({ where: {} })
    await db.User.destroy({ where: {} })
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

    //---------------------------------------------------
    var newParent = await db.Parent.create({
        name: "lastParent",
        phone: "1123",
        email: "parent@test.com",
    })

    console.log("New Parent ID: " , newParent.id);

    db.User.create({
        name: "StudentName",
        password: "123",
        address: "Student st Student suburb",
        school: "Student's school",
        birthdate: "date",
        phoneNumber: "0237890",
        email: "student@test.com",
        yeargroup: "1",
        userType: "student",
        ParentId: newParent.id
    })


    //---------------------------------------------------

    var newParent2 = await db.Parent.create({
        name: "lastParent",
        phone: "1123",
        email: "parent2@test.com",
    });

    console.log("New Parent2 ID: ", newParent2.id)

    db.User.create({
        name: "StudentName2",
        password: "123",
        address: "Student st Student suburb",
        school: "1Student's school",
        birthdate: "date",
        phoneNumber: "0237890",
        email: "student2@test.com",
        yeargroup: "1",
        userType: "student",
        ParentId: newParent2.id
    })

    //---------------------------------------------------

    await db.User.create({
        name: "StudentName3",
        password: "123",
        address: "Student st Student suburb",
        school: "2Student's school",
        birthdate: "date",
        phoneNumber: "0237890",
        email: "student3@test.com",
        yeargroup: "1",
        userType: "student"
    })
} 

