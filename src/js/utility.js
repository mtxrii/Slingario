function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}