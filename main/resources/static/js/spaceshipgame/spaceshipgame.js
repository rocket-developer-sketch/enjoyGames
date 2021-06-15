/* 배경 */
let bg1 = new Image();
bg1.src="/static/images/spaceshipgame/space.jpg";
let bg2 = new Image();
bg2.src="/static/images/spaceshipgame/space.jpg";
let bg1Y=0;
let bg2Y=-800;
/* 내 비행기 이미지 */
let ship1=new Image();
let ship2=new Image();
let ship3=new Image();
let ship4=new Image();
ship1.src="/static/images/spaceshipgame/gunship4.png";
ship2.src="/static/images/spaceshipgame/gunship5.png";
ship3.src="/static/images/spaceshipgame/gunship6.png";
ship4.src="/static/images/spaceshipgame/gunship7.png";

let counter=0;
let ctx;

let shipX=150;
let shipY=650;

/* 적 비행기 이미지 */
let enemyShip1=new Image(); 
let enemyShip2=new Image(); 
let enemyShip3=new Image(); 
let enemyShip4=new Image(); 
enemyShip1.src="/static/images/spaceshipgame/gunship0.png";
enemyShip2.src="/static/images/spaceshipgame/gunship1.png";
enemyShip3.src="/static/images/spaceshipgame/gunship2.png";
enemyShip4.src="/static/images/spaceshipgame/gunship3.png";

var eShipX=eShipX=Math.floor(Math.random()*550);
let eShipY=10;
let enemyArry=[]; 

/* 미사일 이미지 */
let missileImg = new Image();
missileImg.src="/static/images/spaceshipgame/missile1.png";

let missileX=-150;
let missileY=-400; 
let missileArry=[]; 

let milsileCount=0;
let score=0;
let tries=3;

window.onload=function(){
	let canvas=document.getElementById("spaceshipCanvas");
	ctx=canvas.getContext("2d");

	canvas.onmousemove=moveShip;
	canvas.onmousedown=fireMissile;
	window.setInterval(drawScreen, 30);

}
            
function moveShip(e){
	shipX=e.pageX;
	shipY=e.pageY;
}

function fireMissile(e){
	milsileCount++;
	/* 양 쪽으로 한 번씩 발사 되도록 미사일 위치 조정 */
	let fix=0; 
	if(milsileCount%2==1){
	fix=-25;
	} else {
	fix=25;
	}

	missileX=e.pageX;
	missileY=e.pageY;

	let m = {
	mx: missileX+fix,
	my: missileY
	}

	missileArry.push(m);
	//console.log(missileArry);
}
    
function makeEnemy(){
	let pos = Math.floor(Math.random()*550);
	let enemy = {
	x: pos,
	y: 10
	}

	enemyArry.push(enemy);
}

function writeRunningStatus(){
	ctx.font="35px 고딕";
	createGradient(ctx,spaceshipCanvas);
	ctx.fillText("점수: "+score,50,50);
	ctx.fillText("도전가능횟수: "+tries,300,50);
}



/*
function createGradient(){
	let canvas=document.getElementById("spaceshipCanvas");
	ctx.font="35px 고딕";
	ctx.fillStyle = returnGradientObject(ctx, canvas);
}
*/
function drawBackGroundImage(){
	bg1Y++;
	bg2Y++;

    if(bg1Y>=800){
        bg1Y=-800;
        bg2Y=0;
    }
    
    if(bg2Y>=800){
        bg2Y=-800;
        bg1Y=0;
    }
    
	moveMissile();
   
    ctx.drawImage(bg1,0,bg1Y,600,800);
    ctx.drawImage(bg2,0,bg2Y,600,800);
}

function moveMissile(){
	 for(let i=0; i<missileArry.length; i++){
        let x = missileArry[i];
        x.my-=10;
    }
}

function drawFireMissile(){
	for(let i=0; i<missileArry.length; i++){
        let x = missileArry[i];
        ctx.drawImage(missileImg,x.mx, x.my,5,20); 
		// 적 비행기 맞춘 미사일 제거
        if(x.my<-50){
            missileArry.shift();
        } 
    }
}

function drawMySpaceship(){
	if(counter%4==0) {
		ctx.drawImage(ship1, shipX-25, shipY-25,50,50);
	}
	else if(counter%4==1) {
		ctx.drawImage(ship2, shipX-25, shipY-25,50,50);
	}
	else if(counter%4==2) {
		ctx.drawImage(ship3, shipX-25, shipY-25,50,50);
	}
	else if(counter%4==3) { 
		ctx.drawImage(ship4, shipX-25, shipY-25,50,50);
	}
}

function moveEnemySpaceships(){
	for(let i =0; i<enemyArry.length; i++){
		let es = enemyArry[i];
		es.y+=3;
	}
}

function drawEnemySpaceships(){
    moveEnemySpaceships();

    for(let i =0; i<enemyArry.length; i++){
        let es = enemyArry[i];
        if(counter%4==0) {
            ctx.drawImage(enemyShip1,es.x-25,es.y-25,50,50);
		}
        else if(counter%4==1) { 
            ctx.drawImage(enemyShip2,es.x-25,es.y-25,50,50);
		}
        else if(counter%4==2) { 
            ctx.drawImage(enemyShip3,es.x-25,es.y-25,50,50);
		}
        else if(counter%4==3) { 
            ctx.drawImage(enemyShip4,es.x-25,es.y-25,50,50);
		}

        if(es.y>850){ 
            enemyArry.shift();
        }
    } 
}

function drawScreen(){
	if(tries==0) {
		writeGameOver(score, 200, 500);
		return false;
	}
	
	counter++;     
	/* 비행기 하나 씩 보고 싶으면, %1000 */
	if(counter%80==0){
	makeEnemy();
	}

	drawBackGroundImage();
	drawFireMissile();
	/* 점수, 도전가능횟수등 위치 맨 위로 이동시 화면출력 되지 않음 */
	writeRunningStatus();
	drawMySpaceship();
	drawEnemySpaceships();
	checkCollision();

}

function checkCollision(){
    for(let i =0; i<enemyArry.length; i++){
        let e = enemyArry[i];

	let enemyDistance = pythagoras(shipX, shipY, e.x, e.y);
	/* 적 과 내 비행기가 부딪치는 거리 오차 범위: 3초에 한 번씩 canvas 그리기 때문에 3씩 거리가 줄어 0 이 아닌 1 부터*/
	if(enemyDistance >= 1 && enemyDistance <= 9 && tries >0) {
		collisionByCrushing(e);
	}

	if(missileArry.length>0){
		collisionByMissile(e);
	}
        
    }
}

function collisionByCrushing(e){
	loseTries();
	getEnemyshipsOut(e);
}

function collisionByMissile(e){
	for(let j = 0; j<missileArry.length; j++){
        let m = missileArry[j];
        let distance = pythagoras(m.mx,m.my,e.x,e.y);

        if(distance<40){
		//console.log("득점")
		scoring();
		getEnemyshipsOut(e);
		m.mx=-100;
        }
    }
}

function loseTries(){
	tries--;
}

function scoring(){
	score+=10;
}

function getEnemyshipsOut(e){
	e.x=-300;
}
