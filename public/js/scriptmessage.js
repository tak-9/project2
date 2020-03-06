$(document).ready(function () {
    var submitBtn = $("#sendMsg");

    submitBtn.on("click", function () {

        var number = $("#studentNum").val().trim();
        var message = $("#messages").val();

        console.log(message)
        console.log(number)


        $.ajax({
            type: "POST",
            url: "/api/message",
            data: {
                "numberToSend": $('#studentNum').val().trim(),
                "messageToSend": $('#messages').val(),
            },
            success: function (data) {
                console.log(data);
                alert(data.msg);
            },
            error: function (data) {
                console.log(data);
                alert(data.responseJSON.msg);
            }
        });

    });

})
