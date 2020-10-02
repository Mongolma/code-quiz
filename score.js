let highScores = JSON.parse(localStorage.getItem("localhighScores"));
let numbers = 1;
console.log(highScores[0]);

// highScores.forEach((el) => createHighScore(el));
for (let i = 0; i < highScores.length; i++) {
  createHighScore(highScores[i]);
}

function createHighScore(scores) {
  var number = document.createElement("div");
  number.innerHTML = numbers;
  var name = document.createElement("div");
  name.innerHTML = scores.name;
  var score = document.createElement("div");
  score.innerHTML = scores.score;
  var box = document.createElement("div");
  box.appendChild(number);
  box.appendChild(name);
  box.appendChild(score);
  box.classList.add("box");
  var parent = document.getElementById("container");
  parent.appendChild(box);
  numbers++;
}
