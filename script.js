//import JSON
import words from "./words.json" assert { type: 'json'}


//Capture elements from DOM
const container = document.querySelector('.container.game');
const startContainer = document.querySelector('.container.start')
const recordsContainer = document.querySelector('.container.records')
const records = document.querySelector('#records')
const title = document.getElementById('title');
const alphabet = document.getElementById('alphabet');
const letters = document.getElementsByClassName('letter');
const secretWord = document.getElementById('secretWord');
const livesDisplay = document.getElementById('livesDisplay');
const failsDisplay = document.getElementById('failsDisplay');
const restartBtn = document.getElementById('restartBtn');
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const deleteBtn = document.getElementById('deleteBtn');
const backBtnRecords = document.getElementById('backBtnRecords');
const recordsBtn = document.getElementById('recordsBtn');
const imgwin = document.getElementById('imgwin');
const imglost = document.getElementById('imglost');
const message = document.getElementById('message');
const topText = document.querySelector('.text');
const timer = document.getElementById('timer');
const countdown = document.getElementById('countdown');
const category = document.getElementById('category');
const username = document.getElementById('username');
const secondsSelector = document.getElementById('secondsSelector');


//Declaration of variables needed for the game
let users;

let fails;
let lives;

//Declare and initialize variables needed for timer
let theTimer;
let myTime = new Date();
timer.innerHTML = '00:00';


//Declare and initialize variables needed for countdown
let theCountdown;;
let myCountdown = new Date();
countdown.innerHTML = '10';


//bars is the array that will contain as bars as letters contains the secretWord, and the second one is the same but as string
//to print it without the commas
let bars;
let barsText;

//Word is the word as a string and arrWord is the word but every letter in a array position. Used for comparations
let word;
let arrWord;

//This method starts the game by giving the right value to the variables and displaying necessary elements


//This function fills the array bars with same underscores as letters in the array arrWord, then calls displayBars()
function createUnderscores() {

	bars.slice();
	for (let i = 0; i < arrWord.length; i++) {
		bars.push('_');
	}
	displayBars(bars);
}


//First the barsText is empied, then there's a for with iterations for bars.lenght, every iteration the content of that
//Position of the array (a underscore or a letter from the secretWord) is added to the end of barsText. Then is displayed
function displayBars(bars) {

	barsText = "";

	for (let i = 0; i < bars.length; i++) {
		barsText += bars[i];
	}

	secretWord.innerText = barsText;
}



//When this function is called means that the game is over. 
//So we display and remove from screen some elements, also revealing the secret word
function gameLost() {
	gameEnded();
	secretWord.innerText = word;
	imglost.style.display = 'block';
	message.innerText = "GAME OVER";
}


//If the game game is won, 2 functions are called to check if there's a record and to finish the game
function gameWon() {
	imgwin.style.display = 'block';
	message.innerText = "YOU WON";
	checkRecord(word);
	gameEnded();
}


//This function calls 2 other functions to stop timers, and sets the screen acording to the game ended screen
function gameEnded() {
	stopCountdown();

	stopTimer();
	countdown.style.display = 'none';
	timer.classList.add('end');
	message.style.display = 'block';
	topText.style.display = 'none';
	restartBtn.style.display = 'block';
	alphabet.style.display = 'none';

}


//Here we check if the letter picked by the user is contained in the secret word
function checkIfIsContained(letter) {

	//If secret word contains the letter, the letter in the keyboard turns green and is not clickable anymore
	if (arrWord.includes(letter.target.id)) {
		letter.target.classList.toggle('contained');

		//If not, the letter in the keyboard turns red and is not clickable anymore, and 1 fail is added and -1 live
	} else {
		letter.target.classList.toggle('not-contained');
		fails++;
		lives--;

		//Update of the info at screen
		failsDisplay.innerText = fails;
		livesDisplay.innerText = lives;
	}

	//If no more lives, call gameLost
	if (lives < 1) {
		gameLost();
	} else {
		//If not, the letter is revealed by changing it for the underscore in it's position
		for (let i = 0; i < arrWord.length; i++) {
			if (arrWord[i] == letter.target.id) {
				bars[i] = letter.target.id;
			}
			//Display the bars with the revealed letters
			displayBars(bars)

			//If the array doesn't contain more bars, means the word's been guessed so we call gameWon
			if (!bars.includes('_')) {
				gameWon();
			}
		}
	}
}

