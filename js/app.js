window.onload = function() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var x = canvas.width/2;
  var y = canvas.height-30;
  var dx = 2;
  var dy = -2;

  // Render the ball
  var ballRadius = 10;

  function createBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#F1A94E";
    ctx.fill();
    ctx.closePath();
  }

  // Render the paddle & inital position
  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (canvas.width-paddleWidth)/2;

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "FFF7EE";
    ctx.fill();
    ctx.closePath();
  }

  // User control
  var rightPressed = false;
  var leftPressed = false;
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(e) {
      e.preventDefault();
      if(e.keyCode == 39) {
          rightPressed = true;
      }
      else if(e.keyCode == 37) {
          leftPressed = true;
      }
    }

    function keyUpHandler(e) {
      e.preventDefault();
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }

  // Render the gameboard & elements
  function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawPaddle();
    createBall();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
      dx = -dx;
    }
    if(y + dy < ballRadius) {
      dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth){
        dy = -dy;
      }
      else {
        alert("GAME OVER");
        document.location.reload();
      }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y +=dy;
  }
  setInterval(draw, 10);
}
