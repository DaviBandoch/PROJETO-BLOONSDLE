let maxAttempts = 5;
let currentAttempts = maxAttempts;

// Blurring levels (filter values)
const blurLevels = [
    'blur(10px)',  // Initial
    'blur(7px)',
    'blur(5px)',
    'blur(3px)',
    'blur(1px)',
    'blur(0px)'   // Clear
];

// Assuming the answer is a specific character name
const correctAnswer = 'Psy';

function submitGuess() {
    const input = document.getElementById('guess-input').value.trim();
    const resultElement = document.getElementById('result');
    const attemptCountElement = document.getElementById('attempt-count');
    const imageElement = document.getElementById('character-image');

    if (input === '') {
        resultElement.textContent = 'Por favor, digite um palpite.';
        return;
    }

    if (input.toLowerCase() === correctAnswer.toLowerCase()) {
        resultElement.textContent = 'Parabéns! Você acertou!';
        imageElement.style.filter = 'blur(0px)'; // Clear image if guessed correctly
    } else {
        currentAttempts--;
        attemptCountElement.textContent = currentAttempts;

        if (currentAttempts <= 0) {
            resultElement.textContent = `Você perdeu! A resposta era "${correctAnswer}".`;
            imageElement.style.filter = 'blur(0px)'; // Show the clear image
        } else {
            resultElement.textContent = 'Resposta errada. Tente novamente!';
            // Adjust the blur level based on remaining attempts
            const blurIndex = Math.max(0, blurLevels.length - currentAttempts - 1);
            imageElement.style.filter = blurLevels[blurIndex];
        }
    }
}
