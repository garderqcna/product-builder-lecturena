const generatorBtn = document.getElementById('generator-btn');
const lottoBalls = document.querySelectorAll('.ball');

generatorBtn.addEventListener('click', () => {
    const numbers = new Set();
    while(numbers.size < 6) {
        const randomNum = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNum);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    lottoBalls.forEach((ball, index) => {
        ball.textContent = sortedNumbers[index];
        const color = getColor(sortedNumbers[index]);
        ball.style.backgroundColor = color;
        ball.style.color = 'white';
    });
});

function getColor(number) {
    if (number <= 10) {
        return '#f44336';
    } else if (number <= 20) {
        return '#ff9800';
    } else if (number <= 30) {
        return '#ffeb3b';
    } else if (number <= 40) {
        return '#4caf50';
    } else {
        return '#2196f3';
    }
}