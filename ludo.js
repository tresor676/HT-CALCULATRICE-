// ---------------- CONFIGURATION ----------------
const size = 15;
const board = document.getElementById('board');
const players = ['red','blue','green','yellow'];
let currentPlayer = 0;
let diceValue = 0;

// Zones départ simplifiées pour chaque joueur
const startPositions = {
    red:[0,1,15,16],
    blue:[208,209,222,223],
    green:[224,225,239,240],
    yellow:[14,29,30,45]
};

// Zones d'arrivée simplifiées
const finishLine = { red:201, blue:202, green:203, yellow:204 };

// Positions des pions
let pawns = {
    red:[0,0,0,0],
    blue:[0,0,0,0],
    green:[0,0,0,0],
    yellow:[0,0,0,0]
};

// ---------------- CREER PLATEAU ----------------
for(let i=0;i<size*size;i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = 'cell-'+i;
    cell.style.display='flex';
    cell.style.justifyContent='center';
    cell.style.alignItems='center';
    board.appendChild(cell);
}

// ---------------- NOTIFICATIONS ----------------
function showNotification(msg){
    const notif = document.getElementById('notification');
    if(notif){
        notif.textContent = msg;
    } else {
        console.log(msg);
    }
}

// ---------------- LOGIQUE DU JEU ----------------
function rollDice(){
    diceValue = Math.floor(Math.random()*6)+1;
    document.getElementById('dice').textContent = 'Dé: '+diceValue;
    showNotification("Joueur "+players[currentPlayer].toUpperCase()+" lance le dé");

    let movable = getMovablePawns(players[currentPlayer]);
    if(movable.length === 0){
        showNotification("Pas de pion à déplacer, tour suivant!");
        nextPlayer();
        return;
    }

    let choice = prompt("Choisis le pion à déplacer (0-3): "+movable.join(","));
    choice = parseInt(choice);
    if(movable.includes(choice)){
        movePawn(players[currentPlayer], choice, diceValue);
        drawPawns();
        checkVictory(players[currentPlayer]);
        if(diceValue !== 6){
            nextPlayer();
        } else {
            showNotification("Vous avez fait un 6! Rejouez.");
        }
    } else {
        showNotification("Choix invalide, tour perdu!");
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

function movePawn(player, index, steps){
    if(pawns[player][index]===0){
        pawns[player][index] = startPositions[player][index];
    } else {
        pawns[player][index] += steps;
    }

    // Capture des pions adverses
    for(let other of players){
        if(other !== player){
            for(let j=0;j<4;j++){
                if(pawns[other][j] === pawns[player][index]){
                    pawns[other][j] = 0;
                    showNotification(player.toUpperCase()+" capture un pion de "+other.toUpperCase());
                }
            }
        }
    }

    // Vérifier arrivée
    if(pawns[player][index] >= finishLine[player]){
        pawns[player][index] = finishLine[player];
    }
}

// Afficher les pions
function drawPawns(){
    for(let i=0;i<size*size;i++){
        document.getElementById('cell-'+i).innerHTML='';
    }
    for(let p of players){
        for(let i=0;i<4;i++){
            if(pawns[p][i] > 0){
                const cell = document.getElementById('cell-'+pawns[p][i]);
                const pawn = document.createElement('div');
                pawn.classList.add(p);
                cell.appendChild(pawn);
            }
        }
    }
}

// Joueur suivant
function nextPlayer(){
    currentPlayer = (currentPlayer+1)%4;
    document.getElementById('info').textContent = "Joueur "+players[currentPlayer].toUpperCase()+" joue";
}

// Vérifier victoire
function checkVictory(player){
    if(pawns[player].every(pos => pos === finishLine[player])){
        showNotification("Le joueur "+player.toUpperCase()+" a gagné!");
        resetGame();
    }
}

// Réinitialiser le jeu
function resetGame(){
    for(let p of players) pawns[p]=[0,0,0,0];
    currentPlayer = 0;
    drawPawns();
    showNotification("Nouvelle partie commencée!");
}

drawPawns();
