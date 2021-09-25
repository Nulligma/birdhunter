var canvasWidth;
var canvasHeight;
var fullHeight;
var screenSize;
var game;
var screenMultiplier;
var ratio;

var mobile = false;

function initResize()
{
	var w,h;

	if(mobile)
	{
		ratio = window.devicePixelRatio || 1;
		w = screen.width * ratio;
		h = screen.height * ratio;
	}
	else
	{
		w = window.innerWidth;
		h = window.innerHeight;
	}

	var browserWidth = Math.max(w,h);
	var browserHeight = Math.min(w,h);


	  screenSize = "normal";
	  canvasWidth = 480;
	  screenMultiplier = 1;
	  
	 if(browserWidth >= 720)
	{
	  screenSize = "large";
	  canvasWidth = 720;
	  screenMultiplier = 1.5;
	}
	 if(browserWidth >= 960)
	{
	  screenSize = "xlarge";
	  canvasWidth = 960;
	  screenMultiplier = 2;
	}
	 if(browserWidth >= 1440)
	{
	  screenSize = "xxlarge";
	  canvasWidth = 1440;
	  screenMultiplier = 3;
	}

    canvasHeight = Math.round((canvasWidth * browserHeight)/browserWidth);
}

function init()
{
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
	{
	 mobile = true;
	}

	canvasWidth = Math.max(window.innerWidth,window.innerHeight);
	canvasHeight = Math.min(window.innerWidth,window.innerHeight);

	game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, '',null,false,false);

	/*
	var config = {
    "width": canvasWidth,
    "height": canvasHeight,
    "renderer": Phaser.CANVAS,
    "parent": 'phaser-example',
    "resolution": window.devicePixelRatio
	};

	game = new Phaser.Game(config);
	*/


	game.state.add('Boot', Boot);
	game.state.add('Menu', Menu);
	game.state.add('Game', Game);

	game.state.start('Boot');

}
