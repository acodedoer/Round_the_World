var flagState ={    
    create: function() {    
        game.global.score=0;
        
        this.correctSound = game.add.audio('correct');
        this.correctSound2 = game.add.audio('correct2');
        this.wrongSound = game.add.audio('wrong');
        this.clickSound = game.add.audio('click');
        this.overSound = game.add.audio('over');
        this.wonSound = game.add.audio('won');
        this.streakSound = game.add.audio('streak');
        
        this.streak = 0;
        
        this.txtScore = game.add.bitmapText(this.world.centerX, 45, 'myguifont', "SCORE: "+game.global.score, 60);
        this.txtScore.anchor.setTo(0.5,0.5);
        
        this.backBt = game.add.sprite(0, 10, 'btBack');
        this.backBt.inputEnabled = true;
        this.backBt.events.onInputDown.add(this.home, this);
        this.stats= {textS:"",textL:"", lives:4};
        this.livesImage = game.add.sprite(1150, 0, 'lives');
        this.livesImage.frame = 4;
        
        this.ansPost = [{flag:'', choice:''},{flag:'', choice:''},{flag:'', choice:''},{flag:'', choice:''}];
        this.countriesAF = game.global.fullArray[game.global.continentIndex].slice(0);
        this.fullOptions=[];

        this.getInfo;
        this.answer;
        this.options=[];
        this.usedFlags =[];
        
        //get states data from json
        getInfo = JSON.parse(game.cache.getText('infoAF'));   
        
        this.questionLine1 = game.add.bitmapText(this.world.centerX, 350, 'myfont', "The flag of", 80);
        this.questionLine2 = game.add.bitmapText(this.world.centerX, 450, 'myfont', "Democratic Republic of the Congo is ?", 80);
        this.questionLine1.anchor.set(0.5);
        this.questionLine2.anchor.set(0.5);
        
        var index=0;
        var optYPos = 700;
        var optXPos = 580;
        
        this.ansPost[0] = game.add.sprite(580, 700, 'option');
        this.ansPost[0].anchor.setTo(0.5);
        this.ansPost[0].inputEnabled = true;
        this.ansPost[0].events.onInputDown.add(this.checkChoice, this);
        
        this.ansPost[1] = game.add.sprite(1000, 700, 'option');
        this.ansPost[1].anchor.setTo(0.5);
        this.ansPost[1].scale.x *=-1;
        this.ansPost[1].inputEnabled = true;
        this.ansPost[1].events.onInputDown.add(this.checkChoice, this);
        
        this.ansPost[2] = game.add.sprite(580, 1020, 'option');
        this.ansPost[2].anchor.setTo(0.5);
        this.ansPost[2].scale.y *=-1;
        this.ansPost[2].inputEnabled = true;
        this.ansPost[2].events.onInputDown.add(this.checkChoice, this);
        
        this.ansPost[3] = game.add.sprite(1000, 1020, 'option');
        this.ansPost[3].anchor.setTo(0.5);
        this.ansPost[3].scale.x *=-1;
        this.ansPost[3].scale.y *=-1;
        this.ansPost[3].inputEnabled = true;
        this.ansPost[3].events.onInputDown.add(this.checkChoice, this);

        this.nextQuestion();
    },

    setFlags: function(data){
        console.log('create options');
        var index =0;
        var optXPos = 580;
        var optYPos = 700;
    
    for(var i=0; i<2; i++){
        for(var j=0; j<2;j++){
           this.ansPost[index].flag = game.add.sprite(optXPos, optYPos, data[index]);
            this.ansPost[index].flag.anchor.setTo(0.5);
            this.ansPost[index].choice = data[index];
            optXPos+=420; 
            index+=1;
            }
        optXPos = 580;
        optYPos +=320;
        }
    },
    
    home: function(){
        this.clickSound.play();
        game.state.start('menuState');
    },
    

    checkChoice: function(choice){
        if (this.answer == choice.choice){
            choice.frame=1;
            this.correctSound.play();
            game.time.events.add(Phaser.Timer.SECOND * 0.2, this.correct, this);
        }
        else{
            choice.frame=2;
            this.wrong();
        }
    },

    wrong: function(){
        
        if (this.stats.lives <=0){
            this.overSound.play();
            this.livesImage.alpha=0;
            for(var m=0;m<4;m++){
                this.ansPost[m].inputEnabled = false;
                if (this.ansPost[m].choice ==this.answer){
                    this.ansPost[m].frame=1; 
                }
            }
            game.time.events.add(Phaser.Timer.SECOND *3, this.gameover, this);
        }
        else{
            this.wrongSound.play();
            this.stats.lives-=1;
            this.streak=0;
            this.livesImage.frame = this.stats.lives;}

    },
    
    gameover: function(){
        game.state.start('gameOver');
    },

    correct: function(){
        game.global.score+=1;
        this.txtScore.setText( "SCORE: "+game.global.score);
        this.streak+=1;
        if(this.streak>=3){this.bonus();}
        this.countriesAF.pop();
        this.reset();
        this.nextQuestion();
    },
    
bonus:function(){
        this.streak=0;
        if(this.stats.lives<4){
            this.streakSound.play();
            this.stats.lives+=1;
            this.livesImage.frame = this.stats.lives;}
    },
    reset: function(){
       for (var i =0; i<4; i++){
            this.ansPost[i].flag.destroy();
           this.ansPost[i].frame=0;
        }
        this.options=[];
    },
    
    nextQuestion: function(){
        Phaser.ArrayUtils.shuffle(this.countriesAF);
        var index = this.countriesAF[this.countriesAF.length-1];
        console.log("question: "+ index);
        var queCountry = getInfo[index];
        this.questionLine2.setText(queCountry.name + " is?");
        this.answer = index;
        this.usedFlags.push(this.answer);
        this.options.push(this.answer);
        if (this.countriesAF.length <=3)
            {
                 Phaser.ArrayUtils.shuffle(this.usedFlags);
                for (var i=2;i<5;i++){
                this.options.push(this.usedFlags[i]);  } 
            }
        else{
            for (var i=2;i<5;i++){
            this.options.push(this.countriesAF[this.countriesAF.length-i]);   
        }
        }
        Phaser.ArrayUtils.shuffle(this.options);
        console.log(this.options);
        
        this.setFlags(this.options);
        },
    };