//When the game is ended tht restart button appears and clicking it the title text is restored to default and call startGame
restartBtn.addEventListener('click', () => {
	title.innerText = "The Hangman";
	startGame();
});


//Function used to start game
function startGame() {

	//Variables restored to default
	fails = 0;
	lives = 7;
	bars = [];

	//The secret word is randomly picked with the getRandomWord function, 
	//also removed accents with removeAccents function
	//And set to lowercase
	// word = removeAccents(getRamdomWord(category.value)).toLocaleLowerCase();
	word = "holla";
	//This is a array with a position for every letter of the word
	arrWord = [...word];
	//elements displayed on screen to start the game
	alphabet.style.display = 'flex';
	restartBtn.style.display = 'none';
	imglost.style.display = 'none';
	imgwin.style.display = 'none';
	livesDisplay.innerText = lives;
	failsDisplay.innerText = fails;
	message.style.display = 'none';
	topText.style.display = 'block';
	timer.classList.remove('end');
	countdown.style.display = 'block';
	//Functions called to start the game, restarting timers, restarting keyboard and creating underscores for secret word
	restartTimer();
	restartCountdown();
	startTimer();
	restoreAlphabet();
	createUnderscores();
}

//To restore the alphabet, 2 classes are removed from every letter
function restoreAlphabet() {

	for (let i = 0; i < letters.length; i++) {
		letters[i].classList.remove('contained', 'not-contained');
	}
}





//Function to see the time spent to guess the word
function crono() {
	//First get the min and seconds from the time created before
	let minutes = myTime.getMinutes();
	let seconds = myTime.getSeconds();

	//Seconds increment one
	seconds++;

	//some checks to make sure time is correct
	if (seconds == 60) {
		seconds = 0;
		minutes += 1;

		myTime.setMinutes(minutes);
	}

	if (minutes == 60) {
		minutes = 0;
		myTime.setMinutes(minutes);
	}

	//Add the new sec and min to myTime
	myTime.setSeconds(seconds);
	myTime.setMinutes(minutes);

	//Format the time
	if (seconds < 10) { seconds = "0" + seconds }
	if (minutes < 10) { minutes = "0" + minutes }

	//Add the time to screen
	timer.innerHTML = minutes + ":" + seconds;
}


//Start, stop and restart timer
function startTimer() {
	theTimer = setInterval(crono, 1000);
}

function stopTimer() {
	clearInterval(theTimer);
}

function restartTimer() {
	myTime.setHours(0, 0, 0, 0);
	timer.innerHTML = "00:00";
}




//Same function as cromo but for countdown
function cronoCountdown() {
	let seconds = myCountdown.getSeconds();

	//Now seconds are minus
	seconds--;
	countdown.innerHTML = seconds;

	//If seconds arrive to 0, 1 live is subtracted 
	if (seconds == 0) {
		lives--;
		//If no more lives, gameLost
		if (lives < 1) {
			gameLost();
		} else {

			//If still have lives, restart countdown and display lives left
			livesDisplay.innerText = lives;
			restartCountdown();

		}

	} else {

		myCountdown.setSeconds(seconds);
	}


}

//Functions to restart and stop countdown, in this case, when restarting its automatically stoped and started
//If the user sets the countdown less than 5 seconds or more than 59 seconds, its automatically set to 10 seconds
function restartCountdown() {

	stopCountdown();
	if (secondsSelector.value > 3 && secondsSelector.value < 59) {
		myCountdown.setSeconds(secondsSelector.value);
		countdown.innerHTML = secondsSelector.value;
	} else {
		myCountdown.setSeconds(10);
		countdown.innerHTML = 10;
	}
	
	theCountdown = setInterval(cronoCountdown, 1000);

}

function stopCountdown() {
	clearInterval(theCountdown);
}


