const game = (function () {
    let gameboard = ["","","","","","","","",""]

    let gameStart = false;

    let player1 = true;
    let player2 = false;

    let cpu = false; // check if player 2 is cpu
    let playCount = 0; // check the number of mark
    const player1name = "";
    const player2name = "";
    return {gameboard, gameStart, player1, player2, player1name, player2name, playCount};
})();

const player = (name) => {   
    const playerSelect = () => {

        console.log(this)
    } 
    return {name};
}

const startButton = (function () {
    const main = document.getElementById("gameboard");
    const button = document.createElement("button");
    
    button.addEventListener("click", (e) => {
        createGameBoard()
        game.player1name = prompt("Enter Your name", "Player1");
        game.player2name = prompt("Enter Your name (CPU for player2 computer)", "CPU");
        
        game.gameStart = true;
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

    button.textContent = "Restart";
    main.appendChild(button);
}


const play = (e) => {
    const arr = game.gameboard;
    const cell = e.target.getAttribute("data-cell");
    let playerMark = "";

    if (game.player1) {
        playerMark = "X";
    }
    else if (game.player2) {
        playerMark = "O";
    }
if (game.gameStart){
    if (game.player2) {
        cpuPlayer(playerMark);
    }

    else if (arr[cell] != "") {
        console.log("JJSJS")
        
    }
    else if (arr[cell] === "") {
        game.gameboard[cell] = playerMark;
        e.target.textContent = playerMark;
       
        changePlayer();
        
    }
    
    else {
        console.log("ERROR")
    }
} else {
    console.log("Start the game")
}
    win(playerMark);
    
}

function changePlayer () {
    if (game.player1) {
        game.player1 = false;
        game.player2 = true;
    }
    else {
        game.player1 = true;
        game.player2 = false;
    }
}

const createGameBoard = (function (){
    const main = document.getElementById("gameboard");
    main.classList.add("gameboard");

    game.gameStart = true;
    const gameArray = game.gameboard;

    for (let i = 0; i < gameArray.length; i++) { // create cells for the gameboard
        const gameboardCell = document.createElement("DIV");
        gameboardCell.setAttribute("data-cell", i);
        gameboardCell.classList.add("gamecell");


         gameboardCell.addEventListener("click", play)


        main.appendChild(gameboardCell);

    }
});

function playerChoice () {
    const cell = this.getAttribute("data-cell");
     const player1 = game.player1;
     const player2 = game.player2;

    let playerMark = "";
if (gameStart && game.playCount <= 9){
    if (player1 && !player2) {
        playerMark = "X";
    }
    else if (player2 && !player1) {
        playerMark = "O";
    }

    if (game.player2name == "CPU" && player2 && !player1) {
        setTimeout(cpuPlayer(playerMark), 2000)
        game.playCount++;
    }

    else {
     if(game.gameboard[cell] === "") {
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
        game.playCount++;
    

        }
    }
}
    win(playerMark)
}


const cpuPlayer = (playerMark) => {
    const cells = document.querySelectorAll(".gamecell");
if (game.gameStart && game.playCount <= 9){
            let isEmpty = false;
            let i = 0; 
          while (isEmpty === false){

          let random = Math.floor(Math.random() * 9);

              if (game.gameboard[random] === "") {
                  isEmpty = true;
                  game.gameboard[random] = playerMark;
                  cells[random].textContent = playerMark;
              }
              if (i >= 30) { //to stop infinite loop
                break;
              }
            console.log(isEmpty)
            console.log(random)
            i++;
        }
        
    }
    changePlayer();
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
    
    let victory = "";

    if (p === "X") { // check whats player make the last hit
        victory = "player 1 Wins"
    }
    else if (p === "O") {
        victory = "player 2 Wins"
    }

    if (game.gameStart && game.playCount <= 9){


    if (g[0] == p && g[1] == p && g[2] == p) { //Check if some line has the same mark
        console.log(victory);
        game.gameStart = false;
        restart();
    }
    else if (g[3] == p && g[4] == p && g[5] == p) {
        console.log(victory);
        game.gameStart = false;
        restart();
    }
    else if (g[6] == p && g[7] == p && g[8] == p) {
        console.log(victory);

        game.gameStart = false;        
        restart();
    }
    else if (g[0] == p && g[3] == p && g[6] == p) {
        console.log(victory);
        game.gameStart = false;
        restart();
    }
    else if (g[1] == p && g[4] == p && g[7] == p) {
        console.log(victory);
        game.gameStart = false;
        restart();
    }
    else if (g[2] == p && g[5] == p && g[8] == p) {
        console.log(victory);
        game.gameStart = false;
        restart();
    }
    else if (g[0] == p && g[4] == p && g[8] == p) {
        console.log(victory);
        game.gameStart = false;
        restart();
    }
    else if (g[2] == p && g[4] == p && g[6] == p) {
        console.log(victory);
        game.gameStart = false;
        restart();
    }
    else{
        if (g[0] && g[1] && g[2] && g[3] && g[4] && g[5] &&
            g[6] && g[7] && g[8]){
        console.log("Draw")
        restart();
    }

}
}
}