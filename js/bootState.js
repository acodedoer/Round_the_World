var BootState = {
    // set background colour for the game, center game, and scale for all devices
    init: function() {
      this.game.stage.backgroundColor = "#CDEDFD";
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    },
    
    preload: function() {
    this.game.load.bitmapFont('myfont', 'assets/fonts/fontshadow.png','assets/fonts/fontshadow.fnt');
  	this.load.image('loadingBar', 'assets/images/load3.png');
    this.load.image('globe', 'assets/images/globe.png');
    },

    create: function() {
     this.state.start('preloadState');
    }
};