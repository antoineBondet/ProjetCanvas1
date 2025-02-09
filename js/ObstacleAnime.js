import Obstacle from "./Obstacle.js";

export default class ObstacleAnime extends Obstacle {
    constructor(x, y, w, h, couleur, vitesseX = 2, vitesseY = 0, typeDeMouvement = "rebond") {
        super(x, y, w, h, couleur);
        this.vitesseX = vitesseX;
        this.vitesseY = vitesseY;
        this.typeDeMouvement = typeDeMouvement;
    }

    update(canvas) {
        switch (this.typeDeMouvement) {
            case "rebond":
                this.x += this.vitesseX;
                this.y += this.vitesseY;
                if (this.x <= 0 || this.x + this.w >= canvas.width) {
                    this.vitesseX *= -1;
                }
                if (this.y <= 0 || this.y + this.h >= canvas.height) {
                    this.vitesseY *= -1;
                }
                break;
            case "mouvementHorizontal":
                this.x += this.vitesseX;
                if (this.x <= 0 || this.x + this.w >= canvas.width) {
                    this.vitesseX *= -1;
                }
                break;
            case "mouvementVertical":
                this.y += this.vitesseY;
                if (this.y <= 0 || this.y + this.h >= canvas.height) {
                    this.vitesseY *= -1;
                }
                break;
            default:
                console.warn(`Type de mouvement inconnu: ${this.typeDeMouvement}`);
                break;
        }
    }

    draw(ctx) {
        super.draw(ctx);
    }
}