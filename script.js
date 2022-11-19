const game = (function () {
    let gameboard = ["","","","","","","","",""]

    let gameStart = false;

    let player1 = false;
    let player2 = false;
    let draw = false; 

    let cpu = false; // check if player 2 is cpu
    let playCount = 0; // check the number of mark
    const player1name = "";
    const player2name = "";
    return {gameboard, gameStart, player1, player2, player1name, player2name, playCount, cpu, draw};
})();

const playerNames = () => {
    const p1 = document.querySelector(".player1");
    const p2 = document.querySelector(".player2");

    p1.textContent = game.player1name;
    p2.textContent = game.player2name;
}

const activePlayer = (winner) => {
    const p1turn = document.querySelector(".player1-turn");
    const p2turn = document.querySelector(".player2-turn");
    if (!game.player1 && game.player2 && game.gameStart) {
        p1turn.textContent = "Your Turn";
        p2turn.textContent = "";
    }
    else if(!game.player2 && game.player1 && game.gameStart) {
        p1turn.textContent = "";
        p2turn.textContent = "Your Turn";
    }

    if (!game.gameStart) {
        if (game.draw) {
            p1turn.textContent = "DRAW!";
            p2turn.textContent = "DRAW!";
        }
        else if (winner === "Player 1 Wins") {
            p1turn.textContent = "WINNER";
            p2turn.textContent = "";
        }
        else if(winner === "Player 2 Wins") {
            p1turn.textContent = "";
            p2turn.textContent = "WINNER";
        }

    }
}
const startButton = (function () {
    const main = document.getElementById("gameboard");
    const button = document.createElement("button");
    
    button.addEventListener("click", (e) => {
       
        game.player1name = prompt("Enter Your name", "Player1");
        game.player2name = prompt("Enter Your name (CPU for player2 computer)", "CPU");
        
        game.gameStart = true;
        if (game.player2name === "CPU") {
            game.cpu = true
        }
        createGameBoard()
        e.target.remove()
       
    })

    button.textContent = "Start Game"
    main.appendChild(button);
})();

function restart () {
    const main = document.getElementById("gameboard");
    const celldiv = document.querySelectorAll(".gamecell");
    const button = document.createElement("button");
    

    button.classList.add("button");
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


    if (arr[cell] != "" && game.player1) {
       console.log("WHAT")
        
    }
    else if (arr[cell] === "" && game.player2 && !game.cpu) {
        game.gameboard[cell] = playerMark;
        e.target.textContent = playerMark;
       activePlayer();
        changePlayer();
        win(playerMark);
        
        
    }
    else if (arr[cell] === "" && game.player1) {
        game.gameboard[cell] = playerMark;
        e.target.textContent = playerMark;
        activePlayer();
        changePlayer();
        win(playerMark);
        
    }
    
    else {
        console.log("Wait your turn")
    }
} else {
    console.log("Start the game")
}
  
    
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
    playerNames();
    game.draw = false;
    game.gameStart = true;
    activePlayer();
    randomStart(); // ramdom player order
   
    const gameArray = game.gameboard;



    for (let i = 0; i < gameArray.length; i++) { // create cells for the gameboard
        const gameboardCell = document.createElement("DIV");
        gameboardCell.setAttribute("data-cell", i);
        gameboardCell.classList.add("gamecell");


         gameboardCell.addEventListener("click", play)


        main.appendChild(gameboardCell);

    }

    if (game.player2 && game.cpu) {
        win();
    }

});

const cpuPlayer = (playerMark) => {
    const cells = document.querySelectorAll(".gamecell");
if (game.gameStart && game.playCount <= 9){
            let isEmpty = false;
            let i = 0; // to stop possible infinite loop
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
    activePlayer();
    changePlayer();
    win()
}

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
    let playerMark = "O"; // for cpu

    if (game.player2 && !game.player1) { // check what player make the last hit
        victory = "Player 1 Wins"
    }
    else if (game.player1 && !game.player2) {
        victory = "Player 2 Wins"
    }


    if (game.gameStart && game.playCount <= 9){

        if (game.player2 && game.cpu) { // cpu player
           let randomSpeed = Math.floor(Math.random() * 1500)
            setTimeout(() => {
                cpuPlayer(playerMark);
            }, randomSpeed);
            
        }


    if (g[0] == "X" && g[1] == "X" && g[2] == "X" || g[0] == "O" && g[1] == "O" && g[2] == "O") { //Check if some line has the same mark
        console.log(victory);
        game.gameStart = false;
        activePlayer(victory);
        restart();
    }
    else if (g[3] == "X" && g[4] == "X" && g[5] == "X" || g[3] == "O" && g[4] == "O" && g[5] == "O") {
        console.log(victory);
        game.gameStart = false;
        activePlayer(victory);
        restart();
    }
    else if (g[6] == "X" && g[7] == "X" && g[8] == "X" || g[6] == "O" && g[7] == "O" && g[8] == "O") {
        console.log(victory);

        game.gameStart = false;
        activePlayer(victory);  
        restart();
    }
    else if (g[0] == "X" && g[3] == "X" && g[6] == "X" || g[0] == "O" && g[3] == "O" && g[6] == "O") {
        console.log(victory);
        game.gameStart = false;
        activePlayer(victory);
        restart();
    }
    else if (g[1] == "X" && g[4] == "X" && g[7] == "X" || g[1] == "O" && g[4] == "O" && g[7] == "O") {
        console.log(victory);
        game.gameStart = false;
        activePlayer(victory);
        restart();
    }
    else if (g[2] == "X" && g[5] == "X" && g[8] == "X" || g[2] == "O" && g[5] == "O" && g[8] == "O") {
        console.log(victory);
        game.gameStart = false;
        activePlayer(victory);
        restart();
    }
    else if (g[0] == "X" && g[4] == "X" && g[8] == "X" || g[0] == "O" && g[4] == "O" && g[8] == "O") {
        console.log(victory);
        game.gameStart = false;
        activePlayer(victory);
        restart();
    }
    else if (g[2] == "X" && g[4] == "X" && g[6] == "X" || g[2] == "O" && g[4] == "O" && g[6] == "O") {
        console.log(victory);
        game.gameStart = false;
        activePlayer(victory);
        restart();
    }
    else{
        if (g[0] && g[1] && g[2] && g[3] && g[4] && g[5] &&
            g[6] && g[7] && g[8]){
        console.log("Draw")
        game.gameStart = false;
        activePlayer(victory);
        game.draw = true;
        restart();
    } else if (g[0] != "" && g[1] != "" && g[2] != "" && g[3] != "" && g[4] != "" && g[5] != "" &&
     g[6] != "" && g[7] != "" && g[8] != ""){
        console.log("Draw")
        game.gameStart = false;
        game.draw = true;
        activePlayer(victory);
        restart();
    }

}
}
}