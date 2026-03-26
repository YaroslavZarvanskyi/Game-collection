class BaseGame {
    constructor(title) {
        this.title = title;
        this.minMaxPlayers = "Не вказано";
        this.age = 0;
        this.rating = []; 
        this.genre = [];  
    }

    getFullInfo() {
        return `Гравці: ${this.minMaxPlayers} | Вік: ${this.age}+ | Жанри: ${this.genre.join(', ') || '—'} | ⭐ Рейтинг: ${this.countRaiting()}`;
    }

    setMyRaiting(number) {
        if (!isNaN(number) && number >= 1 && number <= 10) {
            this.rating.push(number);
        } else {
            alert("Будь ласка, введіть число від 1 до 10");
        }
    }

    // Використовуємо для початкового заповнення ТА редагування
    fillDate() {
        const newPlayers = prompt(`Кількість гравців (зараз: ${this.minMaxPlayers}):`, this.minMaxPlayers);
        if (newPlayers !== null) this.minMaxPlayers = newPlayers;

        const newAge = prompt(`Мінімальний вік (зараз: ${this.age}):`, this.age);
        if (newAge !== null) this.age = parseInt(newAge) || 0;

        const newGenres = prompt(`Жанри через кому (зараз: ${this.genre.join(', ')}):`, this.genre.join(', '));
        if (newGenres !== null) this.genre = newGenres.split(',').map(g => g.trim());
    }

    addGenre(genreString) {
        this.genre.push(genreString);
    }

    countRaiting() {
        if (this.rating.length === 0) return "немає оцінок";
        const sum = this.rating.reduce((acc, curr) => acc + curr, 0);
        return (sum / this.rating.length).toFixed(1);
    }
}

class Expansions extends BaseGame {
    constructor(title, baseGameName) {
        super(title);
        this.baseGameName = baseGameName;
        this.content = "Додаткові компоненти";
    }
    getBaseGameName() { return this.baseGameName; }
}

class Collection {
    constructor(name) {
        this.collectionName = name;
        this.gameList = [];
    }
    addItem(item) { this.gameList.push(item); }
    countList() { return this.gameList.length; }
    countBaseGames() { return this.gameList.filter(item => item.constructor === BaseGame).length; }
    countExpansions() { return this.gameList.filter(item => item instanceof Expansions).length; }
}

// --- УПРАВЛІННЯ ІНТЕРФЕЙСОМ ---

const myCollection = new Collection("Моя колекція ігор 2026");
document.getElementById('collNameDisplay').innerText = myCollection.collectionName;

// Створення базової гри
function handleCreateBase() {
    const title = document.getElementById('nameInput').value;
    if (!title) return alert("Введіть назву!");
    
    const game = new BaseGame(title);
    game.fillDate(); 
    myCollection.addItem(game);
    updateUI();
}

// Створення доповнення
function handleCreateExp() {
    const title = document.getElementById('nameInput').value;
    if (!title) return alert("Введіть назву доповнення!");
    
    const baseName = prompt("Для якої основної гри це доповнення?");
    const exp = new Expansions(title, baseName || "Невідома гра");
    exp.fillDate();
    myCollection.addItem(exp);
    updateUI();
}

/**
 * ФУНКЦІЇ ДІЙ НАД ОБ'ЄКТАМИ
 */

// Редагування даних (викликає метод класу)
function editGame(index) {
    const game = myCollection.gameList[index];
    game.fillDate();
    updateUI();
}

// Додавання оцінки (викликає метод класу)
function rateGame(index) {
    const mark = prompt("Ваша оцінка гри (від 1 до 10):");
    if (mark !== null) {
        myCollection.gameList[index].setMyRaiting(Number(mark));
        updateUI();
    }
}

// Оновлення екрану
function updateUI() {
    const output = document.getElementById('output');
    output.innerHTML = "";

    myCollection.gameList.forEach((item, index) => {
        const isExp = item instanceof Expansions;
        const div = document.createElement('div');
        div.className = `game-card ${isExp ? 'expansion' : ''}`;
        
        div.innerHTML = `
            <div class="card-content">
                <h3>${item.title} ${isExp ? `<span style="color: var(--accent-green); font-size: 0.8rem;">(DLC для ${item.getBaseGameName()})</span>` : ''}</h3>
                <p>${item.getFullInfo()}</p>
                <div class="card-actions">
                    <button class="btn-rate" onclick="rateGame(${index})">⭐ Оцінити</button>
                    <button class="btn-edit" onclick="editGame(${index})">⚙️ Редагувати</button>
                </div>
            </div>
        `;
        output.appendChild(div);
    });

    // Оновлення статистики
    document.getElementById('total').innerText = myCollection.countList();
    document.getElementById('baseCount').innerText = myCollection.countBaseGames();
    document.getElementById('expCount').innerText = myCollection.countExpansions();
    document.getElementById('nameInput').value = "";
}