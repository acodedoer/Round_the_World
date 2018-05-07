var flagState ={    
    create: function() {    
        game.global.score=0;
        
        this.correctSound = game.add.audio('correct');
        this.correctSound2 = game.add.audio('correct2');
        this.wrongSound = game.add.audio('wrong');
        this.clickSound = game.add.audio('click');
        
        this.streak = 0;
        
        this.txtScore = game.add.bitmapText(this.world.centerX, 45, 'myfont', "SCORE: "+game.global.score, 60);
        this.txtScore.anchor.setTo(0.5,0.5);
        
        this.backBt = game.add.sprite(0, 10, 'btBack');
        this.backBt.inputEnabled = true;
        this.backBt.events.onInputDown.add(this.home, this);
        this.stats= {textS:"",textL:"", lives:4};
        this.livesImage = game.add.sprite(1150, 0, 'lives');
        this.livesImage.frame = 4;
        
        this.ansPost = [{text:'', choice:''},{text:'', choice:''},{text:'', choice:''},{text:'', choice:''}];
        this.countriesAF = game.global.fullArray[game.global.continentIndex].slice(0);
        this.fullOptions=[];

        this.getInfo;
        this.answer;
        this.options=[];
        this.usedFlags =[];
        
        //get states data from json
        getInfo = JSON.parse(game.cache.getText('infoAF'));   
        
        this.questionLine1 = game.add.bitmapText(this.world.centerX, 450, 'myfont', "The flag of", 80);
        this.questionLine2 = game.add.bitmapText(this.world.centerX, 550, 'myfont', "Democratic Republic of the Congo is ?", 80);
        this.questionLine1.anchor.set(0.5);
        this.questionLine2.anchor.set(0.5);
    

        this.nextQuestion();
    },

    setFlags: function(){
        var index =0;
        var optXPos = 197.5;
        var optYPos = 700;
    
    for(var i=0; i<4; i++){
        this.ansPost[i] = game.add.sprite(optXPos, optYPos, this.countriesAF[i]);
        this.ansPost.choice = this.countriesAF[i];
        this.ansPost[i].anchor.setTo(0.5);
        this.ansPost[i].inputEnabled = true;
        this.ansPost[i].events.onInputDown.add(this.checkChoice, this);
        optXPos+=400;
        }
    },
    
    home: function(){
        this.clickSound.play();
        game.state.start('menuState');
    },
    

    checkChoice: function(choice){
        choice.alpha = 0.5;
        if (this.answer == choice.choice){
            this.correctSound.play();
            game.time.events.add(Phaser.Timer.SECOND * 0.2, this.correct, this);
        }
        else{
            this.wrong();
        }
    },

    wrong: function(){
        this.wrongSound.play();
        if (this.stats.lives <=0){
           game.state.start('gameOver');
        }
        else{
            this.stats.lives-=1;
            this.streak=0;
            this.livesImage.frame = this.stats.lives;}
    },

    correct: function(){
        game.global.score+=1;
        this.txtScore.setText( "SCORE: "+game.global.score);
        this.streak+=1;
        if(this.streak>=5){this.bonus();}
        this.countriesAF.pop();
        this.reset();
        this.nextQuestion();
    },
    
bonus:function(){
        this.streak=0;
        if(this.stats.lives<4){
            this.correctSound2.play()
            this.stats.lives+=1;
            this.livesImage.frame = this.stats.lives;}
    },
    reset: function(){
       for (var i =0; i<4; i++){
            this.ansPost[i].destroy();
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
        this.index =0;
        this.optXPos = 197.5;
        this.optYPos = 700;

        for(var i=0; i<4; i++){
            this.ansPost[i] = game.add.sprite(this.optXPos, this.optYPos, this.options[i]);
            this.ansPost[i].anchor.setTo(0.5);
            this.ansPost[i].choice = this.options[i];
            this.ansPost[i].inputEnabled = true;
            this.ansPost[i].events.onInputDown.add(this.checkChoice, this);
            this.optXPos+=400;
        }
        },
    };