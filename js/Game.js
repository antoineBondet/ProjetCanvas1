export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
    }

   async init(canvas) {
        this.ctx = this.canvas.getContext("2d");

        console.log("Game initialisé");
    }

    start() {
        console.log("Game démarré");
        /*
        //this.drawGrid(10, 10, "red", 5);

        // on dessine un rectangle rouge (la couleur = syntaxe CSS)
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(10, 10, 100, 100);

        // on dessine un rectangle vert
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(120, 10, 150, 10);
        this.ctx.fillRect(120, 100, 10, 150);

        // utilsation de la fonction drawCircleImmediat
        this.drawCircleImmediat(500, 200, 200, "blue");

        // un rectangle en fil de fer, on remplac "fill" par "stroke"
        this.ctx.strokeStyle = "blue";
        this.ctx.lineWidth = 5;
        this.ctx.strokeRect(10, 120, 100, 100);

        // un arc de cercle, nous ne sommes plus en mode "direct"
        // mais en mode "bufferise" ou comme le nomme l'API
        // en mode "path"

        this.ctx.beginPath();
        this.ctx.arc(200, 200, 50, 0, Math.PI * 2);
        // un autre cercle plus petit, mais de 0 à PI seulement 
        this.ctx.arc(500, 200, 40, 0, Math.PI);

        // Pour ordonner le dessin, utilise la méthode
        // ctx.fill() ou ctx.stroke() qui dessineront tout
        // ce qui est bufferise (c'est à dire "dans le path/chemin");
        this.ctx.fill();
        this.ctx.stroke();

        // Même exemple mais avec deux cercles "bien séparés", pour cela
        // il faut utiliser beginPath() pour "vider" le path entre
        // les deux dessins
        this.ctx.fillStyle = "yellow";

        this.ctx.beginPath();
        this.ctx.arc(200, 100, 50, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(500, 400, 40, 0, Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.stroke();
        */
        // dessine le monstre (le joueur)
        this.drawMonstre(500, 100);

        // On démarre une animation à 60 images par seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    x = 400;
    mainAnimationLoop() {
        // 1 - on efface le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 2 - on dessine les objets à animer dans le jeu
        // ici on dessine le monstre
        this.drawMonstre(this.x, 100);

        // 3 - On regarde l'état du clavier, manette, souris et on met à jour
        // l'état des objets du jeu en conséquence
        //this.update();

        // 4 - on demande au navigateur d'appeler la fonction mainAnimationLoop
        // à nouveau dans 1/60 de seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    update() {
        this.x += 10;
        if (this.x > this.canvas.width) {
            this.x = 0;
        }
    }

    drawCircleImmediat(x, y, r, color) {
        // BONNE PRATIQUE : on sauvegarde le contexte
        // des qu'une fonction ou un bout de code le modifie
        // couleur, épaisseur du trait, systeme de coordonnées etc.
        this.ctx.save();

        // AUTRE BONNE PRATIQUE : on dessine toujours
        // en 0, 0 !!!! et on utilise les transformations
        // géométriques pour placer le dessin, le tourner, le rescaler
        // etc.
        this.ctx.fillStyle = color;
        this.ctx.beginPath();

        // on translate le systeme de coordonnées pour placer le cercle
        // en x, y
        this.ctx.translate(x, y);     
        this.ctx.arc(0, 0, r, 0, Math.PI * 2);
        this.ctx.fill();

        // on restore le contexte à la fin
        this.ctx.restore();
    }

    drawGrid(nbLignes, nbColonnes, couleur, largeurLignes) {
        // dessine une grille de lignes verticales et horizontales
        // de couleur couleur
        this.ctx.save();

        this.ctx.strokeStyle = couleur;
        this.ctx.lineWidth = largeurLignes;

        let largeurColonnes = this.canvas.width / nbColonnes;
        let hauteurLignes = this.canvas.height / nbLignes;

        this.ctx.beginPath();

        // on dessine les lignes verticales
        for (let i = 1; i < nbColonnes; i++) {
            this.ctx.moveTo(i * largeurColonnes, 0);
            this.ctx.lineTo(i * largeurColonnes, this.canvas.height);
        }

        // on dessine les lignes horizontales
        for (let i = 1; i < nbLignes; i++) {
            this.ctx.moveTo(0, i * hauteurLignes);
            this.ctx.lineTo(this.canvas.width, i * hauteurLignes);
        }

        // gpu call pour dessiner d'un coup toutes les lignes
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawMonstre(x, y) {
        // Ici on dessine un monstre
        this.ctx.save();
        /*
        let  xScale= 1;
        let  yScale= 1;
        this.Updatescale(xScale, yScale);
        */
       this.ctx.scale(0.7, 0.7);
        // on déplace le systeme de coordonnées pour placer
        // le monstre en x, y.Tous les ordres de dessin
        // dans cette fonction seront par rapport à ce repère
        // translaté
        this.ctx.translate(x, y);
        //this.ctx.rotate(0.3);
        //this.ctx.scale(0.5, 0.5);

        // tete du monstre
        this.drawTete();
        
        
        
        //bouches + dents
         this.drawBouches();

        //oreilles
        this.drawOreilles();
        // yeux
        this.drawYeux();
    
        //queue
        this.drawQueue();

        // corps
        this.drawCorps();

        // Les jambes
        this.drawJambesDevant();
        this.drawJambesArriere1();
        this.drawJambesArriere2();

        //pieds
        this.drawOmbreJambes();

        //pieds
        this.drawPieds();

        // restore
        this.ctx.restore();
    }
    drawTete(){
        this.ctx.save();
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(0, 0, 200, 50);
        this.ctx.restore();
    }
    drawYeux(){
        this.ctx.save();
        this.drawCircleImmediat(20, 20, 14, "black");
        this.drawCircleImmediat(20, 20, 10, "white");
        this.drawCircleImmediat(20, 20, 6, "black");
        this.ctx.restore();
    }
    drawQueue(){
        this.ctx.save();
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.moveTo(-250, 90);
        this.ctx.lineTo(-350,230);
        this.ctx.lineTo(-350, 60);
        this.ctx.fill();
        this.ctx.fillRect(-350, 60, 60, 20);
        this.ctx.restore();
    }
    drawCorps(){
        this.ctx.save();

        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(10,60, -300,100);
        //crainieres
        this.drawCrainieres();
        this.ctx.restore();
        
    }
    drawCrainieres(){
        this.ctx.save();
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.moveTo(-40, 60);
        this.ctx.lineTo(0, 8);
        this.ctx.lineTo(0, 60);
        this.ctx.fill();
        this.ctx.restore();
        
    }
    drawOreilles(){
        this.ctx.save();
        this.ctx.fillStyle = "black";
        //triangle gauche
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(20, -40);
        this.ctx.lineTo(30, 0);
        this.ctx.fill();
        //triangle droit
        this.ctx.beginPath();
        this.ctx.moveTo(80, 0);
        this.ctx.lineTo(60, -40);
        this.ctx.lineTo(50, 0);
        this.ctx.fill();

        
        this.ctx.restore();
    }
    drawBouches(){
        this.ctx.save();
        //je veux bouger que la fonction bouche, ouvre la bouche et ferme la bouche
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.moveTo(0, 50);
        
        this.ctx.rotate(0.3 + Math.sin(Date.now() * 0.01) * 0.1);
        

        
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(10, 20, 200, 50);
        //dents
        this.drawDents();
        this.ctx.restore();
    }
    drawDents(){
        this.ctx.save();
        this.ctx.rotate(-0.2 + Math.sin(Date.now() * 0.001) * 0.01);
        this.ctx.fillStyle = "white";
        //dents gauche
        this.ctx.beginPath();
        this.ctx.moveTo(140, 50);
        this.ctx.lineTo(108,40);
        this.ctx.lineTo(130, 20);
        this.ctx.fill();
        //dents droite
        this.ctx.beginPath();
        this.ctx.moveTo(140, 50);
        this.ctx.lineTo(160,20);
        this.ctx.lineTo(170, 55);
        this.ctx.fill();
        //dents bas
        this.ctx.beginPath();
        this.ctx.moveTo(170, 55);
        this.ctx.lineTo(190,20);
        this.ctx.lineTo(200, 60);
        this.ctx.fill();



        this.ctx.restore();
    }
    drawJambesDevant(){
        this.ctx.save();
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(10, 160, -30, 125);
        this.ctx.fillRect(-260, 160, -30, 125);
        //pieds
        //this.drawPieds();
        this.ctx.restore();
    }
    drawOmbreJambes(){
        this.ctx.save();
        this.ctx.fillStyle = "#515558";
        this.ctx.beginPath();
        this.ctx.moveTo(-290, 160);
        this.ctx.lineTo(-290,220);
        this.ctx.lineTo(-190, 160);
        this.ctx.fill();
        this.ctx.restore();
    }
    drawJambesArriere1(){
        this.ctx.save();
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(-190, 160, -30, 125);        
       
        //pieds
        //this.drawPieds();
        this.ctx.restore();
    }
    drawJambesArriere2(){
        this.ctx.save();
        this.ctx.fillStyle = "#515558";
        
        this.ctx.fillRect(-60, 160, -30, 125);
       
        //pieds
        //this.drawPieds();
        this.ctx.restore();
    }

    
    drawPieds(){
        this.ctx.save();
        this.ctx.fillStyle = "black";
        //pieds 1
        this.ctx.beginPath();
        this.ctx.moveTo(-260, 260);
        this.ctx.lineTo(-230,285);
        this.ctx.lineTo(-260, 285);
        this.ctx.fill();

        //pieds 2
        this.ctx.beginPath();
        this.ctx.moveTo(-190, 260);
        this.ctx.lineTo(-160,285);
        this.ctx.lineTo(-190, 285);
        this.ctx.fill();

        //pieds 3
        this.ctx.beginPath();
        this.ctx.moveTo(-60, 260);
        this.ctx.lineTo(-30,285);
        this.ctx.lineTo(-60, 285);
        this.ctx.fill();

        //pieds 4
        this.ctx.beginPath();
        this.ctx.moveTo(10, 260);
        this.ctx.lineTo(40,285);
        this.ctx.lineTo(10, 285);
        this.ctx.fill();
        this.ctx.restore();
    }
  /*  
Updatescale(xScale, yScale) {
    this.ctx.save();
    this.drawCorps.ctx.scale(xScale, yScale);
    this.drawBouches.ctx.scale(xScale, yScale);
    this.drawCorps.ctx.scale(xScale, yScale);
    this.drawJambesDevant.ctx.scale(xScale, yScale);
    this.drawJambesArriere1.ctx.scale(xScale, yScale);
    this.drawJambesArriere2.ctx.scale(xScale, yScale);
    this.drawOmbreJambes.ctx.scale(xScale, yScale);
    this.drawPieds.ctx.scale(xScale, yScale);
    this.drawOreilles.ctx.scale(xScale, yScale);
    this.drawYeux.ctx.scale(xScale, yScale);
    this.drawQueue.ctx.scale(xScale, yScale);
    this.drawTete.ctx.scale(xScale, yScale);
    this.ctx.restore();
    }*/
}