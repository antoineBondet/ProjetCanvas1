import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import ObjetSouris from "./ObjetSouris.js";
import { rectsOverlap } from "./collisions.js";
import { initListeners } from "./ecouteurs.js";
import Arrivee from "./Arrivee.js";
import ObstacleAnime from "./ObstacleAnime.js";

export default class Game {
    objetsGraphiques = [];

    constructor(canvas) {
        this.canvas = canvas;
        // etat du clavier
        this.inputStates = {
            mouseX: 0,
            mouseY: 0,
        };
        this.Niv = 1;
    }

    async init(canvas) {
        this.ctx = this.canvas.getContext("2d");

        this.player = new Player(175, 100);
        this.objetsGraphiques.push(this.player);

        // Un objert qui suite la souris, juste pour tester
        this.objetSouris = new ObjetSouris(200, 200, 25, 25, "orange");
        this.objetsGraphiques.push(this.objetSouris);
        
        // On cree deux obstacles
        let obstacle1 = new Obstacle(350, 0, 40, 500, "green");
        this.objetsGraphiques.push(obstacle1);
        
        // On ajoute la sortie
        this.sortie = new Arrivee(600, 100);
        this.objetsGraphiques.push(this.sortie);
        
        

            

        // On initialise les écouteurs de touches, souris, etc.
        initListeners(this.inputStates, this.canvas);

        console.log("Game initialisé");
    }

    start() {
        console.log("Game démarré");

        // On démarre une animation à 60 images par seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop() {
        // 1 - on efface le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 2 - on dessine les objets à animer dans le jeu
        // ici on dessine le monstre
        this.drawAllObjects();

        // 3 - On regarde l'état du clavier, manette, souris et on met à jour
        // l'état des objets du jeu en conséquence
        this.update();

        // 4 - on demande au navigateur d'appeler la fonction mainAnimationLoop
        // à nouveau dans 1/60 de seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    drawAllObjects() {
        // Dessine tous les objets du jeu
        this.objetsGraphiques.forEach(obj => {
            obj.draw(this.ctx);
        });
    }

    update() {
        // Appelée par mainAnimationLoop
        // donc tous les 1/60 de seconde
        
        // Déplacement du joueur. 
        this.movePlayer();

        // on met à jouer la position de objetSouris avec la position de la souris
        // Pour un objet qui "suit" la souris mais avec un temps de retard, voir l'exemple
        // du projet "charQuiTire" dans le dossier COURS
        this.objetSouris.x = this.inputStates.mouseX;
        this.objetSouris.y = this.inputStates.mouseY;

        // on met à jour tous les objets
        this.updateAllObjects();
    }

