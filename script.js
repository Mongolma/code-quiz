//Global variables
const quiz = document.getElementById("start-btn");
const containerEl = document.querySelector(".main-container");
let time = 0;
let score = 0;
let currentQuestion = 0;
const questions = [
  {
    question:
      "What is the correct JavaScript syntax to change the content of the HTML element below? <br> <br>" +
      "&lt;p id='demo'&gt;This is a demonstration.&lt;/p&gt;",

    answer: [
      "document.getElement('p').innerHTML = 'Hello World!'",
      "#demo.innerHTML = 'Hello World!'",
      "document.getElementById('demo').innerHTML = 'Hello World!'",
      "document.getElementByName('p').innerHTML = 'Hello World!'",
    ],
    correctAnswer: "document.getElementById('demo').innerHTML = 'Hello World!'",
    usesAnswer: "document.getElementById('demo').innerHTML = 'Hello World!'",
    time: 0,
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answer: [
      "The &lt;head&gt; section",
      "Both the &lt;head&gt; section and the &lt;body&gt; section are correct",
      "The &lt;body&gt; section",
    ],
    correctAnswer: "The &lt;body&gt; section",
    usesAnswer: "The &lt;body&gt; section",
    time: 0,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answer: [
      "&lt;script href'xxx.js'&gt;",
      "&lt;script name='xxx.js'&gt;",
      "&lt;script src='xxx.js'&gt;",
    ],
    correctAnswer: "&lt;script src='xxx.js'&gt;",
    usesAnswer: "&lt;script src='xxx.js'&gt;",
    time: 0,
  },
  {
    question: "Which one is uncorrect statement for parameter?",
    answer: [
      "The items that appear inside parantheses are known as the parameters of the function",
      "Inside the function parameters act like variable names",
      "Sometimes function needs specific information (parameter) to perform its task",
      "Parameter should start with number",
    ],
    correctAnswer: "Parameter should start with number",
    usesAnswer: "Parameter should start with number",
    time: 0,
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answer: [
      "msgBox('Hello World')",
      "msg('Hello World')",
      "alertBox('Hello World')",
      "alert('Hello World')",
    ],
    correctAnswer: "alert('Hello World')",
    usesAnswer: "alert('Hello World')",
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
        //Giving user answer to highscore
        highScores.push(user);
        //List for highest scores
        for (let i = 0; i < highScores.length; i++) {
          for (let j = 1; j < highScores.length; j++) {
            if (highScores[i].score <= highScores[j].score) {
              let temp = highScores[i];
              highScores[i] = highScores[j];
              highScores[j] = temp;
            }
          }
        }
        //Display 5 submitted scores
        if (highScores.length < 5) {
          localStorage.setItem("localhighScores", JSON.stringify(highScores));
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
    };
    //Display text that quiz is over, and ask from user that want to submit their score
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
//Subtract 15 seconds if user pick wrong answer
function penaltyTime() {
  var penalty = 15;
  var remainingT = time - penalty;
  time = remainingT;
}
//Each question is giving 15 sec & its multiplied by total number of question
function startTimer() {
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
//Stop time when there is no question
function stopTimer() {
  clearInterval(mainInterval);
}
//Quiz contains start btn action and when user press the start btn it will display first question with time
quiz.addEventListener("click", function () {
  document.querySelector(".main-container").innerHTML = "";
  showQuestions();
  startTimer();
});
