window.addEventListener("load", () => {
  const gameInstructions = document.querySelector("#game-instructions");

  const boardContainer = document.querySelector("#board-container");

  const startBtn = document.querySelector("#start-btn");

  const externalDiv = document.querySelector(".div-ext");
  const externalDivControls = document.querySelector("#controls");

  startBtn.addEventListener("click", () => {
    gameInstructions.classList.add("hidden");

    boardContainer.classList.remove("hidden");
    externalDiv.classList.remove("hidden");
    externalDivControls.classList.remove("hidden");

    const game = new Game(boardContainer);
    game.start();

    const backgroundMusic = document.querySelector("#background-music");
    backgroundMusic.play();
  });
});
