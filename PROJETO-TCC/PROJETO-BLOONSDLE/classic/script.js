// Função para carregar os dados do JSON
async function loadData() {
    const response = await fetch('monkeys.json'); // Certifique-se de que o caminho está correto
    return await response.json();
}

// Função para filtrar os dados com base na pesquisa
function filterData(data, query) {
    return data.filter(item => item.name.toLowerCase().startsWith(query.toLowerCase()));
}

// Função para exibir os resultados
function displayResults(results) {
    const resultsContainer = document.getElementById('result');
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = 'Nenhum resultado encontrado.';
        return;
    }

    results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        const img = document.createElement('img');
        img.src = item.image; // URL da imagem
        img.alt = item.name;
        img.style.width = '100px';
        img.style.height = 'auto';

        const name = document.createElement('p');
        name.textContent = item.name;

        resultItem.appendChild(img);
        resultsContainer.appendChild(resultItem);
    });
}

// Inicializa a busca
async function init() {
    const data = await loadData();
    const searchInput = document.getElementById('search');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        const filteredData = filterData(data, query);
        displayResults(filteredData);
    });
}

init();
