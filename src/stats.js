var stats;

var currentArrow;
var goldenArrows;
var diamondArrows;
var bombArrows;

var quiverCapacity;
var comboShields;

var bombDetonationTime;

var stageTime;

var netLvl,powerLvl,reloadLvl;
var net,power,reloadTime;

var birdNames,birdProb;

var coins;
var totalScore;

var upgradeLevelCost;
var reloadBaseTime;
var birdGeneralVel;
var huntsCount;
var birdList = ["pigeon","crow","parrot","eagle","woodpecker","goose","cardinal","seagull","sparrow","flamingo","dove","casowary"];

function setHunts(birdName,value)
{
	for (var i = 0; i < birdList.length; i++) 
	{
		if(birdList[i]==birdName)
		{
			huntsCount[i] += value;
		}
	}
}

function loadGlobalStats()
{
	stats = JSON.parse(localStorage.getItem('stats'));
	if(!stats)
	{
		netLvl = reloadLvl = powerLvl = 0;
		goldenArrows = 0;
		diamondArrows = 0;
		bombArrows = 0;
		coins = 0;
		huntsCount = [0,0,0,0,0,0,0,0,0,0,0,0];
		quiverCapacity = 2;
		comboShields = 0;

		stats = {
				goldenArrows:goldenArrows,
				diamondArrows:diamondArrows,
				bombArrows:bombArrows,
				coins:coins,
				netLvl:netLvl,
				powerLvl:powerLvl,
				reloadLvl:reloadLvl,
				huntsCount:huntsCount,
				quiverCapacity:quiverCapacity,
				comboShields:comboShields
			}
		localStorage.setItem('stats', JSON.stringify(stats));
	}
	else
	{
		goldenArrows = stats.goldenArrows;
		diamondArrows = stats.diamondArrows;
		bombArrows = stats.bombArrows;
		coins = stats.coins;
		netLvl = stats.netLvl;
		reloadLvl = stats.reloadLvl;
		powerLvl = stats.powerLvl;
		huntsCount = stats.huntsCount;
		quiverCapacity = stats.quiverCapacity;
		comboShields = stats.comboShields;
	}
}

function saveStats()
{
	stats = {
				goldenArrows:goldenArrows,
				diamondArrows:diamondArrows,
				bombArrows:bombArrows,
				coins:coins,
				netLvl:netLvl,
				powerLvl:powerLvl,
				reloadLvl:reloadLvl,
				huntsCount:huntsCount,
				quiverCapacity:quiverCapacity,
				comboShields:comboShields
			}

	localStorage.setItem('stats', JSON.stringify(stats));
}

