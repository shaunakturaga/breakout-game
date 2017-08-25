# Breakout
This is a fun breakout game that I built as part of General Assembly's Project 1 deliverable as part of my Capital One full stack bootcamp. The requirements for the projects were designed to test mastery of all topics covered for Front End Development credentials (HTML/CSS/JS/jQuery/AJAX).

## Project Overview

The entire game utilizes pure javascript and takes advantage of Web API as part of the browser. More specifically, I was able to render all game components like the ball, paddle, and bricks using canvas tags.

A simple demonstration of this is:

```
// Manipulate Canvas Element
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Render the ball
var ballRadius = 10;

function createBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#F1A94E";
  ctx.fill();
  ctx.closePath();
}
```

The movement of the ball and paddle are accomplished by refreshing the canvas as follows:

```
function draw() {

  // Clear canvas at top of loop
  ctx.clearRect(0,0,canvas.width,
  canvas.height);

  // Draw game elements
  drawBricksField();
  drawPaddle();
  createBall();
  collisionDetection();

  // Increment ball slope
  x += dx;
  y += dy;
}

// Run draw() function incrementally
setInterval(draw, 10);

```
## Future Features

Features that didn't make my project include levels and power-ups.

1) Levels: Each level features a diverse set of bricks with the brick field in addition to varying ball speed and paddle width.

2) Power-ups: Certain bricks or time points in the level would unleash power-ups that change game play. Example would be a paddle that has blasters, ball multipliers, and being able to slow game play.

## Bugs/Roadblocks

Get started as one of the hardest parts of the the whole project. There was various libraries available like p5.js or create.js that allows easy sprite creation and collision detection. I decided that it would be better to build the game using HTML5 & JS for this first project and explore modern libraries in future implementations.

Majority of my challenges resided in figuring out how to get the ball to bounce around the canvas in a fluid way. Using the canvas made it difficult of make this game responsive.

At the middle of project I had a problem create the brick field and making it possible for ball to destroy the bricks. I figured out that I needed to create a two dimensional array that held the bricks and manage the brick visibility status.

## Wins + Challenges

There are two functional "qwerks" that I would like to work on in the future.

1) Bricks Collision - The moment that the ball touches the center of the brick, it was removed. It is noticeable in gameplay that the bricks aren't removed if you pass through the very edge of a corner.

2) Paddle - The paddle itself isn't colliding with the ball. When the ball touches the bottom of the cavas and the paddle position is the same as where the ball touched down -- the ball bounces back. If the paddle is not in the same position, this is a miss and lives are decremented. Ideally I would like the paddle to interact with the ball.

I was able to figure out how to make it so the ball bounces differently depending on where on the paddle the ball hits. For example, if the ball touches the right side of the paddle, the ball's new slope is set to a positive direction to the right.

```
// dx and dy are the slope elements that define the path of the ball

else if(y + dy > canvas.height-ballRadius) {
  if(x > paddleX && x < paddleX + paddleWidth){
    dx = 7 * ((x-(paddleX+paddleWidth/2))/paddleWidth);
    dy = -dy;

```

## Why Breakout?

Breakout was a game that I played all the time on older machines growing up like PDA's, cellphones, and on the web. I thought it would be an interesting exploration of a addicting game that is easy to play. I also thought it would be a good challenge to figure out how to make an animated ball move around the canvas surface.

## Gameplay

The rules of the game are quite simple. Start the game by clicking the "Start Game" button. As the user, you can use the mouse of left/right arrow keys to move the paddle. You have three lives to destroy all the bricks. The game is won when all the bricks are destroyed.

## Process of Creation

Then I realized my user stories by creating a wireframe in Sketch App. This was useful in creating all wireframe components and knowing exact dimension when rendering the components in JS.

![alt text](https://github.com/shaunakturaga/breakout-game/blob/master/Breakout%20Main%20Wireframe.png)

![alt text]()
