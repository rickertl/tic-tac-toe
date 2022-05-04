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

(function () {
  const gameboard = {
    plays: new Array(9),
    weapon: "X",
    gameOn: true,
    init: function () {
      this.cacheDom();
      this.render();
      this.bindEvents();
    },
    cacheDom: function () {
      this.container = document.querySelector(".gameboard");
    },
    render: function () {
      this.container.textContent = "";
      for (let i = 0; i < this.plays.length; i++) {
        let cell = document.createElement("div");
        cell.setAttribute("data-id", i);
        cell.textContent = this.plays[i];
        this.container.appendChild(cell);
      }
    },
    bindEvents: function () {
      if (this.gameOn === true) {
        const cells = this.container.querySelectorAll("div");
        cells.forEach((cell) => {
          cell.addEventListener("click", this.addPlay.bind(this));
        });
      }
    },
    addPlay: function (event) {
      if (event.target.textContent === "") {
        const index = event.target.getAttribute("data-id");
        this.plays.splice(index, 1, this.weapon);
        this.winnerCheck(this.weapon);
        // ready weapon for next play
        this.weapon === "X" ? (this.weapon = "O") : (this.weapon = "X");
      }
      this.render();
      this.bindEvents();
    },
    winnerCheck: function (weapon) {
      if (
        // horizontal checks
        (Object.hasOwn(this.plays, 0) && // makes sure not empty
          this.plays[0] === this.plays[1] &&
          this.plays[1] === this.plays[2]) ||
        (Object.hasOwn(this.plays, 3) && // makes sure not empty
          this.plays[3] === this.plays[4] &&
          this.plays[4] === this.plays[5]) ||
        (Object.hasOwn(this.plays, 6) && // makes sure not empty
          this.plays[6] === this.plays[7] &&
          this.plays[7] === this.plays[8]) ||
        // vertical checks
        (Object.hasOwn(this.plays, 0) && // makes sure not empty
          this.plays[0] === this.plays[3] &&
          this.plays[3] === this.plays[6]) ||
        (Object.hasOwn(this.plays, 1) && // makes sure not empty
          this.plays[1] === this.plays[4] &&
          this.plays[4] === this.plays[7]) ||
        (Object.hasOwn(this.plays, 2) && // makes sure not empty
          this.plays[2] === this.plays[5] &&
          this.plays[5] === this.plays[8]) ||
        // diagonal checks
        (Object.hasOwn(this.plays, 0) && // makes sure not empty
          this.plays[0] === this.plays[4] &&
          this.plays[4] === this.plays[8]) ||
        (Object.hasOwn(this.plays, 6) && // makes sure not empty
          this.plays[6] === this.plays[4] &&
          this.plays[4] === this.plays[2])
      ) {
        this.gameOver("regular", weapon, this.container);
      } else if (!this.plays.includes(undefined)) {
        this.gameOver("tie", weapon, this.container);
      }
    },
    gameOver: function (result, weapon, container) {
      if (result === "regular") {
        container.setAttribute("data-message", `${weapon} wins!`);
      } else {
        container.setAttribute("data-message", "Tie!");
      }
      container.classList.add("gameover");
      this.gameOn = false;
    },
  };

  gameboard.init();
})();

// working on win overlay
