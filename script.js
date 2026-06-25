"use strict";

const MIN = 1;
const MAX = 1000;
const START_SCORE = 100;
// 1–1000 needs at most ⌈log2(1000)⌉ = 10 binary-search guesses, so a 5-point
// penalty gives 20 attempts — double the worst case, leaving room for error.
const PENALTY = 5;

const messageEl = document.querySelector(".message");
const scoreEl = document.querySelector(".score");
const highscoreEl = document.querySelector(".highscore");
const numberEl = document.querySelector(".number");
const guessEl = document.querySelector(".guess");
const checkBtn = document.querySelector(".check");
const againBtn = document.querySelector(".again");

const randomNumber = () => Math.trunc(Math.random() * (MAX - MIN + 1)) + MIN;

let secretNumber = randomNumber();
let score = START_SCORE;
let highscore = Number(localStorage.getItem("highscore")) || 0;

highscoreEl.textContent = highscore;

const displayMessage = function (message) {
  messageEl.textContent = message;
};

const setPlaying = function (playing) {
  checkBtn.disabled = !playing;
  guessEl.disabled = !playing;
};

checkBtn.addEventListener("click", function () {
  const guess = Number(guessEl.value);

  if (!guess) {
    displayMessage("⛔️ No number!");
    return;
  }
  if (guess < MIN || guess > MAX) {
    displayMessage(`⛔️ Between ${MIN} and ${MAX}!`);
    return;
  }

  if (guess === secretNumber) {
    displayMessage("🎉 Correct Number!");
    numberEl.textContent = secretNumber;
    document.body.style.backgroundColor = "#60b347";
    numberEl.style.width = "30rem";

    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
      localStorage.setItem("highscore", highscore);
    }
    setPlaying(false);
    return;
  }

  score -= PENALTY;
  if (score <= 0) {
    score = 0;
    displayMessage("💥 You lost the game!");
    setPlaying(false);
  } else {
    displayMessage(guess > secretNumber ? `${guess} is 📈 high!` : `${guess} is 📉 low!`);
  }
  scoreEl.textContent = score;
});

againBtn.addEventListener("click", function () {
  score = START_SCORE;
  secretNumber = randomNumber();

  displayMessage("Start guessing...");
  scoreEl.textContent = score;
  numberEl.textContent = "?";
  guessEl.value = "";
  setPlaying(true);

  document.body.style.backgroundColor = "#222";
  numberEl.style.width = "15rem";
});
