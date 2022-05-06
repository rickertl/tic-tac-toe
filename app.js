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

// Revealing Module Pattern of gameboard
const gameboard = (() => {
  let plays = new Array(9);
  let player1 = {};
  let player2 = {};
  let weapon = "";
  let gameOn = true;
  let winningPlayer = "";
  let winningWeapon = "";
  let tie = false;
  let message = "";
  const resetButton = document.createElement("button");

  // cache DOM
  const container = document.querySelector(".gameboard");
  const userEntry = document.querySelector(".user-entry");
  const form = document.querySelector("form");

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
      form.onsubmit = _setupPlayers;
    } else {
      resetButton.addEventListener("click", _resetPlay);
    }
  }

  function _setupPlayers(event) {
    event.preventDefault();
    player1 = Player(
      form.elements["player_1"].value,
      form.elements["weapon_1"].value
    );
    player2 = Player(
      form.elements["player_2"].value,
      form.elements["weapon_2"].value
    );
    userEntry.style.display = "none";
    weapon = player1.getWeapon();
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
    userEntry.removeAttribute("style");
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
        ? ((winningPlayer = player1.getName()),
          (winningWeapon = player1.getWeapon()))
        : ((winningPlayer = player2.getName()),
          (winningWeapon = player2.getWeapon()));
    } else if (!plays.includes(undefined)) {
      gameOn = false;
      tie = true;
    }
  }

  function _gameOver() {
    if (tie) {
      message = "Tie!";
    } else if (winningPlayer === "") {
      message = `${winningWeapon} wins!`;
    } else {
      message = `${winningPlayer} wins!`;
    }
    const overlay = document.createElement("div");
    overlay.classList.add("gameover", "overlay");
    overlay.textContent = message;
    container.appendChild(overlay);
    resetButton.textContent = "Play Again?";
    overlay.appendChild(resetButton);
  }
})();

// working on getting name and weapon inputs into game
