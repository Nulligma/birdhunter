var preBar,preBarWidth,preplay,muteBtn,rotateImg;
var firstRunPotrait = false;
var Boot = 
{
	preload : function() 
    {
        this.game.SaveCPU = this.game.plugins.add(Phaser.Plugin.SaveCPU);
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

        firstRunPotrait = game.scale.isGamePortrait;

    	game.load.image('preplay', './assets/preload/playgame.png');
        game.load.image('pregameName', './assets/preload/BH_Text.png');
        game.load.image('preBar', './assets/preload/preloadBar.png');
        game.load.image('muteOn', './assets/preload/muteOn.png');
        game.load.image('muteOff', './assets/preload/muteOff.png');
        game.load.image('rotateToLandscape', './assets/preload/rotateToLandscape.jpg');

    },
    create: function () 
    {
        
		game.scale.forceOrientation(true, false);
	    game.scale.leaveIncorrectOrientation.add(this.handleCorrect);
		game.scale.enterIncorrectOrientation.add(this.handleIncorrect);

    	var gn = game.add.sprite(game.world.centerX,game.world.centerY*0.8,"pregameName");
    	gn.anchor.setTo(0.5,0.5);

    	preBar = game.add.sprite(game.world.centerX,gn.y+gn.height,"preBar");
    	preBar.anchor.setTo(0.5,0.5);
    	preBarWidth = preBar.width;
    	initResize();

        game.load.onLoadStart.add(this.preloadStart, this);
        game.load.onFileComplete.add(this.prefileComplete, this);
        game.load.onLoadComplete.add(this.preloadComplete, this);

    	this.loadImages();
    },
    changeSize:function()
    {
    	preplay.kill();
    	if(mobile)
    	{
    		game.scale.onFullScreenChange.add(Boot.onChangeFullScreen, this);
    		game.scale.onFullScreenError.add(Boot.startWithoutMobile, this);
    		game.scale.startFullScreen(false);
    	}
    	else
    	{
			Boot.startGame();
    	}

    },
    changeMute:function()
    {
    	game.sound.mute = !game.sound.mute;
    	if(game.sound.mute)
    	{
    		muteBtn.loadTexture("muteOn");
    	}
    	else
    	{
    		muteBtn.loadTexture("muteOff");
    	}
    },
    startWithoutMobile:function()
    {
    	mobile = false;
    	this.startGame();
    },
    startGame:function()
    {

        game.scale.leaveIncorrectOrientation.remove(Boot.handleCorrect);
        game.scale.enterIncorrectOrientation.remove(Boot.handleIncorrect);

		initResize();
    	game.scale.setGameSize(canvasWidth,canvasHeight);

		game.state.start('Menu');
    },

    onChangeFullScreen:function(scale)
    {
    	if (scale.isFullScreen) 
    	{
    		//game.scale.pageAlignHorizontally = true;        
    		//game.scale.pageAlignVertically = true;
    		game.time.events.add(100, Boot.startGame, this).autoDestroy = true;
		}
    },
    loadImages:function()
    {
        game.load.audio('clickSound', './assets/sounds/fx/click.mp3');
        game.load.audio('menuSound', './assets/sounds/loop/menu.mp3');

        game.load.image('menu', './assets/'+screenSize+'/BG_Sun.png');
        game.load.image('stage_1', './assets/'+screenSize+'/stageBG.png');
        game.load.image('stage_2', './assets/'+screenSize+'/stageBG_2.png');
        game.load.image('stage_3', './assets/'+screenSize+'/stageBG_3.png');
        game.load.image('stage_4', './assets/'+screenSize+'/stageBG_4.png');
        game.load.image('stage_5', './assets/'+screenSize+'/stageBG_5.png');
        game.load.image('stage_6', './assets/'+screenSize+'/stageBG_6.png');
        game.load.image('stage_7', './assets/'+screenSize+'/stageBG_7.png');
        game.load.image('stage_8', './assets/'+screenSize+'/stageBG_8.png');
        game.load.image('gameName', './assets/'+screenSize+'/BH_Text.png');
        game.load.image('bottomGrass', './assets/'+screenSize+'/1st_page_Grass.png');
        game.load.image('bottomWheat', './assets/'+screenSize+'/Stage2_fg.png');
        game.load.image('bottomFoil', './assets/'+screenSize+'/Stage3_fg.png');
        game.load.image('bird', './assets/'+screenSize+'/1st_page_Bird.png');
        game.load.image('menuMan', './assets/'+screenSize+'/1st_Page_Man.png');
        game.load.image('credits', './assets/'+screenSize+'/credits.png');
        game.load.image('play', './assets/'+screenSize+'/playgame.png');
        game.load.image('stageOpenBtn', './assets/'+screenSize+'/stageOpen.png');
        game.load.image('hardstageOpenBtn', './assets/'+screenSize+'/hardstageOpen.png');
        game.load.image('insanestageOpenBtn', './assets/'+screenSize+'/insanestageOpen.png');
        game.load.image('stageCompleteBtn', './assets/'+screenSize+'/stageComplete.png');
        game.load.image('stageLockBtn', './assets/'+screenSize+'/stageLock.png');
        game.load.image('nextDiffBtn', './assets/'+screenSize+'/nextDiffBtn.png');
        game.load.image('nextDiffBtnOff', './assets/'+screenSize+'/nextDiffBtnOff.png');
        game.load.image('closeBtn', './assets/'+screenSize+'/closeBtn.png');
        game.load.image('huntsBtn', './assets/'+screenSize+'/hunts.png');
        game.load.image('huntHolder', './assets/'+screenSize+'/huntHolder.png');

        game.load.image('deviceRotate', './assets/'+screenSize+'/deviceRotate.png');

        game.load.atlasJSONHash('crow', './assets/'+screenSize+'/birds/crow.png', './assets/'+screenSize+'/birds/crow.json');
        game.load.atlasJSONHash('cardinal', './assets/'+screenSize+'/birds/redbird.png', './assets/'+screenSize+'/birds/redbird.json');
        game.load.atlasJSONHash('sparrow', './assets/'+screenSize+'/birds/sparrow.png', './assets/'+screenSize+'/birds/sparrow.json');
        game.load.atlasJSONHash('woodpecker', './assets/'+screenSize+'/birds/blackbird.png', './assets/'+screenSize+'/birds/blackbird.json');
        game.load.atlasJSONHash('seagull', './assets/'+screenSize+'/birds/alba.png', './assets/'+screenSize+'/birds/alba.json');
        game.load.atlasJSONHash('casowary', './assets/'+screenSize+'/birds/caso.png', './assets/'+screenSize+'/birds/caso.json');
        game.load.atlasJSONHash('parrot', './assets/'+screenSize+'/birds/parrot.png', './assets/'+screenSize+'/birds/parrot.json');
        game.load.atlasJSONHash('eagle', './assets/'+screenSize+'/birds/eagle.png', './assets/'+screenSize+'/birds/eagle.json');
        game.load.atlasJSONHash('goose', './assets/'+screenSize+'/birds/goose.png', './assets/'+screenSize+'/birds/goose.json');
        game.load.atlasJSONHash('pigeon', './assets/'+screenSize+'/birds/pigeon.png', './assets/'+screenSize+'/birds/pigeon.json');
        game.load.atlasJSONHash('dove', './assets/'+screenSize+'/birds/dove.png', './assets/'+screenSize+'/birds/dove.json');
        game.load.atlasJSONHash('flamingo', './assets/'+screenSize+'/birds/flam.png', './assets/'+screenSize+'/birds/flam.json');

        game.load.start();
    },

    preloadStart:function()
    {
        console.log("load started");
    },

    preloadComplete:function()
    {
    	preplay = game.add.button(preBar.x,preBar.y,"preplay",this.changeSize);
    	preplay.anchor.setTo(0.5,0.5);

        muteBtn = game.add.button(preBar.x,preBar.y+preBar.height*1.5,"muteOff",this.changeMute);
    	muteBtn.anchor.setTo(0.5,0.5);

        preBar.kill();

        game.load.onLoadStart.remove(this.preloadStart, this);
        game.load.onFileComplete.remove(this.prefileComplete, this);
        game.load.onLoadComplete.remove(this.preloadComplete, this);
    },

    prefileComplete:function(progress, cacheKey, success, totalLoaded, totalFiles) 
    {
        var percent = (totalLoaded/totalFiles);
        preBar.width = preBarWidth*percent;
    },

    handleIncorrect:function()
    {
		if(!game.device.desktop)
		{
     		rotateImg = game.add.sprite(0,0,'rotateToLandscape');
     		rotateImg.width = game.width;
     		rotateImg.height = game.height;

     		game.paused = true;
		}
    },

    handleCorrect:function()
    {
    	if(!game.device.desktop)
		{
     		game.paused = false;
			if(firstRunPotrait)
			{
				//canvasWidth = Math.max(window.innerWidth,window.innerHeight);
				//canvasHeight = Math.min(window.innerWidth,window.innerHeight);
    			//game.scale.setGameSize(canvasWidth,canvasHeight);
    			game.renderer.resize(720,400);
    			firstRunPotrait = false;
			}

     		if(rotateImg) rotateImg.kill();
		}

    },

}