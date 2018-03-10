var configuration = {
'canvas_width_max' : 2560,
'canvas_width' : 640,
'canvas_height_max' : 1440,
'canvas_height' : 360,
'scale_ratio' : 1,
'aspect_ratio' : 1,
};

configuration.canvas_width = window.innerWidth;
configuration.canvas_height = window.innerHeight;
configuration.aspect_ratio = configuration.canvas_width / configuration.canvas_height;
if (configuration.aspect_ratio < 1) configuration.scale_ratio = configuration.canvas_height / configuration.canvas_height_max;
else configuration.scale_ratio = configuration.canvas_width / configuration.canvas_width_max;

game = new Phaser.Game(1024, 576, Phaser.AUTO, 'gamewindow', {
    preload: preload,
    create: create,
   // update: update
});


function preload() {

    game.load.image('spring', 'assets/images/spring.png');
    game.load.image('optionspace', 'assets/images/optionspace.png');
    game.load.bitmapFont('myfont', 'assets/fonts/fontshadow.png','assets/fonts/fontshadow.fnt');
}

var countriesInfo, questionText, answer, scoreText, optionspace;
var score;
var attempts =3;
var optionText=[]
var questionCounter = 10;
var questionIndex, question;
var test =['asdd', 'asd', 'sdd'];
var queArea = configuration.canvas_width/3;
var options=[];
var Australia = [{name: "Australia", capital:"Canberra", city:"Sydney"}, {name: "New Zealand", capital:"Wellington", city: "Auckland"},{name: "Nauru", capital:"Yaren District", city:"Baitsi District"},{name: "Fiji", capital:"Suva", city:"Lubasa"},{name: "Kiribati", capital:"Tarawa", city:"Bikenibeu"},{name: "Marshall Islands", capital:"Majuro", city:""},{name: "Micornesia", capital:"Palikir", city:""},{name: "Palau", capital:"Ngerulmud", city:""}, {name: "Papua New Guinea", capital:"Port Moresby", city:""},{name: "Samao", capital:"Apia", city:""},{name: "Solomon Islands", capital:"Honiara", city:""},{name: "Tonga", capital:"Nuku'alofa", city:""}, {name: "Tuvalu", capital:"Funafuti", city:""},{name: "Vanautu", capital:"Port Vila", city:""}];
var AustralianCities = ["Levuka", "Nadi", "Melbourne", "Brisbane"];
function create() {
    game.stage.backgroundColor = "#fbfbfb";
    var xx=200;
    var yy =200;
    for(var i=0; i<4; i++){
        optionspace = game.add.sprite(xx, yy, 'optionspace');
        optionspace.scale.setTo(0.5);
        optionspace.anchor.set(0.5);
        yy+=80;
    }
    
    
    questionText1 = game.add.bitmapText(200, 100, 'myfont', "The capital of", 20);
    questionText2 = game.add.bitmapText(200, 130, 'myfont', "Democratic Republic of the Congo is ?", 20);
    questionText1.anchor.set(0.5);
    questionText2.anchor.set(0.5);
    score=0;
    scoreText = game.add.bitmapText(0, 0, 'myfont', 'score: 0', 20);
    var txtx = 200;
    var txty = 200;
    for (var i =0; i<=3; i++){
        optionText[i] = game.add.bitmapText(txtx, txty, 'myfont', ''+ i, 20);
        optionText[i].inputEnabled = true;
        optionText[i].anchor.set(0.5);
        //optionText[i].events.onInputDown.add(down, this);
        txty += 80;
    }
    getQuestion();
}

function nextQuestion(){
    //if(questionCounter>0){
        Australia.pop();
        options=[];
        getQuestion();
    //}
   
}
function getQuestion(){
    questionCounter-=1;
    Phaser.ArrayUtils.shuffle(Australia);
    console.log(Australia);
    questionIndex = Australia.length - 1;
    question = Australia[questionIndex].name;
    answer = Australia[questionIndex].capital;
    options.push(answer);
    options.push(Australia[questionIndex].city)
    for (var i=1; i<3; i++){
        if (questionIndex-i>=0){options.push(Australia[questionIndex-i].capital);}
        else{options.push(AustralianCities[i]);}    
    }
    
    Phaser.ArrayUtils.shuffle(options);
    //Australia.pop;[0]
    displayQuestion();
   // console.log(question);
   // console.log(options);
    
}

function displayQuestion(){
   // questionText2.setText(question +" is ?");
    for (var i =0; i<=3; i++){
        optionText[i].setText("Bandar Seri Begawan");
    }
}


function down(item){
    if (item.text == answer){
        score+=1;
        scoreText.setText(score);
        nextQuestion()
    }
    else{
        if (attempts>0){
            attempts-=1;
            item.alpha=0.5;
        }
        else{
            gameOver();
        }
    }
    
}

function gameOver(){
    
}


