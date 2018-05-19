var winState ={    
    create: function() {       
        this.continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
        this.modes = ['Capitals', 'Flags', 'Population', 'Currency'];
        this.states =['capitalState', 'flagState', 'populationState', 'currencyState'];
        
        this.clickSound = game.add.audio('click');
        
        this.gameOverText1 = game.add.bitmapText(game.world.centerX, 300, 'myfont','You did it!', 120);
        this.gameOverText1.anchor.set(0.5);
        this.gameOverText2 = game.add.bitmapText(game.world.centerX, 500, 'myfont',"You've mastered the " +this.modes[game.global.modeIndex]+" of \n "+this.continents[game.global.continentIndex], 70);
        this.gameOverText2.anchor.set(0.5);
        this.gameOverText2.align = 'center'

        if (game.global.score>localStorage.getItem(''+game.global.continentIndex+''+game.global.modeIndex)){
            localStorage.setItem(''+game.global.continentIndex+''+game.global.modeIndex, game.global.score);
            game.global.highscore[game.global.continentIndex][game.global.modeIndex] = game.global.score;
        }
        
        this.btRestart = game.add.sprite(1000, 800, game.global.modeButton[game.global.modeIndex]);
        this.btRestart.anchor.set(0.5);
        this.btRestart.inputEnabled= true;
        this.btRestart.events.onInputDown.add(this.restart, this);
        this.txtRestart= game.add.bitmapText(1000, 800, 'myfont','Restart', 50);
        this.txtRestart.anchor.set(0.5);
        
        this.btHome = game.add.sprite(600, 800, 'btFlag');
        this.btHome.anchor.set(0.5);
        this.btHome.inputEnabled= true;
        this.btHome.events.onInputDown.add(this.home, this);
        this.txtHome= game.add.bitmapText(600, 800, 'myfont','Main Menu', 50);
        this.txtHome.anchor.set(0.5);
    },
    
    restart: function(){
        this.clickSound.play();
        this.state.start(this.states[game.global.modeIndex]);
    },
    
    home: function(){
        this.clickSound.play();
         game.state.start('menuState');
    }
};
