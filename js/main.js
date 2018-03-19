var nameFlag ={    
    preload: function() {

    game.load.image('dz', 'assets/flags/dz.png');
    game.load.image('ao', 'assets/flags/ao.png');
    game.load.image('bj', 'assets/flags/bj.png');
    game.load.image('bw', 'assets/flags/bw.png');
    game.load.image('bf', 'assets/flags/bf.png');
    game.load.image('bi', 'assets/flags/bi.png');
    game.load.image('cm', 'assets/flags/cm.png');
    game.load.image('cv', 'assets/flags/cv.png');
    game.load.image('cf', 'assets/flags/cf.png');
    game.load.image('td', 'assets/flags/td.png');
    game.load.image('km', 'assets/flags/km.png');
    game.load.image('cg', 'assets/flags/cg.png');
    game.load.image('cd', 'assets/flags/cd.png');
    game.load.image('ci', 'assets/flags/ci.png');
    game.load.image('dj', 'assets/flags/dj.png');
    game.load.image('eg', 'assets/flags/eg.png');
    game.load.image('gq', 'assets/flags/gq.png');
    game.load.image('er', 'assets/flags/er.png');
    game.load.image('et', 'assets/flags/et.png');
    game.load.image('ga', 'assets/flags/ga.png');
    game.load.image('gm', 'assets/flags/gm.png');
    game.load.image('gh', 'assets/flags/gh.png');
    game.load.image('gn', 'assets/flags/gn.png');
    game.load.image('gw', 'assets/flags/gw.png');
    game.load.image('ls', 'assets/flags/ls.png');
    game.load.image('lr', 'assets/flags/lr.png');
    game.load.image('ly', 'assets/flags/ly.png');
    game.load.image('mg', 'assets/flags/mg.png');
    game.load.image('mw', 'assets/flags/mw.png');
    game.load.image('ml', 'assets/flags/ml.png');
    game.load.image('mr', 'assets/flags/mr.png');
    game.load.image('mu', 'assets/flags/mu.png');
    game.load.image('yt', 'assets/flags/yt.png');
    game.load.image('ma', 'assets/flags/ma.png');
    game.load.image('mz', 'assets/flags/mz.png');
    game.load.image('na', 'assets/flags/na.png'); 
    game.load.image('ne', 'assets/flags/ne.png');
    game.load.image('ng', 'assets/flags/ng.png');
    game.load.image('re', 'assets/flags/re.png');
    game.load.image('rw', 'assets/flags/rw.png');
    game.load.image('sh', 'assets/flags/sh.png');
    game.load.image('st', 'assets/flags/st.png');
    game.load.image('sn', 'assets/flags/sn.png');
    game.load.image('sc', 'assets/flags/sc.png');
    game.load.image('sl', 'assets/flags/sl.png');
    game.load.image('so', 'assets/flags/so.png');
    game.load.image('za', 'assets/flags/za.png');
    game.load.image('ss', 'assets/flags/ss.png');
    game.load.image('sd', 'assets/flags/sd.png');
    game.load.image('sz', 'assets/flags/sz.png');
    game.load.image('tz', 'assets/flags/tz.png');
    game.load.image('tg', 'assets/flags/tg.png');
    game.load.image('ug', 'assets/flags/ug.png');
    game.load.image('eh', 'assets/flags/eh.png');
    game.load.image('zm', 'assets/flags/zm.png');
    game.load.image('zw', 'assets/flags/zw.png');
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
        
        for(var i=0; i<8; i++){
            this.options[i]=this.countriesAF[i];
        }
    
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

        var index =0;
        var optXPos = 197.5;
        var optYPos = 375;
    
    for(var i=0; i<4; i++){
        for(var j=0; i<4; i++){
        this.ansPost[i] = game.add.sprite(optXPos, optYPos, getInfo[this.options[i]].name).toLowerCase();
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

game.state.add('nameFlag', nameFlag);
game.state.start('nameFlag');