var buttonColours = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0
var currentLevel = 0

//start the game

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// click senser

$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    // playSound(userChosenColour);
    pressed(userChosenColour);

    checkAnswer(currentLevel);
    currentLevel++;
});


// generate radom number to choice color.
function nextSequence(){

    userClickedPattern = [];
    currentLevel = 0;
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour); 
    
    
};


// paly sound
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//btn pressed
function pressed(id){

    $("#" + id ).addClass("pressed");

    setTimeout(function(){
        $("#" + id).removeClass("pressed")},
        100);
};



//check answer

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] === userClickedPattern [currentLevel]){
        
        console.log("Success!");
        playSound(userClickedPattern [currentLevel]);

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){nextSequence()},1000);
        }
    }
    else{
        console.log("Wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")},200);
        playSound("wrong");
        $("#level-title").text("Game Over, Press A Key to Start ");
        started = false;
        level = 0;
        gamePattern = [];
    }
}