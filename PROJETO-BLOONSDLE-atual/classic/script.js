// Função para carregar os dados do JSON
async function loadData() {
    try {
        const response = await fetch('monkeys.json');
        if (!response.ok) {
            throw new Error('Falha ao carregar o JSON: ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        return []; // Retorna um array vazio em caso de erro
    }
}

// Função para obter um ID de macaco aleatório baseado na data
function getRandomMonkeyId() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    return (dayOfYear % 40) + 1; // Garante um ID de 1 a 40
}

// Função para exibir os resultados
function displayResults(results) {
    const resultsContainer = document.getElementById('result');
    resultsContainer.innerHTML = '';

    // Se a barra de pesquisa estiver vazia, não exiba nada
    if (results.length === 0 && document.getElementById('search').value.trim() !== '') {
        resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.style.width = 'auto'; // Ajuste o tamanho da imagem
        img.style.height = '50px';

        const name = document.createElement('p');
        name.textContent = item.name;

        resultItem.appendChild(img);
        resultItem.appendChild(name);
        resultsContainer.appendChild(resultItem);
    });
}

// Função para filtrar os dados com base na pesquisa
function filterData(data, query) {
    return data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
}

// Inicializa a busca
async function init() {
    const data = await loadData();
    const randomMonkeyId = getRandomMonkeyId(); // Obtém um ID de macaco aleatório
    const selectedMonkey = data[randomMonkeyId - 1]; // Seleciona o macaco correspondente

    // Inicializa a barra de pesquisa
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        const filteredData = filterData(data, query);
        displayResults(filteredData);
    });
}

init();
