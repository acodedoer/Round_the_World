var game = new Phaser.Game(1600, 1200, Phaser.AUTO);

game.global = {
    score : 0,              //for keeping score in the different modes and displaying on game over  
    continentIndex : 0,     //for keeping track of the continent chosen by player
    modeIndex: 0,           //for keeping track of the mode chosen by player
    modeButton:["btCapital","btFlag","btPopulation"],   //to pick the right restart button to display
    fullArray:[["DZ","AO","BJ","BW","BF","BI","CM","CV","CF","TD","KM","CG","CD","CI","DJ","EG","GQ","ER","ET","GA","GM","GH","GN","GW","KE","LS","LR","LY","MG","MW","ML","MR","MU","YT","MA","MZ","NA","NE","NG","RE","RW","SH","ST","SN","SC","SL","SO","ZA","SS","SD","SZ","TZ","TG","TN","UG","EH","ZM","ZW"],['AI','AG','AR','AW','BS','BB','BZ','BM','BO','BQ','BR','CA','KY','CL','CO','CR','CU','CW','DM','DO','EC','SV','FK','GF','GL','GD','GP','GT','GY','HT','HN','JM','MQ','MX','MS','NI','PA','PY','PE','PR','BL','KN','LC','MF','PM','VC','SX','SR','TT','TC','US','UY','VE','VG','VI'],["AF","AM","AZ","BH","BD","BT","BN","KH","CN","CY","GE","HK","IN","ID","IR","IQ","IL","JP","JO","KZ","KP","KR","KW","KG","LA","LB","MO","MY","MV","MN","MM","NP","OM","PK","PS","PH","QA","SA","SG","LK","SY","TW","TJ","TH","TL","TR","TM","AE","UZ","VN","YE"],['AS','AU','CK','FJ','PF','GU','KI','MH','FM','NR','NC','NZ','NU','NF','MP','PW','PG','PN','WS','SB','TK','TO','TV','VU','WF'],["AX","AL","AD","AT","BY","BE","BA","BG","HR","CZ","DK","EE","FO","FI","FR","DE","GI","GR","GG","VA","HU","IS","IE","IM","IT","JE","LV","LI","LT","LU","MK","MT","MD","MC","ME","NL","NO","PL","PT","RO","RU","SM","RS","SK","SI","ES","SJ","SE","CH","UA","GB"]]                   //Each array in the full array stores codes for the countries in a continent in the manner [Africa, Americas, Asia, Australia, Europe], and is used to get questions (countries) and answers (flags, cities) from the countires json file
}

game.state.add('capitalState', capitalState);   
game.state.add('flagState', flagState);         
game.state.add('gameOver', gameOver);
game.state.add('winState', winState);
game.state.add('menuState', menuState);
game.state.add('preloadState', preloadState);
game.state.add('BootState', BootState);
game.state.start('BootState');
