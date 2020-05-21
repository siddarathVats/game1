var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

$(document).on("keydown", function() {
  if (gamePattern.length === 0) {
    $("#level-title").text("level " + level);
    nextSequence();
  }
});


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {

    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {

      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart")

    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
}

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}



$(".btn").on("click", function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});



function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}