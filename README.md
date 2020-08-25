# Slingario
Like a (singleplayer) [agar.io](https://agar.io/) with blob slinging

<img src="assets/example.gif" width="60%">

### Explanation
Intrigued by the agarIo style gameplay arena, I created my own environment that simulates this 2D game in [p5.js](https://p5js.org/) mainly as an engine for future games of this style.

For now it's just a game with the sole objective of eating blobs. You can click around to shoot your own blobs that absorb the surrounding environment blobs.

### What does my score mean?
The objective is to eat all blobs. The counter in the center of the field shows the number of remaining blobs. Once they have all been eaten, you recieve your score. This score is composed of:
(YOUR BLOB'S MASS * 10) / GAME DURATION IN SECONDS