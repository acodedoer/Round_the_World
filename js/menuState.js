var menuState ={    
    preload: function() {
},

    create: function() {
        this.left = game.add.sprite(200, 500, 'leftArrow');
        this.left.anchor.set(0.5);
        this.left.inputEnabled = true;
        this.left.events.onInputDown.add(this.onLArrowClick, this);
        
        this.right = game.add.sprite(1400, 500, 'rightArrow');
        this.right.anchor.set(0.5);
        this.right.inputEnabled = true;
        this.right.events.onInputDown.add(this.onRArrowClick, this);
        
        var btCapital = game.add.sprite(400, 800, 'btCapital');
        btCapital.anchor.set(0.5);
        btCapital.inputEnabled = true;
        btCapital.events.onInputDown.add(this.startCapitalMode, this);
        
        var btFlag = game.add.sprite(800, 800, 'btFlag');
        btFlag.anchor.set(0.5);
        btFlag.inputEnabled = true;
        btFlag.events.onInputDown.add(this.startFlagMode, this);
        
        var btPopulation = game.add.sprite(1200, 800, 'btPopulation', 50);
        btPopulation.anchor.set(0.5);
        btPopulation.events.onInputDown.add(this.startPopulationMode, this);
        
        var btCapitalText = game.add.bitmapText(400, 800, 'myfont','Capitals', 50);
        btCapitalText.anchor.set(0.5);
        
        var btFlagText = game.add.bitmapText(800, 800,'myfont', 'Flags', 50);
        btFlagText.anchor.set(0.5);
        
        var btPopulationText = game.add.bitmapText(1200, 800, 'myfont','Population', 50);
        btPopulationText.anchor.set(0.5);
        
        this.Continents =['Africa','Americas', 'Asia', 'Australia','Europe'];
        this.txtContinent = game.add.bitmapText(game.world.centerX, 500, 'myfont',this.Continents[game.global.continentIndex], 100);
        this.txtContinent.anchor.set(0.5);

    },
    
     onLArrowClick: function(){
        if(game.global.continentIndex <=0 ){
            game.global.continentIndex =5;
        }
        game.global.continentIndex-=1;
        this.txtContinent.setText(""+this.Continents[game.global.continentIndex]);
    },
    
    onRArrowClick: function(){
        if(game.global.continentIndex >=4 ){
            game.global.continentIndex =-1;
        }
        game.global.continentIndex+=1;
        this.txtContinent.setText(""+this.Continents[game.global.continentIndex]);
    },
    
    startCapitalMode: function(){
         this.alpha =0.5;
        //game.time.events.add(Phaser.Timer.SECOND * 0.2, this.correct, this);
        this.state.start('capitalState');
        game.global.modeIndex = 0;
    },
    
    startFlagMode: function(){
        //this.updateModeArrays();
        this.state.start('flagState');
        game.global.modeIndex = 1;
    },
        
    startPopulationMode: function(){
        this.updateModeArrays();
        game.global.modeIndex = 2;
    },
    
    updateModeArrays: function(){
        game.global.modeArray = game.global.fullArray[game.global.modeIndex];
    }
};
