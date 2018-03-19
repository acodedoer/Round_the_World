


var nameCapital ={    
    preload: function() {

    game.load.image('spring', 'assets/images/spring.png');
    game.load.spritesheet('optionspace', 'assets/images/options.png', 304, 154, 3); 
    game.load.bitmapFont('myfont', 'assets/fonts/fontshadow.png','assets/fonts/fontshadow.fnt');
    this.game.load.text('infoAF', 'js/AF.json ');
},

    create: function() {
        game.stage.backgroundColor = "#CDEDFD";
        this.score = 0;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    
        
        this.ansPost = [{text:'', choice:''},{text:'', choice:''},{text:'', choice:''},{text:'', choice:''}];
        this.countriesAF = ["DZ","AO","BJ","BW","BF","BI","CM","CV","CF","TD","KM","CG","CD","CI","DJ","EG","GQ","ER","ET","GA","GM","GH","GN","GW","KE","LS","LR","LY","MG","MW","ML","MR","MU","YT","MA","MZ","NA","NE","NG","RE","RW","SH","ST","SN","SC","SL","SO","ZA","SS","SD","SZ","TZ","TG","TN","UG","EH","ZM","ZW"];

        this.getInfo;
        this.answer;
        this.options=[];
        
    
        //get states data from json
        getInfo = JSON.parse(game.cache.getText('infoAF'));   
        
        this.questionLine1 = game.add.bitmapText(this.world.centerX, 100, 'myfont', "The capital of", 50);
        this.questionLine2 = game.add.bitmapText(this.world.centerX, 180, 'myfont', "Democratic Republic of the Congo is ?", 50);
        this.questionLine1.anchor.set(0.5);
        this.questionLine2.anchor.set(0.5);
        
        this.stats= {textS:"",textL:"", score:200,lives:3};

        this.stats.text1 = game.add.bitmapText(1480, 0, 'myfont', ""+this.stats.score, 60);
        //stats.text1.anchor.setTo(0.5,0.5);

        this.stats.text2 = game.add.bitmapText(0, 0, 'myfont', 'attempts:3', 40);
        //stats.text.anchor.setTo(0.5,0.5);

        var index =0;
        var optXPos = 197.5;
        var optYPos = 375;
    
    for(var i=0; i<4; i++){
        this.ansPost[i] = game.add.sprite(optXPos, optYPos, 'optionspace');
        this.ansPost[i].anchor.setTo(0.5);
        this.ansPost[i].anchor.setTo(0.5);
        this.ansPost[i].scale.setTo(1);
        this.ansPost[i].text = game.add.bitmapText(optXPos, optYPos, 'myfont', '', 45);
        this.ansPost[i].text.maxWidth = 300;
        this.ansPost[i].text.anchor.setTo(0.5);
        this.ansPost[i].inputEnabled = true;
        this.ansPost[i].events.onInputDown.add(this.checkChoice, this);
        optXPos+=400;
    }
        this.nextQuestion();
    },

    update: function () {

    },

    checkChoice: function(choice){
        if (this.answer == choice.choice){
            choice.frame =1;
            game.time.events.add(Phaser.Timer.SECOND * 0.2, this.correct, this);
        }
        else{
            choice.frame =2;
            this.wrong();
        }
    },

     wrong: function(){
        if (this.stats.lives < 0){

        }
        else{
            this.stats.lives-=1;
            this.stats.text2.setText('lives:'+this.stats.lives);}

    },

    correct: function(){
        this.stats.score+=1;
        this.stats.text1.setText('score: '+this.stats.score);
        this.countriesAF.pop()
        this.nextQuestion();
    },

    reset: function(){
       for (var i =0; i<4; i++){
            this.ansPost[i].frame =0;
        }
        this.options=[];

    },
    nextQuestion: function(){
        this.reset();
        var queCountry = getInfo[this.countriesAF[this.countriesAF.length-1]];
        console.log(queCountry);
        this.questionLine2.setText(queCountry.name + " is?");
        this.answer = queCountry.capital;
        Phaser.ArrayUtils.shuffle(queCountry.cities);
        this.options.push( this.answer);
        for (var i=0;i<3;i++){
            this.options.push(queCountry.cities[i]);
        }
        Phaser.ArrayUtils.shuffle(this.options);

        for (var i =0; i<4; i++){
            this.ansPost[i].text.setText(this.options[i]);
            this.ansPost[i].choice = this.options[i];
        }

    },
    };
var game = new Phaser.Game(1600, 1200, Phaser.AUTO);

game.state.add('nameCapital', nameCapital);
game.state.start('nameCapital');