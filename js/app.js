window.onload = function() {
  // Grab the canvas element & reference context
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // Position variables
  var x = canvas.width/2;
  var y = canvas.height-250;
  var dx = 0;
  var dy = 2;

  // Game Play Variables
  var $score = 0;
  var lives = 3;
  $('#lives').text(`Lives: ${lives}`);
  var hit = new Audio('Beep2.wav');

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

  // Render the brick field
  var brickRows = 3;
  var brickColumns = 9;
  var brickWidth = 65;
  var brickHeight = 20;
  var brickPadding = 10;
  var brickOffsetTop = 30;
  var brickOffsetLeft = 50;

  var bricks = [];
  for(col=0; col<brickColumns; col++) {
    bricks[col] = [];
    for(row=0; row<brickRows; row++) {
         bricks[col][row] = { x: 0, y: 0, status: 1 };
    }
  }

  function drawBricksField() {
      for(col=0; col<brickColumns; col++) {
          for(row=0; row<brickRows; row++) {
              if(bricks[col][row].status == 1) {
                  var brickX = (col*(brickWidth+brickPadding))+brickOffsetLeft;
                  var brickY = (row*(brickHeight+brickPadding))+brickOffsetTop;
                  bricks[col][row].x = brickX;
                  bricks[col][row].y = brickY;
                  ctx.beginPath();
                  ctx.rect(brickX, brickY, brickWidth, brickHeight);
                  ctx.fillStyle = "#E45641";
                  ctx.fill();
                  ctx.closePath();
              }
          }
      }
  }

  // User control
  var rightPressed = false;
  var leftPressed = false;

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

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

    function mouseMoveHandler(e) {
      var relativeX = e.clientX - canvas.offsetLeft;
      if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
      }
    }

  // Collision Detection
  function collisionDetection(){
    for(col=0; col<brickColumns; col++){
      for(row=0;row<brickRows;row++){
        var b = bricks[col][row];
        if(b.status == 1){
          if(x> b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
            dy = -dy;
            hit.play();
            b.status = 0;
            $score += 100;
            $('#score').text(`Score: ${$score}`);
            if($score/100 == brickRows*brickColumns){
              alert("You win, congratlutions!");
              document.location.reload();
            }
          }
        }
      }
    }
  }

  // Add pause functionality
  var paused = false;
  var alertWidth = 75;
  var alertHeight = 50;
  document.addEventListener("keydown", pauseGame, false);

  function pauseGame(e) {
    e.preventDefault();
    if(e.keyCode == 80){
      paused = !paused;
    } else if(e.keyCode == 27) {
      paused = !paused;
    }
  }

  function drawPauseAlert() {
    ctx.beginPath();
    ctx.fillStyle = "FFF7EE";
    ctx.fillText('P a u s e d', canvas.width/2-20, canvas.height/2);
    ctx.font(100);
    ctx.fill();
    ctx.closePath();
  }


  // Render the gameboard & elements
  function draw() {
    if(paused){
      drawPauseAlert();
      return;
    }

    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawBricksField();
    drawPaddle();
    createBall();
    collisionDetection();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
      dx = -dx;
    }
    if(y + dy < ballRadius) {
      dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth){
        dx = 7 * ((x-(paddleX+paddleWidth/2))/paddleWidth);
        dy = -dy;
      }
      else {
        lives--;
        $('#lives').text(`Lives: ${lives}`);
        // $('.life-square').last().removeClass('.life-square');
        if(!lives){
          alert("GAME OVER");
          document.location.reload();
        }
        else {
          x = canvas.width/2;
          y = canvas.height-200;
          dx = 0;
          dy = 0;
          paddleX = (canvas.width-paddleWidth)/2;
          $('.title').addClass("animate tada");
          setTimeout(function(){
            dx = 0;
            dy = 2;
          },1000);
        }
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

    // requestAnimationFrame(draw);
  }
  // draw();
  setInterval(draw, 10);
}
