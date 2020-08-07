class Blob {
    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.r = r;
        this.vel = createVector(0, 0);
        this.anchored = false;
    }

    update() {
        let newvel = createVector(mouseX - width / 2, mouseY - height / 2);
        if (!this.anchored) {
            newvel.setMag(3);
            this.vel.lerp(newvel, 0.1);
            this.pos.add(this.vel);
        }
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    eats(other) {
        const d = p5.Vector.dist(this.pos, other.pos);
        if (d < this.r + other.r) {
            const sum = (Math.PI * this.r * this.r) + (Math.PI * other.r * other.r);
            this.r = Math.sqrt(sum / Math.PI);
            return true;
        }
        else
            return false;
    }

    anchor() {
        this.anchored = true;
    }

    release() {
        this.anchored = false;
    }
}
