var zoneDeJEu = document.querySelector('.zoneDeJeu');


// générer les lignes et les cartes

const creerElements = () => {
    for (var i = 0; i < 8; i++) {
        let ligne = document.createElement('div');
        ligne.className = "ligne"
        zoneDeJEu.appendChild(ligne);

        for (var j = 0; j < 8; j++) {
        let carte = document.createElement('div');
        carte.className = "carte";
        carte.classList.add("x"+i);
        carte.classList.add("y"+j);
        ligne.appendChild(carte);
    }
    }
}

// générer les images dans les cartes + vérif qu'il n'y ai pas 3 images identiques à la suite

const inserImage = (lignes) => {
    // var cartes = document.querySelectorAll('.carte');
    var tableau = [];
    var tabLigne = [];
    for (let j = 0; j < lignes.length; j++) {
        for (let i = 0; i < 8; i++) {
            var image = document.createElement('img');
            let nbRandom = Math.ceil(Math.random() * 8);
            //vérifie si les lignes i-1 et i-2 existent
            if(lignes[j-1] && lignes[j-2]){
                //si elles existent on vérifie que les 3 images d'une même colonne ne soient pas identiques sinon on génère un nouveau nombre aléatoire
                while(lignes[j-1].childNodes[i].childNodes[0].className == nbRandom && lignes[j-2].childNodes[i].childNodes[0].className == nbRandom){
                    nbRandom = Math.ceil(Math.random() * 8);
                }
            }
            if(lignes[j].childNodes[i-1]?.childNodes && lignes[j].childNodes[i-2]?.childNodes) {
                while(lignes[j].childNodes[i-1].childNodes[0].className == nbRandom && lignes[j].childNodes[i-2].childNodes[0].className == nbRandom){
                    nbRandom = Math.ceil(Math.random() * 8);
                }
            }
            image.className = nbRandom;
            tabLigne.push(nbRandom);
            image.src = "assets/"+nbRandom+".svg";
            lignes[j].childNodes[i].appendChild(image);
        }
        tableau.push(tabLigne);
        tabLigne = [];
    }   
    console.log(tableau);
    
}

// fonction qui lance le jeu
const start = () => {
    creerElements();
    var lignes = document.querySelectorAll('.ligne');
    inserImage(lignes)
};
start(); 


var cartes = document.querySelectorAll('.carte');
var tableauCoordonnees = [];

// permet le switch des cartes
cartes.forEach((carte) => {
    carte.onclick = () => {
        var selected = document.querySelectorAll('.selected');
        if(selected.length < 2){
            carte.classList.add('selected')
            let carteX = carte.classList[1];
            carteX = carteX.split("x")[1];
            let carteY = carte.classList[2];
            carteY = carteY.split("y")[1];
            tableauCoordonnees.push(carteX)
            tableauCoordonnees.push(carteY)
            console.log(tableauCoordonnees);
            if(tableauCoordonnees.length>2){
                if (tableauCoordonnees[0] == tableauCoordonnees[2] && tableauCoordonnees[1] == tableauCoordonnees[3]) {
                    tableauCoordonnees.pop();
                    tableauCoordonnees.pop();
                } else if(tableauCoordonnees[0] == tableauCoordonnees[2] && (tableauCoordonnees[1]-tableauCoordonnees[3])*(tableauCoordonnees[1]-tableauCoordonnees[3]) == 1){
                    console.log("ok");
                } else if(tableauCoordonnees[1] == tableauCoordonnees[3] && (tableauCoordonnees[0]-tableauCoordonnees[2])*(tableauCoordonnees[0]-tableauCoordonnees[2]) == 1) {
                    console.log("ok");
                } else {
                    carte.classList.remove("selected")
                    tableauCoordonnees.pop();
                    tableauCoordonnees.pop();
                    console.log("pas ok");
                }      
            } 
        }
        // switch les 2 cartes
        if(selected[0].childNodes[0].classList){
            var tempClassName = selected[0].childNodes[0].className;
            var tempSrc = selected[0].childNodes[0].src;
        }
        if(selected[1].childNodes[0].classList){
            selected[0].childNodes[0].className = selected[1].childNodes[0].className;
            selected[0].childNodes[0].src = selected[1].childNodes[0].src;
            selected[1].childNodes[0].className = tempClassName;
            selected[1].childNodes[0].src = tempSrc;
            selected.forEach(s => {
                s.classList.remove('selected');
            })
            cartesAligned();
        }
    }
})

// fonction pour vérifier si 3 cartes ou plus (max 5) sont identiques à la suite
// ce qui veut dire pour une carte choisie : on regarde son img puis les img des cartes x-1/y x-2/y x+1/y x+2/y et y-1/x y-2/x y+1/x y+2/x
const cartesAligned = () => {
    var lignes = document.querySelectorAll('.ligne');
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(lignes[i].childNodes[j+4]){
              if( lignes[i].childNodes[j].childNodes[0].className == lignes[i].childNodes[j+1].childNodes[0].className &&
                lignes[i].childNodes[j].childNodes[0].className == lignes[i].childNodes[j+2].childNodes[0].className &&
                lignes[i].childNodes[j].childNodes[0].className == lignes[i].childNodes[j+3].childNodes[0].className &&
                lignes[i].childNodes[j].childNodes[0].className == lignes[i].childNodes[j+4].childNodes[0].className) {
                    lignes[i].childNodes[j].classList.add('aligned')
                    lignes[i].childNodes[j+1].classList.add('aligned')
                    lignes[i].childNodes[j+2].classList.add('aligned')
                    lignes[i].childNodes[j+3].classList.add('aligned')
                    lignes[i].childNodes[j+4].classList.add('aligned')
                }  
            }
            if (lignes[i].childNodes[j+3]) {
               if( lignes[i].childNodes[j].childNodes[0].className == lignes[i].childNodes[j+1].childNodes[0].className &&
                    lignes[i].childNodes[j].childNodes[0].className == lignes[i].childNodes[j+2].childNodes[0].className &&
                    lignes[i].childNodes[j].childNodes[0].className == lignes[i].childNodes[j+3].childNodes[0].className ) {
                        lignes[i].childNodes[j].classList.add('aligned')
                        lignes[i].childNodes[j+1].classList.add('aligned')
                        lignes[i].childNodes[j+2].classList.add('aligned')
                        lignes[i].childNodes[j+3].classList.add('aligned')
                    } 
            }
            if(lignes[i].childNodes[j+2]){
                if( lignes[i].childNodes[j].childNodes[0].className == lignes[i].childNodes[j+1].childNodes[0].className &&
                    lignes[i].childNodes[j].childNodes[0].className == lignes[i].childNodes[j+2].childNodes[0].className ) {
                        lignes[i].childNodes[j].classList.add('aligned')
                        lignes[i].childNodes[j+1].classList.add('aligned')
                        lignes[i].childNodes[j+2].classList.add('aligned')
                    }
            }
                
                    
        }
    }
}
