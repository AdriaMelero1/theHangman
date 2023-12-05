//Capture elements from DOM
const container = document.querySelector('.container.game');
const startContainer = document.querySelector('.container.start')
const alphabet = document.getElementById('alphabet');
const letters = document.getElementsByClassName('letter');
const availableWords = document.querySelectorAll('.row .letter:not(.contained) .letter:not(.not-contained)');
const secretWord = document.getElementById('secretWord');
const livesDisplay = document.getElementById('livesDisplay');
const failsDisplay = document.getElementById('failsDisplay');
const restartBtn = document.getElementById('restartBtn');
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('back');
const imgwin = document.getElementById('imgwin');
const imglost = document.getElementById('imglost');
const message = document.getElementById('message');
const topText = document.querySelector('.text');
const timer = document.getElementById('timer');
const countdown = document.getElementById('countdown');
//Declaration of variables needed for the game
let fails;
let lives;

let first;

let theTimer;
let myTime = new Date();
timer.innerHTML = '00:00';



let theCountdown;;
let myCountdown = new Date();
countdown.innerHTML = '10';

let countdownStarted = false;


//bars is the array that will contain as bars as letters contains the secretWord, and the second one is the same but as string 7
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

// 
//Every time we click inside the container,first we check if we still hav lives. If yes, we check if there's a letter.If not, we call gameLost(). If there's a letter 
//and its not been clicked yet (checking the classes that are added first time is clicked)  we call checkIfIsContained() function
//To check if that letter is contained in the secret word by passing that letter as parametter
container.addEventListener('click', (e) => {
	if (e.target.classList.contains('letter')
		&& !e.target.classList.contains('contained')
		&& !e.target.classList.contains('not-contained')) {
		checkIfIsContained(e);
		restartCountdown();
	}
});

//When this function is called means that the game is over. 
//So we display and remove from screen some elements, also revealing the secret word
function gameLost() {
	gameEnded();
	secretWord.innerText = word;
	imglost.style.display = 'block';
	message.innerText = "GAME OVER";
}

function gameWon() {
	gameEnded();
	imgwin.style.display = 'block';
	message.innerText = "YOU WON";
}

function gameEnded(){

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

	if (arrWord.includes(letter.target.id)) {
		letter.target.classList.toggle('contained');

	} else {
		letter.target.classList.toggle('not-contained');
		fails++;
		lives--;

		failsDisplay.innerText = fails;
		livesDisplay.innerText = lives;
	}

	if (lives < 1) {
		gameLost();
	} else {

		for (let i = 0; i < arrWord.length; i++) {
			if (arrWord[i] == letter.target.id) {
				bars[i] = letter.target.id;

				console.log(bars);
			}
			displayBars(bars)

			if (!bars.includes('_')) {
				gameWon();
			}
		}
	}



}


restartBtn.addEventListener('click', () => {

	startGame();
});

function startGame() {
	first = true;
	fails = 0;
	lives = 7;
	bars = [];
	word =  removeAccents("Viérñess");
	arrWord = [...word.toLocaleLowerCase()];
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
	
	restartCountdown();
	restartTimer();
	restoreAlphabet();
	createUnderscores();
}

function restoreAlphabet() {

	for (let i = 0; i < letters.length; i++) {
		letters[i].classList.remove('contained', 'not-contained');
	}
}






function crono() {
	let minutes = myTime.getMinutes();
	let seconds = myTime.getSeconds();

	seconds++;

	if (seconds == 60) {
		seconds = 0;
		minutes += 1;

		myTime.setMinutes(minutes);
	}

	if (minutes == 60) {
		minutes = 0;
		myTime.setMinutes(minutes);
	}

	myTime.setSeconds(seconds);

	if (seconds < 10) { seconds = "0" + seconds }
	if (minutes < 10) { minutes = "0" + minutes }

	timer.innerHTML = minutes + ":" + seconds;
}



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





function cronoCountdown() {
	let seconds = myCountdown.getSeconds();

	seconds--;
	countdown.innerHTML = seconds;
	
	if(seconds == 0){
		lives --;
		if(lives < 1){
			gameLost();
		}
		livesDisplay.innerText = lives;

		restartCountdown();

	} else{
		
		myCountdown.setSeconds(seconds);
	}


}

function restartCountdown() {

	stopCountdown();
	myCountdown.setSeconds(10);
	countdown.innerHTML = "10";
	theCountdown = setInterval(cronoCountdown, 1000);

}

function stopCountdown(){
	clearInterval(theCountdown);

}



const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 





window.addEventListener('load', () => {
	container.style.display = 'none';
})

startBtn.addEventListener('click', () => {
	startGame();
	startTimer();

	startContainer.style.display = 'none';
	container.style.display = 'flex';
});

backBtn.addEventListener('click', () => {
	gameEnded();
	startContainer.style.display = 'flex';
	container.style.display = 'none';
});