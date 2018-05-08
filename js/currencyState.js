var currencyState ={    
    create: function() {
        game.global.score=0;
        this.usedCapitals =[];
        this.ansPost = [{text:'', choice:''},{text:'', choice:''},{text:'', choice:''},{text:'', choice:''}];
        this.countriesAF = game.global.fullArray[game.global.continentIndex].slice(0);
        this.currencyOptions = game.global.fullArray[game.global.continentIndex].slice(0);
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
        
        //get states data from json
        getInfo = JSON.parse(game.cache.getText('infoAF'));   
        
        this.questionLine1 = game.add.bitmapText(this.world.centerX, 450, 'myfont', "What is Democratic Republic of the Congo's", 80);
        this.questionLine1.anchor.set(0.5);

        
        this.stats= {textS:"", lives:4};

        this.txtScore = game.add.bitmapText(this.world.centerX, 45, 'myfont', "SCORE: "+game.global.score, 60);
        this.txtScore.anchor.setTo(0.5,0.5);
        
        
        this.backBt = game.add.sprite(0, 10, 'btBack');
        this.backBt.inputEnabled = true;
        this.backBt.events.onInputDown.add(this.home, this);

        this.livesImage = game.add.sprite(1276, 0, 'lives');
        this.livesImage.frame = 4;
        //stats.text.anchor.setTo(0.5,0.5);

        var index =0;
        var optXPos = 197.5;
        var optYPos = 700;
    
    for(var i=0; i<4; i++){
        this.ansPost[i] = game.add.sprite(optXPos, optYPos, 'btCapital');
        this.ansPost[i].anchor.setTo(0.5);
        this.ansPost[i].anchor.setTo(0.5);
        this.ansPost[i].scale.setTo(1);
        this.ansPost[i].text = game.add.bitmapText(optXPos, optYPos, 'myfont', '', 45);
        this.ansPost[i].text.maxWidth = 300;
        this.ansPost[i].text.anchor.setTo(0.5);
         this.ansPost[i].text.align = 'center'
        this.ansPost[i].inputEnabled = true;
        this.ansPost[i].events.onInputDown.add(this.checkChoice, this);
        optXPos+=400;
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
        choice.alpha =0.5;
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
        console.log("remaining: "+this.countriesAF.length);
        if (this.countriesAF.length<=1){
            game.state.start('winState');
        }
        else{
        game.global.score+=1;
        this.txtScore.setText('SCORE: '+game.global.score);
        this.streak+=1;
        if(this.streak>=5){this.bonus();}
        this.countriesAF.pop()
        this.nextQuestion();
        }
        console.log(this.streak);
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
            this.ansPost[i].alpha =1;
        }
        this.options=[];

    },
    nextQuestion: function(){
        this.reset();
        Phaser.ArrayUtils.shuffle(this.countriesAF);
        var queCountry = getInfo[this.countriesAF[this.countriesAF.length-1]];
        this.questionLine1.setText("What is "+queCountry.name + "'s main currency?");
        this.questionLine1.maxWidth = 1500;
        this.questionLine1.align = 'center';
        this.answer = queCountry.currency;
        this.usedCapitals.push(this.answer);
        this.options.push( this.answer);
        
        Phaser.ArrayUtils.shuffle(this.currencyOptions);
        this.count=0;
        for (var i=1;i<this.currencyOptions.length ;i++){
            this.checkoption = getInfo[this.currencyOptions[i]].currency;
            if(this.checkoption == this.answer){}
                else{this.options.push(this.checkoption);
                    this.count +=1;}
            if(this.count>=3){
                break;
            }
                
            }
        
       Phaser.ArrayUtils.shuffle(this.options);

        for (var i =0; i<4; i++){
            this.ansPost[i].text.setText(this.options[i]);
            this.ansPost[i].choice = this.options[i];
        }

    },
    };