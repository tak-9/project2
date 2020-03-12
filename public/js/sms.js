$(document).ready(function () {
  console.log("loaded");
  var submitBtn = $("#sendMsg");
  var clearBtn = $("#clearBtn");
  var addNumberBtn = $(".addNumber");
  var studentNumInput = $("#studentNumInput");
  var addAllBtn = $("#addAll");

  function addNumber(formattedNumber) {
    var currentNumbers = studentNumInput.val();
    console.log(studentNumInput, formattedNumber)
    if (currentNumbers === "") {
      studentNumInput.val(formattedNumber);
    } else {
      studentNumInput.val(currentNumbers + ", " + formattedNumber)
    }
  };


  function formatMobile(mobileNumber) {
    if (mobileNumber.charAt(0) === "0") {
      console.log("lalalala");
      return "+61" + mobileNumber.substring(1, mobileNumber.length);

    } else {
      return mobileNumber;
    }
  };

  submitBtn.on("click", function () {
    var number = $("#studentNumInput").val().trim();
    // var number = arrayOfNumbers.join();
    // var number = $("#studentNum").val().trim();
    var message = $("#messages").val();

    console.log(message)
    console.log(number)

    $.ajax({
      type: "POST",
      url: "/api/message",
      data: {
        "numberToSend": number,
        "messageToSend": message,
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

  clearBtn.on("click", function () {
    var number = $("#studentNumInput");
    var message = $("#messages");
    number.val("");
    message.val("");
    console.log("clears everything")
  });

  addNumberBtn.on("click", function () {
    var mobileNumber = $(this).parents("tr").find(".mobileNumber").text();
    var formattedNumber = formatMobile(mobileNumber);
    addNumber(formattedNumber);
  });

  addAllBtn.on("click", function () {
    $(".mobileNumber").each((index, element) => { 
      console.log(element);
      var mobileNumber =  $(element).text();
      if (mobileNumber !== ""){
        var formattedNumber = formatMobile(mobileNumber);
        addNumber(formattedNumber);
      }
    })
  });

})
