const compareFunc = (a, b) =>
    a.length === b.length &&
    a.every((element, index) => element === b[index]);


var buttonColors = ["red", "blue", "green", "yellow"];

function playSound(trig){
  var audio = new Audio("sounds/"+trig+".mp3");
  audio.play();
}

function animatedPress(currColor){
  $("#"+currColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currColor).removeClass("pressed");
  }, 100);

}
var level=0;
var gamePattern = [];
function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  animatedPress(randomChosenColor);
  $("h1").text("level "+level);
  level++;
}

function checkAnswer(index){
  if(gamePattern[index]!==userClickedArr[index]){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")}, 500);
    $("h1").text("Game over! Press any key to restart.");
    gamePattern=[];
    userClickedArr=[];
    level=0;
  }else if(compareFunc(gamePattern, userClickedArr)){
    userClickedArr=[];
    // setTimeout(nextSequence, 100);
    nextSequence();
  }
}

$(document).keydown(function(){
  if(level===0){
    nextSequence();
  }
});

var userClickedArr = [];
var userChosenColor;
$(".btn").click(function(){
  userChosenColor = this.id ;
  userClickedArr.push(userChosenColor);
  var index = userClickedArr.length - 1;
  playSound(this.id);
  animatedPress(this.id);
  console.log("pat" + gamePattern);
  console.log(userClickedArr);
  checkAnswer(index);
});
