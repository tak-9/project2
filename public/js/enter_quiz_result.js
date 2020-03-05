/*
var dummyCoursesJSON = {
    courses: [
        {
            id: 1, 
            name: "Year 7 History" 
        },
        {
            id: 2, 
            name: "Year 8 Math"
        },
        {
            id: 3,
            name: "Year 9 Chemistry"
        }
    ]
}

var dummyHomeworkJSON = {
    homeworks: [
        {
            id: 1,
            name: "Week 1 Add"
        },
        {
            id: 2,
            name: "Week 2 Subtract"
        },
        {
            id: 3,
            name: "Week 3 Multiply"
        },
        {
            id: 4,
            name: "Week 4 Divide"
        }
    ]
};

var dummyNamesJSON = {
    names : [
        {id: 1, name: "name1"} , 
        {id: 2, name: "name2"} ,
        {id: 3, name: "name3"}
    ]
}
*/



$(document).ready(function () {
    //console.log("loaded");
    $.get("/api/courses", function(data, status){
        // Update Course dropdown menu
        var coursesArr = data.courses;        
        $("#course").html("");
        var courseOptionsHTML = "<option>Course</option>";
        $("#course").append(courseOptionsHTML);
        for (var i=0; i<coursesArr.length; i++){
            courseOptionsHTML = '<option value="' + coursesArr[i].id + '">' + coursesArr[i].name + '</option>';
            $("#course").append(courseOptionsHTML);
        }
    });

 
    // When course dropdown is changed, update the Homework dropdown menu accordly.
    var numberOfEnroledStudents;
    $("#course").on("change", function () {
        console.log("course is changed");
        $("#homework").html("");
        var selectedCourseId = $("#course option:selected").val();

        // Ajax request. Send course ID and get homeworks.
        var urlHomeworks = "/api/homeworks/" + selectedCourseId; 
        $.get(urlHomeworks, function(data, status){
            //console.log(data);
            var homeworksArr = data.homeworks;        
            var homeworkOptionsHTML = "<option value='notselected'>Homework</option>";
            $("#homework").append(homeworkOptionsHTML);
            for (var i=0; i<homeworksArr.length; i++){
                homeworkOptionsHTML = '<option value="' + homeworksArr[i].id + '">' + homeworksArr[i].name + '</option>';
                $("#homework").append(homeworkOptionsHTML);
            }
        })

        // Ajax request. Send course ID and get enroled students.
        var urlEnroledStudents = "/api/enroledstudents/" + selectedCourseId;
        $.get(urlEnroledStudents, function(data, status){
            //console.log("student data",data);
            $("#students_table tbody").html("");
            students = data.students;
            numberOfEnroledStudents = students.length;
            for (var i=0; i<students.length; i++){
                var tempHTML;
                //console.log("tempHTML", tempHTML);
                tempHTML = '<tr><td>'+ students[i].name + '</td>' +
                '<td><input disabled id="input' + i + '" data-studentid="' + students[i].id + '" class="input" type="text" placeholder="Enter student score"></td></tr>';
                $("#students_table tbody").append(tempHTML);
            }
        })
    })

    // Disable inputboxes when "Homework" selection is default.
    $("#homework").on("change", function(){
        var selectedHomeworkId = $("#homework option:selected").val();
        //console.log(selectedHomeworkId);
        if (selectedHomeworkId == "notselected") {
            $(".input").attr("disabled","disabled");
        } else {
            $(".input").removeAttr("disabled");
        }
    })

    
    $("#save").on("click", function(){
        var gradesArray = [];
        //console.log(numberOfEnroledStudents);
        var selectedHomeworkId = $("#homework option:selected").val();
        //console.log(selectedHomeworkId);
        if (selectedHomeworkId == "notselected") {
            alert("Please select a homework.");
        }

        for (var i=0; i<numberOfEnroledStudents; i++){
            var tempJSON = {};
            tempJSON.UserId = $("#input" + i).attr("data-studentid");
            tempJSON.grade = $("#input" + i).val();
            tempJSON.HomeworkId = selectedHomeworkId;
            //console.log(tempJSON.name, tempJSON.score);
            gradesArray.push(tempJSON);
        }
        var outputJSON = {grades: gradesArray}
        console.log(outputJSON);
        $.post("/api/grades/", outputJSON, function(data, status){
            console.log("post done");
        })
    })




});