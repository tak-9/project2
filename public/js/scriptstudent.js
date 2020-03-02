$(document).ready(function () {


var guardianDetailsbtn = $("#guardianDetailBtn");
var studentDetailsbtn = $("#studentDetailBtn");
var quizResultsBtn = $("#quizResultBtn");
var dropdownMenu = $("#dropdown");


guardianDetailsbtn.on("click", function(){


    $("#studentDetails").removeClass("show").addClass("hide");
    $("#quizResults").removeClass("show").addClass("hide");
    $("#guardianDetails").removeClass("hide").addClass("show");


  })



  studentDetailsbtn.on("click", function(){

    
    $("#quizResults").removeClass("show").addClass("hide");
    $("#guardianDetails").removeClass("show").addClass("hide");
    $("#studentDetails").removeClass("hide").addClass("show");


  })



  quizResultsBtn.on("click", function(){

    
  
    $("#guardianDetails").removeClass("show").addClass("hide");
    $("#studentDetails").removeClass("show").addClass("hide");
    $("#quizResults").removeClass("hide").addClass("show");


  })


dropdownMenu.on("click", function(){

    
  
    $("#dropdown").toggleClass("is-hidden");


  })





})




