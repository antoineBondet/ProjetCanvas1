import ObjectGraphique from "./ObjectGraphique.js";
import { drawCircleImmediat } from "./utils.js";   

export default class Player extends ObjectGraphique {
    constructor(x, y) {
        super(x, y, 155, 120);
        this.vitesseX = 0;
        this.vitesseY = 0;
        this.couleur = "pink";
        this.angle = 0;
    }
   
    draw(ctx) {
        ctx.save();
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
        ctx.fillRect(-3.75, -22.5, 75, 18.75);
        ctx.restore();
    }

    drawYeux(ctx) {
        ctx.save();
        drawCircleImmediat(ctx, 6.25, -12.5, 7, "black");
        drawCircleImmediat(ctx, 6.25, -12.5, 5, "white");
        drawCircleImmediat(ctx, 6.25, -12.5, 3, "black");
        ctx.restore();
    }

    drawQueue(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(-90, 11.25);
        ctx.lineTo(-135, 63.75);
        ctx.lineTo(-135, 0);
        ctx.fill();
        ctx.fillRect(-135, 0, 22.5, 7.5);
        ctx.restore();
    }

    drawCorps(ctx) {
        ctx.save();
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, -112.5, 37.5);
        this.drawCrainieres(ctx);
        ctx.restore();
    }

    drawCrainieres(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(-18.75, 0);
        ctx.lineTo(-3.75, -19.5);
        ctx.lineTo(-3.75, 0);
        ctx.fill();
        ctx.restore();
    }

    drawOreilles(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(-3.75, -22.5);
        ctx.lineTo(3.75, -37.5);
        ctx.lineTo(7.5, -22.5);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(26.25, -22.5);
        ctx.lineTo(18.75, -37.5);
        ctx.lineTo(15, -22.5);
        ctx.fill();
        ctx.restore();
    }

    drawBouches(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(-3.75, -3.75);
        ctx.rotate(0.3 + Math.sin(Date.now() * 0.01) * 0.1);
        ctx.fillStyle = "grey";
        ctx.fillRect(-3.75, -15, 75, 18.75);
        this.drawDents(ctx);
        ctx.restore();
    }

    drawDents(ctx) {
        ctx.save();
        ctx.rotate(-0.2 + Math.sin(Date.now() * 0.001) * 0.01);
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo(48.75, 0);
        ctx.lineTo(36.75, -3.75);
        ctx.lineTo(45, -11.25);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(48.75, 0);
        ctx.lineTo(56.25, -11.25);
        ctx.lineTo(60, 3.125);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(60, 3.125);
        ctx.lineTo(67.5, -11.25);
        ctx.lineTo(71.25, 3.75);
        ctx.fill();
        ctx.restore();
    }

    drawJambesDevant(ctx) {
        ctx.save();
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 37.5, -11.25, 46.875);
        ctx.fillRect(-101.25, 37.5, -11.25, 46.875);
        ctx.restore();
    }

    drawOmbreJambes(ctx) {
        ctx.save();
        ctx.fillStyle = "#515558";
        ctx.beginPath();
        ctx.moveTo(-112.5, 37.5);
        ctx.lineTo(-112.5, 60);
        ctx.lineTo(-75, 37.5);
        ctx.fill();
        ctx.restore();
    }

    drawJambesArriere1(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.fillRect(-75, 37.5, -11.25, 46.875);
        ctx.restore();
    }

    drawJambesArriere2(ctx) {
        ctx.save();
        ctx.fillStyle = "#515558";
        ctx.fillRect(-26.25, 37.5, -11.25, 46.875);
        ctx.restore();
    }

    drawPieds(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(-101.25, 75);
        ctx.lineTo(-90, 84.375);
        ctx.lineTo(-101.25, 84.375);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-75, 75);
        ctx.lineTo(-63.75, 84.375);
        ctx.lineTo(-75, 84.375);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-26.25, 75);
        ctx.lineTo(-15, 84.375);
        ctx.lineTo(-26.25, 84.375);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-1.5, 75);
        ctx.lineTo(10.5, 84.375);
        ctx.lineTo(-1.5, 84.375);
        ctx.fill();
        ctx.restore();
    }

    move() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
    }
}