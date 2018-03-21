var mainMenu ={    
    preload: function() {
        game.load.image('leftArrow', 'assets/images/leftArrow.png');
        game.load.image('rightArrow', 'assets/images/rightArrow.png');
        game.load.image('btCapital', 'assets/images/bt1.png');
        game.load.image('btFlag', 'assets/images/bt2.png');
        game.load.image('btPopulation', 'assets/images/bt3.png');
        game.load.bitmapFont('myfont', 'assets/fonts/fontshadow.png','assets/fonts/fontshadow.fnt');
        this.game.load.text('infoAF', 'js/AF.json ');
},

    create: function() {
        game.stage.backgroundColor = "#CDEDFD";
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        var left = game.add.sprite(200, 500, 'leftArrow');
        left.anchor.set(0.5);
        left.inputEnabled = true;
        left.events.onInputDown.add(this.onArrowClick, this);
        
        var right = game.add.sprite(1400, 500, 'rightArrow');
        right.anchor.set(0.5);
        right.inputEnabled = true;
        right.events.onInputDown.add(this.onArrowClick, this);
        
        var btCapital = game.add.sprite(400, 800, 'btCapital');
        btCapital.anchor.set(0.5);
        
        var btFlag = game.add.sprite(800, 800, 'btFlag');
        btFlag.anchor.set(0.5);
        
        var btPopulation = game.add.sprite(1200, 800, 'btPopulation', 50);
        btPopulation.anchor.set(0.5);
        
        var btCapitalText = game.add.bitmapText(400, 800, 'myfont','Capitals', 50);
        btCapitalText.anchor.set(0.5);
        
        var btFlagText = game.add.bitmapText(800, 800,'myfont', 'Flags', 50);
        btFlagText.anchor.set(0.5);
        
        var btPopulationText = game.add.bitmapText(1200, 800, 'myfont','Population', 50);
        btPopulationText.anchor.set(0.5);
        
        this.indexContinent=1;
        this.Continents =['Africa', 'Asia', 'Australia', 'Europe', 'Americas'];
        this.txtContinent = game.add.bitmapText(game.world.centerX, 500, 'myfont','Africa', 100);
        this.txtContinent.anchor.set(0.5);
        this.in = 1;
    },
    
    onArrowClick: function(){
        if (this.key == 'rightArrow'){
            this.in+=1;
        }
        else{
            {
            this.in-=1;
        }
            
            this.txtContinent.setText(""+this.Continents[this.in]);
        }
    }
};
var game = new Phaser.Game(1600, 1200, Phaser.AUTO);

    

game.state.add('mainMenu', mainMenu);
game.state.start('mainMenu');