// create factory function for players
const Player = (name, weapon) => {
  const getName = () => name;
  const getWeapon = () => weapon;
  return { getName, getWeapon };
};

// Revealing Module Pattern for gameboard
const gameBoard = (() => {
  let cells = new Array(9);
  let player1 = {};
  let player2 = {};
  let player1Weapon = "X";
  let player2Weapon = "O";
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
  const weapon1_X = document.querySelector(".player1-input > .weapon > .X");
  const weapon1_O = document.querySelector(".player1-input > .weapon > .O");
  const weapon2_X = document.querySelector(".player2-input > .weapon > .X");
  const weapon2_O = document.querySelector(".player2-input > .weapon > .O");

  _render();
  _bindEvents();

  function _render() {
    container.textContent = "";
    for (let i = 0; i < cells.length; i++) {
      let cell = document.createElement("div");
      cell.setAttribute("data-id", i);
      cell.textContent = cells[i];
      container.appendChild(cell);
    }
    if (!gameOn) {
      _gameOver();
    }
  }

  function _bindEvents() {
    if (gameOn) {
      _watchWeapons();
      form.onsubmit = _setupPlayers;
      const cells = container.querySelectorAll("div");
      cells.forEach((cell) => {
        cell.addEventListener("click", _addPlay);
      });
    } else {
      resetButton.addEventListener("click", _resetPlay);
    }
  }

  function _watchWeapons() {
    weapon1_X.addEventListener("click", XvsO);
    weapon1_O.addEventListener("click", OvsX);
    weapon2_X.addEventListener("click", OvsX);
    weapon2_O.addEventListener("click", XvsO);
    function XvsO() {
      weapon1_X.classList.add("selected");
      weapon1_X.classList.remove("unselected");
      weapon1_O.classList.add("unselected");
      weapon1_O.classList.remove("selected");
      weapon2_O.classList.add("selected");
      weapon2_O.classList.remove("unselected");
      weapon2_X.classList.add("unselected");
      weapon2_X.classList.remove("selected");
      player1Weapon = "X";
      player2Weapon = "O";
    }
    function OvsX() {
      weapon1_O.classList.add("selected");
      weapon1_O.classList.remove("unselected");
      weapon1_X.classList.add("unselected");
      weapon1_X.classList.remove("selected");
      weapon2_X.classList.add("selected");
      weapon2_X.classList.remove("unselected");
      weapon2_O.classList.add("unselected");
      weapon2_O.classList.remove("selected");
      player1Weapon = "O";
      player2Weapon = "X";
    }
  }

  function _setupPlayers(event) {
    event.preventDefault();
    player1 = Player(form.elements["player_1"].value, player1Weapon);
    player2 = Player(form.elements["player_2"].value, player2Weapon);
    userEntry.style.display = "none";
    weapon = player1.getWeapon();
  }

  function _addPlay(event) {
    if (event.target.textContent === "") {
      const index = event.target.getAttribute("data-id");
      cells.splice(index, 1, weapon);
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
    cells = new Array(9);
    weapon = "X";
    gameOn = true;
    tie = false;
    _render();
    _bindEvents();
  }

  function _winnerCheck() {
    if (
      // horizontal checks
      (Object.hasOwn(cells, 0) && // makes sure not empty
        cells[0] === cells[1] &&
        cells[1] === cells[2]) ||
      (Object.hasOwn(cells, 3) && // makes sure not empty
        cells[3] === cells[4] &&
        cells[4] === cells[5]) ||
      (Object.hasOwn(cells, 6) && // makes sure not empty
        cells[6] === cells[7] &&
        cells[7] === cells[8]) ||
      // vertical checks
      (Object.hasOwn(cells, 0) && // makes sure not empty
        cells[0] === cells[3] &&
        cells[3] === cells[6]) ||
      (Object.hasOwn(cells, 1) && // makes sure not empty
        cells[1] === cells[4] &&
        cells[4] === cells[7]) ||
      (Object.hasOwn(cells, 2) && // makes sure not empty
        cells[2] === cells[5] &&
        cells[5] === cells[8]) ||
      // diagonal checks
      (Object.hasOwn(cells, 0) && // makes sure not empty
        cells[0] === cells[4] &&
        cells[4] === cells[8]) ||
      (Object.hasOwn(cells, 6) && // makes sure not empty
        cells[6] === cells[4] &&
        cells[4] === cells[2])
    ) {
      gameOn = false;
      weapon === player1.getWeapon()
        ? ((winningPlayer = player1.getName()),
          (winningWeapon = player1.getWeapon()))
        : ((winningPlayer = player2.getName()),
          (winningWeapon = player2.getWeapon()));
    } else if (!cells.includes(undefined)) {
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