    updateAllObjects() {
        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof ObstacleAnime) {
                obj.update(this.canvas);
            }
        });
        this.testCollisionPlayerObstacles();
    }

    movePlayer() {
        this.player.vitesseX = 0;
        this.player.vitesseY = 0;
        
        if(this.inputStates.ArrowRight) {
            this.player.vitesseX = 3;
        } 
        if(this.inputStates.ArrowLeft) {
            this.player.vitesseX = -3;
        } 

        if(this.inputStates.ArrowUp) {
            this.player.vitesseY = -3;
        } 

        if(this.inputStates.ArrowDown) {
            this.player.vitesseY = 3;
        } 

        this.player.move();

        this.testCollisionsPlayer();
    }

    testCollisionsPlayer() {
        // Teste collision avec les bords du canvas
        this.testCollisionPlayerBordsEcran();

        // Teste collision avec les obstacles
        this.testCollisionPlayerObstacles();
       
        // Teste si le joueur est arrivé à la sortie
        this.testSortie();
    }

    testCollisionPlayerBordsEcran() {
        // Raoppel : le x, y du joueur est en son centre, pas dans le coin en haut à gauche!
        if(this.player.x - this.player.w/1.8 < 0) {
            // On stoppe le joueur
            this.player.vitesseX = 0;
            // on le remet au point de contaxct
            this.player.x = this.player.w;
        }
        if(this.player.x + this.player.w/2 > this.canvas.width) {
            this.player.vitesseX = 0;
            // on le remet au point de contact
            this.player.x = this.canvas.width - this.player.w/2;
        }

        if(this.player.y - this.player.h/2 < 0) {
            this.player.y = this.player.h/2;
            this.player.vitesseY = 0;

        }
       
        if(this.player.y + this.player.h/2 > this.canvas.height) {
            this.player.vitesseY = 0;
            this.player.y = this.canvas.height - this.player.h/2;
        }
    }

    testCollisionPlayerObstacles() {
        this.objetsGraphiques.forEach(obj => {
            if(obj instanceof Obstacle || obj instanceof ObstacleAnime) {
                if(rectsOverlap(this.player.x - this.player.w / 2, this.player.y - this.player.h / 2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    // collision
    
                    // ICI TEST BASIQUE QUI ARRETE LE JOUEUR EN CAS DE COLLIION.
                    // SI ON VOULAIT FAIRE MIEUX, ON POURRAIT PAR EXEMPLE REGARDER OU EST LE JOUEUR
                    // PAR RAPPORT A L'obstacle courant : il est à droite si son x est plus grand que le x de l'obstacle + la largeur de l'obstacle
                    // il est à gauche si son x + sa largeur est plus petit que le x de l'obstacle
                    // etc.
                    // Dans ce cas on pourrait savoir comment le joueur est entré en collision avec l'obstacle et réagir en conséquence
                    // par exemple en le repoussant dans la direction opposée à celle de l'obstacle...
                    // Là par défaut on le renvoie en x=10 y=10 et on l'arrête
                    console.log("Collision avec obstacle");
                    this.player.x = 10;
                    this.player.y = 10;
                    this.player.vitesseX = 0;
                    this.player.vitesseY = 0;
                }
            }
        });
    }

    // Fonction qui teste si le joueur est arrivé à la sortie
    testSortie() {
        if (this.sortie) {  // Vérifie si la sortie existe
            if (rectsOverlap(
                this.player.x - this.player.w / 2, this.player.y - this.player.h / 2,
                this.player.w, this.player.h,
                this.sortie.x, this.sortie.y, this.sortie.w, this.sortie.h
            )) {
                console.log("Le joueur a fini le niveau !");
                
                this.niveauSuivant(this.Niv);
                
            }
        }
    }
    
    niveauSuivant(Niv) {
        this.Niv++;
        console.log("Passage au niveau : ",this.Niv);

        this.objetsGraphiques = this.objetsGraphiques.filter(obj => obj instanceof Player || obj instanceof ObjetSouris);

        switch (this.Niv) {
        case 2:
            this.player.x = 100;
            this.player.y = 100;
            this.sortie = new Arrivee(650, 700);
            this.objetsGraphiques.push(this.sortie);
            let obstacle21 = new Obstacle(0, 250, 500, 50, "blue");
            this.objetsGraphiques.push(obstacle21);
            let obstacle22 = new Obstacle(750, 250, 100, 50, "blue");
            this.objetsGraphiques.push(obstacle22);
            let obstacle23 = new Obstacle(350, 550, 500, 50, "blue");
            this.objetsGraphiques.push(obstacle23);
            let obstacle24 = new Obstacle(0, 550, 100, 50, "blue");
            this.objetsGraphiques.push(obstacle24);
            break;
        case 3:
            this.player.x = 100;
            this.player.y = 100;
            this.sortie = new Arrivee(650, 600);
            this.objetsGraphiques.push(this.sortie);
            let obstacle31 = new Obstacle(250, 0, 40, 600, "violet");
            this.objetsGraphiques.push(obstacle31);
            let obstacle32 = new Obstacle(510, 200, 40, 600, "violet");
            this.objetsGraphiques.push(obstacle32);
            break;
            case 4 : 
            // niveau 4 avec obstacles animés
            this.player.x = 100;
            this.player.y = 100;
            this.sortie = new Arrivee(650, 600);
            this.objetsGraphiques.push(this.sortie);
            let obstacle41 = new ObstacleAnime(300, 0, 40, 300, "violet", 0, 1, "rebond");
            this.objetsGraphiques.push(obstacle41);
            let obstacle42 = new ObstacleAnime(510, 190, 40, 300, "violet", 0, 2, "rebond");
            this.objetsGraphiques.push(obstacle42);
            break;
            case 5 :
            // niveau 5 avec obstacles animés et obstacles statiques
            this.player.x = 100;
            this.player.y = 100;
            this.sortie = new Arrivee(650, 700);
            this.objetsGraphiques.push(this.sortie);
            let obstacle51 = new Obstacle(0, 250, 500, 50, "blue");
            this.objetsGraphiques.push(obstacle51);
            let obstacle52 = new Obstacle(750, 250, 100, 50, "blue");
            this.objetsGraphiques.push(obstacle52);
            let obstacle53 = new Obstacle(350, 550, 500, 50, "blue");
            this.objetsGraphiques.push(obstacle53);
            let obstacle54 = new Obstacle(0, 550, 100, 50, "blue");
            this.objetsGraphiques.push(obstacle54);
            let obstacle55 = new ObstacleAnime(250, 0, 40, 300, "violet", 0, 1, "rebond");
            this.objetsGraphiques.push(obstacle55);
            let obstacle56 = new ObstacleAnime(510, 190, 40, 300, "violet", 0, 1, "rebond");
            this.objetsGraphiques.push(obstacle56);
            break;
            case 6 :
            // niveau 6 avec obstacles différent du niveau 5(les coordonnées, taille, couleur peuvent changées) avec obstacles animés et obstacles statiques
            this.player.x = 100;
            this.player.y = 100;
            this.sortie = new Arrivee(650, 700);
            this.objetsGraphiques.push(this.sortie);
            let obstacle61 = new Obstacle(250, 0, 40, 600, "violet");
            this.objetsGraphiques.push(obstacle61);
            let obstacle62 = new Obstacle(510, 200, 40, 600, "violet");
            this.objetsGraphiques.push(obstacle62);
            let obstacle63 = new ObstacleAnime(0, 300, 250, 40, "blue", 1, 0, "rebond");
            this.objetsGraphiques.push(obstacle63);
            let obstacle64 = new ObstacleAnime(400, 550, 250, 40, "blue", 1, 0, "rebond");
            this.objetsGraphiques.push(obstacle64);


            break;
            default:
            console.log("Fin du jeu");
            this.objetsGraphiques = this.objetsGraphiques.filter(obj => obj instanceof Player || obj instanceof ObjetSouris);
            this.player.x = 100;
            this.player.y = 100;
            this.sortie = new Arrivee(650, 700);
            this.objetsGraphiques.push(this.sortie);
            // ecriture du mot "END" avec des obstacles
            // "E"
            let obstacle711 = new Obstacle(200, 300, 75, 25, "red");
            this.objetsGraphiques.push(obstacle711);
            let obstacle712 = new Obstacle(200, 350, 75, 25, "red");
            this.objetsGraphiques.push(obstacle712);
            let obstacle713 = new Obstacle(200, 400, 75, 25, "red");
            this.objetsGraphiques.push(obstacle713);
            let obstacle714 = new Obstacle(200, 300, 25, 125, "red");
            this.objetsGraphiques.push(obstacle714);
            // "N"
            let obstacle721 = new Obstacle(300, 325, 50, 25, "red");
            this.objetsGraphiques.push(obstacle721);
            let obstacle722 = new Obstacle(375, 375, 50, 25, "red");
            this.objetsGraphiques.push(obstacle722);
            let obstacle723 = new Obstacle(300, 300, 25, 125, "red");
            this.objetsGraphiques.push(obstacle723);
            let obstacle724 = new Obstacle(400, 300, 25, 125, "red");
            this.objetsGraphiques.push(obstacle724);
            let obstacle725 = new Obstacle(350, 350, 25, 25, "red");
            this.objetsGraphiques.push(obstacle725);
            // "D"
            let obstacle731 = new Obstacle(450, 300, 25, 125, "red");
            this.objetsGraphiques.push(obstacle731);
            let obstacle732 = new Obstacle(450, 300, 75, 25, "red");
            this.objetsGraphiques.push(obstacle732);
            let obstacle733 = new Obstacle(450, 400, 75, 25, "red");
            this.objetsGraphiques.push(obstacle733);
            let obstacle734 = new Obstacle(525, 325, 25, 75, "red");
            this.objetsGraphiques.push(obstacle734);


        }
        
    }
}
