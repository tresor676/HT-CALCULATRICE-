const size = 15;
const board = document.getElementById('board');
const players = ['red','blue','green','yellow'];
let currentPlayer = 0;
let diceValue = 0;

// Chemins Ludo officiels pour chaque joueur (indices simplifiés pour exemple)
const pathRed = [0,1,2,17,32,47,62,77,78,79,94,109,124,139,154,169,170,171,186,201];
const pathBlue = pathRed.map(x=>x); // pour simplifier, adapter pour chaque couleur
const pathGreen = pathRed.map(x=>x);
const pathYellow = pathRed.map(x=>x);

// Départ et arrivée
const startPositions = {
    red:[0,1,15,16],
    blue:[208,209,222,223],
    green:[224,225,239,240],
    yellow:[14,29,30,45]
};
const finishLine = { red:201, blue:202, green:203, yellow:204 };

// Positions des pions
let pawns = { red:[0,0,0,0], blue:[0,0,0,0], green:[0,0,0,0], yellow:[0,0,0,0] };

// Créer plateau
for(let i=0;i<size*size;i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id='cell-'+i;
    board.appendChild(cell);
}

// ------------------ LOGIQUE JEU ------------------
function rollDice(){
    diceValue = Math.floor(Math.random()*6)+1;
    document.getElementById('dice').textContent='Dé: '+diceValue;

    let movable = getMovablePawns(players[currentPlayer]);
    if(movable.length===0){
        alert("Pas de pion à déplacer, tour suivant!");
        nextPlayer();
        return;
    }

    let choice = prompt("Choisis le pion à déplacer (0-3): "+movable.join(","));
    choice = parseInt(choice);
    if(movable.includes(choice)){
        movePawn(players[currentPlayer],choice,diceValue);
        drawPawns();
        checkVictory(players[currentPlayer]);
        if(diceValue!==6) nextPlayer();
        else alert("Vous avez fait un 6! Rejouez.");
    } else {
        alert("Choix invalide, tour perdu!");
        nextPlayer();
    }
}

function getMovablePawns(player){
    let arr=[];
    for(let i=0;i<4;i++){
        if(pawns[player][i]===0 && diceValue===6) arr.push(i);
        else if(pawns[player][i]>0 && pawns[player][i]<finishLine[player]) arr.push(i);
    }
    return arr;
}

function movePawn(player,index,steps){
    if(pawns[player][index]===0) pawns[player][index]=startPositions[player][index];
    else pawns[player][index]+=steps;

    // Capture pions adverses
    for(let other of players){
        if(other!==player){
            for(let j=0;j<4;j++){
                if(pawns[other][j]===pawns[player][index]) pawns[other][j]=0;
            }
        }
    }

    if(pawns[player][index]>=finishLine[player]) pawns[player][index]=finishLine[player];
}

function drawPawns(){
    for(let i=0;i<size*size;i++) document.getElementById('cell-'+i).innerHTML='';
    for(let p of players){
        for(let i=0;i<4;i++){
            if(pawns[p][i]>0){
                let cell=document.getElementById('cell-'+pawns[p][i]);
                let pawn=document.createElement('div');
                pawn.classList.add(p);
                cell.appendChild(pawn);
            }
        }
    }
}

function nextPlayer(){
    currentPlayer=(currentPlayer+1)%4;
    document.getElementById('info').textContent="Joueur "+players[currentPlayer].toUpperCase()+" joue";
}

function checkVictory(player){
    if(pawns[player].every(pos=>pos===finishLine[player])){
        alert("Le joueur "+player.toUpperCase()+" a gagné!");
        resetGame();
    }
}

function resetGame(){
    for(let p of players) pawns[p]=[0,0,0,0];
    currentPlayer=0;
    drawPawns();
}

drawPawns();
