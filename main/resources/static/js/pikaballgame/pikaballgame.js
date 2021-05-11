	/*
	    클릭하면 포켓몬볼 나가고, 스페이스바에 큰 포켓몬볼 나감
	    마우스로 피카츄 이동. 마우스커서 보다 왼쪽에 위치함
	    상대방 피카츄는 자동으로 y축 이동
	    맞으면 점수얻음
	    화면상단 가운데에, 
	        조작법: 마우스, 스페이스바(빅볼던지기)
	        몬스터볼은 연속으로 6개 까지 던질 수 있습니다.
	    빅볼은 총 3개
	    빅볼은 3번 전부 던지면, 런타임 5초 있고, 다시 3개 채워짐
	    위아래로 올라갔다 : 조준경reboundY,isReload
	*/
	
	//그리기 객체
	let ctx;
	//배경객체들
	let bgImg1 = new Image();
	bgImg1.src = "/static/images/pikaballgame/pikabg.jpg";
	let cloudsImg1 = new Image();
	cloudsImg1.src = "/static/images/pikaballgame/clouds.jpg";
	let cloudsImg2 = new Image();
	cloudsImg2.src = "/static/images/pikaballgame/clouds.jpg";
	let cloudsImg1X = 0;
	let cloudsImg2X = -800;
	
	//내 피카츄 객체들
	let myPika1 = new Image();
	myPika1.src = "/static/images/pikaballgame/p1.png";
	let myPika2 = new Image();
	myPika2.src = "/static/images/pikaballgame/p2.png";
	let myPika3 = new Image();
	myPika3.src = "/static/images/pikaballgame/p3.png";
	let myPika4 = new Image();
	myPika4.src = "/static/images/pikaballgame/p4.png";
	let myPika5 = new Image();
	myPika5.src = "/static/images/pikaballgame/p5.png";
	
	//시간세기
	let counter = 0;

	//피카 마우스로 움직 일 때, y값
	let myPikaY = 50;
	let myPikaX = 50;

	//상대 피카츄 객체들
	let ePika1 = new Image();
	ePika1.src = "/static/images/pikaballgame/p11.png";
	let ePika2 = new Image();
	ePika2.src = "/static/images/pikaballgame/p22.png";
	let ePika3 = new Image();
	ePika3.src = "/static/images/pikaballgame/p33.png";
	let ePika4 = new Image();
	ePika4.src = "/static/images/pikaballgame/p44.png";
	let ePika5 = new Image();
	ePika5.src = "/static/images/pikaballgame/p55.png";

	//상대 피카츄 y축
	let ePikaY = 0;
	let ePikaup = false;

	let monsterBall1 = new Image();
	monsterBall1.src = "/static/images/pikaballgame/pikaball1.png";
	let monsterBall2 = new Image();
	monsterBall2.src = "/static/images/pikaballgame/pikaball2.png";
	let monsterBall3 = new Image();
	monsterBall3.src = "/static/images/pikaballgame/pikaball3.png";
	let monsterBall4 = new Image();
	monsterBall4.src = "/static/images/pikaballgame/pikaball4.png";
	let monsterBall5 = new Image();
	monsterBall5.src = "/static/images/pikaballgame/pikaball5.png";

	
	let ballXArray = [];
	let bigBallXArray = [];

	//로딩
	window.onload = function() {
		let canvas = document.getElementById("myCanvas");
		ctx = canvas.getContext("2d");
		canvas.onmousemove = movePika;
		let body = document.body;
		// 클릭 으로 몬스터볼 날리기
		document.getElementById("myCanvas").addEventListener("click", goBall);
		// 스페이스바로 빅 몬스터볼 날리기
		body.onkeydown = goBigBall;
		window.setInterval(drawScreen, 100);

	}

	//내 피카추 상하 움직이기
	function movePika(e) {
		if (e.pageY <= 520) {
			myPikaX = e.pageX;
			myPikaY = e.pageY;
		}
	}

	let ballCanGo = true;
	let index = 0;
	function goBall() {
		// 공이 나갈 수 있는 거리 조정
		if(myPikaX > 190) {
			return false;
		}

		let b = {
			bx : myPikaX,
			by : myPikaY
		}

		if (ballXArray.length < 6) {
			ballXArray.push(b);
			setTimeout(makeScore, 6000);	
		}
	}
	
	/* 작업 중 20210503 3초 마다 큰 몬스터볼 슈팅 가능 */
	function goBigBall(e) {
		if (e.keyCode == 32) {		
			// 공이 나갈 수 있는 거리 조정
			if(myPikaX > 190) {
				return false;
			}
			
			// 리차지 시간 이후 공이 나갈 수 있음
			if(ballCanGo) {
				let b = {
					bx : myPikaX,
					by : myPikaY
				}
				
				if (bigBallXArray.length < 4) {
					bigBallXArray.push(b);
					index++;
				} 
				
				ballCanGo = false;	
				drawWaitTime(5);
				setTimeout(makeBallCanGo, 3000);
				setTimeout(makeScore, 6000, index);
			}
		}	
	}
	
	function drawWaitTime (counter) {
		setInterval(function(){
			counter--;
			if(counter < 0){
				return;
			} else {
				document.getElementById("wait_time").innerText = counter;
			} 	
		},1000)
	}
	
	function makeBallCanGo() {		
		ballCanGo = true;
	}
	
	let score = 0;
	function makeScore() {
		if(ballXArray.length == 0) {
			return;
		}
		
		if(Math.abs(ballXArray.shift().by - ePikaY) < 38) { // Y축 차지하는 피카추 크기+ 공의 크기 8 더함
			score++;
			drawScore(score);				
		}

	}

	function drawScore(score){
		document.getElementById("current_score").innerText = score;
	}

	function drawScreen() {
		counter++;

		if (ePikaup) {
			ePikaY -= 30;
		} else {
			ePikaY += 30;
		}

		if (ePikaY >= 495) {
			ePikaup = true;
		}
		if (ePikaY <= 0) {
			ePikaup = false;
		}

		//배경그리기
		ctx.drawImage(bgImg1, 0, 0, 800, 600);
		if (cloudsImg1X >= 800) {
			cloudsImg1X = 0;
			cloudsImg2X = -800;
		}
		if (cloudsImg2X >= 800) {
			cloudsImg2X = 0;
			cloudsImg1X = -800;
		}
		cloudsImg1X += 30;
		cloudsImg2X += 30;

		ctx.drawImage(cloudsImg1, cloudsImg1X, 0, 800, 200);
		ctx.drawImage(cloudsImg2, cloudsImg2X, 0, 800, 200);

		//내 피카 그리기
		//#### 구름은 느리게, 피카츄는 빠르게: 구름 움직이는 것 보다 피카츄가 빨리 움직이도록
		if (counter % 5 == 0) {
			ctx.drawImage(myPika1, 10, myPikaY, 80, 80);
		}
		else if (counter % 5 == 1) {
			ctx.drawImage(myPika2, 10, myPikaY, 80, 80);
		}
		else if (counter % 5 == 2) {
			ctx.drawImage(myPika3, 10, myPikaY, 80, 80);
		}
		else if (counter % 5 == 3) {
			ctx.drawImage(myPika4, 10, myPikaY, 80, 80);
		}
		else if (counter % 5 == 4) {
			ctx.drawImage(myPika5, 10, myPikaY, 80, 80);
		}
			
		//상대 피카 그리기
		if (counter % 5 == 0) {
			ctx.drawImage(ePika1, 720, ePikaY, 80, 80);
		}
		else if (counter % 5 == 1) {
			ctx.drawImage(ePika2, 720, ePikaY, 80, 80);
		}	
		else if (counter % 5 == 2) {
			ctx.drawImage(ePika3, 720, ePikaY, 80, 80);
		}
		else if (counter % 5 == 3) {
			ctx.drawImage(ePika4, 720, ePikaY, 80, 80);
		}
		else if (counter % 5 == 4) {
			ctx.drawImage(ePika5, 720, ePikaY, 80, 80);
		}
		
		//몬스터 볼 그리기
		//볼 앞으로 보내기
		for (let i = 0; i < ballXArray.length; i++) {
			let ball = ballXArray[i];
			ball.bx += 10;
		}
		
		// 여러개의 볼 이미지 띄우기. 볼 배열에서 꺼내기
		for (let i = 0; i < ballXArray.length; i++) {
			let ball = ballXArray[i];
			if (counter % 5 == 0) {
				ctx.drawImage(monsterBall1, ball.bx, ball.by, 40, 40);
			}
			else if (counter % 5 == 1){
				ctx.drawImage(monsterBall2, ball.bx, ball.by, 40, 40);
			}
			else if (counter % 5 == 2) {
				ctx.drawImage(monsterBall3, ball.bx, ball.by, 40, 40);
			}
			else if (counter % 5 == 3) {
				ctx.drawImage(monsterBall4, ball.bx, ball.by, 40, 40);
			}
			else if (counter % 5 == 4) {
				ctx.drawImage(monsterBall5, ball.bx, ball.by, 40, 40);
			}
		}
		
		//큰 몬스터 볼 그리기
		//큰 몬스터 볼 앞으로 보내기
		for (let i = 0; i < bigBallXArray.length; i++) {
			let bigBall = bigBallXArray[i];
			bigBall.bx += 10;
		}
		
		// 여러개의 빅 볼 이미지 띄우기. 볼 배열에서 꺼내기
		for (let i = 0; i < bigBallXArray.length; i++) {
			let bigBall = bigBallXArray[i];
			if (counter % 5 == 0) {
				ctx.drawImage(monsterBall1, bigBall.bx, bigBall.by, 200, 200);
			}
			else if (counter % 5 == 1){
				ctx.drawImage(monsterBall2, bigBall.bx, bigBall.by, 200, 200);
			}
			else if (counter % 5 == 2) {
				ctx.drawImage(monsterBall3, bigBall.bx, bigBall.by, 200, 200);
			}
			else if (counter % 5 == 3) {
				ctx.drawImage(monsterBall4, bigBall.bx, bigBall.by, 200, 200);
			}
			else if (counter % 5 == 4) {
				ctx.drawImage(monsterBall5, bigBall.bx, bigBall.by, 200, 200);
			}
		}

	}//drawScreen end
