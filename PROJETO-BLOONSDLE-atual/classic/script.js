class Suggestions {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.data = [];
        this.correctMonkey = null;  // Guardar o macaco correto
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

    // Função para comparar os atributos
    compareAttributes(selectedMonkey) {
        const attributes = ['alcance', 'damage_type', 'class', 'release_year'];
        const resultContainer = document.getElementById('resultComparison');
        resultContainer.innerHTML = ''; // Limpa o conteúdo anterior

        attributes.forEach(attr => {
            const resultDiv = document.createElement('div');
            resultDiv.style.display = 'flex';
            resultDiv.style.justifyContent = 'space-between';
            resultDiv.style.marginBottom = '10px';

            const attributeLabel = document.createElement('span');
            attributeLabel.textContent = `${attr.charAt(0).toUpperCase() + attr.slice(1)}:`;

            const userValue = selectedMonkey[attr];
            const correctValue = this.correctMonkey[attr];

            const valueSpan = document.createElement('span');
            if (userValue === correctValue) {
                valueSpan.textContent = `${userValue}`;
                valueSpan.style.color = 'green'; // Atributos iguais em verde
            } else {
                valueSpan.textContent = `${userValue}`;
                valueSpan.style.color = 'red'; // Atributos diferentes em vermelho
            }

            resultDiv.appendChild(attributeLabel);
            resultDiv.appendChild(valueSpan);
            resultContainer.appendChild(resultDiv);
        });
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

            // Adicionando o evento de clique
            resultItem.addEventListener('click', () => this.selectMonkey(item));
        });
    }

    filterData(query) {
        return this.data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    }

    // Função que preenche o campo de pesquisa com o nome do macaco selecionado
    selectMonkey(item) {
        const searchInput = document.getElementById('search');
        searchInput.value = item.name; // Preenche o input com o nome do macaco
        this.displayResults([]); // Limpa os resultados de pesquisa

        // Comparar os atributos do macaco selecionado com o "macaco correto"
        this.compareAttributes(item);
    }

    init() {
        this.loadData().then(() => {
            const randomMonkeyId = this.getRandomMonkeyId();
            this.correctMonkey = this.data[randomMonkeyId - 1]; // Guarda o macaco correto

            const searchInput = document.getElementById('search');
            searchInput.addEventListener('input', () => {
                const query = searchInput.value;
                const filteredData = this.filterData(query);
                this.displayResults(filteredData);
            });
        });
    }
}

document.getElementById('submitButton').addEventListener('click', () => {
    const selectedMonkeyName = document.getElementById('search').value.trim();

    // Verifica se o usuário digitou algo
    if (!selectedMonkeyName) {
        alert('Por favor, digite o nome de um macaco!');
        return;
    }

    // Filtra os dados para encontrar o macaco selecionado
    const selectedMonkey = this.filterData(selectedMonkeyName)[0]; // Supondo que `this.filterData` retorne uma lista de resultados filtrados
    
    if (!selectedMonkey) {
        alert('Macaco não encontrado!');
        return;
    }

    // Comparar os atributos
    this.compareAttributes(selectedMonkey);

    // Exibe o feedback ao usuário
    const feedback = document.getElementById('feedback');
    const correct = selectedMonkey.id === this.correctMonkey.id; // Verifica se o macaco selecionado é o correto
    if (correct) {
        feedback.innerHTML = "<p style='color: green;'>Parabéns! Você acertou o macaco correto!</p>";
    } else {
        feedback.innerHTML = "<p style='color: red;'>Tente novamente! O macaco correto é diferente.</p>";
    }
});





// Inicializa a classe com o caminho do JSON
new Suggestions('monkeys.json');
