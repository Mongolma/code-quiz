//Global variables
const quiz = document.getElementById("start-btn");
const containerEl = document.querySelector(".main-container");
let time = 0;
let score = 0;
let currentQuestion = 0;
const questions = [
  {
    question: "What is a variable?",
    answer: [
      "Store for your information",
      "It let you group series of statement together to perform a special task",
      "Variable is for dealing with more than one function at a time",
      "Its used to remove elements from DOM",
    ],
    correctAnswer: "Store for your information",
    usesAnswer: "Store for your information",
    time: 0,
  },
  {
    question: "Which one is 'AND LOGICAL' operator?",
    answer: ["&&", "||", "!", "="],
    correctAnswer: "&&",
    usesAnswer: "&&",
    time: 0,
  },
  {
    question: "var colors = ['white','black','costume'];  colors[2] ='beige';",
    answer: [
      "var colors = ['white','beige','costume']",
      "var colors = ['white','black','beige']",
      "var colors = ['white','black','costume', 'beige']",
      "var colors = ['white','black','costume']",
    ],
    correctAnswer: "var colors = ['white','black','beige']",
    usesAnswer: "var colors = ['white','black','beige']",
    time: 0,
  },
  {
    question: "What is a variable?",
    answer: [
      "Store for your information",
      "It let you group series of statement together to perform a special task",
      "Variable is for dealing with more than one function at a time",
      "Its used to remove elements from DOM",
    ],
    correctAnswer: "Store for your information",
    usesAnswer: "Store for your information",
    time: 0,
  },
  {
    question: "var colors = ['white','black','costume'];  colors[2] ='beige';",
    answer: [
      "var colors = ['white','beige','costume']",
      "var colors = ['white','black','beige']",
      "var colors = ['white','black','costume', 'beige']",
      "var colors = ['white','black','costume']",
    ],
    correctAnswer: "var colors = ['white','black','beige']",
    usesAnswer: "var colors = ['white','black','beige']",
    time: 0,
  },
];

//Creating rows dynamically
function createRow(rows, text) {
  //Creating elements one by one (looping)
  for (let i = 0; i < rows; i++) {
    //Creating div for to contain row
    const rowEl = document.createElement("div");
    //Giving class to the row
    rowEl.setAttribute("class", "row");
    //Creating div for column
    const colEl = document.createElement("div");
    //Giving class name col to the column
    colEl.setAttribute("class", "col");
    //Attaching text to the column (using text parameter)
    colEl.append(text);
    //Attaching column to the row
    rowEl.append(colEl);
    //Attaching row to the html (which is selected by class main-container)
    containerEl.append(rowEl);
  }
}

