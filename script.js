const game = (function () {
    let gameboard = ["","","","","","","","",""]

    let gameStart = false;

    let player1 = true;
    let player2 = false;

    let cpu = false; // check if player 2 is cpu
    let playCount = 0; // check the number of mark
    const player1name = "";
    const player2name = "";
    return {gameboard, gameStart, player1, player2, player1name, player2name};
})();

const player = (name) => {    
    return {name};
}

const startButton = (function () {
    const main = document.getElementById("gameboard");
    const button = document.createElement("button");
    
    button.addEventListener("click", (e) => {
        createGameBoard()
        game.player1name = prompt("Enter Your name", "Player1");
        game.player2name = prompt("Enter Your name (CPU for player2 computer)", "CPU");
        gameStart = true;

        e.target.remove()
    })

    button.textContent = "Start Game"
    main.appendChild(button);
})();

function restart () {
    const main = document.getElementById("gameboard");
    const celldiv = document.querySelectorAll(".gamecell");
    const button = document.createElement("button");
    
    button.addEventListener("click", (e) => {
        game.gameboard = ["","","","","","","","",""];

        for (let i = 0; i < celldiv.length; i++) { // delete olds cells to restar the game
            celldiv[i].remove();
            
        }
        createGameBoard()
        e.target.remove()
    })

    button.textContent = "Restart"
    main.appendChild(button);
}

const createGameBoard = (function (){
    const main = document.getElementById("gameboard");
    main.classList.add("gameboard");


    const gameArray = game.gameboard;

    for (let i = 0; i < gameArray.length; i++) { // create cells for the gameboard
        const gameboardCell = document.createElement("DIV");
        gameboardCell.setAttribute("data-cell", i);
        gameboardCell.classList.add("gamecell");


         gameboardCell.addEventListener("click", playerChoice)

        // gameboardCell.textContent = gameArray[i]
        main.appendChild(gameboardCell);

    }
});

function playerChoice (id ,player) {
    const cell = this.getAttribute("data-cell");
     const player1 = game.player1;
     const player2 = game.player2;

    let cpuRandom = Math.floor(Math.random() * 8);
    let playerMark = "";

    if (player1 && !player2) {
        playerMark = "X";
    }
    else if (player2 && !player1) {
        playerMark = "O";
    }

    if (game.gameboard[cell] === "") {
        game.gameboard[cell] = playerMark;
        this.textContent = playerMark;

        if (player1 && !player2) {
            game.player1 = false;
            game.player2 = true;
        }
        else if (player2 && !player1) {
            game.player1 = true;
            game.player2 = false;
        }

    }
    win(playerMark)
}

// const Player = (name, style) => {
//     const player1 = game.player1;
//     const player2 = game.player2;

//     if (!player1) {
//         game.player1 = true;
//     }
//     else if (!player2 && player1) {
//         game.player2 = true;
//     }
//     return {name, style};
// }
function randomStart () {
    let random = Math.floor(Math.random() * 2)

    if (random === 0) {
        game.player1 = true;
        game.player2 = false;
    }
    else {
        game.player1 = false;
        game.player2 = true;
    }
}
function win (p) { //p is the playerMark
    const g = game.gameboard;

    if (gameStart){


    if (g[0] == p && g[1] == p && g[2] == p) { //Check if some line has the same mark
        console.log("Win")
        restart();
    }
    else if (g[3] == p && g[4] == p && g[5] == p) {
        console.log("Win")
    }
    else if (g[6] == p && g[7] == p && g[8] == p) {
        console.log("Win")
    }
    else if (g[0] == p && g[3] == p && g[6] == p) {
        console.log("Win")
    }
    else if (g[1] == p && g[4] == p && g[7] == p) {
        console.log("Win")
    }
    else if (g[2] == p && g[5] == p && g[8] == p) {
        console.log("Win")
    }
    else if (g[0] == p && g[4] == p && g[8] == p) {
        console.log("Win")
    }
    else if (g[2] == p && g[4] == p && g[6] == p) {
        console.log("Win")
    }
    else{
        if (g[0] && g[1] && g[2] && g[3] && g[4] && g[5] &&
            g[6] && g[7] && g[8]){
        console.log("Draw")
    }

}
}
}