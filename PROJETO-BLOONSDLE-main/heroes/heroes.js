let maxAttempts = 5;
let currentAttempts = maxAttempts;

const blurLevels = [
    'blur(35px)', 
    'blur(18px)',
    'blur(13px)',
    'blur(10px)',
    'blur(5px)',
    'blur(0px)',
];

const characters = {
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
};

let currentImage = '';
let correctAnswer = '';

function getImageForToday() {
    const totalImages = Object.keys(characters).length;
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const imageIndex = (dayOfYear % totalImages) + 1;
    const imageName = `${imageIndex}.jpg`;
    currentImage = imageName;
    correctAnswer = characters[imageName];
    return `imgs-heroes/${imageName}`;
}

function submitGuess() {
    const input = document.getElementById('guess-input').value.trim();
    const resultElement = document.getElementById('result');
    const attemptCountElement = document.getElementById('attempt-count');
    const imageElement = document.getElementById('character-image');
    const suggestionsContainer = document.getElementById('suggestions');

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
        imageElement.style.filter = 'blur(0) grayscale(0)'; // Revela a imagem
        suggestionsContainer.innerHTML = ''; // Limpa sugestões
    } else {
        if (currentAttempts > 0) {
            currentAttempts--;
            attemptCountElement.textContent = currentAttempts;
        }

        if (currentAttempts <= 0) {
            resultElement.textContent = `Você perdeu! A resposta era "${correctAnswer}".`;
            imageElement.style.filter = 'blur(0) grayscale(0)'; // Mostra a imagem sem desfoque
        } else {
            resultElement.textContent = 'Resposta errada. Tente novamente!';
            const blurIndex = maxAttempts - currentAttempts;
            imageElement.style.filter = blurLevels[blurIndex];
        }
    }

}

function filterCharacters(letter) {
    return Object.values(characters).filter(character => character.startsWith(letter));
}

function displaySuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = ''; 

    suggestions.forEach(character => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = character;
        suggestionItem.style.cursor = 'pointer';
        suggestionItem.addEventListener('click', () => {
            const input = document.getElementById('guess-input');
            input.value = character;
            suggestionsContainer.innerHTML = ''; // Limpa sugestões ao clicar
        });
        suggestionsContainer.appendChild(suggestionItem);
    });
}

document.addEventListener('keydown', function(event) {
    const letter = event.key;
    if (letter && letter.length === 1 && letter.match(/[A-Za-z]/)) {
        const suggestions = filterCharacters(letter.toUpperCase());
        displaySuggestions(suggestions);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const imageElement = document.getElementById('character-image');
    const imageSrc = getImageForToday();
    
    if (imageElement) {
        imageElement.src = imageSrc;
        imageElement.style.filter = 'blur(35px) grayscale(100%)';
    } else {
        console.error('Elemento com ID "character-image" não encontrado.');
    }
});
