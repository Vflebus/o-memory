const app = {
    nbRows: 4,
    nbCells: 9,
    fruits: ['pomme-rouge', 'banane', 'orange', 'citron-vert', 'grenade', 'abricot', 'citron-jaune', 'fraise', 'pomme-verte', 'peche', 'raisin', 'pasteque', 'prune', 'poire', 'cerise', 'framboise', 'mangue', 'cerise-jaune'],
    firstCell: '',
    secondCell: '',
    score: 0,
    cardRevealed: false,
    timerStart: 0,
    timerEnd: 0,
    timer: undefined,
    apiUrl: 'http://localhost:3000/',

    createGrid: function() {
        const grid = document.getElementById('grid');

        // On initialise un tableau qui permettra plus tard de s'assurer qu'un fruit n'est pas présent plus de deux fois dans notre grille. compteFruits[x] correspond au nombre de fois où fruits[x] a été placé dans la grille.
        const compteFruits = [];
        for (i=0; i<app.fruits.length; i++){
            // On ajoute à compteFruits autant de cases qu'il y a de fruits
            compteFruits.push(0);
        }

        // Notre grille est composée de plusieurs lignes contenant chacune plusieurs cases.
        for (rowIndex=0; rowIndex<app.nbRows; rowIndex++){
            const line = document.createElement('div');
            line.classList.add('line');
            for(cellIndex=0; cellIndex<app.nbCells; cellIndex++){
                const cell = document.createElement('div');
                cell.classList.add('cell');

                let endLoop = false;
                while (!endLoop){
                    // On choisit un fruit à assigner en piochant au hasard dans le tableau fruits. Si le fruit choisi a déjà été placé deux fois dans la grille, on en choisit un autre. 

                    // Renvoie un indice aléatoire du tableau
                    const assignedFruit = Math.floor(Math.random() * app.fruits.length);

                    if(compteFruits[assignedFruit] < 2){ 
                        cell.fruit = app.fruits[assignedFruit];
                        compteFruits[assignedFruit]++;
                        endLoop = true;
                    }
                }

                cell.addEventListener('click', app.revealCard);

                const logo = document.createElement('img');
                logo.setAttribute('src', './assets/logo.png');
                logo.classList.add('logo');
                cell.appendChild(logo);

                line.appendChild(cell);
            }
            grid.appendChild(line);
        }
    },

    revealCard: function() {
        // Dans ce contexte, this correspond à la cellule qui a appelé la fonction
        this.classList.toggle(this.fruit);
        this.classList.toggle('cell-reversed');
        this.querySelector('.logo').classList.toggle('hidden');
        if(!app.cardRevealed){
            app.firstCell = this;
            app.cardRevealed = true;
        } else {
            if(app.firstCell == this){
                app.firstCell = '';
            } else {
                app.secondCell = this;
                app.compareFruits();
            }
            app.cardRevealed = false;
        }
    },

    compareFruits: function() {
        document.querySelector('#grid').style.pointerEvents = "none";
        if(app.firstCell.fruit == app.secondCell.fruit){
            app.score++;
            app.firstCell.removeEventListener('click', app.revealCard);
            app.secondCell.removeEventListener('click', app.revealCard);
            document.querySelector('#grid').style.pointerEvents = "auto";
            if(app.score == 1){
                app.gameWon();
            }
        } else {
            window.setTimeout(() => {
                app.firstCell.classList.toggle(app.firstCell.fruit);
                app.firstCell.classList.toggle('cell-reversed');
                app.firstCell.querySelector('.logo').classList.toggle('hidden');
                app.secondCell.classList.toggle(app.secondCell.fruit);
                app.secondCell.classList.toggle('cell-reversed');
                app.secondCell.querySelector('.logo').classList.toggle('hidden');
                document.querySelector('#grid').style.pointerEvents = "auto";
            }, 750)
        }
    },

    startTimer: function() {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.removeEventListener('click', app.startTimer);
        });
        document.querySelector('.timer-bar').classList.add('timer-animation');
        app.timer = window.setTimeout(app.gameLost, 30000);
        app.timerStart = Date.now();
    },

    gameLost: function() {
        window.alert("Et c'est perduuuuuu !");
        document.querySelectorAll('.cell').forEach(cell => {
            cell.removeEventListener('click', app.revealCard);
        });
    },

    gameWon: async () => {
        app.timerEnd = Date.now();
        const time = (app.timerEnd - app.timerStart)/1000;
        document.querySelector('.timer-bar').classList.add('paused');
        clearTimeout(app.timer);
        let pseudo = window.prompt(`Vous avez gagné !!! temps: ${time} secondes ! Entrez votre pseudo pour le leaderboard !!`);

        // Si un pseudo est entré, on envoie le temps et le pseudo en base de données avec fetch
        if (pseudo){
            const data = {name: pseudo, time: time}
            await fetch(app.apiUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
        }
    },

    init: function() {
        app.createGrid();
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', app.startTimer);
        });
    }
}
app.init();