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
                if(tableauCoordonnees[0] == tableauCoordonnees[2]){
                    if((tableauCoordonnees[1]-tableauCoordonnees[3])*(tableauCoordonnees[1]-tableauCoordonnees[3]) == 1) {
                        console.log("ok");
                    } else {
                        carte.classList.remove("selected")
                        tableauCoordonnees.pop();
                        tableauCoordonnees.pop();
                    }
                }
            }
        }
    }
})


        
