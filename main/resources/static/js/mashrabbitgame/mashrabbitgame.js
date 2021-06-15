//토끼 잔상 해결방법: bgImg2 변수 한개 더 만들어서 img2개를 1개가 끝에 가면, 다른 것이 이어 받도록 하면 무한의 길
var bgImg1 = new Image();
var bgImg2 = new Image();
bgImg1.src="/static/images/mashrabbitgame/bg.jpg";
bgImg2.src="/static/images/mashrabbitgame/bg.jpg"; 
var bg1X = 0; 
var bg2X = 800; 

var rabbit1 = new Image();
rabbit1.src="/static/images/mashrabbitgame/rabbit1.png";
var rabbit2 = new Image();
rabbit2.src="/static/images/mashrabbitgame/rabbit2.png";

var rabbitX = 100;
var rabbitY = 100;

var ctx;
var counter=0;
        
var snipeImg = new Image();
snipeImg.src="/static/images/mashrabbitgame/snipe.png";
var snipeX=100;
var snipeY=100;
        
var holeImg=new Image();
holeImg.src="/static/images/mashrabbitgame/hole.png";
var holeX=-200;
var holeY=-200;
var holeArry=[];
        
var reboundY=0;        
var isReload = false;  
var score=0;

window.onload=function(){
	var canvas=document.getElementById("mashrabbitCanvas");
	ctx=canvas.getContext("2d");
	var body=document.body;
	body.onkeydown=moveRabbit; 
	window.setInterval(drawScreen,100);
	canvas.onmousemove=moveSnipe; 
	canvas.onmousedown=fire; 
}

function moveRabbit(e){
	if(e.keyCode==38) {
		rabbitY=3;
	}
	else if(e.keyCode==37) { 
		rabbitX-=3;
	}
	else if(e.keyCode==40) { 
		rabbitY+=3;
	}
	else if(e.keyCode==39) { 
		rabbitX+=3;
	}
}

function fire(e){
	if(isReload) {
		return;	
	}
	
	isReload=true;
	reboundY=50;
	holeX=e.pageX;
	holeY=e.pageY;
	
	var dis = pythagoras(rabbitX, rabbitY, holeX, holeY);
	
	if(dis<=60) { 
	    score+=100;

	    holeX-=rabbitX;
	    holeY-=rabbitY;
	    
	    var h = {
	        x: holeX,
	        y: holeY
	    }

	    holeArry.push(h);
	    randomPosition();
	}
}

function moveSnipe(e){
	snipeX=e.pageX;
	snipeY=e.pageY;
}

function drawScreen(){ //그리는 위치가 중요함
	if(counter == 500) {
		writeGameOver(score, 200, 300);
		return false;
	}
	
	counter++;
	//시간 세주는 변수 counter. 숫자 늘이면, 느리게 도망감
	if(counter%10==0){
	    randomPosition();
	}
	
	if(reboundY>=3){
	    reboundY-=3;
	}
	
	if(reboundY<3){
	    if(isReload){
	        reboundY=0;
	        isReload=false;
	    }
	}
	  
	moveBackgrond();
	drawBackground();
	drawMashRabbit();
	writeScores();
	drawHoles();
	drawSniper();  
}

function randomPosition(){
    rabbitX=Math.floor(Math.random()*700);
    rabbitY=Math.floor(Math.random()*500);
}

function moveBackgrond(){	  
    bg1X--;
    bg2X--;

    if(bg1X<=-800){
        bg1X=800;
        bg2X=0;
    }
    if(bg2X<=-800){
        bg2X=800;
        bg1X=0;
    }
}

function drawBackground(){
    ctx.drawImage(bgImg1, bg1X, 0, 800, 600);
    ctx.drawImage(bgImg2, bg2X, 0, 800, 600);
}

function drawMashRabbit(){
	if(counter%2==1){
        ctx.drawImage(rabbit1, rabbitX-50 , rabbitY-50, 100, 100);
    }else{            
        ctx.drawImage(rabbit2, rabbitX-50 , rabbitY-50, 100, 100);
    }
}

function drawHoles(){
	 for(var i = 0; i<holeArry.length; i++){
        var h = holeArry[i];
        ctx.drawImage(holeImg, h.x-5+rabbitX, h.y-5+rabbitY,10,10);
    }
}

function drawSniper(){
	 ctx.drawImage(snipeImg, snipeX-50, snipeY-50-reboundY, 100,100);
}

function writeScores(){
	ctx.font="35px 고딕";
	createGradient(ctx,mashrabbitCanvas);
	ctx.fillText("score:"+score, 300, 50);
}
