// create factory function for players
const Player = (name, weapon) => {
  const getName = () => name;
  const getWeapon = () => weapon;
  return { getName, getWeapon };
};

// revealing Module Pattern for gameboard (although nothing is revealed)
const gameBoard = (() => {
  let gamePlays = new Array(9).fill("");
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
    for (let i = 0; i < gamePlays.length; i++) {
      let cell = document.createElement("div");
      cell.setAttribute("data-id", i);
      cell.textContent = gamePlays[i];
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
    const boxes = form.querySelectorAll(".weapon > .box");
    console.log(boxes);
    boxes.forEach((box) => {
      box.addEventListener("click", () => {
        boxes.forEach((box) => {
          box.classList.remove("selected");
        });
        if (box.classList.contains("p1x") || box.classList.contains("p2o")) {
          form.querySelector(".p1x").classList.add("selected");
          player1Weapon = "X";
          form.querySelector(".p2o").classList.add("selected");
          player2Weapon = "O";
        } else {
          form.querySelector(".p1o").classList.add("selected");
          player1Weapon = "O";
          form.querySelector(".p2x").classList.add("selected");
          player2Weapon = "X";
        }
      });
    });
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
      gamePlays.splice(index, 1, weapon);
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
    gamePlays = new Array(9).fill("");
    weapon = "X";
    gameOn = true;
    tie = false;
    _render();
    _bindEvents();
  }

  function _winnerCheck() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];
    for (let index = 0; index < winPatterns.length; index++) {
      let winPattern = winPatterns[index];
      if (
        gamePlays[winPattern[0]] !== "" &&
        gamePlays[winPattern[0]] === gamePlays[winPattern[1]] &&
        gamePlays[winPattern[1]] === gamePlays[winPattern[2]]
      ) {
        gameOn = false;
        weapon === player1.getWeapon()
          ? ((winningPlayer = player1.getName()),
            (winningWeapon = player1.getWeapon()))
          : ((winningPlayer = player2.getName()),
            (winningWeapon = player2.getWeapon()));
      } else if (!gamePlays.includes("")) {
        gameOn = false;
        tie = true;
      }
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
