function createGradient(ctx,canvasTag){
	let canvas=document.getElementById(canvasTag.id);
	ctx.fillStyle = returnGradientObject(ctx, canvas);
}

function returnGradientObject(ctx, canvas){
	var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");	
	return gradient;
}

function writeGameOver(Finalscore, x, y){
	ctx.font="35px 고딕";
	ctx.fillStyle="white";
	ctx.fillText("게임 종료",200,400);
	ctx.fillText("최종 점수: "+Finalscore,x,y);
}