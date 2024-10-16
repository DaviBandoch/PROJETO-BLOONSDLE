let maxAttempts = 5;
let currentAttempts = maxAttempts;
let guesses = []; // Array para armazenar palpite

const blurLevels = [
    'blur(35px)', 
    'blur(25px)',
    'blur(18px)',
    'blur(14px)',
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
let initialRotation = Math.random() * 360; // Rotação inicial aleatória

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

function rotateImage() {
    const imageElement = document.getElementById('character-image');
    const rotationDegree = (initialRotation + (maxAttempts - currentAttempts) * (360 / maxAttempts)) % 360; // Incrementa a rotação
    imageElement.style.transform = `rotate(${rotationDegree}deg)`; // Aplica a rotação
}

function celebrateVictory() {
    // Dispara confetes
    confetti({
        particleCount: 100,
        spread: 160,
        origin: { y: 0.6 }
    });
}

function submitGuess() {
    const input = document.getElementById('guess-input').value.trim();
    const resultElement = document.getElementById('result');
    const attemptCountElement = document.getElementById('attempt-count');
    const imageElement = document.getElementById('character-image');
    const suggestionsContainer = document.getElementById('suggestions');

    // Verifica se o elemento da imagem existe
    if (!imageElement) {
        console.error('Elemento com ID "character-image" não encontrado.');
        return;
    }

    // Verifica se o palpite já foi feito
    if (guesses.includes(input.toLowerCase())) {
        resultElement.textContent = 'Você já tentou esse palpite. Tente outro!';
        return;
    }

    // Adiciona o palpite ao array
    guesses.push(input.toLowerCase());

    // Verifica se o input está vazio
    if (input === '') {
        resultElement.textContent = 'Por favor, digite um palpite.';
        return;
    }

    // Verifica o palpite do usuário
    if (input.toLowerCase() === correctAnswer.toLowerCase()) {
        // Acerto - exibe mensagem, revela a imagem e dispara os confetes
        resultElement.textContent = 'Parabéns! Você acertou!';
        celebrateVictory();  // Dispara confetes
        suggestionsContainer.innerHTML = ''; // Limpa as sugestões
        document.getElementById('guess-input').value = ''; // Limpa o input
        imageElement.style.filter = 'blur(0) grayscale(0)';
        imageElement.style.transform = 'rotate(0deg)'; // Volta a imagem para a posição correta
    } else {
        // Se o palpite estiver errado e ainda há tentativas
        if (currentAttempts > 0) {
            currentAttempts--;
            attemptCountElement.textContent = currentAttempts;

            // Desfoca a imagem com base nas tentativas restantes
            const blurIndex = maxAttempts - currentAttempts;
            imageElement.style.filter = blurLevels[blurIndex] + ' grayscale(100%)';

            rotateImage(); // Rotaciona a imagem

            if (currentAttempts <= 0) {
                resultElement.textContent = `Você perdeu! A resposta era "${correctAnswer}".`;
                // Revela a imagem apenas se todas as tentativas forem usadas
                imageElement.style.filter = 'blur(0) grayscale(0)';
                imageElement.style.transform = 'rotate(0deg)'; // Exibe a imagem na posição correta
            } else {
                resultElement.textContent = 'Resposta errada. Tente novamente!';
            }
        }
    }

    // Limpa o campo de input após cada palpite
    document.getElementById('guess-input').value = '';
}

function filterCharacters(input) {
    return Object.values(characters).filter(character => 
        character.toUpperCase().includes(input.toUpperCase())
    );
}

function displaySuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = ''; 

    if (suggestions.length === 0) {
        return; // Não exibe sugestões se a lista estiver vazia
    }

    suggestions.forEach(character => {
        const characterImage = Object.keys(characters).find(key => characters[key] === character);
        const suggestionItem = document.createElement('li');
        suggestionItem.style.cursor = 'pointer';

        // Cria a imagem
        const img = document.createElement('img');
        img.src = `imgs-heroes/${characterImage}`; // Adapte o caminho se necessário
        img.alt = character;
        img.style.width = '50px'; // Ajuste o tamanho da imagem
        img.style.height = '50px';
        img.style.marginRight = '30px'; // Espaçamento entre a imagem e o texto

        suggestionItem.appendChild(img); // Adiciona a imagem ao item
        suggestionItem.appendChild(document.createTextNode(character)); // Adiciona o texto

        suggestionItem.className = 'suggestions';
        suggestionItem.addEventListener('click', () => {
            const input = document.getElementById('guess-input');
            input.value = character;
            suggestionsContainer.innerHTML = ''; // Limpa sugestões ao clicar
        });
        suggestionsContainer.appendChild(suggestionItem);
    });
}

document.getElementById('guess-input').addEventListener('input', function() {
    const input = this.value.trim(); // Obtém o valor do input e remove espaços
    if (input === '') {
        // Se o campo estiver vazio, limpa as sugestões
        document.getElementById('suggestions').innerHTML = '';
        return; // Não filtra sugestões
    }
    const suggestions = filterCharacters(input); // Filtra os personagens
    displaySuggestions(suggestions); // Exibe as sugestões
});

document.addEventListener('DOMContentLoaded', function () {
    const imageElement = document.getElementById('character-image');
    const imageSrc = getImageForToday();
    
    if (imageElement) {
        imageElement.src = imageSrc;
        imageElement.style.filter = 'blur(35px) grayscale(100%)';
        imageElement.style.transform = `rotate(${initialRotation}deg)`; // Aplica a rotação inicial
    } else {
        console.error('Elemento com ID "character-image" não encontrado.');
    }

    // A função submitGuess já está definida no seu código  // By Leozin capota random

document.getElementById('guess-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {  // Verifica se a tecla pressionada é o Enter
        event.preventDefault();   // Evita o comportamento padrão de envio de formulário (caso tenha algum)
        submitGuess();            // Chama a função de envio
    }
});

});
