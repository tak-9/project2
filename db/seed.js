var db = require("../models");

// Delete all from user, then insert dummy data.
cleanUpDb();

async function cleanUpDb(){
    await db.Parent.destroy({ where: {} });
    await db.User.destroy({ where: {} });
    await db.Homework.destroy({ where: {} });
    await db.Course.destroy({ where: {} });
    await db.Enrolment.destroy({ where: {} });
    await db.Grades.destroy({ where: {} });
    createDummyData();
}


var student1;
var student2;
var student3;

async function createDummyData() {
    console.log("********* seed.js createUsers() *************")
    await db.User.create({
        name: "TeacherName",
        //    userName: "teacher",
        password: "123",
        address: "teacher st teacher suburb",
        school: "teacher's school",
        birthdate: "date",
        phone: "1234567890",
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

    student1 = await db.User.create({
        name: "StudentName",
        password: "123",
        address: "Student st Student suburb",
        school: "Student's school",
        birthdate: "date",
        phone: "0237890",
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

    student2 = await db.User.create({
        name: "StudentName2",
        password: "123",
        address: "Student st Student suburb",
        school: "1Student's school",
        birthdate: "date",
        phone: "0237890",
        email: "student2@test.com",
        yeargroup: "1",
        userType: "student",
        ParentId: newParent2.id
    })

    //---------------------------------------------------

    student3 = await db.User.create({
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
    
    createHomework();        

} 



var mathCourse;
var historyCourse;
var chemistryCourse;
var mathAddHomework;
var mathSubtractHomework;
var mathMultiplyHomework;
var mathDivideHomework;

async function createHomework() {
    console.log("********* seed.js createHomework() *************")
    mathCourse = await db.Course.create({
        courseName: "Year 8 Math"
    });
    console.log("New Course ID: " , mathCourse.id);
     mathAddHomework = await db.Homework.create({
        name: "Week 1 Add",
        CourseId: mathCourse.id
    });

     mathSubtractHomework = await db.Homework.create({
        name: "Week 2 Subtract",
        CourseId: mathCourse.id
    });

     mathMultiplyHomework = await db.Homework.create({
        name: "Week 3 Multiply",
        CourseId: mathCourse.id
    });

     mathDivideHomework = await db.Homework.create({
        name: "Week 4 Divide",
        CourseId: mathCourse.id
    });

    // -----------------------------------------------------------
    historyCourse = await db.Course.create({
        courseName: "Year 11 History"
    });
    console.log("New Course ID: " , mathCourse.id);
    await db.Homework.create({
        name: "Week 1 Australian History",
        CourseId: historyCourse.id
    });
    await db.Homework.create({
        name: "Week 2 European History",
        CourseId: historyCourse.id
    });
    await db.Homework.create({
        name: "Week 3 Asian History",
        CourseId: historyCourse.id
    });
    await db.Homework.create({
        name: "Week 4 American History",
        CourseId: historyCourse.id
    });

    // -----------------------------------------------------------
    chemistryCourse = await db.Course.create({
        courseName: "Year 9 Chemistry"
    });
    console.log("New Course ID: " , mathCourse.id);
    await db.Homework.create({
        name: "Week 1 Basic Chemistry",
        CourseId: chemistryCourse.id
    });
    await db.Homework.create({
        name: "Week 2 Intermediate Chemistry",
        CourseId: chemistryCourse.id
    });
    await db.Homework.create({
        name: "Week 3 Advance Chemistry",
        CourseId: chemistryCourse.id
    });

    createEnrolment();
}


async function createEnrolment() {

    console.log("********* seed.js createEnrolment() *************")
    await db.Enrolment.create({
        CourseId: mathCourse.id,
        UserId: student1.id
    });

    await db.Enrolment.create({
        CourseId: mathCourse.id,
        UserId: student2.id
    });

    await db.Enrolment.create({
        CourseId: mathCourse.id,
        UserId: student3.id
    });

    await db.Enrolment.create({
        CourseId: historyCourse.id,
        UserId: student2.id
    });

    await db.Enrolment.create({
        CourseId: chemistryCourse.id,
        UserId: student3.id
    });

    createGrades();
}

async function createGrades() { 
    console.log("********* seed.js createGrade() *************")
    //console.log("mathAddHomework.id", mathAddHomework.id);
    //console.log("student2.id", student2.id);
    await db.Grades.create({
        UserId: student2.id,
        HomeworkId: mathAddHomework.id,
        grade: 100
    });

    await db.Grades.create({
        UserId: student2.id,
        HomeworkId: mathSubtractHomework.id,
        grade:90
    });

    await db.Grades.create({
        UserId: student2.id,
        HomeworkId: mathMultiplyHomework.id,
        grade: 50
    });

    await db.Grades.create({
        UserId: student2.id,
        HomeworkId: mathDivideHomework.id,
        grade: 40
    });
    console.log("############# Finished creating dummy data by seed.js  ############")
    return;
}


module.exports = {
    createDummyData : createDummyData,
}