	var canvas;
	var canvasContext;
	var ballX = 40;
	var ballY = 40;
	var ballSpeedX = 10;
	var ballSpeedY = 4;
	var paddle1Y = 250;
	var paddle2Y = 250;
	var PADDLE_THICKNESS = 10;
	var PADDLE_HEIGHT = 100;
	var NET_THICKNESS = 8;
	var NET_LENGTH = 20;
	var player1Score = 0;
	var player2Score = 0;
	var WINNING_SCORE = 5;
	var showingWinScreen = false;
	var showingStartScreen = true;
	var requestAnimationFrame = requestAnimationFrame ||
								webkitRequestAnimationFrame ||
								mozRequestAnimationFrame ||
								oRequestAnimationFrame ||
								msRequestAnimationFrame;
	function calculateMousePos(evt){
		var rect = canvas.getBoundingClientRect();
		var root = document.documentElement;
		var mouseX = evt.clientX - rect.left - root.scrollLeft;
		var mouseY = evt.clientY - rect.top - root.scrollTop;
		return{
			x:mouseX,
			y:mouseY
		}
	}
	function handleMouseClick(evt){
		if(showingWinScreen){
			player1Score = 0;
			player2Score = 0;
			showingWinScreen = false;
		}
	}
	function handleMouseMove(evt){
		var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - PADDLE_HEIGHT/2;
	}
	function startGame(evt){
		
		showingStartScreen = false;
		tick();
	}
	function tick() {
                      
            drawEverything();
            moveEverything();
            requestAnimationFrame(tick);
    }
	window.onload = function(){
		canvas = document.getElementById("gameCanvas");
		canvasContext = canvas.getContext("2d");
		//var x = canvas.width/2;
		strartScreen();	
  
		
		canvas.addEventListener("mousedown", handleMouseClick);
		canvas.addEventListener("mousemove", handleMouseMove);
	}
	function ballReset(){
		if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
			showingWinScreen = true;
		}
		ballSpeedX = ballSpeedX * -1;
		ballX = canvas.width/2;
		ballY = canvas.height/2;
		ballSpeedX = 10;
		ballSpeedY = 4;
	
	}
	
	function computerMovement(){
		var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
		if(paddle2YCenter < ballY - 35){
			paddle2Y = paddle2Y + 5;
		}else if(paddle2YCenter > ballY + 35){
			paddle2Y = paddle2Y - 5;
		}
	}
	function moveEverything(){
		if(showingWinScreen){
			return;
		}
		computerMovement();
		ballX = ballX + ballSpeedX;
		ballY = ballY + ballSpeedY;
		
		if(ballX < 0){
			if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
				ballSpeedX = ballSpeedX * -1;
				var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
				ballSpeedY = deltaY * 0.35;
			}else{
				player2Score = player2Score + 1;
				ballReset();
			}
		}
		if(ballX > canvas.width){
			if(ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
				ballSpeedX = ballSpeedX * -1;
				var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
				ballSpeedY = deltaY * 0.35;
			}else{
				player1Score = player1Score + 1;
				ballReset();
			}
		}
		if(ballY > canvas.height){
			ballSpeedY = ballSpeedY * -1;
		}
		if(ballY < 0){
			ballSpeedY = ballSpeedY * -1;
		}
	}
	function drawNet(){
		for(var i = 0; i < canvas.height; i = i + 40){
			colorRect(canvas.width/2, i, NET_THICKNESS, NET_LENGTH, "white");
		}
	}
	function strartScreen(){
		// draw canvas 
		colorRect(0, 0, canvas.width, canvas.height, "black");
		canvasContext.fillStyle = "white";
		canvasContext.font = "60px Georgia";
		canvasContext.fillText("PONG", 300, 150);		
		canvasContext.font = "30px Georgia";
		canvasContext.fillText("Use mouse for left paddle", 225, 250);	
		canvasContext.fillText("Press any key to start", 250, 350);	
		//canvas.addEventListener("keydown", startGame);
		document.addEventListener("keydown", startGame);
		
	}
	function drawEverything(){
		showingStartScreen;
		console.log(ballX);
		// draw canvas 
		colorRect(0, 0, canvas.width, canvas.height, "black");
		
		if(showingWinScreen){
			canvasContext.fillStyle = "white";
			if(player1Score >= WINNING_SCORE){
				canvasContext.font = "30px Georgia";
				canvasContext.fillText("Left player won", 300, 100);
			} else if (player2Score >= WINNING_SCORE){
				canvasContext.font = "30px Georgia";
				canvasContext.fillText("Right player won", 300, 100);
				
			}
			canvasContext.fillText("Click to continue.", 300, 500);
			return;
		}
		drawNet();
		// draw left player paddle
		colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
		// draw right player paddle
		colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
		// draw ball
		colorCircle(ballX, ballY, 10, 0, Math.PI*2, true, "white"); 
		canvasContext.font = "30px Georgia";
		canvasContext.fillText(player1Score, 100, 100);
		canvasContext.fillText(player2Score, 620, 100);
		
	}
	function colorCircle(centerX, centerY, radius, startSweep, endSweep, direction, drawColor){
		canvasContext.fillStyle = drawColor;
		canvasContext.beginPath();
		canvasContext.arc(centerX, centerY, radius, startSweep, endSweep, direction);
		canvasContext.fill();
	}
	function colorRect(leftX, topY, width, height, drawColor){
		canvasContext.fillStyle = drawColor;
		canvasContext.fillRect(leftX, topY, width, height);
	}
	
