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