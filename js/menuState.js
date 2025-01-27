var menuState ={    
    preload: function() {
},

    create: function() {
        this.nextSound = game.add.audio('next');
        this.backSound = game.add.audio('back');
        this.clickSound = game.add.audio('click');
        
        this.left = game.add.sprite(200, 300, 'leftArrow');
        this.left.anchor.set(0.5);
        this.left.inputEnabled = true;
        this.left.events.onInputDown.add(this.onLArrowClick, this);
        
        this.right = game.add.sprite(1400, 300, 'rightArrow');
        this.right.anchor.set(0.5);
        this.right.inputEnabled = true;
        this.right.events.onInputDown.add(this.onRArrowClick, this);
        
        var btCapital = game.add.sprite(500, 500, 'btFlag');
        btCapital.anchor.set(0.5);
        btCapital.inputEnabled = true;
        btCapital.events.onInputDown.add(this.startCapitalMode, this);
        
        var btFlag = game.add.sprite(  1100, 500, 'btFlag');
        btFlag.anchor.set(0.5);
        btFlag.inputEnabled = true;
        btFlag.events.onInputDown.add(this.startFlagMode, this);
        
        var btPopulation = game.add.sprite(500, 900, 'btFlag', 50);
        btPopulation.anchor.set(0.5);
        btPopulation.inputEnabled = true;
        btPopulation.events.onInputDown.add(this.startPopulationMode, this);
        
        var btCurrency = game.add.sprite(1100, 900, 'btFlag', 50);
        btCurrency.anchor.set(0.5);
        btCurrency.inputEnabled = true;
        btCurrency.events.onInputDown.add(this.startCurrencyMode, this);
        
        var btLearn = game.add.sprite(this.world.centerX, 700, 'btFlag', 50);
        btLearn.anchor.set(0.5);
        btLearn.inputEnabled = true;
        btLearn.events.onInputDown.add(this.startLearnMode, this);
        
        var btLearnText = game.add.bitmapText(this.world.centerX, 700, 'myfont','Learn', 50);
        btLearnText.anchor.set(0.5);
        
        var btCapitalText = game.add.bitmapText(500, 500, 'myfont','Capitals', 50);
        btCapitalText.anchor.set(0.5);
        
        var btFlagText = game.add.bitmapText(1100, 500,'myfont', 'Flags', 50);
        btFlagText.anchor.set(0.5);
        
        var btPopulationText = game.add.bitmapText(500, 900, 'myfont','Population', 50);
        btPopulationText.anchor.set(0.5);
        
        var btCurrencyText = game.add.bitmapText(1100, 900, 'myfont','Currency', 50);
        btCurrencyText.anchor.set(0.5);
        
        this.Continents =['Africa','Americas', 'Asia', 'Australia','Europe'];
        this.txtContinent = game.add.bitmapText(game.world.centerX, 300, 'myfont',this.Continents[game.global.continentIndex], 100);
        this.txtContinent.anchor.set(0.5);

    },
    
     onLArrowClick: function(){
        this.backSound.play();
        if(game.global.continentIndex <=0 ){
            game.global.continentIndex =5;
        }
        game.global.continentIndex-=1;
        this.txtContinent.setText(""+this.Continents[game.global.continentIndex]);
    },
    
    onRArrowClick: function(){
        this.nextSound.play();
        if(game.global.continentIndex >=4 ){
            game.global.continentIndex =-1;
        }
        game.global.continentIndex+=1;
        this.txtContinent.setText(""+this.Continents[game.global.continentIndex]);
    },
    
    startCapitalMode: function(){
        this.clickSound.play();
         this.alpha =0.5;
        //game.time.events.add(Phaser.Timer.SECOND * 0.2, this.correct, this);
        this.state.start('capitalState');
        game.global.modeIndex = 0;
    },
    
    startFlagMode: function(){
        this.clickSound.play();
        //this.updateModeArrays();
        this.state.start('flagState');
        game.global.modeIndex = 1;
    },
        
    startPopulationMode: function(){
        console.log('outside');
        this.clickSound.play();
       // this.updateModeArrays();
        this.state.start('populationState');
        game.global.modeIndex = 2;
    },
     startCurrencyMode: function(){
        console.log('outside');
        this.clickSound.play();
       // this.updateModeArrays();
        this.state.start('currencyState');
        game.global.modeIndex = 3;
    },
    startLearnMode: function(){
        console.log('outside');
        this.clickSound.play();
       // this.updateModeArrays();
        this.state.start('learnState');
    },
    updateModeArrays: function(){
        game.global.modeArray = game.global.fullArray[game.global.modeIndex];
    }
};
