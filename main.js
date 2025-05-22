// selectors
const choicesContainer = document.querySelector(".choices");
const userScore = document.querySelector(".user-score > p:first-child");
const compScore = document.querySelector(".comp-score > p:first-child");
const feedbackContainer = document.querySelector(".feedback-container");
const feedbackMsg = document.querySelector(".feedback-container > p");
const compChoiceImg = document.querySelector(".comp-choice img");

// event listeners
choicesContainer.addEventListener("click", handleUserChoice);

// initialize
compChoiceImg.src = "./assets/images/init-image.png";
userScore.textContent = 0
compScore.textContent = 0

function generateCompChoice() {
  const options = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return options[randomIndex];
}

function showCompChoice(compChoice) {
  compChoiceImg.src = `./assets/images/${compChoice}.png`;
}

// scores
let yourScore = 0;
let cpuScore = 0;

function showWinner(userChoice, compChoice, userWin) {
  if (userWin) {
    yourScore++
    userScore.textContent = yourScore
    feedbackMsg.textContent = `You won!😄 Your ${userChoice} beats ${compChoice}`;
    feedbackContainer.style.backgroundColor = "#66f542";
  } else {
    cpuScore++
    compScore.textContent = cpuScore
    const capCompChoiceFrstLetter = compChoice.replace(
      compChoice.charAt(0),
      compChoice.charAt(0).toUpperCase()
    );
    console.log(capCompChoiceFrstLetter);
    feedbackMsg.textContent = `You lost😫. ${capCompChoiceFrstLetter} beats your ${userChoice}`;
    feedbackContainer.style.backgroundColor = "#ff4747";
  }
}

function playGame(userChoice) {
  const compChoice = generateCompChoice();
  console.log("this is user choice:", userChoice);
  console.log("this is comp choice:", compChoice);
  showCompChoice(compChoice);
  //   win criteria
  if (userChoice === compChoice) {
    feedbackMsg.textContent = "Draw🤝. Play again";
    feedbackContainer.style.backgroundColor = `var(--black)`;
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      // paper, scissors
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      // rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      // rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userChoice, compChoice, userWin);
  }
}

function handleUserChoice(e) {
  const target = e.target.closest("img");
  if (!target) return;
  const userChoice = target.alt;
  playGame(userChoice);
}
