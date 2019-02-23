
//Created by Tim Tierney

/*
	SCOREBOARD.JS

	This is the JS version of the scoreboard app that I made with Java a while back.
	This version pretty much works the same way. 

	//Adder
	Instead of a List we have an array of the 'score' objects that acts as the scoreboard.
	Player ID's and scores are submitted together and added to the array. This list is not sorted

	//Ave score rank
	This is a separate list is used to store all the unique players in the system. Each playerID is accociated with the averages scores creating by the data collected in the score history Array. This list is sorted to determine rank of who has the highest average score, however I would like to modify it in a way where more games for a player can still outrank a player with only one score that is higher than most averages, Possibly a weight system should be added for this to work.

	//Removal method
	Based on the old app, we will also have a method that can delete the score records of a player but not remove them from the the scoreboard or the averageboard. This will require a placeholder value until a new score is added and then replaced. 
*/

var scoreBoardHistory = [];
var scoreAveHistory =[];
var uniquePlayers = [];


/*
	MAIN SCOREBOARD "DRAW TABLE" FUNCTION

	This method is used to draw and refresh the main score table, displaying all the recorded scores in order of entry.
*/
function drawTable(){

	var tableHeaderRowCount = 1;
	var table = document.getElementById("scoreTableBody");
	
	//i'm lazy and just delete each row one by one
	var rowCount = table.rows.length;
	for(var i = tableHeaderRowCount; i< rowCount; i++){
		console.log("delet thsi");
		table.deleteRow(tableHeaderRowCount);
	}

	
	//then I draw each row again
	for(var i in scoreBoardHistory){
	var row = table.insertRow(scoreTable.size);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);

	var x = scoreBoardHistory[i].playerID;
	var y = scoreBoardHistory[i].score;
	cell1.innerHTML = x;
	cell2.innerHTML = y;
	}
	

	//var x = document.getElementById("myID").value;
	//var y = document.getElementById("myScore").value;
	//cell1.innerHTML = x;
	//cell2.innerHTML = y;
}


/*
	"AVERAGE TABLE" function

	Like the main score board, this updates and refreshes all the values within the table. Unlike the main scoreboard, this table also keeps track of any and all playerID's that have been entered. 


*/

function drawTableAve(){
	var tableHeaderRowCount = 1;
	var table = document.getElementById("aveTableBody");
	//document.getElementById('tbody').innerHTML = '';
	var rowCount = table.rows.length;
	for(var i = tableHeaderRowCount; i< rowCount; i++){
		console.log("delet thsi");
		table.deleteRow(tableHeaderRowCount);
	}

	

	for(var i in scoreAveHistory){
	var row = table.insertRow(aveTable.size);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	// for games
	


	var x = scoreAveHistory[i].playerID;
	var y = scoreAveHistory[i].aveScore;
	var z = scoreAveHistory[i].gameTotal;
	//for games
	



	cell1.innerHTML = x;
	cell2.innerHTML = y;
	cell3.innerHTML = z;

	}
	

	//var x = document.getElementById("myID").value;
	//var y = document.getElementById("myScore").value;
	//cell1.innerHTML = x;
	//cell2.innerHTML = y;
}


/*
	ADD SCORE

	This function checks both inputs for playerID and score before entering the values into the scoreboard array.
*/
function addScore(){
	var x = document.getElementById("myID").value;
	var y = document.getElementById("myScore").value;
	if(x == "" || y == ""){
		alert("Please enter a player ID and their score");
	}
	else if(isNaN(x) != false || isNaN(y) != false){
		if(x.includes("fuck") || x.includes("shit")){
			alert("Yeah, your IP is being recorded for that. Also...");
			document.body.innerHTML = "Hey, that language is uncalled for! >:(";
		}
		alert("Please enter numeric values only.");
	}
	else{
	var addToScoreboardHistory = {"playerID": x, "score": y};
	scoreBoardHistory.push(addToScoreboardHistory);
	document.getElementById("totalNumOfScores").innerHTML = countScores();
	}
	drawTable();
	aveScores();

	drawTableAve();
	//aveScores();
}


/*
	For bug tracking, counts the number of entries in the scoreboard
*/
function countScores(){
	var x=0;
	for(var i in scoreBoardHistory){
		x++;
	}
	return x;
}


/*
	Old function, used to check unique player ID's
*/
function uniquePlayerIDCheck(){
	var temp;
	for(var i in scoreBoardHistory){
		var isSeen = false
		console.log("checking " + scoreBoardHistory[i].playerID);
		
		for(var j in uniquePlayers){

			console.log("comparing " + uniquePlayers[j]);
			if(scoreBoardHistory[i].playerID ==uniquePlayers[j]){
				isSeen = true;
				console.log("seen");
			}
		
		}
		if(isSeen == false){
			uniquePlayers.push(scoreBoardHistory[i].playerID);
		}
	
	}


	compareFunction();
	for(var k in uniquePlayers){
		console.log(uniquePlayers[k]+", ");
	}
	console.log("uniquwe players: " + uniquePlayers.size);


}


