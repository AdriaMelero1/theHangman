const word = "Meleeerro";
const arr = [...word]




const secretWord = document.getElementById('secretWord')
let bars = '';

arr.forEach((input) => {
	bars+= '_';
});

secretWord.innerText = bars;