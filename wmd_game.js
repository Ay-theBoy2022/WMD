let playerScore = 0;
let aiScore = 0;
let difficulty = 0;
let lastAlertScore = 0;
const choices = ["rock", "paper", "scissors"];

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

  if (playerScore % 3 === 0 && playerScore !== 0 && playerScore !== lastAlertScore) {
    difficulty++;
    lastAlertScore = playerScore;
    alert("⚠️ Algorithm has increased difficulty due to repeated success. Prepare for bias.");
  }
}

function getAIChoice(playerChoice) {
  if (difficulty === 0) {
    return choices[Math.floor(Math.random() * 3)];
  } else {
    // With bias: try to beat the player more often
    const biasMap = {
      rock: "paper",
      paper: "scissors",
      scissors: "rock"
    };
    const cheatChance = Math.min(0.2 + difficulty * 0.2, 0.9);
    return Math.random() < cheatChance ? biasMap[playerChoice] : choices[Math.floor(Math.random() * 3)];
  }
}

console.log("Biased Rock-Paper-Scissors Game (WMD) loaded");
