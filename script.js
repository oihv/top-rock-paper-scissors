//suppose that 1 means rock, 2 means paper, 3 means scissors 
const choices = ["", "Rock", "Paper", "Scissors"];

//get the input for the computer which is randomized
function getComputerChoice() {
  let num = Math.random();
  if (num > 0.66666) return 1;
  else if (num > 0.33333) return 2;
  else return 3;
}

//get the input from the player 
function getHumanChoice() {
  //let input = prompt("Enter your choice: rock, paper, or scissors. \nType exit to quit. \n(Note, the input is case insensitive)");
  //
  //input = input.toLowerCase();
  //
  //if (input === "exit") return "Exit";
  //
  //if (input === "rock") return 1;
  //else if (input === "paper") return 2;
  //else if (input === "scissors") return 3;

  // generate the buttons for the choice 
  const container = document.querySelector("div.buttons");
  const choices = ["rock", "paper", "scissors"];

  for (const choice of choices) {
    let choiceBtn = document.createElement(`button`);
    container.appendChild(choiceBtn);
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
  if (humanChoice == computerChoice) {
    humanScore += 0.5;
    computerScore += 0.5;
    console.log("Draw! both get 0.5 points");
  }
  else if ((humanChoice == 1 && computerChoice == 3) || (humanChoice == 2 && computerChoice == 1) || (humanChoice == 3 && computerChoice == 2)) {
    humanScore += 1;
    console.log(`You win! ${choices[humanChoice]} beats ${choices[computerChoice]}. You earn 1 point!`);
  }
  else if ((humanChoice == 1 && computerChoice == 2) || (humanChoice == 2 && computerChoice == 3) || (humanChoice == 3 && computerChoice == 1)) {
    computerScore += 1;
    console.log(`Computer win! ${choices[computerChoice]} beats ${choices[humanChoice]}. It earn 1 point!`);
  }

  console.info(`Your score: ${humanScore}, the computer score: ${computerScore}.`);
}

//start the game loop
const startBtn = document.querySelector("button");

startBtn.addEventListener("click", () => {
  let computerSelection = getComputerChoice();
  let humanSelection = getHumanChoice();

  playRound(humanSelection, computerSelection);
});
