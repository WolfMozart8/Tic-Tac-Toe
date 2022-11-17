const gameboardDiv = document.getElementById("gameboard");

function GameBoardCreator() {
    let gameArray = [];

    const gameboard = document.createElement("DIV");
  

    for (let i = 0; i < 9; i++) {
        const gameboardSpot = document.createElement("DIV");
        gameboardSpot.classList.add(`spot-${i}`)

        gameboard.appendChild(gameboardSpot)
        console.log(i);
    }
    gameboardDiv.appendChild(gameboard);
}