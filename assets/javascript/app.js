//  This code will run as soon as the page loads.
window.onload = function() {

  //  Click events are done for us:
  // $("#stop").click(stopwatch.stop);
  // $("#reset").click(stopwatch.reset);
  // $("#start").click(stopwatch.start);
  $("#countdownTimer").html("00:09:75");

};

//Global Variables
//********************************
//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
//prevents the clock from being sped up unnecessarily
var clockRunning = false;

var correctCount = 0;
var wrongCount = 0;
var unansweredCount = 0;
var index = 0;
var questionCounter = 0;

//Questions Object
//********************************
var questionArray = [
  {

    Question : "What is the fruit?",
    Answers : [
      { isCorrect: true, text: "pineapple"},
      { isCorrect: false, text: "orange"},
      { isCorrect: false, text: "jackfruit"},
      { isCorrect: false, text: "kiwi"},
    ],
    correctImg : "assets/images/harry.jpg"
  }, 
  {

    Question : "What is the animal?",
    Answers : [
      { isCorrect: true, text: "robin"},
      { isCorrect: false, text: "elephant"},
      { isCorrect: false, text: "lion"},
      { isCorrect: false, text: "tiger"},
    ],
    correctImg : "assets/images/harry.jpg"
  }, 
  {

    Question : "What is the color?",
    
    Answers : [
      { isCorrect: true, text: "blue"},
      { isCorrect: false, text: "green"},
      { isCorrect: false, text: "red"},
      { isCorrect: false, text: "yellow"}
    ],
    correctImg : "harry.jpg"
  },
];



function outputQuestion() {
  for (var j = 0; j < questionArray.length; j++) {
    // stopwatch.reset();
    $(".question").html("<h3>" + questionArray[j].Question + "</h3>");
    console.log(questionArray[j]);

    for (var i = 0; i < questionArray[j].Answers.length; i++) {
      $("#button" + i)
        .text(questionArray[j].Answers[i].text)
        .attr("value", questionArray[j].Answers[i].isCorrect)
        .show()
        .on('click', function() {
          if($(this).attr("value") === "true") {
            answerCorrect();
          } else {
            answerWrong();          
          }
        //nextQuestion();
        });
    }
  }
  showScore();
}

function startGame() {
  $('#countdownTimer').show();
  $('.answers').show();

  $('.question').append('<button class="btn btn-primary btn-lg" id="startButton">Start</button>');
  
  $('#startButton').on('click', function() {
    $(this).hide();

    stopwatch.start();

  console.log(questionArray[index]);
  outputQuestion();
  console.log(questionArray[index]);

  });


}

function answerCorrect() {
  correctCount++;
  console.log("Correct!");
  //alert("Correct!");
  console.log("Right count: " + correctCount);
}

function answerWrong() {
  wrongCount++;
  console.log("Incorrect!");
  //alert("Incorrect!");
  console.log("Wrong Count: " + wrongCount);
}

function answerUnanswered() {
  unansweredCount++;
  alert("Time's Up!");
  console.log("Not Answered: " + unansweredCount);
}

function showScore() {
  $('.question').empty();
  $('.question').append("<h2><p>" + correctCount + " correct</p></h2>");
  $('.question').append("<h2><p>" + wrongCount + " wrong</p></h2>");
  $('.question').append("<h2><p>" + unansweredCount + " unanswered</p></h2>");
  stopwatch.stop();
  $('#countdownTimer').empty();
  $('.answers').empty();
  //index=0;
  startGame();
}

function nextQuestion() {
  if (index < questionArray.length - 1) {
    ++index;
    console.log("?index: " + index);
    console.log(questionArray[index]);
    outputQuestion(questionArray[index]);
    console.log(questionArray[index]);

  } else {
    showScore();
  }
}

function outOfTime() {
  var clock = setInterval(nineSeconds, 1000 * 9);
  function nineSeconds() {
    if (counter === 0) {
      clearInterval(clock);
      answerUnanswered();
    } else if (counter > 0) {
      counter--;
    }
  }
}


//  Stopwatch Object
//********************************
var stopwatch = {
  time: 9, //time limit
  lap: 1,

  reset: function() {
    stopwatch.time = 9;
    $("#countdownTimer").html("00:09:75");
  },

  start: function() {
      if (!clockRunning) {
       intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
      }
  },

  stop: function() {
    clearInterval(intervalId);
    clockRunning = false;
  },

  count: function() {
    //  Decrement time by 1 second, remember we cant use "this" here.
    stopwatch.time--;
    //  TODO: Get the current time, pass that into the stopwatch.timeConverter function,
    //        and save the result in a variable.
    var currentTime = stopwatch.timeConverter(stopwatch.time);
    //  TODO: Use the variable you just created to show the converted time in the "display" div.
    $('#countdownTimer').html(currentTime);
  },

  //  THIS FUNCTION IS DONE FOR US!
  //  We do not need to touch it.

  timeConverter: function(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};

// Main Process
// *****************************************
startGame();
