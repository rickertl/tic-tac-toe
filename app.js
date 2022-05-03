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
plays.length = 10;
let weapon = "X";

// listen for plays
const playListener = (() => {
  // get user click
  const container = document.querySelector(".gameboard");
  const cells = document.querySelectorAll(".gameboard > div");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const cellNumber = cell.className;
      const target = document.getElementsByClassName(cellNumber);
      if (cell.textContent.trim() === "") {
        plays.splice(cellNumber, 1, weapon);
        cell.textContent = weapon;
        weapon === "X" ? (weapon = "O") : (weapon = "X");
        winnerCheck();
      }
    });
  });
})();

// check for winner
const winnerCheck = function () {
  if (
    // horizontal checks
    (Object.hasOwn(plays, 1) && // makes sure not empty
      plays[1] === plays[2] &&
      plays[2] === plays[3]) ||
    (Object.hasOwn(plays, 4) && // makes sure not empty
      plays[4] === plays[5] &&
      plays[5] === plays[6]) ||
    (Object.hasOwn(plays, 7) && // makes sure not empty
      plays[7] === plays[8] &&
      plays[8] === plays[9]) ||
    // vertical checks
    (Object.hasOwn(plays, 1) && // makes sure not empty
      plays[1] === plays[4] &&
      plays[4] === plays[7]) ||
    (Object.hasOwn(plays, 2) && // makes sure not empty
      plays[2] === plays[5] &&
      plays[5] === plays[8]) ||
    (Object.hasOwn(plays, 3) && // makes sure not empty
      plays[3] === plays[6] &&
      plays[6] === plays[9]) ||
    // diagonal checks
    (Object.hasOwn(plays, 1) && // makes sure not empty
      plays[1] === plays[5] &&
      plays[5] === plays[9]) ||
    (Object.hasOwn(plays, 7) && // makes sure not empty
      plays[7] === plays[5] &&
      plays[5] === plays[3])
  ) {
    setTimeout(function () {
      alert("Winner!");
    }, 500);
  }
};
