//board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;
let boardColor = "black";
//snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let velocityX = 0;
let velocityY = 0;

//food
let foodY = blockSize * 10;
let score = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10);
};

function update() {
  context.fillStyle = boardColor;
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    score += 1;
    document.getElementById("score").innerHTML = score;
    placeFood();
  }

  context.fillStyle = "lime";
  if (snakeX > 500 || snakeX < 0 || snakeY < 0 || snakeY > 500) {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    tables();
    score = 0;
    document.getElementById("score").innerHTML = 0;
  }
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

let myInterval = setInterval(storyGenerator, 50);
let story = document.getElementById("story");
let storyText =
  "Once upon a time there was a curry in... hurry. He was so eager to gather as many mystic coins as possible. Can you help him? ";
let counter = 0;

function storyGenerator() {
  story.innerHTML = story.innerHTML + storyText[counter];
  counter += 1;
  if (counter === 40) {
    clearInterval(myInterval);
    storyGeneratorWaiting();
  }
}

function storyGeneratorWaiting() {
  let counter = 0;
  let interval = setInterval(function () {
    if (story.innerHTML.length % 2 === 0) {
      story.innerHTML = story.innerHTML.slice(0, story.innerHTML.length - 1);
    } else {
      story.innerHTML = story.innerHTML + ".";
    }
    if (counter > 2) {
      clearInterval(interval);
      storyGeneratorFinish();
    }
    counter += 1;
  }, 500);
}

function storyGeneratorFinish() {
  let interval = setInterval(function () {
    let br = document.createElement("br");
    if (counter === 47 || counter === 107) {
      story.appendChild(br);
    }
    story.innerHTML = story.innerHTML + storyText[counter];
    counter += 1;
    if (counter === storyText.length) {
      clearInterval(interval);
      document.getElementById("container").setAttribute("id", "maincontainer");
    }
  }, 45);
}

let counterTable = 0;
let history = 5;
function tables() {
  if (document.getElementById("remove")) {
    document.getElementById("remove").remove();
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (counterTable >= history) {
    let table = document.getElementById("scoreTable").deleteRow(history - 1);
    counterTable -= 1;
  }

  let day = days[new Date().getDay()];
  let table = document.getElementById("scoreTable");
  let row = table.insertRow(0);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  cell1.innerHTML = score;
  cell2.innerHTML = day;

  counterTable += 1;
  console.log(counterTable);
}

function colorChange() {
  let color = document.getElementById("color").value;
  document.getElementById("body").style.backgroundColor = color;
  console.log(color);
}

function color2Change() {
  let color2 = document.getElementById("color2").value;
  boardColor = color2;
}

function reset() {
  boardColor = "black";
  history = 5;
  document.getElementById("body").style.backgroundColor = "bisque";
  document.getElementById("historyNumber").innerHTML = history;
}

function historyy() {
  let arrayNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let numeros = document.getElementById("history").value;
  numeros = Number(numeros);
  console.log(numeros);
  if (!arrayNum.includes(numeros)) {
    document.getElementById("historyNumber").innerHTML = 5;
    alert(
      "You can set only numbers between 1 and 9 Your input was invalid, Games in history was reseted to default value"
    );
  } else {
    document.getElementById("historyNumber").innerHTML = numeros;
  }
  history = numeros;
}
