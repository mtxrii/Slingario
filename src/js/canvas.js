let blob;
let anchorImg;
const startingBlobs = 100;

let blobs = [];
let senders = [];
let zoom = 1;

let bgColor;
let waxing;
let score;
const startTime = new Date();

function preload() {
    anchorImg = loadImage('src/images/anchor.png');
    bgColor = 1;
    waxing = true;
    score = 0;
}

function setup() {
    createCanvas(displayWidth, displayHeight*0.79);
    blob = new Blob(0, 0, 64);
    for (let i = 0; i < startingBlobs; i++) {
        let x = random(-width, width);
        let y = random(-height, height);
        blobs[i] = new Blob(x, y, random(10, 20));
    }
}

function draw() {
    bgColor = gradient(bgColor);
    background(bgColor);

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

    for (let i = senders.length - 1; i >= 0; i--) {
        senders[i].show();
        senders[i].update(senders[i].direction.add(senders[i].xPos - width / 2, senders[i].yPos - height / 2), 5);
        for (let j = blobs.length - 1; j >= 0; j--) {
            if (senders[i].eats(blobs[j])) {
                blobs.splice(j, 1);
            }
        }
    }

    blob.show();
    blob.update(createVector(mouseX - width / 2, mouseY - height / 2), 3);

    if (blob.anchoredState) {
        image(anchorImg, blob.xPos - 27, blob.yPos - 27, anchorImg.width/15, anchorImg.height/15);
    }

    textSize(40);
    if (blobs.length > 0) {
        text('BLOBS: ' + blobs.length, 10, 30);
    }
    else {
        if (score == 0) {
            const endTime = new Date();
            // score = (mass * 10) / seconds taken to finish
            score = (blob.mass * 10) / ((endTime.getTime() - startTime.getTime()) / 1000);
        }
        fill(0, 102, 153);
        text('ALL BLOBS KILLED!', 10, 30);
        fill(235, 64, 52);
        text('SCORE: ' + Math.trunc(score), 10, 70);
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

function gradient(i) {
    if (waxing) {
        if (i >= 30) {
            waxing = false;
            return i - 0.1;
        }
        return i + 0.1;
    }
    else {
        if (i <= 0) {
            waxing = true;
            return i + 0.1;
        }
        return i - 0.1;
    }
}
