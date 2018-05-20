var capitalState ={    
    create: function() {
        game.global.score=0;
        this.usedCapitals =[];
        this.ansPost = [{text:'', choice:''},{text:'', choice:''},{text:'', choice:''},{text:'', choice:''}];
        this.countriesAF = game.global.fullArray[game.global.continentIndex].slice(0);
        console.log(game.global.continentIndex);
        console.log(game.global.fullArray[game.global.continentIndex]);
        
        this.streak = 0;

        this.getInfo;
        this.answer;
        this.options=[];
        
        this.correctSound = game.add.audio('correct');
        this.correctSound2 = game.add.audio('correct2');
        this.wrongSound = game.add.audio('wrong');
        this.clickSound = game.add.audio('click');
        this.overSound = game.add.audio('over');
        this.wonSound = game.add.audio('won');
        this.streakSound = game.add.audio('streak');
        
        //get states data from json
        getInfo = JSON.parse(game.cache.getText('infoAF'));   
        
        this.questionLine1 = game.add.bitmapText(this.world.centerX, 350, 'myfont', "The capital of", 80);
        this.questionLine2 = game.add.bitmapText(this.world.centerX, 450, 'myfont', "Democratic Republic of the Congo is ?", 80);
        this.questionLine1.anchor.set(0.5);
        this.questionLine2.anchor.set(0.5);

        
        this.stats= {textS:"", lives:4};

        this.txtScore = game.add.bitmapText(this.world.centerX, 45, 'myguifont', "SCORE: "+game.global.score, 60);
        this.txtScore.anchor.setTo(0.5,0.5);
        
        
        this.backBt = game.add.sprite(0, 10, 'btBack');
        this.backBt.inputEnabled = true;
        this.backBt.events.onInputDown.add(this.home, this);

        this.livesImage = game.add.sprite(1276, 0, 'lives');
        this.livesImage.frame = 4;
        //stats.text.anchor.setTo(0.5,0.5);

        var index=0;
        var optYPos = 700;
        var optXPos = 580;
        
        this.ansPost[0] = game.add.sprite(580, 700, 'option');
        this.ansPost[0].anchor.setTo(0.5);
        
        this.ansPost[1] = game.add.sprite(1000, 700, 'option');
        this.ansPost[1].anchor.setTo(0.5);
        this.ansPost[1].scale.x *=-1;
        
        this.ansPost[2] = game.add.sprite(580, 1020, 'option');
        this.ansPost[2].anchor.setTo(0.5);
        this.ansPost[2].scale.y *=-1;
        
        this.ansPost[3] = game.add.sprite(1000, 1020, 'option');
        this.ansPost[3].anchor.setTo(0.5);
        this.ansPost[3].scale.x *=-1;
        this.ansPost[3].scale.y *=-1;
        
        for(var j=0;j<2;j++){
            for(var i=0; i<2;i++){
                this.ansPost[index].text = game.add.bitmapText(optXPos, optYPos, 'myfont', '', 45);
                this.ansPost[index].text.maxWidth = 300;
                this.ansPost[index].text.anchor.setTo(0.5);
                this.ansPost[index].text.align = 'center'
                this.ansPost[index].inputEnabled = true;
                this.ansPost[index].events.onInputDown.add(this.checkChoice, this);
                optXPos+=420;
                index+=1;
            }
            optYPos +=320;
            optXPos = 580;
        }
        
        
    
        this.nextQuestion();
    },

    update: function () {

    },
    
    home: function(){
        this.clickSound.play();
        game.state.start('menuState');
    },

    checkChoice: function(choice){
        if (this.answer == choice.choice){
            this.correctSound.play();
            choice.frame=1;
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
        console.log("remaining: "+this.countriesAF.length);
        if (this.countriesAF.length<=1){
            game.state.start('winState');
        }
        else{
        game.global.score+=1;
        this.txtScore.setText('SCORE: '+game.global.score);
        this.streak+=1;
        if(this.streak>=3){this.bonus();}
        this.countriesAF.pop()
        this.nextQuestion();
        }
        console.log(this.streak);
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
            this.ansPost[i].frame =0;
           this.ansPost[i].inputEnabled = true;
        }
        this.options=[];

    },
    nextQuestion: function(){
        this.reset();
        Phaser.ArrayUtils.shuffle(this.countriesAF);
        var queCountry = getInfo[this.countriesAF[this.countriesAF.length-1]];
        this.questionLine2.setText(queCountry.name + " is?");
        this.answer = queCountry.capital;
        this.usedCapitals.push(this.answer);
        this.options.push( this.answer);
        
        if(this.countriesAF.length <=3){
            Phaser.ArrayUtils.shuffle(this.usedCapitals);
            for (var i=2;i<5;i++){
            this.options.push(this.usedCapitals[i]);
            }}
        else{
            for (var i=2;i<5;i++){
            this.options.push(getInfo[this.countriesAF[this.countriesAF.length-i]].capital);
        }
        
        }
       Phaser.ArrayUtils.shuffle(this.options);

        for (var i =0; i<4; i++){
            this.ansPost[i].text.setText(this.options[i]);
            this.ansPost[i].choice = this.options[i];
        }

    },
    };