//Displaying questions
function showQuestions() {
  //Preventing from all questions appears at the same time
  containerEl.innerHTML = "";
  //Creating header 3 for question
  const questionEl = document.createElement("h3");
  //Printing current question to html
  questionEl.innerHTML = questions[currentQuestion].question;
  //Creating a row for question
  createRow(1, questionEl);
  //Printing answer
  questions[currentQuestion].answer.forEach((item) => {
    //Creating button for answer
    answerEl = document.createElement("button");
    //Styling btn by class using bootstrap
    answerEl.setAttribute("class", "btn btn-primary mt-2");
    //Printing it to html
    answerEl.innerHTML = item;
    //Creating row for answer
    createRow(1, answerEl);
    //Activating answers
    answerEl.addEventListener("click", function (event) {
      //User choice will be specifically targeted by event target and contained to the user input(Store for my information)
      var userInput = event.target.textContent;
      //User answer tested by this function
      correctAnswer(userInput);
      //Displaying next question
      nextQuestion(1);
    });
  });
  //User answer tested by this function
  function correctAnswer(selectedButton) {
    //If user answer same as correct answer
    if (questions[currentQuestion].correctAnswer === selectedButton) {
      console.log("Correct answer from user");
      //Print correct
      document.querySelector("#result").innerHTML = "Correct!";
      //And add give 10 scores
      score += 10;
      //Let stay word correct one second and make it disappear
      setTimeout(function () {
        document.querySelector("#result").innerHTML = "";
      }, 1000);
    } else {
      console.log("Uncorrect answer from user");
      //Subtract 15 sec from default time
      penaltyTime();
      //Print false
      document.querySelector("#result").innerHTML = "False!";
      //Let stay word false one second and make it disappear
      setTimeout(function () {
        document.querySelector("#result").innerHTML = "";
      }, 1000);
    }
  }
  //Display next question
  function nextQuestion() {
    //if its not last question yet
    if (currentQuestion < questions.length - 1) {
      //display question one by one
      currentQuestion++;
      showQuestions();
    } else if ((currentQuestion = questions.length - 1)) {
      //if its last question end game
      endGame();
    }
  }
  //When questions are done ask user to submit score
  function endGame() {
    stopTimer();
    //Create submit btn
    let submitHiSc = document.createElement("button");
    //Give class to the btn
    submitHiSc.classList.add("btn");
    //Laying out
    submitHiSc.setAttribute("style", "margin-left:-40px");
    //Stying it by bootstrap
    submitHiSc.classList.add("btn-primary");
    //Writing word submit to the btn
    submitHiSc.innerHTML = "Submit";
    //Create cancel btn
    const cancelBtn = document.createElement("button");

    cancelBtn.id = "cancel-btn";
    //Give class to the btn
    cancelBtn.classList.add("btn");
    //Stying it by bootstrap
    cancelBtn.classList.add("btn-primary");
    //Laying out
    cancelBtn.setAttribute("style", "margin-left:20px");
    //Writing word cancel to the btn
    cancelBtn.innerHTML = "cancel";
    //Activating submit button
    submitHiSc.onclick = () => {
      console.log(" submit button pressed");
      //Taking user name from input and containing it to user name
      let userName = document.getElementById("input").value;
      //Containing user name and score to variable user
      let user = { name: userName, score: score };
      //Retrieving datas from local storage
      if (localStorage.getItem("localhighScores")) {
        //Converting data from local storage to JavaScript object
        let highScores = JSON.parse(localStorage.getItem("localhighScores"));
        console.log(highScores);
        highScores.push(user);
        console.log(highScores);
        console.log(user);
        for (var i = 0; i < highScores.length; i++) {
          for (var j = 1; j < highScores.length; j++) {
            if (highScores[i].score <= highScores[j].score) {
              let temp = highScores[i];
              highScores[i] = highScores[j];
              highScores[j] = temp;
            }
          }
        }
        console.log(highScores);
        if (highScores.length < 5) {
          localStorage.setItem("localhighScores", JSON.stringify(highScores));
          console.log(JSON.parse(localStorage.getItem("localhighScores")));
        } else {
          localStorage.setItem(
            "localhighScores",
            JSON.stringify(highScores.filter((el, i) => i < 5))
          );
          console.log(JSON.parse(localStorage.getItem("localhighScores")));
        }
      } else {
        let highScores = [user];
        localStorage.setItem("localhighScores", JSON.stringify(highScores));
      }

      console.log(JSON.parse(localStorage.getItem("localhighScores")));
    };

    containerEl.innerHTML = "";
    var endGameEl = document.createElement("div");
    endGameEl.setAttribute("class", "P");

    endGameEl.innerHTML =
      "<p>Quiz over! Your score is: " +
      score +
      " If you want to keep your highest score write you name and click submit button!" +
      "</p>  <div class='input-group'><input class='input-group-submit 'type='text' id='input'  ></div> ";

    createRow(1, endGameEl);
    endGameEl.appendChild(submitHiSc);
    endGameEl.appendChild(cancelBtn);
  }
}

function penaltyTime() {
  var penalty = 15;
  var remainingT = time - penalty;
  time = remainingT;
}

function startTimer() {
  console.log("timer");
  var defaultTime = 15 * questions.length;
  var displayTimer = document.getElementById("countDown");
  time = defaultTime;
  mainInterval = setInterval(function () {
    if (time > 0) {
      time--;
      displayTimer.textContent = time;
    } else {
      stopTimer();
    }
  }, 1000);
}
function stopTimer() {
  clearInterval(mainInterval);
}

document.addEventListener("click", function (e) {
  if (e.target.id === "btn") {
  }
});

document.addEventListener("click", function () {
  document.getElementById("submit-btn");
});

quiz.addEventListener("click", function () {
  document.querySelector(".main-container").innerHTML = "";
  showQuestions();
  startTimer();
});
