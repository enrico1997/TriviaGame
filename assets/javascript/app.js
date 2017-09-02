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

    Question : "What are Harry's parents names?",
    Answers : [
      { isCorrect: false, text: "Ron and Herminone"},
      { isCorrect: false, text: "Vernon and Jenny"},
      { isCorrect: true, text: "James and Lily"},
      { isCorrect: false, text: "Rico and Emma"},
    ],
    correctImg : "assets/images/parents.jpg"
  }, 
  {

    Question : "What is the platform number that takes Harry to his school?",
    Answers : [
      { isCorrect: false, text: "B-52"},
      { isCorrect: true, text: "9 3/4"},
      { isCorrect: false, text: "3.14159"},
      { isCorrect: false, text: "Eleven Seventy-two"},
    ],
    correctImg : "assets/images/nine.jpg"
  }, 
  {

    Question : "What is name of Harry's school?",
    
    Answers : [
      { isCorrect: true, text: "Hogwarts School of Witchcraft and Wizardry"},
      { isCorrect: false, text: "Xavier's School for Gifted Youngsters"},
      { isCorrect: false, text: "Glenbrook North"},
      { isCorrect: false, text: "Cindy Mancini Cheerleading Camp"}
    ],
    correctImg : "assets/images/hogwarts.jpg"
  },
  {

    Question : "What sport does Harry play?",
    
    Answers : [
      { isCorrect: false, text: "Cricket"},
      { isCorrect: false, text: "Beach Volleyball"},
      { isCorrect: false, text: "Cycling"},
      { isCorrect: true, text: "Quidditch"}
    ],
    correctImg : "assets/images/quidditch.jpg"
  },
  {

    Question : "Who did Harry marry?",
    
    Answers : [
      { isCorrect: false, text: "Sloane Peterson"},
      { isCorrect: true, text: "Ginny Weasley"},
      { isCorrect: false, text: "Sharpay Evans"},
      { isCorrect: false, text: "Jyn Erso"}
    ],
    correctImg : "assets/images/ginny.jpg"
  },
];

function outputQuestion() {
  // Show the new question
  if (typeof questionArray[questionCounter] !== 'undefined') {
    stopwatch.reset();
    $(".question").html("<h3>" + questionArray[questionCounter].Question + "</h3>");
    console.log(questionArray[questionCounter]);

    // Remove the old answers
    $(".answers").empty();
    // Show the new answers
    for (var i = 0; i < questionArray[questionCounter].Answers.length; i++) {
      $("<button>")
        .data('answer-id', i)
        .text(questionArray[questionCounter].Answers[i].text)
        // .attr("value", questionArray[questionCounter].Answers[i].isCorrect)
        // .show()
        .on('click', function() {
          // Process the answer
          answerQuestion($(this).data('answer-id'));
          // Display next question
          nextQuestion();
        })
        .appendTo('.answers');
    }
  }
  // showScore();
}

function startGame() {
  //Display timer
  $('#countdownTimer').show();

  //Show or hide answers
  // $('.answers').show();
  // $('.answers').empty();

  // Create Start button
  $('.question').append(
    $('<button>Start</button>')
    .addClass ('btn btn-primary btn-lg')
    .attr('id', 'startButton')
    .on('click', function() {
      // Hide Start button
      $(this).hide();
      // Output next (first) question
      outputQuestion();
      stopwatch.start();
    })
  );
}

function answerQuestion(id) {
  // Find selected answer to current question.
  var answer = questionArray[questionCounter].Answers[id];
  // Update correct/incorrect counter.
  if (typeof answer === 'undefined') {
    unansweredCount++;
  } else if (answer.isCorrect) {
    correctCount++;
  } else {
    wrongCount++;
  }
}

function answerCorrect() {
  correctCount++;
  console.log("Correct!");
  // alert("Correct!");
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
  // alert("Time's Up!");
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

// function nextQuestion() {
//   if (index < questionArray.length - 1) {
//     ++index;
//     console.log("?index: " + index);
//     console.log(questionArray[index]);
//     outputQuestion(questionArray[index]);
//     console.log(questionArray[index]);

//   } else {
//     showScore();
//   }
// }

function nextQuestion() {
  // set next question
  questionCounter++;
  // If question is valid, display it
  // otherwise show the final score
  if (typeof questionArray[questionCounter] !== 'undefined') {
    // Show the next Question.
    outputQuestion();
  } else {
    // Reset Question Counter.
    questionCounter = 0;
    // Show the final Score.
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