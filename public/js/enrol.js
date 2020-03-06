$(document).ready(function () {

    // This is enrol button
    const enrolBtn = $("#enrolBtn");

    var studentAndGurdian
    // Evnet handler for Enrol button
    enrolBtn.click("submit", function (event) {
        // Get input values from HTML
        var email = $("#email").val().trim();
        var password = $("#newPassword").val().trim();
        var verify = $("#verifyPassword").val().trim();
        var name = $("#name").val().trim();
        var phone = $("#phone").val().trim();
        var dateOfBirth = $("#dateOfBirth").val().trim();
        var address = $("#address").val().trim();
        var school = $("#school").val().trim();
        var yearGroup = $("#yearGroup").find(":selected").text();
        var guardianEmail = $("#guardianEmail").val().trim();
        var guardianName = $("#guardianName").val().trim();
        var guardianPhone = $("#guardianPhone").val().trim();

        studentAndGurdian = {
            student: {
                email: email,
                password: password,
                name: name,
                phone: phone,
                bithdate: dateOfBirth,
                address: address,
                school: school,
                yeargroup: yearGroup,
                userType: "student"
            },
            guardian: {
                name: guardianName,
                phone: guardianPhone,
                email: guardianEmail
            }
        }

        event.preventDefault();
        console.log("studentAndGurdian", studentAndGurdian);

        var validateOK = true;
        validateOK = validatePassword()


        if (validateOK) {
            sendEnrolData(studentAndGurdian);
        }

    })
})

function sendEnrolData(enrolData) {
    console.log("sending...");
    $.post("/api/signup", enrolData, function (data) {
        //This alert should be removed later!
        alert("Enrolled successfully.", data);
    }
    /*
    //TODO:Fix this.
    .fail(function (err) {
        // If there's an error, log the error
        console.log(err.responseJSON);
        alert("Error in enrolment.");
    })
    )
    */


}




function validatePassword() {
    var password = $("#newPassword").val().trim();
    var verify = $("#verifyPassword").val().trim();

    if (password === verify) {
        return true;
        console.log("signup successful")
    } else {
        alert("password does not match")
        return false;
    }
}
