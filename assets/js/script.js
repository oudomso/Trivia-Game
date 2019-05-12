$(document).ready(function () {
var options = [
        {
            question: "WHAT STONE SHOULD BE USED TO EVOLVE MEOWTH?", 
            choice: ["MOON STONE", "SUN STONE", "FIRE STONE", "THUNDER STONE"],
            answer: 0,
        },
        {
            question: "WHAT IS THE NAME OF TEAM ROCKET'S LEADER?", 
            choice: ["Darwin", "Donnovan", "James", "Giovanni"],
            answer: 3,
        }, 
        {
            question: "WHAT IS THE EVOLVE FORM OF PIKACHU?",
            choice: ["Raichu","Electrode","Pichu","Ponyta"],
            answer: 0,
        },
        {
            question: "Which of the following is a starter pokemon?",
            choice:["pikachu","bulbasaur","pidgey","darkcry"],
            answer: 1,
        },
    ];

    var questions =options.length;
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 10;
    var intervalId;
    var userGuess ="";
    var running = false;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
                holder.push(options[i]);
            }
    })

    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }

    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    

        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hideresponse();
        }	
    }
    
 
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    function displayQuestion() {

        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    

            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    }
    
    
    

    $(".answerchoice").on("click", function () {

        userGuess = parseInt($(this).attr("data-guessvalue"));
    

        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hideresponse();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hideresponse();
        }
    })
    }
    
    
    function hideresponse () {

        newArray.push(pick);
        options.splice(index,1);    // take away the index that contain question so that there is no repeated question
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 10;
    

        if ((wrongCount + correctCount + unanswerCount) === questions) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>YOUR RESULT: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
        } else {
            runTimer();
            displayQuestion();
        }
        }, 1000);
    
    
    }
    
    $("#reset").on("click", function() {
        location.reload();
    
    })
    
})