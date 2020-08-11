let blob;
let anchorImg;
const startingBlobs = 100;

let blobs = [];
let senders = [];
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
        blobs[i] = new Blob(x, y, random(10, 20));
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
        blobs[i].update(blobs[i].direction.add(random(-1.5, 1.5), random(-1.5, 1.5)), 1);
        if (blob.eats(blobs[i])) {
            blobs.splice(i, 1);
        }
    }

    for (let j = senders.length - 1; j >= 0; j--) {
        senders[j].show();
        senders[j].update(senders[j].direction.add(senders[j].xPos, senders[j].yPos, 7));
    }

    blob.show();
    blob.update(createVector(mouseX - width / 2, mouseY - height / 2), 3);

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

async function mouseClicked() {
    if (blob.getCanShoot) {
        senders.push(blob.shoot(30));
        blob.setCanShoot(false);
        await sleep(2000);
        blob.setCanShoot(true);
    }
}