/*
	Does this still get used?
*/
function aveScoresAddRow() {

	if(scoreBoardHistory === undefined){

		return;
	}

	else{
		//creates a new row for the player
		var player = scoreBoardHistory[0].playerID;
		var scoreTotal = 0;
		var gameTotal = 0;
		for(var i in scoreBoardHistory){
			if (scoreBoardHistory[i].playerID == player){
				scoreTotal += parseInt(scoreBoardHistory[i].score);
				gameTotal++;
			}
		}

		var table = document.getElementById("aveTable");
		var row = table.insertRow(aveTable.size);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		//each cell in the table needs to be identified by player ID
		cell1.id = "playerID"+scoreBoardHistory[i].playerID.toString();
		cell2.id = "score"+scoreBoardHistory[i].playerID.toString();
		cell1.innerHTML = player;
		cell2.innerHTML = scoreTotal/gameTotal;
	}
	
}


/*
	AVE SCORES
	This function will go through all the unique playerIDs in the main scoreboardhistory and calculate the average score and store the pair of ID and aveScore in a object within the array. hopefully this won't blow up this time but I promise it will work... don't give me that look I've learned from my mistakes!

	we are not sorting the list only making it
*/
function aveScores(){
	uniquePlayerIDCheck();
	/*
		Yes yes I know this is a bad way to do it, but for now we just want to make sure we are not adding to the list again and this is quite a light program so we don't care too much about recalcuating the whole list again. So for now, we clear out the list and start over.
	*/
	scoreAveHistory = [];

	//next we are going to itterate through all the given ID's
	
	for(var i in uniquePlayers){

		//next we need a variable for the score total and a variable for game total
		var scTotal=0;
		var gmTotal=0;

		for(var j in scoreBoardHistory){
			//and if the ID we find is the same..
			if(scoreBoardHistory[j].playerID == uniquePlayers[i]){
				
				scTotal += parseInt(scoreBoardHistory[j].score);
				gmTotal ++;
				
				
			}
		}

		if(gmTotal == 0){
			gmTotal =1;
		}
		//now we need to make an object and add it to the list
		var ave = scTotal / gmTotal;

		/*
			ADDED GAME TOTAL TO THE OBJECT!!!
			 CHECK IF THIS WORKS
		*/
		var playerAve = {"playerID": uniquePlayers[i], "aveScore": ave, "gameTotal": gmTotal};
		//and add the scores to the list
		scoreAveHistory.push(playerAve);

	}

	compareFunction();
	for(var k in scoreAveHistory){
		console.log(scoreAveHistory[k].playerID + ", " + scoreAveHistory[k].aveScore);
	}


}






/*
	This is pretty much borrowed from w3schools, but for some reason I typed it out. I'm probably crazy.
	We can use this method to sort a table
*/

function sortAveTable(){
	var table = document.getElementById("aveTable");
	var switching = true;
	var rows;
	var shouldSwitch;
	var i, x, y;
	while(switching == true){

		switching = false;
		rows = table.rows;

		for(i = 1; i< (rows.length -1); i++){
			shouldSwitch = false;


			x = rows[i].getElementByTagName("TD")[0];
			y = rows[i+1].getElementByTagName("TD")[0];

			if(x.innerHTML > y.innerHTML){
				shouldSwitch = true;
				break;
			}
		}
		if(shouldSwitch == true){
			rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
			switching = true;
		}

	}
}


/*
	it sorts on one line. IT SORTS ON ONE LINE!!!
*/
function compareFunction() {
  
  scoreAveHistory.sort(function(a,b){return b.aveScore - a.aveScore});
}




/*
	"REMOVE PLAYER" FUNCTION

	When a player has been bad and must be punished, we can remove all their scores from the scoreboard. This method goes through the scoreboard array and splices each cell that has the player ID in question and successfuly removes it. When the scoreboard table is drawn again, their scores will be removed.

*/
function removePlayer(){

	var exiledPlayer = document.getElementById("deletePlayer").value;

var i = scoreBoardHistory.length

while(i--){
	if (scoreBoardHistory[i].playerID == exiledPlayer){
		scoreBoardHistory.splice(i,1);
	}
}
//scoreBoardHistory.push({"playerID": exiledPlayer, "score": -1})


for(var j in scoreAveHistory){
	if(scoreAveHistory[j].playerID == exiledPlayer){
		//scoreAveHistory[j].aveScore = 0;
		//scoreAveHistory.splice(j,1);         
	}
}

aveScores();

drawTable();
drawTableAve();
document.getElementById("totalNumOfScores").innerHTML = countScores();
}



//objs.sort(compare);






