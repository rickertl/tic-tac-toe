// Need three objects:
// 1. gameboard array
// 2. player
// 3. control

// // // create module for gameboard
// const gameBoard = (() => {
//   //cache gameboard
//   const container = document.querySelector(".gameboard");
//   //   const div = board.find("div");

//   return { container };
// })();

// // create factory fuction for player
// const player = (name, weapon) => {
//   const getName = () => name;
//   const getWeapon = () => weapon;
//   return { getName, getWeapon };
// };

// listen for click
// const cells = gameBoard.board;
// listen for "number" button clicks
// cells.forEach((cell) => {
//   cells.addEventListener("click", () => {
//     console.log("cell clickd");
//   });
// });

let plays = [];
plays.length = 9;
let weapon = "X";

const container = document.querySelector(".gameboard");
const renderBoard = (function () {
  // clean array
  // const cleanArray = plays.filter(function () {
  //   return true;
  // });

  // game play
  for (let i = 0; i < plays.length; i++) {
    let cell = document.createElement("div");
    cell.setAttribute("data-id", i);
    plays[i] === "" ? (cell.textContent = plays[i]) : (cell.textContent = "");
    container.appendChild(cell);
    cell.addEventListener("click", () => {
      if (cell.textContent.trim() === "") {
        plays.splice(i, 1, weapon);
        cell.textContent = weapon;
        weapon === "X" ? (weapon = "O") : (weapon = "X");
        winnerCheck();
      }
    });
  }

  // check for winner
  function winnerCheck() {
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
        alert("Winner!");
        renderUnplayable();
      }, 500);
    }
  }

  // stop board from playable
  function renderUnplayable() {
    container.textContent = "";
    for (let i = 0; i < plays.length; i++) {
      let finalCell = document.createElement("div");
      finalCell.setAttribute("data-id", i);
      finalCell.textContent = plays[i];
      container.appendChild(finalCell);
    }
  }
})();
