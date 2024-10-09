// JavaScript
let maxAttempts = 5;
let currentAttempts = maxAttempts;

const blurLevels = [
    'blur(7px)', 
    'blur(5px)',
    'blur(4px)',
    'blur(3px)',
    'blur(0px)',
];

const characters = {
    '1.jpg': 'Campo Dos Simios',
    // Adicione mais imagens e respostas aqui
};

let currentImage = '';
let correctAnswer = '';

function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function getImageForToday() {
    const totalImages = Object.keys(characters).length;
    const dayOfYear = getDayOfYear();
    const imageIndex = (dayOfYear % totalImages) + 1;
    const imageName = `${imageIndex}.jpg`;
    currentImage = imageName;
    correctAnswer = characters[imageName];
    return `imgs-maps/${imageName}`;
}

function submitGuess() {
    // O resto da lógica aqui permanece inalterado...
}

// Certifique-se de que a função filterCharacters utilize o valor completo
function filterCharacters(input) {
    return Object.values(characters).filter(character => character.toLowerCase().startsWith(input.toLowerCase()));
}

// Event listener para DOMContentLoaded permanece o mesmo
document.addEventListener('DOMContentLoaded', function () {
    const imageElement = document.getElementById('character-image');
    const imageSrc = getImageForToday();
    
    if (imageElement) {
        imageElement.src = imageSrc;
        imageElement.style.filter = 'blur(9px) grayscale(100%)';
    } else {
        console.error('Elemento com ID "character-image" não encontrado.');
    }
});

// Adicione uma função para reiniciar o jogo se necessário

function submitGuess() {
    const input = document.getElementById('guess-input').value.trim();
    const resultElement = document.getElementById('result');
    const attemptCountElement = document.getElementById('attempt-count');
    const imageElement = document.getElementById('character-image');

    // Verifica se o elemento da imagem existe
    if (!imageElement) {
        console.error('Elemento com ID "character-image" não encontrado.');
        return;
    }

    // Verifica se o input está vazio
    if (input === '') {
        resultElement.textContent = 'Por favor, digite um palpite.';
        return;
    }

    // Verifica o palpite do usuário
    if (input.toLowerCase() === correctAnswer.toLowerCase()) {
        resultElement.textContent = 'Parabéns! Você acertou!';
        imageElement.style.filter = 'blur(0px) grayscale(0%)'; // Remove blur e grayscale ao acertar
        document.getElementById('guess-input').value = ''; // Limpa o input
    } else {
        if (currentAttempts > 0) {
            currentAttempts--;
            attemptCountElement.textContent = currentAttempts;

            // Desfoca a imagem com base nas tentativas restantes
            const blurIndex = maxAttempts - currentAttempts;
            imageElement.style.filter = blurLevels[blurIndex] + ' grayscale(100\%)'; // Mantém o grayscale

            if (currentAttempts <= 0) {
                resultElement.textContent = `Você perdeu! A resposta era "${correctAnswer}".`;
                imageElement.style.filter = 'blur(0) grayscale(0%)'; // Revela a imagem se todas as tentativas forem usadas
            } else {
                resultElement.textContent = 'Resposta errada. Tente novamente!';
            }
        }
    }

    // Limpa o campo de input após cada palpite
    document.getElementById('guess-input').value = '';
}


