var $DOC=document;
var $CANV,$CONT;

var picElements;
var speed;

var bgm;

var nowTimer;
var colorTimer;

var colorSet=['#d4ff3a','#ffe139','#ff8138','#ff5537','#de72ff','#ff71de','#ff7199','#3de1ff','#ffc535'];

var outFlag={
	mode:false,
	start:function (){
		outFlag.fTime=new Date().getTime();
		outFlag.mode=true;
	},
	stop:function (){
		outFlag.mode=false;
		outFlag.fTime=void(0);
	},
	fTime:void(0),
};

// Main loop with draw

window.onload=()=>{
	baseInit();
	setupElements();

	setInterval(()=>{
		$CONT.clearRect(0,0,$CANV.width,$CANV.height);
		setCanvasSize();

		drawElements();

		movePositions(-1*speed,0);

		nowTimer=new Date().getTime();

		if(outFlag.mode&&nowTimer-outFlag.fTime>2250)outFlag.stop();

		if(nowTimer-colorTimer>256){colorTimer=nowTimer;$CANV.style.backgroundColor=colorSet.random();}
	},1);
}

// Function methods

function baseInit(){
	$CANV=$DOC.getElementById('draw-area');
	$CONT=$CANV.getContext('2d');

	setCanvasSize();

	$CANV.style.backgroundColor=colorSet.random();

	speed=0.3;

	colorTimer=new Date().getTime();

	bgm=new Audio();
	bgm.src='bgm/Dyro & Dannic - Radical [OUT NOW!].mp3';
	bgm.loop=true;

	bgm.play();
}

function setCanvasSize(){
	$CANV.width=window.innerWidth/1.3;
	$CANV.height=window.innerHeight/1.3;
}

function setupElements(){
	picElements=[];
	for(i=0;i<3;i++){
		picElements.push(new Object());
		picElements[picElements.length-1].set($CANV.width,$CANV.height/3.5,i,500,500);
	}
}

function drawElements(){
	for(i=0;i<picElements.length;i++){		
		var $E=picElements[i];
		$CONT.drawImage($E.img,$E.x,$E.y+((outFlag.mode&&i==1)*-35),$E.width,$E.height);
	}
}

function movePositions(dx,dy){
	for(i=0;i<picElements.length;i++){
		picElements[i].x+=dx;
		picElements[i].y+=dy;
		if(picElements[i].x<-550){
			picElements[i].x=$CANV.width;
			speed=(Math.random()*1.9)+0.1;
		}
	}
}

// Object methods

Object.prototype.set=function (x,y,id,width,height){
	this.x=x;
	this.y=y;
	this.img=new Image();
	this.img.src=`picture/pic_${id}.png`;
	this.width=width;
	this.height=height;
}

// Array methods

Array.prototype.random=function (){
return this[~~(Math.random()*this.length-1)];
}

// Key board methods

$DOC.onkeydown=e=>{if(e.keyCode==32&&!outFlag.mode)outFlag.start();}