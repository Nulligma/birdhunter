var man,playBtn,creditsBtn,gameName,bird,bg;

var diffName,starDefs;

var stageDetails;
var currentDifficulty,currentStage;
var nextDiffBtn,backDiffBtn;
var stageGroup;
var loadText;
var huntsBtn,stageBtns,texts,huntsHolder,closeHunts;

var titleGroup;
var topGroup,bottomGroup,blackBG;

var clickSound,menuSound,rotateImg;
var nextStageBtn,backStageBtn;
var sbg,grass;

var loadedOnce = false;
var Menu = 
{

    preload : function() 
    {
        // Load all the needed resources for the menu.
        game.scale.leaveIncorrectOrientation.add(this.handleCorrect);
        game.scale.enterIncorrectOrientation.add(this.handleIncorrect);
    },

    create: function () 
    {
        // Add menu screen.
        // It will act as a button to start the game.]

        if(!loadedOnce) this.createMenu();
        else            this.selectStage();

        //canvas.style.marginTop = "-240px";

        game.load.onLoadStart.add(this.loadStart, this);
        game.load.onFileComplete.add(this.fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);
    },

    createMenu:function()
    {
        loadGlobalStats();

        clickSound = game.add.audio('clickSound');
        menuSound = game.add.audio('menuSound');

        menuSound.play("",0,1,true);

        titleGroup = this.add.group();
        bg = this.add.sprite(game.world.centerX, game.world.centerY, 'menu');
        bg.anchor.setTo(0.5,0.5);
        titleGroup.add(bg);

        var grass = this.add.sprite(0, 0, 'bottomGrass');
        grass.y = game.world.height - grass.height;
        titleGroup.add(grass);

        man = this.add.sprite(0, 0, 'menuMan');
        man.x = man.width/8;
        man.y = game.world.height - man.height;
        titleGroup.add(man);

        game.add.tween(man).from( { x: -man.width }, 500, Phaser.Easing.Linear.Out, true);


        //this.add.button(0, 0, 'menu', this.startGame, this);


        bird = this.add.sprite(game.world.width/1.35, game.world.height/12, 'bird');
        game.add.tween(bird).from( { x: game.world.width+bird.width }, 500, Phaser.Easing.Linear.Out, true);
        titleGroup.add(bird);

        gameName = this.add.sprite(game.world.centerX/2.5, game.world.centerY/2.8, 'gameName');
        titleGroup.add(gameName);

        playBtn =  this.add.button(game.world.width/1.35, game.world.height/1.6, 'play', this.selectStage, this);
        playBtn.setDownSound(clickSound);
        game.add.tween(playBtn).from( { y: game.world.height+playBtn.height }, 1500, Phaser.Easing.Elastic.Out, true);
        titleGroup.add(playBtn);

        creditsBtn = this.add.button(game.world.width/1.35, game.world.height/1.3, 'credits', this.showCredits, this);
        creditsBtn.setDownSound(clickSound);
        game.add.tween(creditsBtn).from( { y: game.world.height+creditsBtn.height }, 1500, Phaser.Easing.Elastic.Out, true);
        titleGroup.add(creditsBtn);
    },

    showCredits:function()
    {
        creditsGroup = this.add.group();

        var creditsBG = game.add.graphics( 0, 0 );
        creditsBG.beginFill(0xD8A500, 1);
        creditsBG.drawRect(0, 0, game.world.width, game.world.height);
        creditsGroup.add(creditsBG);


        var size = 30*screenMultiplier + "px";
        var style = { font: size+" BADABB", fill: "#000000", align: "center" };

        var developedBy = game.add.text(game.world.centerX,game.world.centerY*0.5, "developed By Nulligma", style);
        developedBy.anchor.setTo(0.5,0.5);
        creditsGroup.add(developedBy);

        size = 15*screenMultiplier + "px";
        style = { font: size+" BADABB", fill: "#000000", align: "center" };
        var thanks = game.add.text(game.world.centerX,developedBy.y + developedBy.height*2, "special thanks \n freesounds.org \n freevectordownload.com \n calpomat \n flashkit.com", style);
        thanks.anchor.setTo(0.5,0.5);
        creditsGroup.add(thanks);

        var closeBtn = this.add.button(game.world.width - game.world.width/8, game.world.centerY/8, 'closeBtn',this.closeCredits,this);
        closeBtn.setDownSound(clickSound);
        creditsGroup.add(closeBtn);
        
    },

    closeCredits:function()
    {
        creditsGroup.destroy();
    },

    loadStart:function()
    {   
        var size = 25*screenMultiplier + "px";
        var style;
        style = { font: size+" BADABB", fill: "#ffffff", align: "center" };

        loadText = game.add.text(game.world.centerX,game.world.centerY, "Loading stage...", style);
        loadText.anchor.setTo(0.5,0.5);
        loadText.padding.set(10, 0);
    },

    loadComplete:function()
    {
        loadText.kill();

        game.load.onLoadStart.remove(this.loadStart, this);
        game.load.onFileComplete.remove(this.fileComplete, this);
        game.load.onLoadComplete.remove(this.loadComplete, this);
    },

    fileComplete:function(progress, cacheKey, success, totalLoaded, totalFiles) 
    {
        var percent = (totalLoaded/totalFiles) * 100;
        loadText.setText("Loading stage...\n "+Math.floor(percent)+"%");
    },

    selectStage: function () 
    {
        if(!loadedOnce)
            game.add.tween(titleGroup).to( { x: -titleGroup.width }, 500, Phaser.Easing.Linear.None, true);

        stageGroup = this.add.group();

        sbg = this.add.sprite(game.world.centerX, game.world.centerY, 'stage_1');
        sbg.anchor.setTo(0.5,0.5);
        stageGroup.add(sbg);

        grass = this.add.sprite(0, 0, 'bottomGrass');
        grass.y = game.world.height - grass.height;
        stageGroup.add(grass);

        //localStorage.clear();
        stageDetails = JSON.parse(localStorage.getItem('saveStages'));

        if(!stageDetails)
        {   
            stageDetails = {};
            for (var s = 1; s <= 64; s++) 
            {
                stageDetails['stage'+s] = {};
                stageDetails['stage'+s]['score'] = 0; 
                stageDetails['stage'+s]['lock'] = s!=1; 

                stageDetails['stage'+s]['normal'] = {};
                stageDetails['stage'+s]['normal']['star1'] = false;
                stageDetails['stage'+s]['normal']['star2'] = false;
                stageDetails['stage'+s]['normal']['star3'] = false;

                stageDetails['stage'+s]['hard'] = {};
                stageDetails['stage'+s]['hard']['star1'] = false;
                stageDetails['stage'+s]['hard']['star2'] = false;
                stageDetails['stage'+s]['hard']['star3'] = false;

                stageDetails['stage'+s]['insane'] = {};
                stageDetails['stage'+s]['insane']['star1'] = false;
                stageDetails['stage'+s]['insane']['star2'] = false;
                stageDetails['stage'+s]['insane']['star3'] = false;

            } 
        /*stageDetails =  {
                            stage1:{name:"the beginning",score:0,lock:false,
                                    normal:{star1:false,star2:false,star3:false},
                                    hard:{star1:false,star2:false,star3:false},
                                    insane:{star1:false,star2:false,star3:false}
                                    },
                            stage2:{name:"i lost my scarecrow",score:0,lock:true,
                                    normal:{star1:false,star2:false,star3:false},
                                    hard:{star1:false,star2:false,star3:false},
                                    insane:{star1:false,star2:false,star3:false}
                                    },
                            stage3:{name:"wacky jungle",score:0,lock:true,
                                    normal:{star1:false,star2:false,star3:false},
                                    hard:{star1:false,star2:false,star3:false},
                                    insane:{star1:false,star2:false,star3:false}
                                    },
                            stage4:{name:"deadly desert",score:0,lock:true,
                                    normal:{star1:false,star2:false,star3:false},
                                    hard:{star1:false,star2:false,star3:false},
                                    insane:{star1:false,star2:false,star3:false}
                                    },
                            stage5:{name:"NIGHTMARE",score:0,lock:true,
                                    normal:{star1:false,star2:false,star3:false},
                                    hard:{star1:false,star2:false,star3:false},
                                    insane:{star1:false,star2:false,star3:false}
                                    },
                            stage6:{name:"longest day of my life",score:0,lock:true,
                                    normal:{star1:false,star2:false,star3:false},
                                    hard:{star1:false,star2:false,star3:false},
                                    insane:{star1:false,star2:false,star3:false}
                                    },
                            stage7:{name:"beach attack",score:0,lock:true,
                                    normal:{star1:false,star2:false,star3:false},
                                    hard:{star1:false,star2:false,star3:false},
                                    insane:{star1:false,star2:false,star3:false}
                                    },
                            stage8:{name:"THE LAST SHOT",score:0,lock:true,
                                    normal:{star1:false,star2:false,star3:false},
                                    hard:{star1:false,star2:false,star3:false},
                                    insane:{star1:false,star2:false,star3:false}
                                    },
                        };*/
        localStorage.setItem('saveStages', JSON.stringify(stageDetails));
        }

        backStageBtn = this.add.button(0,game.world.height/2,'nextDiffBtnOff',this.changeStage,this);
        backStageBtn.add = -8;
        backStageBtn.setDownSound(clickSound);
        backStageBtn.x = backStageBtn.width*1.25;
        backStageBtn.anchor.setTo(0.5,0.5);
        backStageBtn.angle += 180;
        stageGroup.add(backStageBtn); 

        nextStageBtn = this.add.button(0,game.world.height/2,'nextDiffBtn',this.changeStage,this);
        nextStageBtn.add = 8;
        nextStageBtn.setDownSound(clickSound);
        nextStageBtn.x = game.world.width - nextStageBtn.width*1.25;
        nextStageBtn.anchor.setTo(0.5,0.5);
        stageGroup.add(nextStageBtn);

        var stageBtnBG;stageBtns = []; texts = [];
        var size = 25*screenMultiplier + "px";
        var style;
        style = { font: size+" BADABB", fill: "#ffffff", align: "center" };
        for (var i = 0; i < 8; i++) 
        {
            if(!stageDetails['stage'+(i+1)].lock)
            {
                stageBtnBG = this.add.button(0,0,'stageOpenBtn',this.createStage,this);
                if(stageDetails['stage'+(i+1)]['insane']['star1'] && stageDetails['stage'+(i+1)]['insane']['star2'] && stageDetails['stage'+(i+1)]['insane']['star3'])
                    stageBtnBG.loadTexture('stageCompleteBtn');
                else if(stageDetails['stage'+(i+1)]['hard']['star1'] && stageDetails['stage'+(i+1)]['hard']['star2'] && stageDetails['stage'+(i+1)]['hard']['star3'])
                    stageBtnBG.loadTexture('insanestageOpenBtn');
                else if(stageDetails['stage'+(i+1)]['normal']['star1'] && stageDetails['stage'+(i+1)]['normal']['star2'] && stageDetails['stage'+(i+1)]['normal']['star3'])
                    stageBtnBG.loadTexture('hardstageOpenBtn');
                stageBtnBG.setDownSound(clickSound);
                stageBtnBG.stageNumber = i+1;        
                stageBtnBG.anchor.setTo(0.5,0.5);
                stageBtnBG.x = ((i%4)+1)*(stageBtnBG.width+ stageBtnBG.width);stageBtnBG.y = i<4?game.world.centerY/2:game.world.centerY/2 + stageBtnBG.height*1.5;

                stageGroup.add(stageBtnBG);
                text = game.add.text(stageBtnBG.x,stageBtnBG.y, i+1, style,stageGroup);
                text.anchor.setTo(0.5,0.5);
            }
            else
            {
                stageBtnBG = this.add.button(0,0,'stageLockBtn',this.createStage,this);
                stageBtnBG.input.enabled = false;
                stageBtnBG.anchor.setTo(0.5,0.5);
                stageBtnBG.x = ((i%4)+1)*(stageBtnBG.width + stageBtnBG.width);stageBtnBG.y = i<4?game.world.centerY/2:game.world.centerY/2 + stageBtnBG.height*1.5;

                stageGroup.add(stageBtnBG);
                text = game.add.text(stageBtnBG.x,stageBtnBG.y, i+1, style,stageGroup);
                text.anchor.setTo(0.5,0.5);
            }

            stageBtns[i] = stageBtnBG; texts[i] = text;

            //stageGroup.add(text);
            if(loadedOnce)
            {
                menuSound.play("",0,1,true);
                game.add.tween(text).from( { y: -stageBtnBG.height }, 100 + (i*50), Phaser.Easing.Linear.None, true);
                game.add.tween(stageBtnBG).from( { y: -stageBtnBG.height }, 100 + (i*50), Phaser.Easing.Linear.None, true);
            }
            //
        };

        huntsBtn = this.add.button(game.world.centerX,0,'huntsBtn',this.showhunts,this);
        huntsBtn.setDownSound(clickSound);
        huntsBtn.anchor.setTo(0.5,0.5);
        huntsBtn.y = game.world.height - (huntsBtn.height*1.5);
        stageGroup.add(huntsBtn);

        if(!loadedOnce)
            game.add.tween(stageGroup).from( { x: game.world.width }, 500, Phaser.Easing.Linear.None, true);
        else
        {
            game.add.tween(huntsBtn).from( { y: game.world.height + huntsBtn.height }, 150 , Phaser.Easing.Linear.None, true,400);
        }

        
        loadedOnce = true;
        //var stage1Btn = this.add.button(50,50,'stageOpenBtn');
        //var stage3Btn = this.add.button(350,50,'stageLockBtn');

    },

    changeStage:function(btn)
    {
        for (var i = 0; i < 8; i++) 
        {
            game.add.tween(texts[i]).to( { y: -stageBtns[i].height }, 100 + (i*30), Phaser.Easing.Linear.None, true);
            game.add.tween(stageBtns[i]).to( { y: -stageBtns[i].height }, 100 + (i*30), Phaser.Easing.Linear.None, true);

        }
        game.add.tween(backStageBtn).to( { x: -backStageBtn.width }, 130 , Phaser.Easing.Linear.None, true);
        game.add.tween(nextStageBtn).to( { x: game.world.width + nextStageBtn.width/2 }, 130 , Phaser.Easing.Linear.None, true);
        
        setTimeout(this.showBackStages.bind(null, btn), 350);
        
    },

    showBackStages:function(btn)
    {
        var currStage;
        for (var i = 0; i < 8; i++) 
        {
            currStage = Number(texts[i].text)+btn.add;
            if(stageDetails['stage'+(currStage)].lock)
            {
                stageBtns[i].loadTexture('stageLockBtn');
                stageBtns[i].input.enabled = false;
            }
            else
            {
                if(stageDetails['stage'+currStage]['insane']['star1'] && stageDetails['stage'+currStage]['insane']['star2'] && stageDetails['stage'+currStage]['insane']['star3'])
                    stageBtns[i].loadTexture('stageCompleteBtn');
                else if(stageDetails['stage'+currStage]['hard']['star1'] && stageDetails['stage'+currStage]['hard']['star2'] && stageDetails['stage'+currStage]['hard']['star3'])
                    stageBtns[i].loadTexture('insanestageOpenBtn');
                else if(stageDetails['stage'+currStage]['normal']['star1'] && stageDetails['stage'+currStage]['normal']['star2'] && stageDetails['stage'+currStage]['normal']['star3'])
                    stageBtns[i].loadTexture('hardstageOpenBtn');
                else
                    stageBtns[i].loadTexture('stageOpenBtn');
                stageBtns[i].input.enabled = true;
            }
            stageBtns[i].stageNumber = currStage;
            stageBtns[i].x = ((i%4)+1)*(stageBtns[i].width+ stageBtns[i].width);stageBtns[i].y = i<4?game.world.centerY/2:game.world.centerY/2 + stageBtns[i].height*1.5;

            texts[i].x = stageBtns[i].x;
            texts[i].y = stageBtns[i].y;

            texts[i].setText(currStage);

            game.add.tween(stageBtns[i]).from( { y: -stageBtns[i].height }, 100 + (i*50), Phaser.Easing.Linear.None, true);
            game.add.tween(texts[i]).from( { y: -stageBtns[i].height }, 100 + (i*50), Phaser.Easing.Linear.None, true);
        }

        sbg.loadTexture("stage_"+currStage/8);

        if(currStage == 8 || currStage == 64)
        {
            grass.loadTexture("bottomGrass");
            grass.y = game.world.height - grass.height;
            grass.visible = true;
        }
        else if(currStage == 16)
        {
            grass.loadTexture("bottomWheat");
            grass.y = game.world.height - grass.height;
            grass.visible = true;
        }
        else if(currStage == 24)
        {
            grass.loadTexture("bottomFoil");
            grass.y = game.world.height - grass.height;
            grass.visible = true;
        }
        else
        {
            grass.visible = false;
        }

        backStageBtn.loadTexture("nextDiffBtn");
        nextStageBtn.loadTexture("nextDiffBtn");
        nextStageBtn.input.enabled = true;
        backStageBtn.input.enabled = true;

        if(texts[0].text == "1")
        {
            backStageBtn.loadTexture("nextDiffBtnOff");
            backStageBtn.input.enabled = false;
        }
        else if(texts[7].text == "64")
        {
            nextStageBtn.loadTexture("nextDiffBtnOff");
            nextStageBtn.input.enabled = false;
        }

        backStageBtn.x = backStageBtn.width*1.25;
        nextStageBtn.x = game.world.width - nextStageBtn.width*1.25;
        game.add.tween(backStageBtn).from( { x: -backStageBtn.width }, 150 , Phaser.Easing.Linear.None, true);
        game.add.tween(nextStageBtn).from( { x: game.world.width + nextStageBtn.width/2 }, 150 , Phaser.Easing.Linear.None, true);
    },

    showhunts:function()
    {
        for (var i = 0; i < 8; i++) 
        {
            game.add.tween(texts[i]).to( { y: -stageBtns[i].height }, 100 + (i*50), Phaser.Easing.Linear.None, true);
            game.add.tween(stageBtns[i]).to( { y: -stageBtns[i].height }, 100 + (i*50), Phaser.Easing.Linear.None, true);
        }
        game.add.tween(backStageBtn).to( { x: -backStageBtn.width }, 150 , Phaser.Easing.Linear.None, true);
        game.add.tween(nextStageBtn).to( { x: game.world.width + nextStageBtn.width/2 }, 150 , Phaser.Easing.Linear.None, true);
        game.add.tween(huntsBtn).to( { y: game.world.height + huntsBtn.height }, 150 , Phaser.Easing.Linear.None, true,400);

        huntsHolder = [];
        var huntsBG,huntsText;
        var size = 10*screenMultiplier + "px";
        var style = { font: size+" BADABB", fill: "#000000", align: "center" };;
        for (var j = 0; j < 12; j++) 
        {
            huntsHolder[j] = this.add.group();
            huntsBG = this.add.sprite(0,0,'huntHolder');
            huntsBG.anchor.setTo(0.5,0.5);
            huntsBG.x = game.world.width*(0.175) + game.world.width*(0.325)*(j%3);
            huntsBG.y = huntsBG.height*1.5 + (huntsBG.height*1.25*Math.floor(j/3));
            huntsHolder[j].add(huntsBG);

            var birdSprite = this.add.sprite(huntsBG.x,huntsBG.y,birdList[j]);
            if(j==1){birdSprite.frame = 1;}
            birdSprite.anchor.setTo(0.5,0.5);
            ratio = birdSprite.width/birdSprite.height;
            birdSprite.width = huntsBG.height*0.65;
            birdSprite.height = birdSprite.width/ratio;
            birdSprite.x = huntsBG.x -huntsBG.width*0.5 + birdSprite.width;
            huntsHolder[j].add(birdSprite);

            if(huntsCount[j] == 0)
            {
                birdSprite.tint = 0x000000;
            }
            else
            {
                huntsText = game.add.text(huntsBG.x,huntsBG.y, birdList[j], style,huntsHolder[j]);
                huntsText.anchor.setTo(0.5,0.5);
                huntsText.padding.set(10, 0);

                huntsText = game.add.text(huntsBG.x + huntsBG.width*0.4,huntsBG.y, huntsCount[j], style,huntsHolder[j]);
                huntsText.anchor.setTo(0.5,0.5);
                huntsText.padding.set(10, 0);
            }

            game.add.tween(huntsHolder[j]).from( { y: game.world.height + huntsBG.height }, 100 + (j*50) , Phaser.Easing.Linear.None, true,600);
        }

        closeHunts = this.add.button(0,0,'closeBtn',this.hideHunts,this);
        closeHunts.setDownSound(clickSound);
        closeHunts.anchor.setTo(0.5,0.5);
        closeHunts.width *= 0.5;closeHunts.height *= 0.5;
        closeHunts.x = game.world.width - closeHunts.width;
        closeHunts.y = closeHunts.height;
        game.add.tween(closeHunts).from( { y: -closeHunts.height }, 150 , Phaser.Easing.Linear.None, true,1300);
    },

    hideHunts:function()
    {
        for (var j = 0; j < 12; j++) 
        {
           game.add.tween(huntsHolder[j]).to( { y: game.world.height }, 100, Phaser.Easing.Linear.None, true,(j*50)); 
        }
        game.add.tween(closeHunts).to( { y: -closeHunts.height }, 150 , Phaser.Easing.Linear.None, true,600);

        
        for (var i = 0; i < 8; i++) 
        {
            stageBtns[i].x = ((i%4)+1)*(stageBtns[i].width+ stageBtns[i].width);stageBtns[i].y = i<4?game.world.centerY/2:game.world.centerY/2 + stageBtns[i].height*1.5;

            texts[i].x = stageBtns[i].x;
            texts[i].y = stageBtns[i].y;

            game.add.tween(stageBtns[i]).from( { y: -stageBtns[i].height }, 100 + (i*50), Phaser.Easing.Linear.None, true,750);
            game.add.tween(texts[i]).from( { y: -stageBtns[i].height }, 100 + (i*50), Phaser.Easing.Linear.None, true,750);
            
        }
        huntsBtn.x = game.world.centerX;
        huntsBtn.y = game.world.height - (huntsBtn.height*1.5);
        game.add.tween(huntsBtn).from( { y: game.world.height + huntsBtn.height }, 150 , Phaser.Easing.Linear.None, true,1200);

        backStageBtn.x = backStageBtn.width*1.25;
        nextStageBtn.x = game.world.width - nextStageBtn.width*1.25;
        game.add.tween(backStageBtn).from( { x: -backStageBtn.width }, 150 , Phaser.Easing.Linear.None, true,750);
        game.add.tween(nextStageBtn).from( { x: game.world.width + nextStageBtn.width/2 }, 150 , Phaser.Easing.Linear.None, true,750);
        

    },

    createStage:function(item)
    {   
        if(item.key == "stageLockBtn") return;

        stageGroup.visible = false;

        currentStage = item.stageNumber;
        currentDifficulty = 1;

        level = currentStage;

        blackBG = game.add.graphics( 0, 0 );
        blackBG.beginFill(0x000000, 1);
        blackBG.drawRect(0, 0, game.world.width, game.world.height);

        bottomGroup = this.add.group();
        topGroup = this.add.group();

        var stageMenuBG = game.add.graphics( 0, 0 );
        stageMenuBG.beginFill(0xD8A500, 1);
        stageMenuBG.drawRect(0, 0, game.world.width, game.world.height/2);
        topGroup.add(stageMenuBG);

        var size = 30*screenMultiplier + "px";
        var style = { font: size+" BADABB", fill: "#ffffff", align: "center" };

        var stageName = "Stage: "+currentStage;
        var text = game.add.text(game.world.centerX,100, stageName, style);
        text.y = text.height*1.5;
        text.anchor.setTo(0.5,0.5);
        topGroup.add(text);

        size = 20*screenMultiplier + "px";
        style = { font: size+" BADABB", fill: "#ffffff", align: "center" };
        var scoreTxt = "hiscore: "+stageDetails["stage"+currentStage].score;
        var scoretext = game.add.text(game.world.centerX,100, scoreTxt, style);
        scoretext.y = text.y + text.height;
        scoretext.anchor.setTo(0.5,0.5);
        topGroup.add(scoretext);

        var stageStatBG = game.add.graphics( 0, 0 );
        stageStatBG.beginFill(0x6A3C05, 1);
        stageStatBG.drawRect(0, game.world.centerY, game.world.width, game.world.height/2);
        bottomGroup.add(stageStatBG);


        diffName = game.add.text(game.world.centerX,100, "", style);
        diffName.y = game.world.centerY + diffName.height*1.5;
        diffName.anchor.setTo(0.5,0.5);
        bottomGroup.add(diffName);

        size = 15*screenMultiplier + "px";
        style = { font: size+" BADABB", fill: "#666666", align: "center" };
        
        starDefs = [];

        starDefs[0] = game.add.text(game.world.centerX,100, "kill 60% of birds", style);
        starDefs[0].y = diffName.y + starDefs[0].height*1.3;
        starDefs[0].anchor.setTo(0.5,0.5);
        bottomGroup.add(starDefs[0]);

        starDefs[1] = game.add.text(game.world.centerX,100, "kill 100% of birds", style);
        starDefs[1].y = diffName.y + starDefs[1].height*2.3;
        starDefs[1].anchor.setTo(0.5,0.5);
        bottomGroup.add(starDefs[1]);

        starDefs[2] = game.add.text(game.world.centerX,100, "perfect combo", style);
        starDefs[2].y = diffName.y + starDefs[2].height*3.3;
        starDefs[2].anchor.setTo(0.5,0.5);
        bottomGroup.add(starDefs[2]);

        nextDiffBtn = this.add.button(0, (3*game.world.centerY)/2, 'nextDiffBtn',this.showDiffStat,this);
        nextDiffBtn.add = 1;
        nextDiffBtn.x = game.world.width - nextDiffBtn.width*2;
        nextDiffBtn.anchor.setTo(0.5,0.5);
        bottomGroup.add(nextDiffBtn);

        backDiffBtn = this.add.button(0, (3*game.world.centerY)/2, 'nextDiffBtnOff',this.showDiffStat,this);
        backDiffBtn.add = -1;
        backDiffBtn.x = backDiffBtn.width*2;
        backDiffBtn.anchor.setTo(0.5,0.5);
        backDiffBtn.angle += 180;
        bottomGroup.add(backDiffBtn); 
        //this["star"+3+"Def"].addColor("#ffffff", 0);

        playBtn =  this.add.button(game.world.centerX, game.world.centerY, 'play',this.startLastTween,this);
        playBtn.setDownSound(clickSound);
        playBtn.anchor.setTo(0.5,0.5);
        topGroup.add(playBtn);

        var closeBtn = this.add.button(game.world.width - game.world.width/8, game.world.centerY/8, 'closeBtn',this.closeStageSelect,this);
        closeBtn.setDownSound(clickSound);
        topGroup.add(closeBtn);
        
        this.showDiffStat();
    },

    showDiffStat:function(diff)
    {
        if(diff)
            currentDifficulty += diff.add;

        var diffString = currentDifficulty == 1?"normal":currentDifficulty == 2?"hard":"insane";
        var diffDetails = currentDifficulty == 1?" - 1 coin/bird":currentDifficulty == 2?" - 2 coins/bird":" - 4 coins/bird";
        diffName.setText(diffString+diffDetails);

        mode = diffString;

        nextDiffBtn.loadTexture("nextDiffBtn");nextDiffBtn.input.enabled = true;
        backDiffBtn.loadTexture("nextDiffBtn");backDiffBtn.input.enabled = true;

        if(currentDifficulty == 1)
        {
            backDiffBtn.loadTexture("nextDiffBtnOff");
            backDiffBtn.input.enabled = false;
        }
        else if(currentDifficulty == 3)
        {
            nextDiffBtn.loadTexture("nextDiffBtnOff");
            nextDiffBtn.input.enabled = false;
        }

        for (var i = 1; i <= 3; i++) 
        {
           if(stageDetails["stage"+currentStage][diffString]["star"+i])
           {
                starDefs[i-1].addColor("#ffffff", 0);
           }
           else
           {
                starDefs[i-1].addColor("#666666", 0);
                nextDiffBtn.loadTexture("nextDiffBtnOff");
                nextDiffBtn.input.enabled = false;
           }
        }
    },

    closeStageSelect:function() 
    {
        topGroup.destroy(true);
        bottomGroup.destroy(true);
        blackBG.kill();

        stageGroup.visible = true;
    },

    startLastTween:function()
    {
        game.add.tween(topGroup).to( { y: -game.world.height }, 500, Phaser.Easing.Linear.None, true);
        var lastTween = game.add.tween(bottomGroup).to( { y: game.world.height }, 500, Phaser.Easing.Linear.None, true);
        lastTween.onComplete.add(this.startGame,this);
        //this.state.start('Game');
    },

    startGame:function()
    {
        menuSound.stop();

        game.scale.leaveIncorrectOrientation.remove(this.handleCorrect);
        game.scale.enterIncorrectOrientation.remove(this.handleIncorrect);

        this.state.start('Game');
    },

    handleIncorrect:function()
    {
        if(!game.device.desktop)
        {

            rotateImg = game.add.sprite(0,0,'deviceRotate');
            game.paused = true;
        }
    },

    handleCorrect:function()
    {
        if(!game.device.desktop)
        {
            game.paused = false;

            if(rotateImg) rotateImg.kill();
        }

    },
};