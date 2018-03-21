var nameFlag ={    
    preload: function() {
        game.load.image('DZ', 'assets/flags/dz.png');
        game.load.image('AO', 'assets/flags/ao.png');
        game.load.image('BJ', 'assets/flags/bj.png');
        game.load.image('BW', 'assets/flags/bw.png');
        game.load.image('BF', 'assets/flags/bf.png');
        game.load.image('BI', 'assets/flags/bi.png');
        game.load.image('CM', 'assets/flags/cm.png');
        game.load.image('CV', 'assets/flags/cv.png');
        game.load.image('CF', 'assets/flags/cf.png');
        game.load.image('TD', 'assets/flags/td.png');
        game.load.image('KM', 'assets/flags/km.png');
        game.load.image('CG', 'assets/flags/cg.png');
        game.load.image('CD', 'assets/flags/cd.png');
        game.load.image('CI', 'assets/flags/ci.png');
        game.load.image('DJ', 'assets/flags/dj.png');
        game.load.image('EG', 'assets/flags/eg.png');
        game.load.image('GD', 'assets/flags/gq.png');
        game.load.image('ER', 'assets/flags/er.png');
        game.load.image('ET', 'assets/flags/et.png');
        game.load.image('GA', 'assets/flags/ga.png');
        game.load.image('GM', 'assets/flags/gm.png');
        game.load.image('GH', 'assets/flags/gh.png');
        game.load.image('GN', 'assets/flags/gn.png');
        game.load.image('GW', 'assets/flags/gw.png');
        game.load.image('LS', 'assets/flags/ls.png');
        game.load.image('LR', 'assets/flags/lr.png');
        game.load.image('LY', 'assets/flags/ly.png');
        game.load.image('MG', 'assets/flags/mg.png');
        game.load.image('MW', 'assets/flags/mw.png');
        game.load.image('ML', 'assets/flags/ml.png');
        game.load.image('MR', 'assets/flags/mr.png');
        game.load.image('MU', 'assets/flags/mu.png');
        game.load.image('YT', 'assets/flags/yt.png');
        game.load.image('MA', 'assets/flags/ma.png');
        game.load.image('MZ', 'assets/flags/mz.png');
        game.load.image('NA', 'assets/flags/na.png'); 
        game.load.image('NE', 'assets/flags/ne.png');
        game.load.image('NG', 'assets/flags/ng.png');
        game.load.image('RE', 'assets/flags/re.png');
        game.load.image('RW', 'assets/flags/rw.png');
        game.load.image('SH', 'assets/flags/sh.png');
        game.load.image('ST', 'assets/flags/st.png');
        game.load.image('SN', 'assets/flags/sn.png');
        game.load.image('SC', 'assets/flags/sc.png');
        game.load.image('SL', 'assets/flags/sl.png');
        game.load.image('SO', 'assets/flags/so.png');
        game.load.image('ZA', 'assets/flags/za.png');
        game.load.image('SS', 'assets/flags/ss.png');
        game.load.image('SD', 'assets/flags/sd.png');
        game.load.image('SZ', 'assets/flags/sz.png');
        game.load.image('TZ', 'assets/flags/tz.png');
        game.load.image('TG', 'assets/flags/tg.png');
        game.load.image('UG', 'assets/flags/ug.png');
        game.load.image('EH', 'assets/flags/eh.png');
        game.load.image('ZM', 'assets/flags/zm.png');
        game.load.image('ZW', 'assets/flags/zw.png');
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
        
        this.questionLine1 = game.add.bitmapText(this.world.centerX, 100, 'myfont', "The flag of", 50);
        this.questionLine2 = game.add.bitmapText(this.world.centerX, 180, 'myfont', "Democratic Republic of the Congo is ?", 50);
        this.questionLine1.anchor.set(0.5);
        this.questionLine2.anchor.set(0.5);
        
        this.stats= {textS:"",textL:"", score:200,lives:3};

        this.stats.text1 = game.add.bitmapText(1480, 0, 'myfont', ""+this.stats.score, 60);
        //stats.text1.anchor.setTo(0.5,0.5);

        this.stats.text2 = game.add.bitmapText(0, 0, 'myfont', 'attempts:3', 40);
        //stats.text.anchor.setTo(0.5,0.5);

        this.nextQuestion();
    },

    setFlags: function(){
        var index =0;
        var optXPos = 197.5;
        var optYPos = 375;
    
    for(var i=0; i<4; i++){
        this.ansPost[i] = game.add.sprite(optXPos, optYPos, this.countriesAF[i]);
        this.ansPost.choice = this.countriesAF[i];
        this.ansPost[i].anchor.setTo(0.5);
        this.ansPost[i].inputEnabled = true;
        this.ansPost[i].events.onInputDown.add(this.checkChoice, this);
        optXPos+=400;
        }
    },
    
    update: function () {

    },

    checkChoice: function(choice){
        choice.alpha = 0.5;
        if (this.answer == choice.choice){
            game.time.events.add(Phaser.Timer.SECOND * 0.2, this.correct, this);
        }
        else{
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
        this.stats.text1.setText(''+this.stats.score);
        this.countriesAF.pop();
        this.reset();
        this.nextQuestion();
    },

    reset: function(){
       for (var i =0; i<4; i++){
            this.ansPost[i].destroy();
        }
        this.options=[];
    },
    
    nextQuestion: function(){
        Phaser.ArrayUtils.shuffle(this.countriesAF);
        var index = this.countriesAF[this.countriesAF.length-1];
        console.log("question: "+ index);
        var queCountry = getInfo[index];
        this.questionLine2.setText(queCountry.name + " is?");
        this.answer = index;
        this.options.push(this.answer);
        for (var i=2;i<5;i++){
            this.options.push(this.countriesAF[this.countriesAF.length-i]);   
        }
        Phaser.ArrayUtils.shuffle(this.options);
        console.log(this.options);
        this.index =0;
        this.optXPos = 197.5;
        this.optYPos = 375;

        for(var i=0; i<4; i++){
            this.ansPost[i] = game.add.sprite(this.optXPos, this.optYPos, this.options[i]);
            this.ansPost[i].anchor.setTo(0.5);
            this.ansPost[i].choice = this.options[i];
            this.ansPost[i].inputEnabled = true;
            this.ansPost[i].events.onInputDown.add(this.checkChoice, this);
            this.optXPos+=400;
        }
        },
    };
var game = new Phaser.Game(1600, 1200, Phaser.AUTO);

game.state.add('nameFlag', nameFlag);
game.state.start('nameFlag');