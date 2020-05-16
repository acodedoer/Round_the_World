var preloadState ={   
    //load all flgas, bitmap text, buttons
    preload: function() {
        this.bg = game.add.bitmapText(this.world.centerX,400,'myfont', "Round the World", 150);
        this.bg.anchor.setTo(0.5);
        
        this.globe = game.add.sprite(this.world.centerX,700,'globe');
        this.globe.anchor.setTo(0.5);
        
        this.loadBar = game.add.sprite(this.world.centerX,950,'loadingBar');
        this.loadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.loadBar);

        for( i = 0; i< this.game.global.fullArray.length; i++){
            for( j = 0; j< this.game.global.fullArray[i].length; j++){
                console.log('assets/flags/'+this.game.global.fullArray[i][j].toLowerCase()+'.png')
                this.game.load.image(this.game.global.fullArray[i][j], 'assets/flags/'+this.game.global.fullArray[i][j].toLowerCase()+'.png');
            }
        }
    
        this.game.load.image('leftArrow', 'assets/images/leftArrow.png');
        this.game.load.image('rightArrow', 'assets/images/rightArrow.png');
        this.game.load.spritesheet('option', 'assets/images/options.png', 404,304,3);
        this.game.load.image('btFlag', 'assets/images/bt2.png');
        this.game.load.image('btBack', 'assets/images/back.png');
        this.game.load.image('btHome', 'assets/images/options.png'); 
        this.game.load.bitmapFont('myguifont', 'assets/fonts/guifont.png','assets/fonts/guifont.fnt');
        this.game.load.spritesheet('lives', 'assets/images/lives.png', 324, 68, 5);
        this.game.load.text('infoAF', 'js/countries.json ');
        
        this.game.load.audio('correct', 'assets/audio/correct.ogg');
        this.game.load.audio('wrong', 'assets/audio/wrong.ogg');
        this.game.load.audio('next', 'assets/audio/next.ogg');
        this.game.load.audio('back', 'assets/audio/back.ogg');
        this.game.load.audio('correct2', 'assets/audio/correct2.ogg');
        this.game.load.audio('click', 'assets/audio/click.ogg');
        this.game.load.audio('streak', 'assets/audio/streak.ogg');
        this.game.load.audio('won', 'assets/audio/gamewon.ogg');
        this.game.load.audio('over', 'assets/audio/gameover.ogg');
        
    },

    create: function() {
        for (var i= 0; i<5; i++){
            for (var j= 0; j<5; j++){
            if(localStorage.getItem(''+i+''+j) == null){}
            else{
                game.global.highscore[i][j] = localStorage.getItem(''+i+''+j);
            }}
        this.state.start('menuState');
            
        
  }
}}