//function to remove accents
const removeAccents = (str) => {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


//Function to get random word from a category received as parameter.
function getRamdomWord(category) {

	//n is the total words for that category, and the function returns one random word
	let n = Math.floor(Math.random() * words[category].length - 1);
	return words[category][n];
}



//Here we check the records
function checkRecord(word) {

	//First check if theres a record for this word
	let record = JSON.parse(localStorage.getItem(word));
	//Capture the time the user spent
	let time = myTime.getSeconds();
	if (myTime.getMinutes() > 0) {
		time += (myTime.getMinutes() * 60);
	}

	//create a new temporary record to compare with old ones
	let newRecord = [username.value, time, fails];


	//If its first time for this word
	if (!record) {
		//Create the item in localstorage with the time spent (always its a record because its first time)
		localStorage.setItem(word, JSON.stringify(newRecord));
		title.innerHTML = "You set the first record for this word! <br>Time: " + time + " Seconds";
	} else {
		//If the word has been already played, we check if the time its faster than the previous record
		if (time < record[1]) {
			//If its faster, we update the record time value for that word
			title.innerText = "New record! " + time + " seconds";
			localStorage.setItem(word, JSON.stringify(newRecord));
		} else {
			//If theres a faster time set, we show the record and the user who did it
			title.innerHTML = "Actual record: " + record[1] + " seconds <br> by: " + record[0];

		}

	}
}


function openCreateDB() {
	// First, try to get the item users from localStorage
	users = JSON.parse(localStorage.getItem('users'));

	// If there's no item, create an empty array
	if (!users) {
		users = [];
	}
}


function logIn(username) {

	//Check if is a new user, we add it to users and update the localstorage
	if (!users.includes(username)) {

		users.push(username);
		localStorage.setItem('users', JSON.stringify(users));
	}
}

//Generates a html string to display on screen
function generateRecords() {

	let recordsHtml = "<h1>RECORDS TABLE</h1><p>Record for every word should be generated here</p>"
	return recordsHtml;
}





//Every time we click inside the container,first we check if we still hav lives. If yes, we check if there's a letter.If not, we call gameLost(). If there's a letter 
//and its not been clicked yet (checking the classes that are added first time is clicked)  we call checkIfIsContained() function
//To check if that letter is contained in the secret word by passing that letter as parametter
container.addEventListener('click', (e) => {
	if (e.target.classList.contains('letter')
		&& !e.target.classList.contains('contained')
		&& !e.target.classList.contains('not-contained')) {
		checkIfIsContained(e);
		if (lives > 0 && bars.includes('_')) {
			restartCountdown();
		}
	}
});




//When the page is loaded, try to open or create the localstorage and set style properties
window.addEventListener('DOMContentLoaded', () => {
	openCreateDB();
});


//When clicking start button this actions are done, first check theres something typed on username input field and
//the category is not cat (default)
startBtn.addEventListener('click', () => {

	if (username.value != '' && category.value != 'cat') {
		//if not, we call login with the username value always in lowercase, then start game and style properties
		logIn(username.value.toLocaleLowerCase());
		startGame();
		startContainer.style.display = 'none';
		container.style.display = 'flex';
	} else {
		//style modifications modifications so the user understands that category and username is needed to start
		username.classList.add('red');
		username.placeholder = "Please enter a username"
		if (category.value == 'cat') {
			category.style.backgroundColor = "red"
		}
	}

});


//Back to original style for category when theres a valid category
category.addEventListener('change', () => {

	if (category.value != 'cat') {
		category.style.backgroundColor = "black"
	}
});

//Button to turn back, ends the game and style properties
backBtn.addEventListener('click', () => {
	gameEnded();
	username.value = "";
	username.classList.remove('red');
	category.value = "cat";

	startContainer.style.display = 'flex';
	container.style.display = 'none';
	recordsContainer.style.display = 'none';
	deleteBtn.style.display = "none";
});

//Same back button but for records screen
backBtnRecords.addEventListener('click', () => {
	username.value = "";
	username.classList.remove('red');

	startContainer.style.display = 'flex';
	container.style.display = 'none';
	recordsContainer.style.display = 'none';
});


//Button to acces records screen, text is set using generateRecords
recordsBtn.addEventListener('click', () => {
	startContainer.style.display = 'none';
	container.style.display = 'none';
	recordsContainer.style.display = 'flex';

	records.innerHTML = generateRecords();
});

//every letter typed in the username field, check if theres a username with that value
//If yes, a button to delete it is displayed
username.addEventListener('keyup', () => {
	if (users.includes(username.value.trim().toLocaleLowerCase())) {
		username.style.width = "300px";
		deleteBtn.style.display = "block";
	} else {
		deleteBtn.style.display = "none"
	}
});

//Button to delete a user and update localstorage with the new array without the deleted user
deleteBtn.addEventListener('click', () => {

	let index = users.indexOf(username.value.toLocaleLowerCase());

	users.splice(index, 1);

	localStorage.setItem('users', JSON.stringify(users));

	username.value = "";

	deleteBtn.style.display = "none";
	username.style.width = "300px";

});