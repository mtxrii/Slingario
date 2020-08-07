let blob;
let anchorImg;
const startingBlobs = 100;

let blobs = [];
let zoom = 1;

function preload() {
    anchorImg = loadImage('src/images/anchor.png');
}

function setup() {
    createCanvas(displayWidth, displayHeight*0.78);
    blob = new Blob(0, 0, 64);
    for (let i = 0; i < startingBlobs; i++) {
        let x = random(-width, width);
        let y = random(-height, height);
        blobs[i] = new Blob(x, y, 16);
    }
}

function draw() {
    background(0);
    translate(width/2, height/2);
    const newzoom = 64 / blob.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);

    for (let i = blobs.length - 1; i >= 0; i--) {
        blobs[i].show();
        if (blob.eats(blobs[i])) {
            blobs.splice(i, 1);
        }
    }

    blob.show();
    blob.update();

    if (blob.anchoredState) {
        image(anchorImg, blob.xPos - 27, blob.yPos - 27, anchorImg.width/15, anchorImg.height/15);
    }
}

function keyPressed() {
    if (keyCode === 16) {
        blob.anchor();
        return false;
    }
}

function keyReleased() {
    blob.release();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
