
  var secretNumber = 0,
	numberOfGuesses = 0;
  limitOfGuesses = 10;

function writeMessage(elementId, message, appendMessage) {
	var elemToUpdate = document.getElementById(elementId);
	if (appendMessage) {
		elemToUpdate.innerHTML = elemToUpdate.innerHTML + message;
	} else {
		elemToUpdate.innerHTML = message;
	}
};

function newGame() {
	secretNumber = Math.floor(Math.random() * 100) + 1;
	numberOfGuesses = 0;
	writeMessage('historyList', '');
  writeMessage('message', '<p>Please enter a number 1-100 and press the Guess button.</p>');
}

function guessInRange(guess) {
	return (guess > 0 && guess < 101);
}

function userGuessed() {
	var userGuessed = document.getElementById('number').value;
	var statusArea = document.getElementById('message');
	var historyList = document.getElementById('historyList');
  if(numberOfGuesses == limitOfGuesses)
  {
    document.getElementById(number).setAttribute("type", "hidden");
    writeMessage('message', '<p>Please click new game</p>');
  }
	if (userGuessed.length == 0 || ! guessInRange(userGuessed)) {
		writeMessage('message', '<p>Please enter a number 1-100 and press the Guess button.</p>');
	} else if (userGuessed.indexOf('.') != -1) {
		writeMessage('message', '<p>Please enter a whole number 1-100 and press the Guess button.</p>');
	} else {
		numberOfGuesses++;

		if (userGuessed == secretNumber) {
			writeMessage('message', '<p style="background-color:#02e60b;">You got me in ' + numberOfGuesses +' guesses, I was thinking ' + secretNumber + '. Let\'s go again...</p>');
			newGame();
		} else if (userGuessed < secretNumber) {
			// higher
			writeMessage('message', '<p style="background-color:#f10606;">Sorry your guess is too low, guess higher. You have '+(limitOfGuesses-numberOfGuesses)+' guesses left, try again...</p>');
			writeMessage('historyList', '<li>' + userGuessed +' (too low)</li>', true);
		} else {
			// lower
			writeMessage('message', '<p style="background-color:#f10606;">Sorry your guess is too high, guess lower. You have '+(limitOfGuesses-numberOfGuesses)+' guesses left, try again...</p>');
			writeMessage('historyList', '<li>' + userGuessed + ' (too high)</li>', true);
		}
	}

	document.getElementById('number').value = '';
}

window.onload = function() {
	newGame();
	document.getElementById('guessButton').addEventListener('click', userGuessed);

};
