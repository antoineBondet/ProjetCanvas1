import ObjectGraphique from "./ObjectGraphique.js";
import { drawCircleImmediat } from "./utils.js";   

export default class Player extends ObjectGraphique {
    constructor(x, y) {
        super(x, y, 50, 50);
        this.vitesseX = 0;
        this.vitesseY = 0;
        this.couleur = "pink";
        this.angle = 0;
    }
   
    draw(ctx) {
        ctx.save();
        //ctx.scale(0.5, 0.5);
        ctx.translate(this.x, this.y);
        
        ctx.rotate(this.angle);
        
        this.drawTete(ctx);
        this.drawBouches(ctx);
        this.drawOreilles(ctx);
        this.drawYeux(ctx);
        this.drawQueue(ctx);
        this.drawCorps(ctx);
        this.drawJambesDevant(ctx);
        this.drawJambesArriere1(ctx);
        this.drawJambesArriere2(ctx);
        this.drawOmbreJambes(ctx);
        this.drawPieds(ctx);

        ctx.restore();
        super.draw(ctx);
    }

    drawTete(ctx) {
        ctx.save();
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, 75, 18.75);
        ctx.restore();
    }

    drawYeux(ctx) {
        ctx.save();
        drawCircleImmediat(ctx, 10, 10, 7, "black");
        drawCircleImmediat(ctx, 10, 10, 5, "white");
        drawCircleImmediat(ctx, 10, 10, 3, "black");
        ctx.restore();
    }

    drawQueue(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(-86.25, 33.75);
        ctx.lineTo(-131.25, 86.25);
        ctx.lineTo(-131.25, 22.5);
        ctx.fill();
        ctx.fillRect(-131.25, 22.5, 22.5, 7.5);
        ctx.restore();
    }

    drawCorps(ctx) {
        ctx.save();
        ctx.fillStyle = "grey";
        ctx.fillRect(3.75, 22.5, -112.5, 37.5);
        this.drawCrainieres(ctx);
        ctx.restore();
    }

    drawCrainieres(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(-15, 22.5);
        ctx.lineTo(0, 3);
        ctx.lineTo(0, 22.5);
        ctx.fill();
        ctx.restore();
    }

    drawOreilles(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(7.5, -15);
        ctx.lineTo(11.25, 0);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(30, 0);
        ctx.lineTo(22.5, -15);
        ctx.lineTo(18., 0);
        ctx.fill();
        ctx.restore();
    }

    drawBouches(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0, 18.75);
        ctx.rotate(0.3+ Math.sin(Date.now() * 0.01) * 0.1);
        ctx.fillStyle = "grey";
        ctx.fillRect(3.75, 7.5, 75, 18.75);
        this.drawDents(ctx);
        ctx.restore();
    }

    drawDents(ctx) {
        ctx.save();
        ctx.rotate(-0.2 + Math.sin(Date.now() * 0.001) * 0.01);
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo(52.5, 18.75);
        ctx.lineTo(40.5, 15);
        ctx.lineTo(48.75, 7.5);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(52.5, 18.75);
        ctx.lineTo(60, 7.5);
        ctx.lineTo(63.75, 20.625);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(63.75, 20.625);
        ctx.lineTo(71.25, 7.5);
        ctx.lineTo(75, 22.5);
        ctx.fill();
        ctx.restore();
    }

    drawJambesDevant(ctx) {
        ctx.save();
        ctx.fillStyle = "grey";
        ctx.fillRect(3.75, 60, -11.25, 46.875);
        ctx.fillRect(-97.5, 60, -11.25, 46.875);
        ctx.restore();
    }

    drawOmbreJambes(ctx) {
        ctx.save();
        ctx.fillStyle = "#515558";
        ctx.beginPath();
        ctx.moveTo(-108.75, 60);
        ctx.lineTo(-108.75, 82.5);
        ctx.lineTo(-71.25, 60);
        ctx.fill();
        ctx.restore();
    }

    drawJambesArriere1(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.fillRect(-71.25, 60, -11.25, 46.875);
        ctx.restore();
    }

    drawJambesArriere2(ctx) {
        ctx.save();
        ctx.fillStyle = "#515558";
        ctx.fillRect(-22.5, 60, -11.25, 46.875);
        ctx.restore();
    }

    drawPieds(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(-97.5, 97.5);
        ctx.lineTo(-86.25, 106.875);
        ctx.lineTo(-97.5, 106.875);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-71.25, 97.5);
        ctx.lineTo(-60, 106.875);
        ctx.lineTo(-71.25, 106.875);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-22.5, 97.5);
        ctx.lineTo(-11.25, 106.875);
        ctx.lineTo(-22.5, 106.875);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(3, 97.5);
        ctx.lineTo(15, 106.875);
        ctx.lineTo(3, 106.875);
        ctx.fill();
        ctx.restore();
    }

    move() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
    }
}