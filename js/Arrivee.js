import ObjectGraphique from "./ObjectGraphique.js";
import { drawCircleImmediat } from "./utils.js";
export default class Arrivee extends ObjectGraphique {
    constructor(x, y) {
        super(x, y);
        this.w = 80;
        this.h = 80;
        
    }

    draw(ctx) {
        
        ctx.save();
        //maison en bois
        ctx.fillStyle = "#FA9D5C";
        ctx.fillRect(this.x, this.y, 80, 80);
        ctx.fillStyle = "#451C01";
        ctx.fillRect(this.x + 40, this.y + 30, 30, 50);
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x + 45, this.y + 55, 5, 5);
        
        //toit
        ctx.fillStyle = "#451C01";
        ctx.beginPath();
        ctx.moveTo(this.x-10, this.y+5);
        ctx.lineTo(this.x+90, this.y+5);
        ctx.lineTo(this.x+40, this.y-50);
        ctx.fill();
        ctx.fillStyle = "#FA9D5C";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y+5);
        ctx.lineTo(this.x+80, this.y+5);
        ctx.lineTo(this.x+40, this.y-40);
        ctx.fill();
        //fenetre1
        ctx.fillStyle = "#8C501B";
        ctx.fillRect(this.x + 10, this.y +35, 20, 20);
        ctx.fillStyle = "#451C01";
        ctx.fillRect(this.x + 18, this.y +35, 3, 20);
        ctx.fillStyle = "#451C01";
        ctx.fillRect(this.x + 10, this.y +35, 20, 3);
        ctx.fillStyle = "#451C01";
        ctx.fillRect(this.x + 28, this.y +35, 3, 20);
        ctx.fillStyle = "#451C01";
        ctx.fillRect(this.x + 8, this.y +35, 3, 20);
        ctx.fillStyle = "#451C01";
        ctx.fillRect(this.x + 10, this.y +52, 20, 3);
        ctx.fillStyle = "#451C01";
        ctx.fillRect(this.x + 10, this.y+44, 20, 3);
        //fenetre2
        drawCircleImmediat(ctx, this.x + 40, this.y -10, 12, "#451C01");
        drawCircleImmediat(ctx, this.x + 40, this.y -10, 10, "#8C501B");
        ctx.fillStyle = "#451C01";
        ctx.fillRect(this.x + 39, this.y -22, 2, 24);
        ctx.fillStyle = "#451C01";
        ctx.fillRect(this.x + 30, this.y -10, 22, 2);
        //cheminée
        ctx.fillStyle = "#451C01";
        ctx.fillRect(this.x + 60, this.y - 42, 10, 25);

        //coté maison
        ctx.fillStyle = "#8C501B";
        ctx.fillRect(this.x + 80, this.y+5, 5, 75);
        ctx.fillStyle = "#8C501B";
        ctx.fillRect(this.x-5, this.y+5, 5, 75);
        ctx.restore();
    }


}

    
