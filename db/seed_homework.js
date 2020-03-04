var db = require("../models");

// Delete all from user, then insert dummy data.
cleanUpDb();

async function cleanUpDb(){
    await db.Homework.destroy({ where: {} })
    await db.Course.destroy({ where: {} })
    createHomework();
}

async function createHomework() {

    console.log("********* seed.js createHomework() *************")
    var c1 = await db.Course.create({
        courseName: "Year 8 Math"
    });
    console.log("New Course ID: " , c1.id);
    await db.Homework.create({
        name: "Week 1 Add",
        CourseId: c1.id
    });
    await db.Homework.create({
        name: "Week 2 Subtract",
        CourseId: c1.id
    });
    await db.Homework.create({
        name: "Week 3 Multiply",
        CourseId: c1.id
    });
    await db.Homework.create({
        name: "Week 4 Divide",
        CourseId: c1.id
    });
    // -----------------------------------------------------------
    var c1 = await db.Course.create({
        courseName: "Year 11 History"
    });
    console.log("New Course ID: " , c1.id);
    await db.Homework.create({
        name: "Week 1 Australian History",
        CourseId: c1.id
    });
    await db.Homework.create({
        name: "Week 2 European History",
        CourseId: c1.id
    });
    await db.Homework.create({
        name: "Week 3 Asian History",
        CourseId: c1.id
    });
    await db.Homework.create({
        name: "Week 4 American History",
        CourseId: c1.id
    });

    // -----------------------------------------------------------
    var c1 = await db.Course.create({
        courseName: "Year 9 Chemistry"
    });
    console.log("New Course ID: " , c1.id);
    await db.Homework.create({
        name: "Week 1 Basic Chemistry",
        CourseId: c1.id
    });
    await db.Homework.create({
        name: "Week 2 Intermediate Chemistry",
        CourseId: c1.id
    });
    await db.Homework.create({
        name: "Week 3 Advance Chemistry",
        CourseId: c1.id
    });
 
}

module.exports = {
    createHomework : createHomework
};
