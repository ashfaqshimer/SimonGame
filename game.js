var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  var currentLevel = userClickedPattern.length - 1;
  checkAnswer(currentLevel);
});


//Looking for the initial keypress to start the game
$(document).keydown(function() {
  if (started === false) {
    nextSequence();
    started = true;
  }
});


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else { //if the user got the answer wrong
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
}

function playSound(name) {
  switch (name) {
    case "red":
      var audioRed = new Audio("sounds/red.mp3");
      audioRed.play();
      break;

    case "blue":
      var audioBlue = new Audio("sounds/blue.mp3");
      audioBlue.play();
      break;

    case "green":
      var audioGreen = new Audio("sounds/green.mp3");
      audioGreen.play();
      break;

    case "yellow":
      var audioYellow = new Audio("sounds/yellow.mp3");
      audioYellow.play();
      break;

    default:
      console.log(name);
  }
}