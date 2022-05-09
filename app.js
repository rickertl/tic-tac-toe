// create Factory Function for players
const Player = (name, weapon) => {
  const getName = () => name;
  const getWeapon = () => weapon;
  return { getName, getWeapon };
};

// revealing Module Pattern for gameboard (although nothing is revealed)
const gameBoard = (() => {
  const gamePlays = new Array(9).fill("");
  let player1 = {};
  let player2 = {};
  let weapon = "";
  let gameOn = true;
  let tie = false;
  let winner = {};
  let message = "";
  const turn = document.createElement("div");
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
      cell.setAttribute("data-index", i);
      cell.textContent = gamePlays[i];
      gameboard.appendChild(cell);
    }
    if (!gameOn) {
      _gameOver();
    }
    turn.classList.add("turn");
    gameboard.appendChild(turn);
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
    const weaponButtons = form.querySelectorAll(".weapon-btn");
    const p1x_p2o = form.querySelectorAll(".p1x-p2o");
    const p1o_p2x = form.querySelectorAll(".p1o-p2x");
    weaponButtons.forEach((button) => {
      button.addEventListener("click", () => {
        weaponButtons.forEach((button) => {
          button.classList.remove("selected");
        });
        if (button.classList.contains("p1x-p2o")) {
          p1x_p2o.forEach((button) => {
            button.classList.add("selected");
          });
        } else {
          p1o_p2x.forEach((button) => {
            button.classList.add("selected");
          });
        }
      });
    });
  }

  function _setupPlayers(event) {
    event.preventDefault();
    player1 = Player(
      form.elements["player_1"].value,
      form
        .querySelector(".player1-input .weapon-btn.selected")
        .getAttribute("data-weapon")
    );
    player2 = Player(
      form.elements["player_2"].value,
      form
        .querySelector(".player2-input .weapon-btn.selected")
        .getAttribute("data-weapon")
    );
    userEntry.style.display = "none";
    weapon = player1.getWeapon();
    _whoseTurn();
  }

  function _whoseTurn() {
    turn.style.display = "flex";
    let player = {};
    weapon === player1.getWeapon() ? (player = player1) : (player = player2);
    if (player.getName() !== "") {
      turn.textContent = `${player.getName()}'s (${player.getWeapon()}) turn`;
    } else {
      player === player1
        ? (turn.textContent = `Player 1's (${player.getWeapon()}) turn`)
        : (turn.textContent = `Player 2's (${player.getWeapon()}) turn`);
    }
  }

  function _addPlay(event) {
    if (event.target.textContent === "") {
      const index = event.target.getAttribute("data-index");
      gamePlays.splice(index, 1, weapon);
      _winnerCheck();
      // ready weapon for next play
      weapon === "X" ? (weapon = "O") : (weapon = "X");
      _whoseTurn();
    }
    _render();
    _bindEvents();
  }

  function _resetPlay() {
    gameboard.classList.remove("gameover");
    userEntry.removeAttribute("style");
    gamePlays.fill("");
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
    for (let i = 0; i < winPatterns.length; i++) {
      let winPattern = winPatterns[i];
      if (
        gamePlays[winPattern[0]] !== "" &&
        gamePlays[winPattern[0]] === gamePlays[winPattern[1]] &&
        gamePlays[winPattern[1]] === gamePlays[winPattern[2]]
      ) {
        gameOn = false;
        weapon === player1.getWeapon()
          ? (winner = player1)
          : (winner = player2);
      } else if (!gamePlays.includes("")) {
        gameOn = false;
        tie = true;
      }
    }
  }

  function _gameOver() {
    if (tie) {
      message = "Tie!";
    } else if (winner.getName() !== "") {
      message = `${winner.getName()} (${winner.getWeapon()}) wins!`;
    } else {
      winner.getWeapon() === player1.getWeapon()
        ? (message = `Player 1 (${winner.getWeapon()}) wins!`)
        : (message = `Player 2 (${winner.getWeapon()}) wins!`);
    }
    turn.removeAttribute("style");
    const overlay = document.createElement("div");
    overlay.classList.add("gameover", "overlay");
    overlay.textContent = message;
    gameboard.appendChild(overlay);
    resetButton.textContent = "Play Again?";
    overlay.appendChild(resetButton);
  }
})();
