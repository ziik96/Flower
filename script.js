/** Настройки для создания и управления цветами */
const settings = {
    counterInitialValue: 100,
    flowerCreationInterval: 150,
};

/** Класс для создания и управления цветами */
class Flower {
    constructor() {
        this.counter = settings.counterInitialValue;
        this.flowerInterval = null;
        this.counterValue = document.getElementById('counterValue');
        this.congratulationMessage = document.getElementById('congratulation');
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

 createFlower() {
    if (this.counter <= 0) {
        clearInterval(this.flowerInterval);
        return;
    }

    const flowerContainer = this.createFlowerContainer();
    this.setFlowerPosition(flowerContainer);

    // Добавляем обработчик события для десктопа и мобильных устройств
    flowerContainer.addEventListener('click', (event) => this.handleClick(event, flowerContainer));
    flowerContainer.addEventListener('touchend', (event) => this.handleTouch(event, flowerContainer), { passive: true });
}

handleClick(event, flowerContainer) {
    // Привязываем правильный контекст для родительского элемента
    flowerContainer.parentElement.classList.toggle.call(flowerContainer.parentElement.classList, 'clicked');
    this.handleFlowerClick(flowerContainer);
}

handleTouch(event, flowerContainer) {
    // То же самое для мобильных устройств
    flowerContainer.parentElement.classList.toggle.call(flowerContainer.parentElement.classList, 'clicked');
    this.handleFlowerClick(flowerContainer);
}

handleFlowerClick(flowerContainer) {
    flowerContainer.removeEventListener('click', this.handleClick);
    flowerContainer.removeEventListener('touchend', this.handleTouch);
    flowerContainer.style.animation = 'fly-away 1s ease forwards';
    setTimeout(() => {
        flowerContainer.style.animation = 'fade-out 1s ease forwards';
        flowerContainer.remove();
        if (this.counter > 0) {
            this.counter--;
            this.updateCounterDisplay();
            if (this.counter === 0) {
                this.showCongratulationMessage();
            }
        }
    }, 1000);
}

    createFlowerContainer() {
        const flowerContainer = document.createElement('div');
        flowerContainer.classList.add('flower');

        const stem = this.createStem();
        const leaf1 = this.createLeaf();
        const bud = this.createBud();

        flowerContainer.appendChild(stem);
        flowerContainer.appendChild(leaf1);
        flowerContainer.appendChild(bud);

        const flowerWidth = parseInt(bud.style.getPropertyValue('--bud-size')) * 2;
        const flowerHeight = flowerWidth + 100;
        flowerContainer.style.width = `${flowerWidth}px`;
        flowerContainer.style.height = `${flowerHeight}px`;

        document.body.appendChild(flowerContainer);
        return flowerContainer;
    }

    createStem() {
        const stem = document.createElement('div');
        stem.classList.add('stem');
        const randomRotation = this.getRandom(-45, 45);
        stem.style.setProperty('--random-rotation', `${randomRotation}deg`);
        return stem;
    }

    createLeaf() {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        return leaf;
    }

    createBud() {
        const bud = document.createElement('div');
        bud.classList.add('bud');
        const randomSize = this.getRandom(20, 40);
        const randomColor = `hsl(25, 100%, ${this.getRandom(50, 50)}%)`;
        bud.style.setProperty('--bud-size', `${randomSize}px`);
        bud.style.setProperty('--bud-color', randomColor);
        return bud;
    }

    setFlowerPosition(flowerContainer) {
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        flowerContainer.style.left = `${randomX}px`;
        flowerContainer.style.bottom = `${randomY}px`;
    }

    handleMouseEnter(flowerContainer) {
        flowerContainer.removeEventListener('mouseenter', this.handleMouseEnter);
        flowerContainer.style.animation = 'fly-away 1s ease forwards';
        setTimeout(() => {
            flowerContainer.style.animation = 'fade-out 1s ease forwards';
            flowerContainer.remove();
            if (this.counter > 0) {
                this.counter--;
                this.updateCounterDisplay();
                if (this.counter === 0) {
                    this.showCongratulationMessage();
                }
            }
        }, 1000);
    }

    updateCounterDisplay() {
        this.counterValue.textContent = this.counter;
        this.counterValue.style.fontSize = '25px';
        setTimeout(() => {
            this.counterValue.style.fontSize = '20px';
        }, 250);
    }

    showCongratulationMessage() {
        this.congratulationMessage.style.display = 'block';
        document.querySelectorAll('.bud').forEach((bud, index) => {
            setTimeout(() => {
                bud.style.backgroundColor = 'red';
            }, index * 100);
        });
    }

    start() {
        this.flowerInterval = setInterval(() => this.createFlower(), settings.flowerCreationInterval);
    }
}

const flower = new Flower();
flower.start();
