window.onload = function() {
  // Grab the canvas element & reference context
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // Position variables
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

  // Render the brick field
  var brickRows =3;
  var brickColumns = 9;
  var brickWidth = 65;
  var brickHeight = 20;
  var brickPadding = 10;
  var brickOffsetTop = 30;
  var brickOffsetLeft = 50;

  var bricks = [];
  for(var col = 0; col<brickColumns;col++){
    bricks[col] = [];
    for(var row = 0; row<brickRows;row++){
      bricks[col][row] = {x:0, y:0, status: 1};
    }
  }

  function drawBricksField() {
    for(var col =0; col<brickColumns;col++){
      for(var row=0; row<brickRows;row++){
        if(bricks[col][row].status == 1){
          var brickX = (col*(brickWidth+brickPadding))+brickOffsetLeft;
          var brickY = (row*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[col][row].x = 0;
          bricks[col][row].y = 0;
          ctx.beginPath();
          ctx.rect(brickX,brickY,brickWidth,brickHeight);
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

    // Collision Detection
    function collisionDetection(){
      for(var col=0; col<brickColumns; col++){
        for(var row=0;row<brickRows;row++){
          var b = bricks[col][row];
          if(x>b.x && x< b.x+brickWidth && y>b.y && y <b.y+brickHeight){
            dy = -dy;
          }
        }
      }
    }

  // Render the gameboard & elements
  function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawPaddle();
    createBall();
    drawBricksField();
    collisionDetection();

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
        // alert("GAME OVER");
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
