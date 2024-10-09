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

// Função para filtrar os dados com base na pesquisa
function filterData(data, query) {
    return data.filter(item => item.name.toLowerCase().startsWith(query.toLowerCase()));
}

// Função para exibir os resultados
function displayResults(results) {
    const resultsContainer = document.getElementById('result');
    resultsContainer.innerHTML = '';

    // Se a barra de pesquisa estiver vazia, não exiba nada
    if (results.length === 0 && searchInput.value.trim() !== '') {
        resultsContainer.innerHTML = 'Nenhum resultado encontrado.';
        return;
    }

    results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.style.width = '100px';
        img.style.height = 'auto';

        img.onerror = () => {
            img.src = '/classic/images/errodocaralho.png'; // Imagem padrão
        };

        const name = document.createElement('p');
        name.textContent = item.name;

        resultItem.appendChild(img);
        resultItem.appendChild(name);
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

        // Se a barra de pesquisa estiver vazia, esvazie o contêiner de resultados
        if (query.trim() === '') {
            displayResults([]); // Isso fará com que o contêiner fique vazio
        }
    });
}

// Chama a função de inicialização
init();
