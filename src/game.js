var downX,downY,launchVelocity,trajectoryGraphics,drawTrajectory,bowAndArrow;
var GRAVITY,NUMBER_OF_ARROWS,NUMBER_OF_BIRDS,arrowPower,radian,arrowPool,hud;
var birdSpeedMul,canvasSpeedMul; 

var missed;
var pauseTheGame;
var timeText,missText,comboText,coinsText,sheildText,quiverText;

var buyScreen;

var birdsPool;
var booms;

var level,mode;

var gameStarted;

var combo,oldCombo,perfectCombo;

var arrow1Btn,arrow2Btn,arrow3Btn,arrow4Btn;

var arrow1Text,arrow2Text,arrow3Text,arrow4Text;

var gameTimer;
var ub1,ub2,ub3;
var ut1,ut2,ut3;

var score;
var pauseTxt,pauseBG;

var birdKills;
var qb,rb,pauseBtn,quitBtn;
var pauseGroup,pauseScore,pauseCoins;
var reloading,reloadBar,reloadTxt,reloadTimer,reloadBarWidth;
var birdCount,rotateImg;

var currQuiverCount;
var currSheilds;
var quiverHUD, buyQuiverTxt, buySheildTxt, quiverCostTxt, sheildCostTxt;

var gameSound,arrow1Sound,arrow2Sound,arrow3Sound,arrow4Sound,changeArrowSound,gameOverSound,explodeSound,arrowHitSound,stageCompleteSound,purchasedSound;

