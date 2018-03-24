var BootState = {

    init: function() {
      this.game.stage.backgroundColor = "#CDEDFD";
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    },
    
    preload: function() {
  	//this.load.image('preloadBar', 'assets/images/bar.png');
  	//this.load.image('logo', 'assets/images/logo.png');
    },

    create: function() {
     this.state.start('preloadState');
    }
};