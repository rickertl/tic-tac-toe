// Need three objects:
// 1. gameboard array
// 2. player
// 3. control

// // create factory fuction for player
// const player = (name, weapon) => {
//   const getName = () => name;
//   const getWeapon = () => weapon;
//   return { getName, getWeapon };
// };

// Revealing Module Pattern of gameboard
const gameboard = (() => {
  let plays = new Array(9);
  let weapon = "X";
  let gameOn = true;
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
      resetButton.textContent = "Play Again?";
      container.appendChild(resetButton);
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
      _winnerCheck(weapon);
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
      _gameOver("regular");
    } else if (!plays.includes(undefined)) {
      _gameOver("tie");
    }
  }

  function _gameOver(result) {
    if (result === "regular") {
      container.setAttribute("data-message", `${weapon} wins!`);
    } else {
      container.setAttribute("data-message", "Tie!");
    }
    container.classList.add("gameover");
    gameOn = false;
  }
})();

// refactoring to revealing module pattern
