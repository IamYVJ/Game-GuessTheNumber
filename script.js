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
const optimalToggle = document.querySelector(".optimal");
const hintEl = document.querySelector(".hint");
const hintGuessEl = document.querySelector(".hint-guess");
const hintMaxEl = document.querySelector(".hint-max");

const randomNumber = () => Math.trunc(Math.random() * (MAX - MIN + 1)) + MIN;

let secretNumber = randomNumber();
let score = START_SCORE;
let highscore = Number(localStorage.getItem("highscore")) || 0;

// Feasible range the secret is known to lie in, narrowed by every guess.
let low = MIN;
let high = MAX;

highscoreEl.textContent = highscore;

const displayMessage = function (message) {
  messageEl.textContent = message;
};

const setPlaying = function (playing) {
  checkBtn.disabled = !playing;
  guessEl.disabled = !playing;
};

// Optimal binary-search guess: midpoint of the feasible range. The guaranteed
// worst-case guesses left to win a range of N candidates is ⌈log2(N + 1)⌉.
const updateHint = function () {
  if (!optimalToggle.checked) return;
  if (low > high) {
    hintGuessEl.textContent = "—";
    hintMaxEl.textContent = "0";
    return;
  }
  const count = high - low + 1;
  hintGuessEl.textContent = Math.floor((low + high) / 2);
  hintMaxEl.textContent = Math.ceil(Math.log2(count + 1));
};

optimalToggle.addEventListener("change", function () {
  hintEl.classList.toggle("hidden", !optimalToggle.checked);
  updateHint();
});

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

  // Narrow the feasible range from this guess's high/low feedback.
  if (guess < secretNumber) low = Math.max(low, guess + 1);
  else high = Math.min(high, guess - 1);
  updateHint();

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
  low = MIN;
  high = MAX;

  displayMessage("Start guessing...");
  scoreEl.textContent = score;
  numberEl.textContent = "?";
  guessEl.value = "";
  setPlaying(true);
  updateHint();

  document.body.style.backgroundColor = "#222";
  numberEl.style.width = "15rem";
});
