// Need three objects:
// 1. gameboard array
// 2. player
// 3. control

// create factory function for player
const Player = (name, weapon) => {
  const getName = () => name;
  const getWeapon = () => weapon;
  return { getName, getWeapon };
};

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

// Revealing Module Pattern of gameboard
const gameboard = (() => {
  let plays = new Array(9);
  let weapon = player1.getWeapon();
  let gameOn = true;
  let winner = "";
  let tie = false;
  let message = "";
  const resetButton = document.createElement("button");

  // cache DOM
  const container = document.querySelector(".gameboard");

  _render();
  _bindEvents();

  function _render() {
    container.textContent = "";
    for (let i = 0; i < plays.length; i++) {
      let cell = document.createElement("div");
      cell.setAttribute("data-id", i);
      cell.textContent = plays[i];
      container.appendChild(cell);
    }
    if (!gameOn) {
      _gameOver();
    }
  }

  function _bindEvents() {
    if (gameOn) {
      const cells = container.querySelectorAll("div");
      cells.forEach((cell) => {
        cell.addEventListener("click", _addPlay);
      });
    } else {
      resetButton.addEventListener("click", _resetPlay);
    }
  }

  function _addPlay(event) {
    if (event.target.textContent === "") {
      const index = event.target.getAttribute("data-id");
      plays.splice(index, 1, weapon);
      _winnerCheck();
      // ready weapon for next play
      weapon === "X" ? (weapon = "O") : (weapon = "X");
    }
    _render();
    _bindEvents();
  }

  function _resetPlay() {
    container.classList.remove("gameover");
    plays = new Array(9);
    weapon = "X";
    gameOn = true;
    tie = false;
    _render();
    _bindEvents();
  }

  function _winnerCheck() {
    if (
      // horizontal checks
      (Object.hasOwn(plays, 0) && // makes sure not empty
        plays[0] === plays[1] &&
        plays[1] === plays[2]) ||
      (Object.hasOwn(plays, 3) && // makes sure not empty
        plays[3] === plays[4] &&
        plays[4] === plays[5]) ||
      (Object.hasOwn(plays, 6) && // makes sure not empty
        plays[6] === plays[7] &&
        plays[7] === plays[8]) ||
      // vertical checks
      (Object.hasOwn(plays, 0) && // makes sure not empty
        plays[0] === plays[3] &&
        plays[3] === plays[6]) ||
      (Object.hasOwn(plays, 1) && // makes sure not empty
        plays[1] === plays[4] &&
        plays[4] === plays[7]) ||
      (Object.hasOwn(plays, 2) && // makes sure not empty
        plays[2] === plays[5] &&
        plays[5] === plays[8]) ||
      // diagonal checks
      (Object.hasOwn(plays, 0) && // makes sure not empty
        plays[0] === plays[4] &&
        plays[4] === plays[8]) ||
      (Object.hasOwn(plays, 6) && // makes sure not empty
        plays[6] === plays[4] &&
        plays[4] === plays[2])
    ) {
      gameOn = false;
      weapon === player1.getWeapon()
        ? (winner = player1.getName())
        : (winner = player2.getName());
    } else if (!plays.includes(undefined)) {
      gameOn = false;
      tie = true;
    }
  }

  function _gameOver() {
    tie ? (message = "Tie!") : (message = `${winner} wins!`);
    const overlay = document.createElement("div");
    overlay.classList.add("gameover");
    overlay.textContent = message;
    container.appendChild(overlay);
    resetButton.textContent = "Play Again?";
    overlay.appendChild(resetButton);
  }
})();

// refactoring to revealing module pattern
