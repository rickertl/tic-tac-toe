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

const renderBoard = (function () {
  let plays = [];
  plays.length = 9;
  let weapon = "X";
  let gameOn = true;

  // cache gameboard
  const container = document.querySelector(".gameboard");

  // initialize game
  render();

  // render from plays array
  function render() {
    container.textContent = "";
    for (let i = 0; i < plays.length; i++) {
      let cell = document.createElement("div");
      cell.setAttribute("data-id", i);
      cell.textContent = plays[i];
      container.appendChild(cell);
    }
    if (gameOn) {
      playWatcher();
    }
  }

  // watch for clicks
  function playWatcher() {
    const cells = container.querySelectorAll("div");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (cell.textContent === "") {
          const target = cell.getAttribute("data-id");
          plays.splice(target, 1, weapon);
          render();
          winnerCheck(weapon);
          // ready weapon for next play
          weapon === "X" ? (weapon = "O") : (weapon = "X");
        }
      });
    });
  }

  // check for winner
  function winnerCheck(weapon) {
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
      setTimeout(function () {
        alert(`${weapon} wins!`);
        gameOn = false;
        render();
      }, 500);
    }
  }
})();
