//suppose that 1 means rock, 2 means paper, 3 means scissors 
const choices = ["", "Rock", "Paper", "Scissors"];

//get the input for the computer which is randomized
function getComputerChoice() {
  let num = Math.random();
  if (num > 0.66666) return 1;
  else if (num > 0.33333) return 2;
  else return 3;
}

// remove choice buttons
function removeChoiceBtn() {
  // this approach to select the buttons is not ideal, as it selects all of the
  // buttons in the DOM, could've done better by being more specific
  const container = document.querySelector("div.buttons");
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    container.removeChild(btn);
  });
}

// update score
function updateScore(humanScore, computerScore, humanGain, computerGain) {
  const humanScoreText = document.querySelector("#humanScoreText");
  const computerScoreText = document.querySelector("#computerScoreText");
  
  humanScoreText.textContent = `${humanScore}(+${humanGain})`;
  computerScoreText.textContent = `${computerScore}(+${computerGain})`;
}

// update hero text
function updateHero(status){
  const hero = document.querySelector("#hero");
  const subhero = document.querySelector("#subhero");

  switch (status) {
    case "win":
      hero.textContent = "You Win! You earn 1 point!";
      break;

    case "lose":
      hero.textContent = "You Lose! The computer earn 1 point!";
      break;

    case "draw":
      hero.textContent = "It's a draw! Both you and the computer earn 0.5 point.";
      break;
  }

  subhero.textContent = "Press 'Play Round' to start the next round!";
}

//get the input from the player 
function getHumanChoice(computerSelection) {
  //let input = prompt("Enter your choice: rock, paper, or scissors. \nType exit to quit. \n(Note, the input is case insensitive)");
  //
  //input = input.toLowerCase();
  //
  //if (input === "exit") return "Exit";
  //
  //if (input === "rock") return 1;
  //else if (input === "paper") return 2;
  //else if (input === "scissors") return 3;

  const container = document.querySelector("div.buttons");

  // remove the playRound button
  const playBtn = document.querySelector("button#play");
  container.removeChild(playBtn);

  // generate the buttons for the choice 
  const choices = ["rock", "paper", "scissors"];

  for (const choice of choices) {
    let choiceBtn = document.createElement(`button`);
    choiceBtn.id = `${choice}`;
    choiceBtn.textContent = `${choice}`;
    container.appendChild(choiceBtn);

    // add event listener to this element
    // to be noted that there is also a way by adding event listener to the
    // parent node instead of each of the element
    choiceBtn.addEventListener("click", () => {
      // remove all the buttons again
      removeChoiceBtn();

      // readd the play button
      container.appendChild(playBtn);

      switch (choice) {
        case "rock":
          return playRound(1, computerSelection);

        case "paper":
          return playRound(2, computerSelection);

        case "scissors":
          return playRound(3, computerSelection);
      }
    });
  }
}

//variable to track the score of the human and the computer
let humanScore = 0;
let computerScore = 0;

//check the result of the round
//all the possible combinations are:
//rock - rock, rock - paper, rock - scissors
//paper - rock, paper - paper, paper - scissors
//scissors - rock, scissors - paper, scissors - scissors
function playRound(humanChoice, computerChoice) {
  const DRAW_SCORE = 0.5;
  const WIN_SCORE = 1;

  var humanGain = 0;
  var computerGain = 0;

  if (humanChoice == computerChoice) {
    humanGain = DRAW_SCORE;
    computerGain = DRAW_SCORE;
    humanScore += humanGain;
    computerScore += computerGain;

    console.log("Draw! both get 0.5 points");
    updateHero("draw");
  }
  else if ((humanChoice == 1 && computerChoice == 3) || (humanChoice == 2 && computerChoice == 1) || (humanChoice == 3 && computerChoice == 2)) {
    humanGain = WIN_SCORE;
    humanScore += humanGain;
    console.log(`You win! ${choices[humanChoice]} beats ${choices[computerChoice]}. You earn 1 point!`);
    updateHero("win");
  }
  else if ((humanChoice == 1 && computerChoice == 2) || (humanChoice == 2 && computerChoice == 3) || (humanChoice == 3 && computerChoice == 1)) {
    computerGain = WIN_SCORE;
    computerScore += computerGain;
    console.log(`Computer win! ${choices[computerChoice]} beats ${choices[humanChoice]}. It earn 1 point!`);
    updateHero("lose");
  }

  console.info(`Your score: ${humanScore}, the computer score: ${computerScore}.`);
  updateScore(humanScore, computerScore, humanGain, computerGain);
}

//start the game loop
const startBtn = document.querySelector("button");

startBtn.addEventListener("click", () => {
  let computerSelection = getComputerChoice();
  let humanSelection = getHumanChoice(computerSelection);
});
