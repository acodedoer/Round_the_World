var gameOver ={    
    preload: function() {
},

    create: function() {       
        this.continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
        this.modes = ['Capitals', 'Flags', 'Population'];
        this.states =['capitalState', 'flagState', 'populationState'];
        
        this.gameOverText1 = game.add.bitmapText(game.world.centerX, 300, 'myfont','Game Over', 120);
        this.gameOverText1.anchor.set(0.5);
        this.gameOverText2 = game.add.bitmapText(game.world.centerX, 500, 'myfont','Continent: ' + this.continents[game.global.continentIndex], 70);
        this.gameOverText2.anchor.set(0.5);
        this.gameOverText3 = game.add.bitmapText(game.world.centerX, 580, 'myfont','Mode: ' + this.modes[game.global.modeIndex], 70);
        this.gameOverText3.anchor.set(0.5);
        this.gameOverText4 = game.add.bitmapText(game.world.centerX, 660, 'myfont','Score: ' + game.global.score, 70);
        this.gameOverText4.anchor.set(0.5);
        
        this.btRestart = game.add.sprite(1000, 800, game.global.modeButton[game.global.modeIndex]);
        this.btRestart.anchor.set(0.5);
        this.btRestart.inputEnabled= true;
        this.btRestart.events.onInputDown.add(this.restart, this);
        this.txtRestart= game.add.bitmapText(1000, 800, 'myfont','Restart', 50);
        this.txtRestart.anchor.set(0.5);
        
        this.btHome = game.add.sprite(600, 800, 'btHome');
        this.btHome.anchor.set(0.5);
        this.btHome.inputEnabled= true;
        this.btHome.events.onInputDown.add(this.home, this);
        this.txtHome= game.add.bitmapText(600, 800, 'myfont','Main Menu', 50);
        this.txtHome.anchor.set(0.5);
    },
    
    restart: function(){
        this.state.start(this.states[game.global.modeIndex]);
    },
    
    home: function(){
         game.state.start('menuState');
    }
};
