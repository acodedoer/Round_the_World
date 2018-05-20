var learnState ={    
    create: function() {
        this.nextSound = game.add.audio('next');
        this.backSound = game.add.audio('back');
        this.clickSound = game.add.audio('click');
        
        this.index=0;
        this.continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
        
        
        this.backBt = game.add.sprite(0, 10, 'btBack');
        this.backBt.inputEnabled = true;
        this.backBt.events.onInputDown.add(this.home, this);
        
        this.countries = game.global.fullArray[game.global.continentIndex].slice(0);
        console.log(game.global.continentIndex);
        console.log(game.global.fullArray[game.global.continentIndex]);
        
        this.right = game.add.sprite(1565, this.world.centerY, 'rightArrow');
        this.right.scale.setTo(0.5);
        this.right.anchor.set(0.5);
        this.right.inputEnabled = true;
        this.right.events.onInputDown.add(this.next, this);
        
        this.left = game.add.sprite(35, this.world.centerY, 'leftArrow');
        this.left.scale.setTo(0.5);
        this.left.anchor.set(0.5);
        this.left.inputEnabled = true;
        this.left.events.onInputDown.add(this.back, this);
                                          
        this.getInfo=JSON.parse(game.cache.getText('infoAF'));;
        
        this.correctSound = game.add.audio('correct');
        this.correctSound2 = game.add.audio('correct2');
        
       
        
        this.continentName = game.add.bitmapText(this.world.centerX, 50, 'myguifont', 'Countries in '+this.continents[game.global.continentIndex]+'', 80);
        this.continentName.anchor.set(0.5);
        
        var countryData= this.getInfo[this.countries[this.index]];
        this.cName = game.add.bitmapText(500, 250, 'myfont', countryData.name, 100);
        this.cName.maxWidth = 1100;
        this.cName.align = 'left'
        
        this.flag = game.add.sprite(250, 325, this.countries[this.index]);
        this.flag.anchor.set(0.5);
        
        this.cCapital = game.add.bitmapText(100, 550, 'myfont', "Capital: "+countryData.capital, 80);
        this.cCurrency = game.add.bitmapText(100, 700, 'myfont', "Currency: "+countryData.currency, 80);
        this.cPopulation = game.add.bitmapText(100, 850, 'myfont', "Population: "+countryData.population, 80);
    },
    home: function(){
        this.clickSound.play();
        game.state.start('menuState');
    },
    next: function(){
        if(this.index<this.countries.length-1){
            this.nextSound.play();
            this.flag.destroy();
            this.index+=1;
            this.flag = game.add.sprite(250, 325, this.countries[this.index]);
            this.flag.anchor.set(0.5);
            var countryData= this.getInfo[this.countries[this.index]];
            this.cName.setText(countryData.name);
            this.cCapital.setText("Capital: "+countryData.capital);
            this.cCurrency .setText("Currency: "+countryData.currency);
            this.cPopulation.setText("Population: "+countryData.population);
        }
    },
    
    back: function(){
        if(this.index>0){
                this.backSound.play();
                this.flag.destroy();
                this.index-=1;
                this.flag = game.add.sprite(250, 325, this.countries[this.index]);
                this.flag.anchor.set(0.5);
                var countryData= this.getInfo[this.countries[this.index]];
                this.cName.setText(countryData.name);
                this.cCapital.setText("Capital: "+countryData.capital);
                this.cCurrency .setText("Currency: "+countryData.currency);
                this.cPopulation.setText("Population: "+countryData.population);
            }
    }
}