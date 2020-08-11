class Blob {
    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.r = r;
        this.anchored = false;
        this.canShoot = true;
    }

    update(newvel, speed) {
        if (!this.anchored) {
            newvel.setMag(speed);
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

    shoot(mass) {
        const sender = new Blob(this.pos.x, this.pos.y, mass);
        const sum = (Math.PI * this.r * this.r) - (Math.PI * mass * mass);
        this.r = Math.sqrt(sum / Math.PI);

        sender.update(createVector(mouseX - width / 2, mouseY - height / 2), 5);
        return sender;
    }

    anchor() {
        this.anchored = true;
    }

    release() {
        this.anchored = false;
    }

    get anchoredState() {
        return this.anchored;
    }

    get xPos() {
        return this.pos.x;
    }

    get yPos() {
        return this.pos.y;
    }

    get direction() {
        return this.vel;
    }

    get getCanShoot() {
        return this.canShoot && this.r > 50;
    }

    setCanShoot(bool) {
        this.canShoot = bool;
    }
}