var Game = 
{

    preload : function() 
    {
            if(level<9)              { game.load.image('bg', './assets/'+screenSize+'/Stage1_bg.png'); game.load.audio('gameSound', './assets/sounds/loop/calpomat.mp3');  }
            if(level>8 && level<17)  { game.load.image('bg', './assets/'+screenSize+'/Stage2_bg.png'); game.load.audio('gameSound', './assets/sounds/loop/pryght.mp3');    }
            if(level>16 && level<25) { game.load.image('bg', './assets/'+screenSize+'/Stage3_bg.png'); game.load.audio('gameSound', './assets/sounds/loop/calpomat.mp3');   }
            if(level>24 && level<33) { game.load.image('bg', './assets/'+screenSize+'/Stage4_bg.png'); game.load.audio('gameSound', './assets/sounds/loop/erh_strings.mp3');   }
            if(level>32 && level<41) { game.load.image('bg', './assets/'+screenSize+'/Stage5_bg.png'); game.load.audio('gameSound', './assets/sounds/loop/pryght.mp3');   }
            if(level>40 && level<49) { game.load.image('bg', './assets/'+screenSize+'/Stage6_bg.png'); game.load.audio('gameSound', './assets/sounds/loop/calpomat.mp3');   }
            if(level>48 && level<57) { game.load.image('bg', './assets/'+screenSize+'/Stage7_bg.png'); game.load.audio('gameSound', './assets/sounds/loop/pryght.mp3');   }
            if(level>56 && level<65) { game.load.image('bg', './assets/'+screenSize+'/Stage8_bg.png'); game.load.audio('gameSound', './assets/sounds/loop/erh_strings.mp3');   }


        game.scale.leaveIncorrectOrientation.add(this.handleCorrect_inGame);
        game.scale.enterIncorrectOrientation.add(this.handleIncorrect_inGame);

        game.load.audio('arrow1Sound', './assets/sounds/fx/arrow1.mp3');
        game.load.audio('arrow2Sound', './assets/sounds/fx/arrow2.mp3');
        game.load.audio('arrow3Sound', './assets/sounds/fx/arrow3.mp3');
        game.load.audio('arrow4Sound', './assets/sounds/fx/arrow4.mp3');
        game.load.audio('arrowHitSound', './assets/sounds/fx/arrowHit.mp3');
        game.load.audio('changeArrowSound', './assets/sounds/fx/changeArrow.mp3');
        game.load.audio('explodeSound', './assets/sounds/fx/explode.mp3');
        game.load.audio('gameOverSound', './assets/sounds/fx/gameOver.mp3');
        game.load.audio('stageCompleteSound', './assets/sounds/fx/stageComplete.mp3');
        game.load.audio('purchasedSound', './assets/sounds/fx/purchased.mp3');
        game.load.image('deviceRotate', './assets/'+screenSize+'/deviceRotate.png');
        
        game.load.image('man', './assets/'+screenSize+'/man.png');
        game.load.image('bowAndArrow', './assets/'+screenSize+'/bowAndArrow.png');
        game.load.image('wood', './assets/'+screenSize+'/wood.png');

        game.load.image('basicArrow', './assets/'+screenSize+'/basicArrow.png');
        game.load.image('goldArrow', './assets/'+screenSize+'/goldArrow.png');
        game.load.image('diamondArrow', './assets/'+screenSize+'/diamondArrow.png');
        game.load.image('dynamiteArrow', './assets/'+screenSize+'/dynamiteArrow.png');

        game.load.image('timeHUD_Image', './assets/'+screenSize+'/scoresymbol.png');
        game.load.image('missHUD_Image', './assets/'+screenSize+'/misssymbol.png');
        game.load.image('comboHUD_Image', './assets/'+screenSize+'/combometer.png');

        game.load.image('arrow1Disabled', './assets/'+screenSize+'/arrow1Disabled.png');
        game.load.image('arrow1Enabled', './assets/'+screenSize+'/arrow1Enabled.png');
        game.load.image('arrow2Disabled', './assets/'+screenSize+'/arrow2Disabled.png');
        game.load.image('arrow2Enabled', './assets/'+screenSize+'/arrow2Enabled.png');
        game.load.image('arrow3Disabled', './assets/'+screenSize+'/arrow3Disabled.png');
        game.load.image('arrow3Enabled', './assets/'+screenSize+'/arrow3Enabled.png');
        game.load.image('arrow4Disabled', './assets/'+screenSize+'/arrow4Disabled.png');
        game.load.image('arrow4Enabled', './assets/'+screenSize+'/arrow4Enabled.png');

        game.load.image('buyArrow2x1', './assets/'+screenSize+'/buyArrow2x1.png');
        game.load.image('buyArrow2x10', './assets/'+screenSize+'/buyArrow2x10.png');
        game.load.image('buyArrow3x1', './assets/'+screenSize+'/buyArrow3x1.png');
        game.load.image('buyArrow3x10', './assets/'+screenSize+'/buyArrow3x10.png');
        game.load.image('buyArrow4x1', './assets/'+screenSize+'/buyArrow4x1.png');
        game.load.image('buyArrow4x10', './assets/'+screenSize+'/buyArrow4x10.png');
        game.load.image('buyBlank', './assets/'+screenSize+'/buyBlank.png');

        game.load.image('sheild', './assets/'+screenSize+'/sheild.png');
        game.load.image('quiver', './assets/'+screenSize+'/quiver.png');

        game.load.image('playBG', './assets/'+screenSize+'/playbg.png');
        game.load.image('pauseBG', './assets/'+screenSize+'/pauseBG.png');
        game.load.image('stageOverBG', './assets/'+screenSize+'/stageOverBG.png');
        game.load.image('stageCompleteTxt', './assets/'+screenSize+'/stageCompleteTxt.png');
        game.load.image('pauseTxt', './assets/'+screenSize+'/pauseTxt.png');
        game.load.image('gameoverTxt', './assets/'+screenSize+'/gameoverTxt.png');
        game.load.image('coins', './assets/'+screenSize+'/coins.png');

        game.load.image('reloadTxt', './assets/'+screenSize+'/reloadTxt.png');
        game.load.image('reloadBar', './assets/'+screenSize+'/reloadBar.png');

        game.load.image('quitBtn', './assets/'+screenSize+'/quitBtn.png');
        game.load.image('nextBtn', './assets/'+screenSize+'/nextBtn.png');
        game.load.image('resumeBtn', './assets/'+screenSize+'/resumeBtn.png');
        game.load.image('pauseBtn', './assets/'+screenSize+'/pauseBtn.png');

        game.load.atlasJSONHash('boom', './assets/'+screenSize+'/boom.png', './assets/'+screenSize+'/boom.json');
        game.load.atlasJSONHash('upgradeBar', './assets/'+screenSize+'/upgradeBar.png', './assets/'+screenSize+'/upgradeBar.json');
    },

    create: function () 
    {
        loadStats(level,mode);
        
        gameSound = game.add.audio('gameSound');
        arrow1Sound = game.add.audio('arrow1Sound');
        arrow2Sound = game.add.audio('arrow2Sound');
        arrow3Sound = game.add.audio('arrow3Sound');
        arrow4Sound = game.add.audio('arrow4Sound');
        changeArrowSound = game.add.audio('changeArrowSound');
        explodeSound = game.add.audio('explodeSound');
        arrowHitSound = game.add.audio('arrowHitSound');
        stageCompleteSound = game.add.audio('stageCompleteSound');
        gameOverSound = game.add.audio('gameOverSound');
        purchasedSound = game.add.audio('purchasedSound');
        gameSound.play("",0,1,true);

        birdSpeedMul = mode == "normal"?1:"hard"?1.25:1.5;

        pauseTheGame = false;

        canvasSpeedMul = canvasWidth/canvasHeight;

        GRAVITY = 980;
    	NUMBER_OF_ARROWS = 20;
        gameStarted = false;

        missed = birdCount = combo = score = arrowPower = 0;
        currentArrow = 1;

        reloading = false;

        perfectCombo = true;

        birdsPool = [];
        booms = [];
        birdKills = [];
        
        NUMBER_OF_BIRDS = 20;

        currQuiverCount = quiverCapacity;
        currSheilds = comboShields;

    	game.physics.startSystem(Phaser.Physics.ARCADE);

        var bg = this.add.sprite(game.world.centerX, game.world.centerY, 'bg');
        bg.anchor.setTo(0.5,0.5);

        hud = this.add.sprite(game.world.width/2, 0, 'wood');
        hud.y = game.world.height - hud.height/2;
        hud.anchor.setTo(0.5,0.5);

        
        var size = 11*screenMultiplier + "px";
        var style = { font: size+" BADABB", fill: "#ffffff", align: "center" };

        launchVelocity = new Phaser.Point(0, 0);

		trajectoryGraphics = game.add.graphics(0, 0); 

		drawTrajectory = false;

		arrowPool = game.add.group();
	    for(var i = 0; i < NUMBER_OF_ARROWS; i++) 
	    {
	        // Create each bullet and add it to the group.
	        var arrow = game.add.sprite(0, 0, 'basicArrow');
	        arrowPool.add(arrow);

            arrow.enableBody = true;

	        // Set its pivot point to the center of the arrow
	        arrow.anchor.setTo(0.5, 0.5);

	        // Enable physics on the arrow
	        game.physics.enable(arrow, Phaser.Physics.ARCADE);

	        // Set its initial state to "dead".
	        arrow.kill();
            arrow.events.onOutOfBounds.add(this.resetCombo, this);
            arrow.checkWorldBounds = true;
            arrow.outOfBoundsKill = false;
	    }

        buyScreen = game.add.group();

        var pb = this.add.sprite(game.world.centerX, game.world.centerY, 'playBG');
        pb.anchor.setTo(0.5, 0.5);

        buyScreen.add(pb); 
        
        var arrowBtn,arrowText,arrowCount;
        for(var j = 1; j <= 4; j++) 
        {
            arrowBtn = this.add.button(0,0,"arrow"+j+"Enabled",this.changeArrow,this);
            arrowBtn.number = j;

            arrowBtn.anchor.setTo(0.5, 0.5);
            arrowBtn.x = pb.x-pb.width/2 + arrowBtn.width;
            arrowBtn.y = pb.y-pb.height/2 + arrowBtn.height*1.7*(j-1) + arrowBtn.height;
            
            if(j!=1)
            {
                size = 11*screenMultiplier + "px";
                style = { font: size+" BADABB", fill: "#00ff00", align: "center" };
                arrowCount = j==2?goldenArrows:j==3?diamondArrows:bombArrows;
                arrowText = this.add.text(arrowBtn.x,arrowBtn.y-arrowBtn.height*0.05, arrowCount, style);
                arrowText.padding.set(10, 0);

                window["arrow"+j+"Text"] = arrowText;

                style = { font: size+" BADABB", fill: "#ffffff", align: "center" };

                var onex = game.add.button(arrowBtn.x+arrowBtn.width*1.25,arrowBtn.y,"buyBlank",this.buyArrow,this);
                onex.anchor.setTo(0.5, 0.5);

                if(j==2)
                    {game.add.text(Math.round(arrowBtn.x-arrowBtn.width/2),arrowBtn.y+arrowBtn.height*0.8, "Coin = Combo", style,buyScreen).anchor.setTo(0, 0.5); onex.buy = "coin"}
                else if(j==3)
                    {game.add.text(Math.round(arrowBtn.x-arrowBtn.width/2),arrowBtn.y+arrowBtn.height*0.8, "pierce through birds", style,buyScreen).anchor.setTo(0, 0.5); onex.buy = "diamond"}
                else if(j==4)
                    {game.add.text(Math.round(arrowBtn.x-arrowBtn.width/2),arrowBtn.y+arrowBtn.height*0.8, "explodes", style,buyScreen).anchor.setTo(0, 0.5); onex.buy = "bomb"}

                //var tenx = game.add.button(onex.x+onex.width*1.15,arrowBtn.y,"buyArrow"+j+"x10",this.buyArrow,this);
                //tenx.anchor.setTo(0.5, 0.5);

                buyScreen.add(onex);
                //buyScreen.add(tenx);

                size = 16*screenMultiplier + "px";
                style = { font: size+" BADABB", fill: "#ffcc00", align: "center" }
                    

                if(j==2)
                {
                    game.add.text(onex.x-onex.width*0.25,onex.y, "5", style,buyScreen).anchor.setTo(0, 0.5);
                    
                    var qBtn = game.add.button(0,0,"buyBlank",this.buyArrow,this);
                    qBtn.buy = "quiver";
                    qBtn.anchor.setTo(0.5, 0.5);
                    buyScreen.add(qBtn);
                    var qHUD = game.add.sprite(arrowBtn.x+onex.width*2,arrowBtn.y,"quiver",this);
                    qHUD.anchor.setTo(0.5,0.5);
                    buyScreen.add(qHUD);

                    qBtn.x = qHUD.x+qHUD.width*1.25;qBtn.y = qHUD.y;
                    var qC = currQuiverCount == 6?"max":(100*(quiverCapacity-1));
                    quiverCostTxt = game.add.text(qBtn.x-qBtn.width*0.25,qBtn.y, qC, style,buyScreen);
                    quiverCostTxt.anchor.setTo(0, 0.5);

                    size = 11*screenMultiplier + "px";
                    style = { font: size+" BADABB", fill: "#ffffff", align: "center" };
                    game.add.text(qHUD.x-qHUD.width/2,arrowBtn.y+arrowBtn.height*0.8, "Arrows", style,buyScreen).anchor.setTo(0, 0.5);
                    
                    style = { font: size+" BADABB", fill: "#000000", align: "center" };
                    buyQuiverTxt = this.add.text(qHUD.x+qHUD.width*0.2,qHUD.y+qHUD.width*0.2, currQuiverCount, style,buyScreen);
                    buyQuiverTxt.anchor.setTo(0.5,0.5);                    
                }
                else if(j==3)
                {
                    game.add.text(onex.x-onex.width*0.25,onex.y, "10", style,buyScreen).anchor.setTo(0, 0.5);
                    
                    var qBtn = game.add.button(0,0,"buyBlank",this.buyArrow,this);
                    qBtn.buy = "sheild";
                    qBtn.anchor.setTo(0.5, 0.5);
                    buyScreen.add(qBtn);
                    var qHUD = game.add.sprite(arrowBtn.x+onex.width*2,arrowBtn.y,"sheild",this);
                    qHUD.anchor.setTo(0.5,0.5);
                    buyScreen.add(qHUD);

                    var sC = currSheilds == 3?"max":(100*(comboShields+1));
                    qBtn.x = qHUD.x+qHUD.width*2;qBtn.y = qHUD.y;
                    sheildCostTxt = game.add.text(qBtn.x-qBtn.width*0.25,qBtn.y, sC, style,buyScreen);
                    sheildCostTxt.anchor.setTo(0, 0.5);

                    size = 11*screenMultiplier + "px";
                    style = { font: size+" BADABB", fill: "#ffffff", align: "center" };
                    game.add.text(qHUD.x-qHUD.width/2,arrowBtn.y+arrowBtn.height*0.8, "Combo Shields", style,buyScreen).anchor.setTo(0, 0.5);
                    
                    buySheildTxt = this.add.text(qHUD.x,qHUD.y, currSheilds, style,buyScreen);
                    buySheildTxt.anchor.setTo(0.5,0.5);

                    qHUD.scale.setTo(1.2,1.2);
                    
                }
                else if(j==4)
                {
                    game.add.text(onex.x-onex.width*0.25,onex.y, "50", style,buyScreen).anchor.setTo(0, 0.5);
                }

            }

            window["arrow"+j+"Btn"] = arrowBtn;
        }

        arrow1Btn.visible = false;

        //game.add.text(Math.round(onex.x),arrow2Btn.y-arrow2Btn.height*0.75, "Buy +1", style,buyScreen).anchor.setTo(0.5, 0.5);
        //game.add.text(Math.round(tenx.x),arrow2Btn.y-arrow2Btn.height*0.75, "Buy +10", style,buyScreen).anchor.setTo(0.5, 0.5);

        game.add.text(Math.round(pb.x+pb.width/2.35),arrow2Btn.y-arrow2Btn.height*0.75, "upgrade", style,buyScreen).anchor.setTo(0.5, 0.5);
        
        size = 14*screenMultiplier + "px";
        style = { font: size+" BADABB", fill: "#ffffff", align: "center" };
        
        game.add.text(Math.round(pb.x+pb.width/10),arrow2Btn.y, "reload", style,buyScreen).anchor.setTo(0.5, 0.5);
        game.add.text(Math.round(pb.x+pb.width/10),arrow3Btn.y, "power", style,buyScreen).anchor.setTo(0.5, 0.5);
        game.add.text(Math.round(pb.x+pb.width/10),arrow4Btn.y, "net", style,buyScreen).anchor.setTo(0.5, 0.5);

        size = 16*screenMultiplier + "px";
        style = { font: size+" BADABB", fill: "#ffcc00", align: "center" };
        ub1 = game.add.sprite(pb.x+pb.width/4,arrow2Btn.y,"upgradeBar");
        ub1.anchor.setTo(0.5,0.5);ub1.frame = reloadLvl;
        buyScreen.add(ub1);
        var buyBlank = game.add.button(pb.x+pb.width/2.35,arrow2Btn.y,"buyBlank",this.buyUpgrade,this);
        buyBlank.anchor.setTo(0.5, 0.5);
        buyBlank.number = 1;
        buyScreen.add(buyBlank);
        ut1 = game.add.text(Math.round(buyBlank.x - buyBlank.width*0.15),buyBlank.y, (reloadLvl+1)*10, style,buyScreen);
        ut1.anchor.setTo(0.5, 0.5);

        ub2 = game.add.sprite(pb.x+pb.width/4,arrow3Btn.y,"upgradeBar");
        ub2.anchor.setTo(0.5,0.5);
        buyScreen.add(ub2);ub2.frame = powerLvl;
        buyBlank = game.add.button(pb.x+pb.width/2.35,arrow3Btn.y,"buyBlank",this.buyUpgrade,this);
        buyBlank.anchor.setTo(0.5, 0.5);
        buyBlank.number = 2;
        buyScreen.add(buyBlank);
        ut2 = game.add.text(Math.round(buyBlank.x - buyBlank.width*0.15),buyBlank.y, (powerLvl+1)*10, style,buyScreen);
        ut2.anchor.setTo(0.5, 0.5);

        ub3 = game.add.sprite(pb.x+pb.width/4,arrow4Btn.y,"upgradeBar");
        ub3.anchor.setTo(0.5,0.5);ub3.frame = netLvl;
        buyScreen.add(ub3);
        buyBlank = game.add.button(pb.x+pb.width/2.35,arrow4Btn.y,"buyBlank",this.buyUpgrade,this);
        buyBlank.anchor.setTo(0.5, 0.5);
        buyBlank.number = 3;
        buyScreen.add(buyBlank);
        ut3 = game.add.text(Math.round(buyBlank.x - buyBlank.width*0.15),buyBlank.y, (netLvl+1)*10, style,buyScreen);
        ut3.anchor.setTo(0.5, 0.5);


        buyScreen.create(pb.x+pb.width/10,pb.y-pb.height*0.42,"coins").anchor.setTo(0.5, 0.5);

        size = 20*screenMultiplier + "px";
        style = { font: size+" BADABB", fill: "#ffcc00", align: "center" };
        coinsText = game.add.text(pb.x,pb.y-pb.height*0.40, coins, style,buyScreen);
        coinsText.padding.set(10, 0);
        coinsText.anchor.setTo(0.5, 0.5);

        var playBtn = game.add.button(pb.x,pb.y+pb.height*0.425,"play",this.start,this);
        playBtn.setDownSound(clickSound);
        playBtn.anchor.setTo(0.5, 0.5);
        buyScreen.add(playBtn);
    },

    start:function ()
    {
        saveStats();
        gameStarted = true;

        gameTimer = game.time.create(true);
        gameTimer.add(Phaser.Timer.SECOND * stageTime,this.timeOut,this);
        gameTimer.start();

        var man = this.add.sprite(game.world.width/64, 0, 'man');
        man.y = hud.y - hud.height/2 - (man.height);

        bowAndArrow = this.add.sprite(man.x+man.width/1.8, man.y+man.height/7, 'bowAndArrow');
        bowAndArrow.anchor.setTo(0.25,0.5);

        reloadTxt = this.add.sprite(man.x + man.width, man.y + man.width/2, 'reloadTxt');
        reloadBar = this.add.sprite(man.x + man.width, man.y + man.width/2 + reloadTxt.height, 'reloadBar');
        reloadBarWidth = reloadBar.width;
        reloadTxt.visible = false; reloadBar.visible = false;

        reloadTimer = game.time.create(true);
        reloadTimer.add(reloadTime,this.onReload,this);

        quiverHUD = this.add.sprite(man.x + man.width*1.5, man.y + man.width, 'quiver');
        quiverHUD.anchor.setTo(0.5,0.5);

        buyScreen.destroy(true,false);

        pauseBtn = game.add.button(game.world.centerX,hud.y,"pauseBtn",this.pauseGame,this);
        pauseBtn.anchor.setTo(0.5,0.5);

        var timeHUD = this.add.sprite(0, hud.y, 'timeHUD_Image');
        timeHUD.x = timeHUD.width/1.5;
        timeHUD.anchor.setTo(0.5,0.5);

        var missHUD = this.add.sprite(0, hud.y, 'missHUD_Image');
        missHUD.x = timeHUD.x + timeHUD.width/0.9;
        missHUD.anchor.setTo(0.5,0.5);

        var comboHUD = this.add.sprite(0, hud.y, 'comboHUD_Image');
        comboHUD.x = missHUD.x + missHUD.width/0.9;
        comboHUD.anchor.setTo(0.5,0.5);

        var sheildHUD = this.add.sprite(0, comboHUD.y, 'sheild');
        sheildHUD.x = comboHUD.x + comboHUD.width/2.25;
        sheildHUD.anchor.setTo(0.5,0.5);

        var size = 11*screenMultiplier + "px";
        var style = { font: size+" BADABB", fill: "#000000", align: "center" };
        
        quiverText = this.add.text(quiverHUD.x+quiverHUD.width*0.2,quiverHUD.y+quiverHUD.width*0.2, currQuiverCount, style);
        quiverText.anchor.setTo(0.5,0.5);

        style = { font: size+" BADABB", fill: "#ffffff", align: "center" };
        timeText = game.add.text(Math.round(timeHUD.x),timeHUD.y+timeHUD.height/5, stageTime, style);
        timeText.anchor.setTo(0.5,0.5);
        timeText.padding.set(10, 0);
        missText = game.add.text(Math.round(missHUD.x),missHUD.y+missHUD.height*0.2, missed+"/"+net, style);
        missText.anchor.setTo(0.5,0.5);
        missText.padding.set(10, 0);
        comboText = game.add.text(Math.round(comboHUD.x),comboHUD.y+comboHUD.height/5, '0x', style);
        sheildText = game.add.text(sheildHUD.x+5,sheildHUD.y, currSheilds, style);
        comboText.anchor.setTo(0.5,0.5);
        comboText.padding.set(10, 0);
        sheildText.anchor.setTo(0.5,0.5);
        sheildText.padding.set(10, 0);

        var arrowBtn,arrowText;
        for(var j = 1; j <= 4; j++) 
        {
            arrowBtn = window["arrow"+j+"Btn"];
            arrowBtn.x = game.world.centerX + (arrowBtn.width + arrowBtn.width/3.5)*j + arrowBtn.width;
            arrowBtn.y = hud.y;

            if(j!=1)
            {
                arrowBtn.loadTexture("arrow"+j+"Disabled");
                arrowText = window["arrow"+j+"Text"];
                arrowText.x = arrowBtn.x;
                arrowText.y = arrowBtn.y-arrowBtn.height*0.05;
            }
        }
        arrow1Btn.visible = true;

        var bpc = 0;
        while(birdNames[bpc] != null)
        {
            birdsPool[bpc] = game.add.group();
            for(var j = 0; j < NUMBER_OF_BIRDS; j++) 
            {
                var bird = game.add.sprite(0, 0, birdNames[bpc]);
                bird.animations.add('fly');

                bird.enableBody = true;

                birdsPool[bpc].add(bird);
                bird.anchor.setTo(0.5, 0.5);

                game.physics.enable(bird, Phaser.Physics.ARCADE);

                bird.body.setSize(bird.width, bird.height/4, 0, 0);

                bird.state = "dead";

                bird.kill();
            }
            birdKills[bpc] = 0;
            bpc++; 
        }
        game.inputEnabled = true;
        game.input.onDown.add(this.setDownPos);
        game.input.onUp.add(this.resetGraphics_andShoot);
        game.input.addMoveCallback(this.chargeBall);

        game.physics.arcade.gravity.y = GRAVITY;

        pauseGroup = game.add.group();
        pauseBG = game.add.sprite(game.world.centerX,game.world.centerY,"pauseBG");
        pauseBG.anchor.setTo(0.5,0.5);

        pauseGroup.add(pauseBG);

        pauseTxt = game.add.sprite(pauseBG.x,pauseBG.y-pauseBG.height*0.35,"pauseTxt");
        pauseTxt.anchor.setTo(0.5,0.5);

        pauseGroup.add(pauseTxt);

        var size = 15*screenMultiplier + "px";
        var style = { font: size+" BADABB", fill: "#000000", align: "center" };
        pauseScore = game.add.text(Math.round(pauseBG.x-pauseBG.width*0.25),Math.round(pauseBG.y), "score "+score, style,pauseGroup);
        pauseScore.anchor.setTo(0.5, 0.5);
        pauseCoins = game.add.text(Math.round(pauseBG.x+pauseBG.width*0.25),Math.round(pauseBG.y), "coins "+coins, style,pauseGroup);
        pauseCoins.anchor.setTo(0.5, 0.5);

        rb = game.add.button(pauseBG.x-pauseBG.width*0.25,pauseBG.y+pauseBG.height*0.35,"resumeBtn",this.resumeGame,this);
        rb.setDownSound(clickSound);
        rb.anchor.setTo(0.5,0.5);
        pauseGroup.add(rb);

        quitBtn = game.add.button(pauseBG.x+pauseBG.width*0.25,pauseBG.y+pauseBG.height*0.35,"quitBtn",this.quitGame,this);
        quitBtn.anchor.setTo(0.5,0.5);
        pauseGroup.add(quitBtn);

        pauseGroup.visible = false;
    },

    checkOnPause:function(event)
    {
        if(event.x > rb.x-rb.width/2 && event.x < rb.x+rb.width/2 && event.y > rb.y-rb.height/2 && event.y < rb.y+rb.height/2 )
        {
            pauseBtn.visible = true;
            pauseTheGame = false;
            game.paused = false;

            pauseGroup.visible = false;
            
            game.input.onDown.add(Game.setDownPos);
            game.input.onUp.add(Game.resetGraphics_andShoot);
            //game.input.addMoveCallback(this.chargeBall);

            game.input.onUp.remove(Game.checkOnPause, self);
        }
        else if(event.x > quitBtn.x-quitBtn.width/2 && event.x < quitBtn.x+quitBtn.width/2 && event.y > quitBtn.y-quitBtn.height/2 && event.y < quitBtn.y+quitBtn.height/2 )
        {   
            Game.quitGame();
        }
    },

    pauseGame:function()
    {
        game.input.onDown.remove(this.setDownPos);
        game.input.onUp.remove(this.resetGraphics_andShoot);
        pauseScore.setText("score "+score);
        pauseCoins.setText("coins "+coins);
        //game.input.removeMoveCallback(this.chargeBall);

        game.input.onUp.add(this.checkOnPause, self);

        pauseTheGame = true;
        //game.paused = true;
    },

    buyUpgrade:function(buyBtn)
    {
        var number = buyBtn.number; var newLevel;

        if(number == 1 && (coins >= (reloadLvl+1)*upgradeLevelCost && reloadLvl < 10))
        {
            newLevel = ++reloadLvl;
        }
        else if(number == 2 && (coins >= (powerLvl+1)*upgradeLevelCost && powerLvl < 10))
        {
          newLevel = ++powerLvl;
        }
        else if(number == 3 && (coins >= (netLvl+1)*upgradeLevelCost && netLvl < 10)) 
        {
            newLevel = ++netLvl;
        }
        else return;
        
        window["ub"+number].frame = newLevel;

        if(newLevel == 10)  window["ut"+number].setText("max");
        else                window["ut"+number].setText((newLevel+1)*upgradeLevelCost);

        power = (powerLvl*0.5)+3;
        net = netLvl+2;
        reloadTime = reloadBaseTime-(reloadLvl*40);

        coins -= newLevel*upgradeLevelCost;
        purchasedSound.play();

        coinsText.setText(coins);
    },

    buyArrow:function(buyBtn)
    {
        switch(buyBtn.buy)
        {
            case "coin":     if(coins<5) return;        coins-=5;        goldenArrows += 1;       arrow2Text.setText(goldenArrows);     break;
            case "diamond":  if(coins<10) return;       coins-=10;       diamondArrows += 1;       arrow3Text.setText(diamondArrows);     break;
            case "bomb":     if(coins<50) return;       coins-=50;       bombArrows += 1;         arrow4Text.setText(bombArrows);       break;
            case "quiver":   if(coins<(100*(quiverCapacity-1)) || quiverCapacity == 6) return;      coins-=(100*(quiverCapacity-1));      currQuiverCount += 1; quiverCapacity+=1;     buyQuiverTxt.setText(quiverCapacity);    break;
            case "sheild":   if(coins<(100*(comboShields+1)) || comboShields == 3) return;      coins-=(100*(comboShields+1));      currSheilds += 1;comboShields+=1;            buySheildTxt.setText(comboShields);       break;
        }

        if(quiverCapacity == 6) quiverCostTxt.setText("Max");
        else                    quiverCostTxt.setText(100*(quiverCapacity-1));
        if(comboShields == 3)   sheildCostTxt.setText("Max");
        else                    sheildCostTxt.setText(100*(comboShields+1));
        
        purchasedSound.play();

        coinsText.setText(coins);
    },

    changeArrow:function (arrowBtn)
    {
        if(!gameStarted) return;
        if(arrowBtn.number == 2 && goldenArrows == 0) return;
        if(arrowBtn.number == 3 && diamondArrows == 0) return;
        if(arrowBtn.number == 4 && bombArrows == 0) return;


        for(var j = 1; j <= 4; j++) 
        {
            if(window["arrow"+j+"Btn"] == arrowBtn)
            {
                window["arrow"+j+"Btn"].loadTexture("arrow"+j+"Enabled");

                currentArrow = j;
            }
            else
            {
                window["arrow"+j+"Btn"].loadTexture("arrow"+j+"Disabled");
            }
        }

        changeArrowSound.play();
    },

    resetCombo:function (arrow)
    {
        if(currSheilds!=0)
        {
            currSheilds--;
            sheildText.setText(currSheilds);
            return;
        } 
        
        if(arrow.number == 2 || arrow.number == 3)
        {
            if(oldCombo==combo)
            {
                combo = 0;
                perfectCombo = false;
            }
        }
        else if(arrow.number == 1)
        {
            combo = 0;
            perfectCombo = false;
        }

        comboText.setText(combo+"x");
        arrow.kill();
    },

    setDownPos:function()
    {
        if(game.input.y > (hud.y-hud.height/2) || reloading || !gameStarted)
        {
            return;
        }

    	downX = game.input.x;
    	downY = game.input.y;
		drawTrajectory = true;
    },

    chargeBall:function (pointer, x, y, down)
    {
        if(game.input.y > (hud.y-hud.height/2) || reloading || !gameStarted)
        {
            return;
        }

    	if(drawTrajectory)
    	{

    		trajectoryGraphics.clear();
          	trajectoryGraphics.lineStyle(3, 0xffffff);
          	trajectoryGraphics.moveTo(downX, downY);

          	launchVelocity.x = downX - x;
            launchVelocity.y = downY - y; 

            trajectoryGraphics.lineTo(downX-launchVelocity.x, downY - launchVelocity.y);

            radian = Math.atan2(launchVelocity.y, launchVelocity.x);

    		bowAndArrow.rotation = radian;

    	}
    },

    resetGraphics_andShoot:function()
    {
        if(launchVelocity.x == 0 && launchVelocity.y == 0)
        {
            return;
        }
    	var arrow = arrowPool.getFirstDead();

        var currentArrowCount;

    	if (arrow === null || arrow === undefined) return;

        oldCombo = combo;

        switch(currentArrow)
        {
            case 1: arrow.loadTexture("basicArrow");    arrow1Sound.play();                                       break;
            case 2: arrow.loadTexture("goldArrow");     arrow2Sound.play(); currentArrowCount = --goldenArrows;   break; 
            case 3: arrow.loadTexture("diamondArrow");  arrow3Sound.play(); currentArrowCount = --diamondArrows;  break; 
            case 4: arrow.loadTexture("dynamiteArrow"); arrow4Sound.play(); currentArrowCount = --bombArrows;     break;  
        }

        if(currentArrow > 1)    window["arrow"+currentArrow+"Text"].setText(currentArrowCount);

    	arrow.revive();
    	arrow.checkWorldBounds = true;
    	arrow.outOfBoundsKill = true;
        arrow.number = currentArrow;

    	arrow.reset(this.bowAndArrow.x, this.bowAndArrow.y);

		arrow.rotation = bowAndArrow.rotation;

		arrow.body.velocity.x = launchVelocity.x*power;
    	arrow.body.velocity.y = launchVelocity.y*power;

        launchVelocity.x = 0;
        launchVelocity.y = 0;

    	trajectoryGraphics.clear();
		drawTrajectory = false;
		bowAndArrow.rotation = 0;

        if(currentArrow == 4)
        {
            game.time.events.add(bombDetonationTime + (Math.random()*200), Game.detonateBomb, this, arrow);
        }


        if(currentArrowCount == 0)
        {
            arrow2Btn.loadTexture("arrow2Disabled"); arrow3Btn.loadTexture("arrow3Disabled"); arrow4Btn.loadTexture("arrow4Disabled");

            arrow1Btn.loadTexture("arrow1Enabled");

            currentArrow = 1;
        }

        currQuiverCount--;


        if(currQuiverCount == 0)
        {
            currQuiverCount = quiverCapacity;
            quiverText.visible = false;
            quiverHUD.visible = false;
            reloading = true;
            reloadTxt.visible = true;
            reloadBar.visible = true;
            reloadTimer.start();
        }
        quiverText.setText(currQuiverCount)
    },

    checkOverlap:function (arrow,bird) 
    {
        if(arrow.number == 4 || bird.state == "dead") return;

        if(arrow.number < 3)
            arrow.kill();

        
        bird.body.velocity.x = 0;
        bird.body.allowGravity = true;

        bird.state = "dead";
        if(arrow.number != 5 )arrowHitSound.play();

        bird.animations.stop('fly');

        game.add.tween(bird).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);

        if(bird.motionTween)    bird.motionTween.stop();

        if(bird.motionTween2)    bird.motionTween2.stop();

        var getBirdIndex = birdNames.indexOf(bird.key);
        birdKills[getBirdIndex]++;

        combo++;
        comboText.setText(combo+"x");

        var coinMul;
        switch(mode)
        {
            case'normal': coinMul = 1; break;
            case'hard': coinMul = 2; break;
            case'insane': coinMul = 4; break;
        }

        if(arrow.number == 2)
        {
           coins += combo*coinMul; 
        } 
        else                  coins += coinMul;

        score += combo;
        //combo = combo>15?15:combo>10?10:combo>5?5:0;
    },

    detonateBomb:function(bombArrow)
    {
        var boom = game.add.sprite(bombArrow.x, bombArrow.y, "boom");
        var boomAnim = boom.animations.add('boom');
        boom.animations.play('boom',30,false,true);
        explodeSound.play();
        boomAnim.spriteBoom = boom;

        //boomAnim.onComplete.add(Game.killBombAnim,this);

        boom.number = 5;

        arrowPool.add(boom);

        boom.enableBody = true;

        // Set its pivot point to the center of the arrow
        boom.anchor.setTo(0.5, 0.5);

        // Enable physics on the arrow
        game.physics.enable(boom, Phaser.Physics.ARCADE);

        boom.checkWorldBounds = false;
        boom.outOfBoundsKill = false;

        boom.body.allowGravity = false;

        bombArrow.kill();

    },

    killBombAnim:function(anim)
    {
        //console.log(anim,anim.spriteBoom);
        //anim.spriteBoom.kill();
        anim.kill();
    },

    operateBirds:function (bird)
    {
        if(bird.x <= 5 && gameStarted)
        {
            bird.kill();

            missed++;
            if(missed <= net)
            {
                missText.setText(missed+"/"+net);
            }
            else
            {
                this.gameover();
            }
        } 
    },

    update:function()
    {
        if(!gameStarted) return;

        if(pauseTheGame)
        {
            if(pauseBtn.visible == true)
            {
                pauseBtn.visible = false;
                pauseGroup.visible = true;
            }
            else
            {
                game.paused = true;
            }
        }

    	arrowPool.forEachAlive(function(arrow) 
    		{
        		arrow.rotation = Math.atan2(arrow.body.velocity.y, arrow.body.velocity.x);
                
    		}, this);

        for (var i = 0; i < birdsPool.length; i++) 
        {
            birdsPool[i].forEachAlive(this.operateBirds, this);
            game.physics.arcade.overlap(arrowPool, birdsPool[i], this.checkOverlap, null, this);

            var timeRemains = Math.floor(gameTimer.duration/1000);

            if(birdCount < totalBirds && (stageTime - timeRemains) > birdMap[birdCount][0])
            {
                var nextBird = birdMap[birdCount][1];
                nextBird == null?nextBird = 0:1;
                this.generateBird(nextBird);
                birdCount++;
            }
        };

        if(gameTimer && gameTimer.running)
        timeText.setText(timeRemains);

        if(reloadTimer && reloadTimer.running)
        {
            reloadBar.width = ((reloadTime-reloadTimer.ms)/reloadTime)*reloadBarWidth;
        }
    },

    generateBird:function(index)
    {
        var bird = birdsPool[index].getFirstDead();
        if(bird != null)
        {
            bird.revive();
            bird.checkWorldBounds = true;
            bird.outOfBoundsKill = true;
            bird.animations.play('fly', 5, true);

            bird.state = "alive";

            if(bird.key == "flamingo" || bird.key == "casowary")
            {
                bird.reset(game.world.width - bird.width/2,hud.y - hud.height/2 - (bird.height/2));
            }
            else            
                bird.reset(game.world.width - bird.width/2, Math.random()*(game.world.height/2)+bird.height);

            bird.body.velocity.x = birdGeneralVel*birdSpeedMul;
            bird.body.allowGravity = false;
            bird.alpha = 1;

            if(bird.motionTween)    bird.motionTween.stop();

            if(bird.motionTween2)    bird.motionTween2.stop();


            if(bird.key == "crow") bird.motionTween = game.add.tween(bird).to( { y: bird.y - 50 }, 500, Phaser.Easing.Linear.None, true, 100, 1000, true);
            else if(bird.key == "parrot") bird.motionTween = game.add.tween(bird).to( { y: bird.y - 50 }, 100, Phaser.Easing.Linear.None, true, 1000+Math.random()*1000);
            else if(bird.key == "seagull") bird.motionTween = game.add.tween(bird.body.velocity).to( { x: -300}, 1000, Phaser.Easing.Bounce.In, true, 1000+Math.random()*1000);
            else if(bird.key == "sparrow") bird.motionTween = game.add.tween(bird.body.velocity).to( { x: game.rnd.integerInRange(-30, -600)}, 10, Phaser.Easing.Linear.None, true, 1000+Math.random()*1000);
            else if(bird.key == "cardinal") bird.motionTween = game.add.tween(bird).to( { y: bird.y + 80 }, 2000, Phaser.Easing.Elastic.In, true, 300+Math.random()*500);
            else if(bird.key == "goose") bird.motionTween = game.add.tween(bird).to( { y: game.world.centerY/2 }, 2000, Phaser.Easing.Bounce.In, true, 100+Math.random()*2500);
            else if(bird.key == "eagle")
            {
                var rnd = 500+Math.random()*1000;
                bird.motionTween = game.add.tween(bird).to( { y: bowAndArrow.y - Math.random()*200}, 1000, Phaser.Easing.Linear.None, true, rnd);
                bird.motionTween2 = game.add.tween(bird.body.velocity).to( { x: -500}, 100, Phaser.Easing.Linear.None, true, rnd);
            }
            else if(bird.key == "woodpecker") bird.motionTween = game.add.tween(bird).to( { y: game.input.y }, 3000, Phaser.Easing.Linear.None, true, 100);
            else if(bird.key == "casowary") bird.body.velocity.x -= 200;
        }
    },

    onReload:function()
    {
        quiverText.visible = true;
        quiverHUD.visible = true;

        reloading = false;
        reloadBar.visible = false;
        reloadTxt.visible = false;
        reloadBar.width = reloadBarWidth;

        reloadTimer.stop(true);

        reloadTimer = game.time.create(true);
        reloadTimer.add(reloadTime,this.onReload,this);
    },

    gameover:function()
    { 
        saveStats();
        pauseGroup.remove(pauseTxt);
        pauseGroup.remove(rb);
        pauseTxt.kill();
        rb.kill();
        quitBtn.x = game.world.centerX;
        gameSound.stop();
        gameOverSound.play();

        gameTimer.stop();

        pauseGroup.create(pauseBG.x,pauseBG.y-pauseBG.height*0.35,"gameoverTxt").anchor.setTo(0.5,0.5);
        pauseScore.setText("score "+score);
        pauseCoins.setText("coins "+coins);

        pauseBtn.visible = false;
        gameStarted = false;

        pauseGroup.visible = true;

        game.add.tween(pauseGroup).from( { y: -game.world.height/2 }, 1000, Phaser.Easing.Bounce.Out,true);
    },

    timeOut:function()
    {
        //game.physics.arcade.isPaused = true;
        //game.paused = true;

        gameSound.stop();
        stageCompleteSound.play();

        var lastGroup = game.add.group();

        pauseBtn.visible = false;
        gameStarted = false;

        var sobg = this.game.add.sprite(game.world.centerX,game.world.centerY,"stageOverBG");
        sobg.anchor.setTo(0.5,0.5);
        lastGroup.add(sobg);

        var sctxt = this.game.add.sprite(sobg.x,sobg.y-sobg.height*0.425,"stageCompleteTxt");
        sctxt.anchor.setTo(0.5,0.5);
        lastGroup.add(sctxt);

        var size = 15*screenMultiplier + "px";
        var style = { font: size+" BADABB", fill: "#000000", align: "center" };
        
        var scoreTxt = game.add.text(Math.round(sobg.x-sobg.width*0.25),Math.round(sctxt.y + sctxt.height*1.25), "score: "+score, style);
        scoreTxt.anchor.setTo(0.5,0.5);
        scoreTxt.padding.set(10, 0);
        lastGroup.add(scoreTxt);

        var finalCoinsTxt = game.add.text(Math.round(sobg.x+sobg.width*0.25),Math.round(sctxt.y + sctxt.height*1.25), "coins: "+coins, style);
        finalCoinsTxt.anchor.setTo(0.5,0.5);
        finalCoinsTxt.padding.set(10, 0);
        lastGroup.add(finalCoinsTxt);

        if(stageDetails["stage"+level].score < score) stageDetails["stage"+level].score = score;

        var totalK=0;
        for (var i = 0; i < birdKills.length; i++) 
        {
            totalK += birdKills[i];
        }
        var percent = totalK/totalBirds;

        if(percent>=0.6)     stageDetails["stage"+level][mode].star1 = true;
        if(percent==1)      stageDetails["stage"+level][mode].star2 = true;
        if(perfectCombo)    stageDetails["stage"+level][mode].star3 = true;

        if(level!=64)    stageDetails["stage"+(level+1)].lock = false;

        localStorage.setItem('saveStages', JSON.stringify(stageDetails));


        size = 11*screenMultiplier + "px";

        var color = stageDetails["stage"+level][mode].star1?"#339900":"#666666";
        style = { font: size+" BADABB", fill: color, align: "left" };
        var star1Txt = game.add.text(Math.round(sobg.x),Math.round(scoreTxt.y + sctxt.height*1.25), "kill 60% of birds", style);
        star1Txt.anchor.setTo(0.5,0.5);
        star1Txt.padding.set(10, 0);
        lastGroup.add(star1Txt);

        color = stageDetails["stage"+level][mode].star2?"#339900":"#666666";
        style = { font: size+" BADABB", fill: color, align: "left" };
        var star2Txt = game.add.text(Math.round(sobg.x),Math.round(star1Txt.y + star1Txt.height), "kill 100% of birds", style);
        star2Txt.anchor.setTo(0.5,0.5);
        star2Txt.padding.set(10, 0);
        lastGroup.add(star2Txt);

        color = stageDetails["stage"+level][mode].star3?"#339900":"#666666";
        style = { font: size+" BADABB", fill: color, align: "left" };
        var star3Txt = game.add.text(Math.round(sobg.x),Math.round(star2Txt.y + star2Txt.height), "perfect combo", style);
        star3Txt.anchor.setTo(0.5,0.5);
        star3Txt.padding.set(10, 0);
        lastGroup.add(star3Txt);

        var birdSprite,ratio,bkc;
        var bpc = 0;
        while(birdNames[bpc] != null)
        {
            birdSprite = game.add.sprite(sobg.x-sobg.width*0.25+(sctxt.height)*bpc,star3Txt.y+ sctxt.height,birdNames[bpc]);
            birdSprite.anchor.setTo(0.5,0.5);
            lastGroup.add(birdSprite);

            ratio = birdSprite.width/birdSprite.height;
            birdSprite.width = sctxt.height*0.75;
            birdSprite.height = birdSprite.width/ratio;

            if(birdKills[bpc] == 0)
            {
                birdSprite.tint = 0x000000;
            }

            style = { font: size+" BADABB", fill: "#000000", align: "left" };
            bkc = game.add.text(Math.round(birdSprite.x),Math.round(birdSprite.y + sctxt.height*0.75), "x "+birdKills[bpc], style);
            bkc.anchor.setTo(0.5,0.5);
            bkc.padding.set(10, 0);
            lastGroup.add(bkc);

            setHunts(birdNames[bpc],birdKills[bpc]);

            bpc++;
        }

        qb = game.add.button(sobg.x - sobg.width/4,sobg.y+sobg.height*0.425,"quitBtn",this.quitGame,this);
        qb.anchor.setTo(0.5,0.5);
        lastGroup.add(qb);

        var nb = game.add.button(sobg.x + sobg.width/4,sobg.y+sobg.height*0.425,"nextBtn",this.nextStage,this);
        nb.anchor.setTo(0.5,0.5);
        lastGroup.add(nb);

        game.add.tween(lastGroup).from( { y: -game.world.height/2 }, 1000, Phaser.Easing.Bounce.Out,true);

        saveStats();
        //game.input.onDown.add(this.exit, self);

    },

    nextStage:function()
    {
        if(game.paused) game.paused = false;

        clickSound.play();
        gameSound.stop();

        game.scale.leaveIncorrectOrientation.remove(Game.handleCorrect_inGame);
        game.scale.enterIncorrectOrientation.remove(Game.handleIncorrect_inGame);

        mode = 'normal';
        level++;
        game.state.restart();
    },

    quitGame:function()
    {
        if(game.paused) game.paused = false;

        clickSound.play();
        gameSound.stop();

        game.scale.leaveIncorrectOrientation.remove(Game.handleCorrect_inGame);
        game.scale.enterIncorrectOrientation.remove(Game.handleIncorrect_inGame);

        game.state.start('Menu',true,false);
    },

    handleIncorrect_inGame:function()
    {
        if(!game.device.desktop)
        {
            rotateImg = game.add.sprite(0,0,'deviceRotate');

            if(gameStarted)
                Game.pauseGame();
            else
            {
                game.paused = true;
            }

        }
    },

    handleCorrect_inGame:function()
    {
        if(!game.device.desktop)
        {
            if(!gameStarted) game.paused = false;
            if(rotateImg) rotateImg.kill();
        }

    }
}