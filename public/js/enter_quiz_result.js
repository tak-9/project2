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
    $("#course").on("change", function () {
        console.log("course is changed");
        $("#homework").html("");
        var selectedCourseId = $("#course option:selected").val();
        // Ajax request. Send course ID and get homeworks.
        var url = "/api/homeworks/" + selectedCourseId; 
        console.log(url);
        $.get(url, function(data, status){
            console.log(data);
            var homeworksArr = data.homeworks;        
            var homeworkOptionsHTML = "<option>Homework</option>";
            $("#homework").append(homeworkOptionsHTML);
            for (var i=0; i<homeworksArr.length; i++){
                homeworkOptionsHTML = '<option value="' + homeworksArr[i].id + '">' + homeworksArr[i].name + '</option>';
                $("#homework").append(homeworkOptionsHTML);
            }    
        })
    })

})


