var mainMenu ={    
    preload: function() {
        game.load.image('leftArrow', 'assets/images/leftArrow.png');
        game.load.image('rightArrow', 'assets/images/righttArrow.png');
        game.load.image('ZW', 'assets/flags/zw.png');
        game.load.bitmapFont('myfont', 'assets/fonts/fontshadow.png','assets/fonts/fontshadow.fnt');
        this.game.load.text('infoAF', 'js/AF.json ');
},

    create: function() {
        game.stage.backgroundColor = "#CDEDFD";
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        var left = game.add.sprite(400, 500, 'leftArrow');
    
    }
        
    };
var game = new Phaser.Game(1600, 1200, Phaser.AUTO);

game.state.add('mainMenu', mainMenu);
game.state.start('mainMenu');