function loadStats(level,mode)
{
	birdGeneralVel = -220;
	reloadBaseTime = 2000;

	power = (powerLvl*0.5)+3;
	net = netLvl+2;
	reloadTime = reloadBaseTime-(reloadLvl*40);

	bombDetonationTime = 500;

	upgradeLevelCost = 10;


	if(level == 1)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 15;birdNames = ['pigeon',null];totalBirds = 2;
							birdMap = [[2,0],[5,0]];
							break;
			case 'hard': 	stageTime = 15;birdNames = ['pigeon',null];totalBirds = 3;
							birdMap = [[2,0],[3,0],[5,0]];
							break;
			case 'insane': 	stageTime = 15;birdNames = ['pigeon',null];totalBirds = 5;
							birdMap = [[1,0],[2,0],[3,0],[4,0],[5,0]];
							break;
		}
		
	}
	else if(level == 2)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 16;birdNames = ['pigeon',null];totalBirds = 3;
							birdMap = [[2,0],[5,0],[7,0]];
							break;
			case 'hard': 	stageTime = 16;birdNames = ['pigeon',null];totalBirds = 4;
							birdMap = [[2,0],[5,0],[7,0],[8,0]];
							break;
			case 'insane': 	stageTime = 16;birdNames = ['pigeon',null];totalBirds = 6;
							birdMap = [[1,0],[2,0],[2,0],[5,0],[7,0],[7,0]];
							break;
		}
		
	}
	else if(level == 3)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 12;birdNames = ['pigeon',null];totalBirds = 3;
							birdMap = [[1,0],[1,0],[3,0]];
							break;
			case 'hard': 	stageTime = 12;birdNames = ['pigeon',null];totalBirds = 4;
							birdMap = [[1,0],[1,0],[3,0],[4,0]];
							break;
			case 'insane': 	stageTime = 12;birdNames = ['pigeon',null];totalBirds = 6;
							birdMap = [[1,0],[1,0],[3,0],[4,0],[4,0]];
							break;
		}
		
	}
	else if(level == 4)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 19;birdNames = ['pigeon',null];totalBirds = 5;
							birdMap = [[1,0],[3,0],[5,0],[7,0],[9,0]];
							break;
			case 'hard': 	stageTime = 21;birdNames = ['pigeon',null];totalBirds = 6;
							birdMap = [[1,0],[3,0],[5,0],[7,0],[9,0],[11,0]];
							break;
			case 'insane': 	stageTime = 25;birdNames = ['pigeon',null];totalBirds = 8;
							birdMap = [[1,0],[3,0],[5,0],[7,0],[7,0],[9,0],[11,0],[13,0]];
							break;
		}
		
	}
	else if(level == 5)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 10;birdNames = ['pigeon',null];totalBirds = 4;
							birdMap = [[1,0],[1,0],[2,0],[2,0]];
							break;
			case 'hard': 	stageTime = 12;birdNames = ['pigeon',null];totalBirds = 5;
							birdMap = [[1,0],[1,0],[2,0],[2,0],[2,0]];
							break;
			case 'insane': 	stageTime = 12;birdNames = ['pigeon',null];totalBirds = 7;
							birdMap = [[1,0],[1,0],[1,0],[1,0],[2,0],[2,0],[2,0]];
							break;
		}
		
	}
	else if(level == 6)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 21;birdNames = ['pigeon',null];totalBirds = 6;
							birdMap = [[1,0],[3,0],[5,0],[7,0],[9,0],[11,0]];
							break;
			case 'hard': 	stageTime = 23;birdNames = ['pigeon',null];totalBirds = 7;
							birdMap = [[1,0],[3,0],[5,0],[7,0],[9,0],[11,0],[11,0],[13,0]];
							break;
			case 'insane': 	stageTime = 27;birdNames = ['pigeon',null];totalBirds = 9;
							birdMap = [[1,0],[3,0],[5,0],[7,0],[9,0],[11,0],[13,0],[15,0],[17,0]];
							break;
		}
		
	}
	else if(level == 7)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 10;birdNames = ['pigeon',null];totalBirds = 5;
							birdMap = [[1,0],[1,0],[2,0],[2,0],[2,0]];
							break;
			case 'hard': 	stageTime = 12;birdNames = ['pigeon',null];totalBirds = 6;
							birdMap = [[1,0],[1,0],[1,0],[2,0],[2,0],[2,0]];
							break;
			case 'insane': 	stageTime = 12;birdNames = ['pigeon',null];totalBirds = 9;
							birdMap = [[1,0],[1,0],[1,0],[1,0],[2,0],[2,0],[2,0],[2,0],[2,0]];
							break;
		}
		
	}
	else if(level == 8)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 21;birdNames = ['pigeon','sparrow',null];totalBirds = 8;
							birdMap = [[1,0],[3,0],[5,0],[5,1],[7,0],[9,0],[9,1],[11,0]];
							break;
			case 'hard': 	stageTime = 23;birdNames = ['pigeon','sparrow',null];totalBirds = 10;
							birdMap = [[1,0],[3,0],[5,0],[5,1],[7,0],[9,0],[9,1],[11,0],[11,0],[13,0]];
							break;
			case 'insane': 	stageTime = 23;birdNames = ['pigeon',null];totalBirds = 16;
							birdMap = [[1,0],[1,1],[3,0],[3,1],[5,0],[5,1],[7,0],[7,1],[9,0],[9,1],[11,0],[11,1],[13,0],[13,1],[15,0],[15,1]];
							break;
		}
		
	}
	else if(level == 9)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 16;birdNames = ['crow',null];totalBirds = 3;
							birdMap = [[2,0],[5,0],[7,0]];
							break;
			case 'hard': 	stageTime = 16;birdNames = ['crow',null];totalBirds = 4;
							birdMap = [[2,0],[5,0],[7,0],[8,0]];
							break;
			case 'insane': 	stageTime = 16;birdNames = ['crow',null];totalBirds = 6;
							birdMap = [[1,0],[2,0],[2,0],[5,0],[7,0],[7,0]];
							break;
		}
		
	}
	else if(level == 10)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 19;birdNames = ['crow',null];totalBirds = 6;
							birdMap = [[1,0],[3,0],[5,0],[7,0],[9,0],[11,0]];
							break;
			case 'hard': 	stageTime = 21;birdNames = ['crow',null];totalBirds = 7;
							birdMap = [[1,0],[3,0],[5,0],[7,0],[9,0],[11,0],[13,0]];
							break;
			case 'insane': 	stageTime = 22;birdNames = ['crow',null];totalBirds = 9;
							birdMap = [[1,0],[3,0],[5,0],[7,0],[7,0],[9,0],[11,0],[13,0],[13,0]];
							break;
		}
		
	}
	else if(level == 11)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 14;birdNames = ['crow',null];totalBirds = 6;
							birdMap = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0]];
							break;
			case 'hard': 	stageTime = 15;birdNames = ['crow',null];totalBirds = 7;
							birdMap = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]];
							break;
			case 'insane': 	stageTime = 15;birdNames = ['crow',null];totalBirds = 9;
							birdMap = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[8,0]];
							break;
		}
		
	}
	else if(level == 12)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 15;birdNames = ['crow','pigeon',null];totalBirds = 7;
							birdMap = [[1,0],[3,0],[5,1],[5,1],[5,1],[5,1],[7,0]];
							break;
			case 'hard': 	stageTime = 15;birdNames = ['crow','pigeon',null]['crow',null];totalBirds = 8;
							birdMap = [[1,0],[3,0],[5,1],[5,1],[5,1],[5,0],[5,0],[7,0]];
							break;
			case 'hard': 	stageTime = 15;birdNames = ['crow','pigeon',null];totalBirds = 10;
							birdMap = [[1,0],[3,0],[3,1],[3,1],[5,1],[5,1],[5,1],[5,0],[5,0],[7,0]];
							break;
		}
		
	}
	else if(level == 13)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 15;birdNames =  ['crow','pigeon',null];totalBirds = 9;
							birdMap = [[1,0],[1,1],[3,0],[3,1],[3,1],[5,0],[5,1],[7,0],[7,1]];
							break;
			case 'hard': 	stageTime = 17;birdNames =  ['crow','pigeon',null];totalBirds = 10;
							birdMap = [[1,0],[1,1],[3,0],[3,1],[5,0],[5,1],[7,0],[7,1],[9,0],[9,1]];
							break;
			case 'insane': 	stageTime = 19;birdNames =  ['crow','pigeon',null];totalBirds = 12;
							birdMap = [[1,0],[1,1],[3,0],[3,1],[5,0],[5,1],[7,0],[7,1],[9,0],[9,1],[11,0],[11,1]];
							break;
		}
	}
	else if(level == 14)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 18;birdNames =  ['crow','pigeon','sparrow',null];totalBirds = 8;
							birdMap = [[1,0],[3,2],[4,1],[5,2],[6,1],[7,0],[9,2],[9,1]];
							break;
			case 'hard': 	stageTime = 17;birdNames =  ['crow','pigeon','sparrow',null];totalBirds = 10;
							birdMap = [[1,0],[1,1],[3,0],[3,1],[5,0],[5,1],[7,0],[7,1],[9,0],[9,1]];
							break;
			case 'insane': 	stageTime = 19;birdNames =  ['crow','pigeon','sparrow',null];totalBirds = 12;
							birdMap = [[1,0],[1,1],[3,0],[3,1],[5,0],[5,1],[7,0],[7,1],[9,0],[9,1],[11,0],[11,1]];
							break;
		}
	}
	else if(level == 15)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 21;birdNames =  ['crow',null];totalBirds = 12;
							birdMap = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0]];
							break;
			case 'hard': 	stageTime = 23;birdNames =  ['crow',null];totalBirds = 14;
							birdMap = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0]];
							break;
			case 'insane': 	stageTime = 21;birdNames =  ['crow',null];totalBirds = 16;
							birdMap = [[1,0],[2,0],[2,0],[3,0],[4,0],[4,0],[5,0],[6,0],[6,0],[7,0],[8,0],[9,0],[10,0],[10,0],[11,0],[12,0]];
							break;
		}
	}
	else if(level == 16)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 21;birdNames =  ['crow','pigeon','sparrow',null];totalBirds = 12;
							birdMap = [[1,0],[2,1],[3,0],[4,0],[5,2],[6,0],[7,1],[8,1],[9,2],[10,0],[11,0],[12,2]];
							break;
			case 'hard': 	stageTime = 23;birdNames =  ['crow','pigeon','sparrow',null];totalBirds = 14;
							birdMap = [[1,0],[2,1],[3,0],[4,0],[5,2],[6,0],[7,1],[8,1],[9,2],[10,0],[11,0],[12,2],[13,2],[14,0]];
							break;
			case 'insane': 	stageTime = 21;birdNames =  ['crow','pigeon','sparrow',null];totalBirds = 16;
							birdMap = [[1,0],[2,1],[2,0],[3,0],[4,2],[4,0],[5,2],[6,1],[6,0],[7,1],[8,1],[9,2],[10,0],[10,0],[11,2],[12,0]];
							break;
		}
	}
	else
	{
		alert("Not available in trial mode");
	}
	/*else if(level == 200)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 70;
							birdNames = ['crow',null];
							totalBirds = 11;
							birdMap = [[3,0],[10,0],[20,0],[21,0],[29,0],[35,0],[39,0],[46,0],[55,0],[56,0],[60,0]];
							break;
			case 'hard': 	stageTime = 105;
							birdNames = ['crow','pigeon',null];
							totalBirds = 20;
							birdMap = [[3,0],[6,0],[15,0],[16,0],[17,0],[25,1],[26,1],[36,0],
									  [42,1],[48,1],[56,1],[65,0],[70,0],[70,1],[70,0],[79,0],
									  [85,0],[92,1],[93,1],[97,0]];
							break;
			case 'insane': 	stageTime = 170;
							birdNames = ['crow','pigeon','sparrow',null];
							totalBirds = 40;
							birdMap = [[2,0],[5,0],[8,0],[11,0],[14,0],[21,0],[23,0],[30,0],[34,0],[40,0],
									  [46,0],[47,2],[48,0],[49,0],[56,1],[60,0],[64,0],[72,0],[73,0],[80,1],
									  [84,0],[88,0],[98,0],[102,0],[103,1],[104,0],[105,1],[112,0],[116,0],[120,1],
									  [124,0],[128,0],[132,0],[140,2],[141,1],[145,0],[153,0],[158,2],[164,1],[164,0]];
							break;
		}
	}
	else if(level == 300)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 85;
							birdNames = ['parrot','eagle',null];
							totalBirds = 14;
							birdMap = [[4,0],[4,0],[11,0],[18,0],[24,0],[32,0],[38,1],[46,0],[55,0],[56,0],
										[63,1],[65,0],[72,0],[73,0]];
							break;
			case 'hard': 	stageTime = 130;
							birdNames = ['parrot',null];
							totalBirds = 26;
							birdMap = [[3,0],[6,0],[15,0],[16,0],[17,0],[25,0],[26,0],[36,0],
									  [42,0],[48,0],[56,0],[65,0],[70,0],[70,0],[70,0],[79,0],
									  [85,0],[92,0],[93,0],[100,0],[100,0],[100,0],[104,0],[105,0],
									  [113,0],[115,0],[120,0],[121,0],[122,0],[123,0]];
							break;
			case 'insane': 	stageTime = 200;
							birdNames = ['parrot','eagle','crow',null];
							totalBirds = 60;
							birdMap = [[1,0],[5,0],[5,0],[8,1],[8,1],[15,0],[23,0],[30,0],[34,0],[40,0],
									  [46,0],[47,1],[48,0],[49,0],[56,1],[60,0],[60,1],[61,0],[68,0],[75,1],
									  [84,0],[88,2],[98,0],[102,0],[103,1],[104,0],[105,1],[112,0],[116,0],[120,1],
									  [124,0],[128,2],[132,0],[140,1],[141,1],[145,0],[153,0],[158,2],[164,2],[164,2],
									  [170,2],[171,2],[175,2],[177,2],[182,1],[182,0],[182,1],[185,0],[186,0],[187,1],
									  [188,0],[189,0],[190,0],[191,1],[192,1],[193,0],[194,0],[195,2],[195,1],[195,0]];
							break;
		}
	}
	else if(level == 400)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 90;
							birdNames = ['eagle',null];
							totalBirds = 16;
							birdMap = [[5,0],[11,0],[16,0],[22,0],[24,0],[32,0],[34,0],[40,0],[50,0],[56,0],
										[63,0],[65,0],[72,0],[75,0],[82,0],[83,0]];
							break;
			case 'hard': 	stageTime = 135;
							birdNames = ['eagle',null];
							totalBirds = 28;
							birdMap = [[5,0],[11,0],[16,0],[22,0],[24,0],[32,0],[34,0],[40,0],[50,0],[56,0],
										[63,0],[65,0],[72,0],[75,0],[82,0],[83,0],[87,0],[91,0],[95,0],[99,0],
										[103,0],[107,0],[111,0],[115,0],[119,0],[123,0],[127,0],[127,0]];
							break;
			case 'insane': 	stageTime = 200;
							birdNames = ['woodpecker','eagle',null];
							totalBirds = 60;
							birdMap = [[1,1],[5,0],[5,0],[8,1],[8,1],[15,0],[23,0],[30,0],[34,0],[40,0],
									  [46,1],[47,1],[48,0],[49,0],[56,1],[60,0],[60,1],[61,0],[68,0],[75,1],
									  [84,1],[88,0],[98,0],[102,0],[103,1],[104,0],[105,1],[112,0],[116,0],[120,1],
									  [124,1],[128,0],[132,0],[140,1],[141,1],[145,0],[153,0],[158,1],[164,1],[164,0],
									  [170,1],[171,0],[175,0],[177,0],[182,1],[182,0],[182,1],[185,0],[186,0],[187,1],
									  [188,1],[189,0],[190,0],[191,1],[192,1],[193,0],[194,0],[195,1],[195,1],[195,0]];
							break;
		}
	}
	else if(level == 500)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 100;
							birdNames = ['crow',null];
							totalBirds = 18;
							birdMap = [[2,0],[3,0],[10,0],[18,0],[24,0],[32,0],[34,0],[40,0],[50,0],[56,0],
										[63,0],[65,0],[72,0],[75,0],[82,0],[83,0],[88,0],[92,0]];
							break;
			case 'hard': 	stageTime = 140;
							birdNames = ['crow',null];
							totalBirds = 32;
							birdMap = [[3,0],[6,0],[15,0],[16,0],[17,0],[25,0],[26,0],[36,0],
									  [42,0],[48,0],[56,0],[65,0],[70,0],[70,0],[70,0],[79,0],
									  [85,0],[92,0],[93,0],[100,0],[100,0],[100,0],[104,0],[105,0],
									  [113,0],[115,0],[120,0],[121,0],[122,0],[125,0],[126,0],[127,0],[128,0],[128,0]
									  ,[132,0],[135,0]];
							break;
			case 'insane': 	stageTime = 290;
							birdNames = ['crow','goose',null];
							totalBirds = 78;
							birdMap = [[1,1],[5,0],[5,0],[8,1],[8,1],[15,0],[23,0],[30,0],[34,0],[40,0],
									  [46,1],[47,1],[48,0],[49,0],[56,1],[60,0],[60,1],[61,0],[68,0],[75,1],
									  [84,1],[88,0],[98,0],[102,0],[103,1],[104,0],[105,1],[112,0],[116,0],[120,1],
									  [124,1],[128,0],[132,0],[140,1],[141,1],[145,0],[153,0],[158,1],[164,1],[164,0],
									  [170,1],[171,0],[175,0],[177,0],[182,1],[182,0],[182,1],[185,0],[186,0],[187,1],
									  [188,1],[189,0],[190,0],[191,1],[192,1],[193,0],[194,0],[195,1],[195,1],[195,0],
									  [200,1],[202,0],[205,0],[208,1],[215,1],[225,0],[230,0],[232,1],[235,1],[245,0],
									  [250,1],[253,0],[258,0],[264,1],[268,1],[275,0],[278,0],[282,1]];
							break;
		}
	}
	else if(level == 600)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 150;
							birdNames = ['pigeon','parrot','eagle','crow',null];
							totalBirds = 26;
							birdMap = [[5,0],[11,1],[16,2],[22,3],[24,0],[32,1],[34,0],[40,3],[50,2],[56,0],
										[63,3],[69,3],[78,2],[79,2],[85,1],[86,1],[95,1],[102,1],[109,2],[115,3],
										[121,0],[122,1],[128,2],[135,2],[142,0],[145,3]];
							break;
			case 'hard': 	stageTime = 270;
							birdNames = ['pigeon','parrot','eagle','crow',null];
							totalBirds = 55;
							birdMap = [[2,0],[3,1],[4,2],[12,0],[16,1],[25,1],[30,1],[38,2],[39,1],[46,0],
										[55,0],[63,0],[70,3],[75,3],[82,3],[83,3],[87,3],[91,1],[95,1],[99,2],
										[103,2],[107,0],[111,3],[115,3],[119,1],[123,1],[127,0],[127,2],[135,0],[140,0],
										[144,0],[146,0],[150,3],[150,3],[160,0],[166,2],[175,2],[176,0],[182,1],[188,1],
										[194,1],[200,0],[210,2],[211,2],[212,1],[220,3],[228,2],[228,2],[235,1],[240,3],
										[248,2],[248,3],[256,2],[260,2],[262,1]];
							break;
			case 'insane': 	stageTime = 575;
							birdNames = ['pigeon','parrot','eagle','crow','woodpecker','dove',null];
							totalBirds = 140;
							birdMap = [[3,1],[8,0],[8,0],[8,1],[10,1],[15,0],[23,0],[30,0],[34,0],[40,0],
									  [46,1],[47,1],[48,5],[49,0],[56,1],[60,0],[60,1],[61,0],[68,0],[75,1],
									  [84,1],[90,0],[98,0],[102,0],[103,1],[104,0],[105,1],[112,0],[116,0],[120,1],
									  [124,3],[128,2],[132,2],[140,3],[141,3],[145,2],[153,2],[158,3],[164,5],[164,2],
									  [170,4],[171,3],[175,3],[177,3],[182,4],[182,3],[182,4],[185,3],[186,3],[187,4],
									  [188,1],[189,3],[190,4],[191,1],[192,1],[193,4],[194,4],[195,1],[195,1],[195,4],
									  [198,3],[200,4],[209,4],[212,4],[215,3],[219,0],[225,3],[220,0],[221,0],[222,3],
									  [229,1],[233,0],[239,3],[245,1],[250,1],[255,3],[262,3],[263,1],[264,1],[270,3],
									  [272,1],[278,3],[278,0],[290,0],[297,1],[306,0],[312,1],[320,0],[325,0],[330,1],
									  [338,1],[346,3],[346,3],[350,3],[355,1],[357,3],[365,1],[366,5],[370,3],[370,1],
									  [378,2],[380,3],[385,3],[390,2],[392,2],[400,0],[405,0],[406,2],[408,2],[410,0],
									  [410,2],[420,0],[425,5],[432,1],[435,4],[440,0],[450,0],[450,4],[459,4],[464,0],
									  [475,4],[476,0],[480,4],[485,1],[492,1],[496,4],[500,4],[510,1],[515,1],[520,5],
									  [530,3],[532,5],[540,4],[545,3],[552,3],[567,4],[567,0],[567,3],[570,3],[570,0]];
							break;
		}
	}
	else if(level == 700)
	{
		switch(mode)
		{
			case 'normal': 	stageTime = 130;
							birdNames = ['seagull',null];
							totalBirds = 36;
							birdMap = [[3,0],[6,0],[15,0],[16,0],[17,0],[25,0],[26,0],[36,0],
									  [42,0],[48,0],[56,0],[65,0],[70,0],[70,0],[70,0],[79,0],
									  [85,0],[86,0],[87,0],[88,0],[93,0],[97,0],[100,0],[101,0],
									  [103,0],[107,0],[108,0],[110,0],[112,0],[115,0],[115,0],[116,0],[117,0],[118,0]
									  ,[119,0],[119,0],[119,0],[120,0],[121,0],[121,0]];
							break;
			case 'hard': 	stageTime = 215;
							birdNames = ['seagull','goose',null];
							totalBirds = 70;
							birdMap = [[3,0],[6,1],[9,0],[12,0],[16,1],[25,1],[30,1],[38,0],[39,1],[46,0],
										[55,0],[63,0],[70,0],[75,0],[82,0],[83,0],[87,0],[91,1],[95,1],[99,0],
										[103,0],[107,0],[111,0],[115,0],[119,1],[123,1],[127,0],[127,0],[135,0],[140,0],
										[144,0],[146,0],[148,0],[150,0],[152,0],[154,0],[156,0],[158,0],[160,1],[162,1],
										[164,1],[166,0],[168,0],[170,0],[172,1],[174,0],[176,0],[178,0],[180,1],[182,0],
										[182,0],[182,0],[182,0],[184,0],[186,1],[186,0],[186,0],[188,0],[190,0],[190,1],
										[192,0],[194,0],[196,0],[196,0],[198,1],[200,0],[202,0],[204,0],[206,0],[208,1]];
							break;
			case 'insane': 	stageTime = 450;
							birdNames = ['seagull','flamingo',null];
							totalBirds = 180;
							birdMap = [[3,1],[8,0],[8,0],[8,1],[10,1],[15,0],[23,0],[30,0],[34,0],[40,0],
									  [46,1],[47,1],[48,5],[49,0],[56,1],[60,0],[60,1],[61,0],[68,0],[75,1],
									  [84,1],[90,0],[98,0],[102,0],[103,1],[104,0],[105,1],[112,0],[116,0],[120,1],
									  [124,3],[128,0],[132,2],[140,3],[141,3],[145,2],[153,2],[158,3],[164,5],[164,2],
									  [170,4],[171,3],[175,3],[177,3],[182,4],[182,3],[182,4],[185,3],[186,3],[187,4],
									  [188,1],[189,3],[190,4],[191,1],[192,1],[193,4],[194,4],[195,1],[195,1],[195,4],
									  [198,3],[200,4],[209,4],[212,4],[215,3],[219,0],[225,3],[220,0],[221,0],[222,3],
									  [229,1],[233,0],[239,3],[245,1],[250,1],[255,3],[262,3],[263,1],[264,1],[270,3],
									  [272,1],[278,3],[278,0],[290,0],[297,1],[306,0],[312,1],[320,0],[325,0],[330,1],
									  [338,1],[346,3],[346,3],[350,3],[355,1],[357,3],[365,1],[366,5],[370,3],[370,1],
									  [378,2],[380,3],[385,3],[390,2],[392,2],[400,0],[405,0],[406,2],[408,2],[410,0],
									  [410,2],[420,0],[425,5],[432,1],[435,4],[440,0],[450,0],[450,4],[459,4],[464,0],
									  [475,4],[476,0],[480,4],[485,1],[492,1],[496,4],[500,4],[510,1],[515,1],[520,5],
									  [530,3],[532,5],[540,4],[545,3],[552,3],[567,4],[567,0],[567,3],[570,3],[570,0]];
							break;
		}
	}*/
}