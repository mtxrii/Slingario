function Blob(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.vel = createVector(0, 0);
    this.anchored = false;

    this.update = function() {
        let newvel = createVector(mouseX-width/2, mouseY-height/2);
        if (!this.anchored) {
            newvel.setMag(3);
            this.vel.lerp(newvel, 0.1);
            this.pos.add(this.vel);
        }
    }

    this.show = function() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }

    this.eats = function(other) {
        const d = p5.Vector.dist(this.pos, other.pos);
        if (d < this.r + other.r) {
            const sum = (Math.PI * this.r * this.r) + (Math.PI * other.r * other.r);
            this.r = Math.sqrt(sum / Math.PI);
            return true;
        }
        else return false;
    }

    this.anchor = function() {
        this.anchored = true;
    }

    this.release = function() {
        this.anchored = false;
    }
}