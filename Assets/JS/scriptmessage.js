$(document).ready(function () {

    var submitBtn = $("#sendMsg");
    var clearBtn = $("#clearBtn");

    submitBtn.on("click", function () {


        var number = $("#studentNum").val().trim();
        var message = $("#messages").val();

        console.log(message)
        console.log(number)


        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/message",
            data: {
                "numberToSend": $('#studentNum').val().trim(),
                "messageToSend": $('#messages').val(),
            },
            // dataType: "json",
            // contentType: "application/json;charset=utf-8",
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                alert(data);
            }
        });

        // e.preventDefault();
    });

    clearBtn.on("click", function () {


        $("#messages").empty();
        $("#studentNum").empty();

        console.log("clears everything")





    });







})




