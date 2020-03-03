$(document).ready(function () {


var viewStudentDetails = $("#viewStudentBtn");
var viewQuizResult = $("#viewQuizResultsBtn");
var enterQuizResults = $("#enterQuizResultsBtn");
var dropdownMenu = $("#dropdown");


viewStudentDetails.on("click", function(){

  var studentNumber = $("#studentNum").val()

  
  
  })



  viewQuizResult.on("click", function(){

    
    $("#StudentDetails").removeClass("show").addClass("hide");
    $("#enterQuizResults").removeClass("show").addClass("hide");
    $("#viewQuizResults").removeClass("hide").addClass("show");


  })



  enterQuizResults.on("click", function(){

    
  
    $("#viewQuizResults").removeClass("show").addClass("hide");
    $("#StudentDetails").removeClass("show").addClass("hide");
    $("#enterQuizResults").removeClass("hide").addClass("show");


  })


dropdownMenu.on("click", function(){

    
  
    $("#dropdown").toggleClass("is-hidden");


  })





})




