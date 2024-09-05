let maxAttempts = 5;
let currentAttempts = maxAttempts;

// Blurring levels (filter values)
const blurLevels = [
    'blur(35px)',  // Initial
    'blur(18px)',
    'blur(13px)',
    'blur(10px)',
    'blur(5px)',
    'blur(0px)'   // Clear
];

// Mapeamento de imagens para respostas
const imageAnswers = {
    '1.jpg': 'Admiral Brickell',
    '2.jpg': 'Adora',
    '3.jpg': 'Benjamin',
    '4.jpg': 'Captain Churchill',
    '5.jpg': 'Corvus',
    '6.jpg': 'Etienne',
    '7.jpg': 'Ezile',
    '8.jpg': 'Geraldo',
    '9.jpg': 'Gwendolin',
    '10.jpg': 'Obyn',
    '11.jpg': 'Pat',
    '12.jpg': 'Psy',
    '13.jpg': 'Quincy',
    '14.jpg': 'Rosalia',
    '15.jpg': 'Sauda',
    '16.jpg': 'Striker Jones',
    // Adicione mais pares de imagem e resposta aqui
};

// Obtenha a imagem e a resposta correta para o dia
let currentImage = '';
let correctAnswer = '';

function getImageForToday() {
    const totalImages = Object.keys(imageAnswers).length; // Total de imagens disponíveis
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const imageIndex = (dayOfYear % totalImages) + 1;
    const imageName = `${imageIndex}.jpg`;
    currentImage = imageName;
    correctAnswer = imageAnswers[imageName];
    return `imgs-heroes/${imageName}`;
}

function submitGuess() {
    const input = document.getElementById('guess-input').value.trim();
    const resultElement = document.getElementById('result');
    const attemptCountElement = document.getElementById('attempt-count');
    const imageElement = document.getElementById('character-image'); // Use the correct ID

    if (!imageElement) {
        console.error('Elemento com ID "character-image" não encontrado.');
        return;
    }

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
            // Ajuste o nível de desfoque com base nas tentativas restantes
            const blurIndex = maxAttempts - currentAttempts;
            imageElement.style.filter = blurLevels[blurIndex];
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const imageElement = document.getElementById('character-image'); // Use the correct ID
    const imageSrc = getImageForToday();
    
    if (imageElement) {
        imageElement.src = imageSrc;
    } else {
        console.error('Elemento com ID "character-image" não encontrado.');
    }
});
