let playerScore = 0;
let aiScore = 0;
let difficulty = 0;
let level = 1;
let lastAlertScore = 0;
const choices = ["rock", "paper", "scissors"];
const levelThreshold = 3;
const maxDifficulty = 5;

function play(playerChoice) {
  const resultEl = document.getElementById("result");
  const aiChoice = getAIChoice(playerChoice);

  if (playerChoice === aiChoice) {
    resultEl.textContent = `🤖 AI chose ${aiChoice}. It's a draw!`;
  } else if (
    (playerChoice === "rock" && aiChoice === "scissors") ||
    (playerChoice === "paper" && aiChoice === "rock") ||
    (playerChoice === "scissors" && aiChoice === "paper")
  ) {
    playerScore++;
    resultEl.textContent = `🤖 AI chose ${aiChoice}. You win! 🎉`;
  } else {
    aiScore++;
    resultEl.textContent = `🤖 AI chose ${aiChoice}. You lose! 💀`;
  }

  document.getElementById("playerScore").textContent = `Player: ${playerScore}`;
  document.getElementById("aiScore").textContent = `AI: ${aiScore}`;
  document.getElementById("levelDisplay").textContent = `Level: ${level}`;

  if (playerScore > 0 && playerScore % levelThreshold === 0 && playerScore !== lastAlertScore) {
    difficulty = Math.min(level - 1, maxDifficulty); // Bias increases after level 1
    lastAlertScore = playerScore;
    level++;
    alert("⚠️ AI has leveled up! Expect stronger bias.");
  }

  if (difficulty >= maxDifficulty) {
    alert("💀 Game Over: AI reached maximum difficulty.");
    disableGame();
  }
}

function getAIChoice(playerChoice) {
  if (level === 1) {
    // Easy mode for level 1: Random, mostly fair
    return Math.random() < 0.8 ? getLosingChoice(playerChoice) : choices[Math.floor(Math.random() * 3)];
  } else {
    const biasMap = {
      rock: "paper",
      paper: "scissors",
      scissors: "rock"
    };
    const cheatChance = Math.min(0.2 + difficulty * 0.2, 0.95);
    return Math.random() < cheatChance ? biasMap[playerChoice] : choices[Math.floor(Math.random() * 3)];
  }
}

function getLosingChoice(playerChoice) {
  const loseMap = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
  };
  return loseMap[playerChoice];
}

function disableGame() {
  document.querySelectorAll(".choice-btn").forEach(btn => btn.disabled = true);
  document.getElementById("result").textContent += " Try refreshing to restart.";
}

console.log("Biased Rock-Paper-Scissors Game with level-based difficulty and bias initialized");
