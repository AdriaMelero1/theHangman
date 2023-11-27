//Capture elements from DOM
const container = document.querySelector('.container');
const availableWords = document.querySelectorAll('.row .letter:not(.contained) .letter:not(.not-contained)');
const secretWord = document.getElementById('secretWord');



const word = "Meleeerro";
const arr = [...word.toLocaleLowerCase()];

let bars = [];

createUnderscores();




function createUnderscores() {

	arr.forEach((input) => {
		bars += '_';
	});

	secretWord.innerText = bars;
}


container.addEventListener('click', (e) => {
	if (e.target.classList.contains('letter')
		&& !e.target.classList.contains('contained')
		&& !e.target.classList.contains('not-contained')) {

		checkIfIsContained(e);
	}
});




function checkIfIsContained(letter){
	if(arr.includes(letter.target.id)){
		letter.target.classList.toggle('contained');
	} else {
		letter.target.classList.toggle('not-contained');
	}
	for(let i = 0; i < arr.length; i++){
		if(arr[i] == letter.target.id){
			bars[i] = letter.target.id;
			
			console.log(bars);
			console.log(letter.target.id);
		}
		console.log(bars);
		secretWord.innerText = bars;
	}
}