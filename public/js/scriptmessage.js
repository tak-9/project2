$(document).ready(function () {

var submitBtn = $("#sendMsg");

var clearBtn = $("#clearBtn");


submitBtn.on("click", function(){

    var number = $("#studentNum").val().trim();
    // var number = arrayOfNumbers.join();
    // var number = $("#studentNum").val().trim();
    var message = $("#messages").val();

    console.log(message)
    console.log(number)


    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/message",
        data: { 
               "numberToSend": number, 
               "messageToSend": message, 
          },
        //dataType: "json",
        //contentType : "application/json;charset=utf-8",
        success: function(data)
        {
            console.log(data);
        },
        error: function(data) {
            console.log(data);
        }
      });
 
    //   e.preventDefault();
 });


 clearBtn.on("click", function () {


    var number = $("#studentNum");
    var message = $("#messages");
    number.val("");
    message.val("");

    console.log("clears everything")





});


 


  })




