// create factory function for players
const Player = (name, weapon) => {
  const getName = () => name;
  const getWeapon = () => weapon;
  return { getName, getWeapon };
};

// revealing Module Pattern for gameboard (although nothing is revealed)
const gameBoard = (() => {
  let plays = new Array(9).fill("");
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
  const main = document.querySelector("main");
  const gameboard = main.querySelector(".gameboard");
  const userEntry = main.querySelector(".user-entry");
  const form = userEntry.querySelector("form");

  _render();
  _bindEvents();

  function _render() {
    gameboard.textContent = "";
    for (let i = 0; i < plays.length; i++) {
      let cell = document.createElement("div");
      cell.setAttribute("data-id", i);
      cell.textContent = plays[i];
      gameboard.appendChild(cell);
    }
    if (!gameOn) {
      _gameOver();
    }
  }

  function _bindEvents() {
    if (gameOn) {
      _watchWeapons();
      form.onsubmit = _setupPlayers;
      const cells = gameboard.querySelectorAll("div");
      cells.forEach((cell) => {
        cell.addEventListener("click", _addPlay);
      });
    } else {
      resetButton.addEventListener("click", _resetPlay);
    }
  }

  // watch weapon selection to make sure opposing weapons
  function _watchWeapons() {
    const weapon1_X = form.querySelector(".player1-input > .weapon > .X");
    const weapon1_O = form.querySelector(".player1-input > .weapon > .O");
    const weapon2_X = form.querySelector(".player2-input > .weapon > .X");
    const weapon2_O = form.querySelector(".player2-input > .weapon > .O");
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
      plays.splice(index, 1, weapon);
      _winnerCheck();
      // ready weapon for next play
      weapon === "X" ? (weapon = "O") : (weapon = "X");
    }
    _render();
    _bindEvents();
  }

  function _resetPlay() {
    gameboard.classList.remove("gameover");
    userEntry.removeAttribute("style");
    plays = new Array(9).fill("");
    weapon = "X";
    gameOn = true;
    tie = false;
    _render();
    _bindEvents();
  }

  // not elegant, but my first thought. may refactor to something like this:
  // https://dev.to/bornasepic/pure-and-simple-tic-tac-toe-with-javascript-4pgn
  function _winnerCheck() {
    if (
      // horizontal checks
      (plays[0] !== "" && // makes sure not empty
        plays[0] === plays[1] &&
        plays[1] === plays[2]) ||
      (plays[3] !== "" && // makes sure not empty
        plays[3] === plays[4] &&
        plays[4] === plays[5]) ||
      (plays[6] !== "" && // makes sure not empty
        plays[6] === plays[7] &&
        plays[7] === plays[8]) ||
      // vertical checks
      (plays[0] !== "" && // makes sure not empty
        plays[0] === plays[3] &&
        plays[3] === plays[6]) ||
      (plays[1] !== "" && // makes sure not empty
        plays[1] === plays[4] &&
        plays[4] === plays[7]) ||
      (plays[2] !== "" && // makes sure not empty
        plays[2] === plays[5] &&
        plays[5] === plays[8]) ||
      // diagonal checks
      (plays[0] !== "" && // makes sure not empty
        plays[0] === plays[4] &&
        plays[4] === plays[8]) ||
      (plays[6] !== "" && // makes sure not empty
        plays[6] === plays[4] &&
        plays[4] === plays[2])
    ) {
      gameOn = false;
      weapon === player1.getWeapon()
        ? ((winningPlayer = player1.getName()),
          (winningWeapon = player1.getWeapon()))
        : ((winningPlayer = player2.getName()),
          (winningWeapon = player2.getWeapon()));
    } else if (!plays.includes("")) {
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
    gameboard.appendChild(overlay);
    resetButton.textContent = "Play Again?";
    overlay.appendChild(resetButton);
  }
})();
