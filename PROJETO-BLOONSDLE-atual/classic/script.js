class Suggestions {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.data = [];
        this.init();
    }

    async loadData() {
        try {
            const response = await fetch(this.dataUrl);
            if (!response.ok) {
                throw new Error('Falha ao carregar o JSON: ' + response.statusText);
            }
            this.data = await response.json();
        } catch (error) {
            console.error('Erro ao carregar os dados:', error);
            this.data = []; // Retorna um array vazio em caso de erro
        }
    }

    getRandomMonkeyId() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
        return (dayOfYear % 40) + 1; // Garante um ID de 1 a 40
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('result');
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'grid'; // Usando grid para layout
        resultsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))'; // Define a grade com colunas flexíveis
        resultsContainer.style.gap = '10px'; // Espaçamento entre os itens
    
        if (results.length === 0 && document.getElementById('search').value.trim() !== '') {
            resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
            return;
        }
    
        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.style.textAlign = 'center'; // Centraliza o texto
    
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.style.width = '100px'; // Tamanho da imagem
            img.style.height = 'auto';
    
            const name = document.createElement('p');
            name.textContent = item.name;
    
            const classInfo = document.createElement('p');
            classInfo.textContent = `Classe: ${item.class}`;
    
            const year = document.createElement('p');
            year.textContent = `Ano de Lançamento: ${item.release_year}`;
    
            const alcance = document.createElement('p');
            alcance.textContent = `Alcance: ${item.alcance}`;
    
            const damageType = document.createElement('p');
            damageType.textContent = `Tipo de Dano: ${item.damage_type}`;
    
            resultItem.appendChild(img);
            resultItem.appendChild(name);
            resultItem.appendChild(classInfo);
            resultItem.appendChild(year);
            resultItem.appendChild(alcance);
            resultItem.appendChild(damageType);
            resultsContainer.appendChild(resultItem);
        });
    }
    

    filterData(query) {
        return this.data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    }

    init() {
        this.loadData().then(() => {
            const randomMonkeyId = this.getRandomMonkeyId();
            const selectedMonkey = this.data[randomMonkeyId - 1];

            const searchInput = document.getElementById('search');
            searchInput.addEventListener('input', () => {
                const query = searchInput.value;
                const filteredData = this.filterData(query);
                this.displayResults(filteredData);
            });
        });
    }
}

// Inicializa a classe com o caminho do JSON
new Suggestions('monkeys.json');
