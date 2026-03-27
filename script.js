document.addEventListener("DOMContentLoaded", () => {
const grapes = document.querySelectorAll('.green-image-3');
const popSound = new Audio('assets/audio/universfield-wine-cork-pop-352295.mp3');
const splatImageSrc = 'assets/images/babah.svg';

grapes.forEach(grape => {
    grape.addEventListener('click', handleGrapeClick);
});
function handleGrapeClick(event) {
    const grape = event.currentTarget;
    grape.removeEventListener('click', handleGrapeClick);
    popSound.currentTime = 0;
    popSound.play();
    grape.src = splatImageSrc;
    grape.style.cursor = 'default'; 
}


const grapeRotates = {
    'grape1': 'rotate(247deg)',
    'grape2': 'rotate(283deg)',
    'grape3': 'rotate(248deg)',
    'grape4': 'rotate(-42deg)',
    'grape5': 'scaleX(-1)',
    'grape6': 'rotate(0deg)',

};

const grapes1 = document.querySelectorAll('.green-image');
const korzina = document.querySelector('.korzina-image');

grapes1.forEach(item => {
    const myRotate = grapeRotates[item.id] || "";

    item.onmousedown = function(e) {
        if (e.button !== 0) return;

        e.preventDefault();
        item.style.zIndex = 1000;
        item.style.transition = 'none';

        let startX = e.clientX;
        let startY = e.clientY;

        function onMouseMove(e) {
            let dx = e.clientX - startX;
            let dy = e.clientY - startY;
            item.style.transform = `translate(${dx}px, ${dy}px) ${myRotate}`;
        }

        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);

            const iR = item.getBoundingClientRect();
            const vR = korzina.getBoundingClientRect();

            const style = window.getComputedStyle(item);
            const marginLeft = parseFloat(style.marginLeft) || 0;
            const marginRight = parseFloat(style.marginRight) || 0;
            const marginTop = parseFloat(style.marginTop) || 0;
            const marginBottom = parseFloat(style.marginBottom) || 0;

            const cleanItem = {
                left: iR.left + marginLeft,
                right: iR.right - marginRight,
                top: iR.top + marginTop,
                bottom: iR.bottom - marginBottom
            };

            const isHit = !(cleanItem.right < vR.left || 
                            cleanItem.left > vR.right || 
                            cleanItem.bottom < vR.top || 
                            cleanItem.top > vR.bottom);

            if (isHit) {
                item.remove();
            } else {
                item.style.transition = 'transform 0.4s ease-out';
                item.style.transform = `translate(0, 0) ${myRotate}`;
            }

            item.style.zIndex = 10;
            document.onmouseup = null;
        };
    };

    item.ondragstart = () => false;
});
const wineIcons = [
    'assets/images/red.svg', 'assets/images/red.svg',
    'assets/images/white.svg', 'assets/images/white.svg',
    'assets/images/pink.svg', 'assets/images/pink.svg',
    'assets/images/krep.svg', 'assets/images/krep.svg',
    'assets/images/igr.svg', 'assets/images/igr.svg',
    'assets/images/orange.svg', 'assets/images/orange.svg'
];

const barrelDefaultSrc = 'assets/images/ban.svg';

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;

wineIcons.sort(() => Math.random() - 0.5);

const barrels = document.querySelectorAll('.wine-image-4');
const countNumbers = document.querySelectorAll('.count-number-4');
const barrelMap = {};
barrels.forEach((barrel, index) => {
    barrelMap[barrel.id] = wineIcons[index];
    barrel.addEventListener('click', flipBarrel);
});

function flipBarrel() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.src = barrelMap[this.id];

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    moves++;
    
    const isMatch = barrelMap[firstCard.id] === barrelMap[secondCard.id];

    if (isMatch) {
        matches++;
        disableCards();
    } else {
        unflipCards();
    }

    updateStats();
}

function disableCards() {

    firstCard.removeEventListener('click', flipBarrel);
    secondCard.removeEventListener('click', flipBarrel);

    firstCard.style.opacity = '0.7';
    secondCard.style.opacity = '0.7';

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.src = barrelDefaultSrc;
        secondCard.src = barrelDefaultSrc;
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function updateStats() {
    if (countNumbers.length >= 2) {
        countNumbers[0].innerText = moves;
        countNumbers[1].innerText = matches;
    }

    if (matches === 6) {
        setTimeout(() => {
            alert('Поздравляем! Вы нашли все пары вина!');
        }, 500);
    }
}

const inputField = document.getElementById('input-number');
const digitButtons = document.querySelectorAll('.button[data-value]');
const clearButton = document.getElementById('clear-button');
const submitButton = document.getElementById('submit-button');

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        inputField.value += value;
    });
});
clearButton.addEventListener('click', () => {
    inputField.value = "";
});
submitButton.addEventListener('click', () => {
    const userAnswer = inputField.value;
    if (userAnswer === "6000") {
        alert("Ты молодец! На территории современных Грузии и Армении археологи нашли древнейшие свидетельства виноделия: глиняные кувшины с остатками вина около 6000 г. до н.э.");
    } else {
        alert("Неверно. Попробуй еще раз!");
        inputField.value = "";
    }
});
})

