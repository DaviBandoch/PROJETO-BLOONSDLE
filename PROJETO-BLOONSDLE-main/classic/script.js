// Função para carregar os dados do JSON
async function loadData() {
    const response = await fetch('monkeys.json');
    return await response.json();
}

// Função para filtrar os dados com base na pesquisa
function filterData(data, query) {
    return data.filter(item => item.name.toLowerCase().startsWith(query.toLowerCase()));
}

// Função para exibir os resultados
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    
    results.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        resultsContainer.appendChild(li);
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
