document.addEventListener('DOMContentLoaded', () => {
    const generatorBtn = document.getElementById('generator-btn');
    const lottoBalls = document.querySelectorAll('.ball');

    function getColor(number) {
        if (number <= 10) {
            return { bg: '#fbc400', text: 'black' }; // 노랑
        } else if (number <= 20) {
            return { bg: '#69c8f2', text: 'white' }; // 파랑
        } else if (number <= 30) {
            return { bg: '#ff7272', text: 'white' }; // 빨강
        } else if (number <= 40) {
            return { bg: '#aaa', text: 'white' };    // 회색
        } else {
            return { bg: '#b0d840', text: 'black' }; // 연두
        }
    }

    function generateNumbers() {
        const numbers = new Set();
        while(numbers.size < 6) {
            const randomNum = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNum);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function updateDisplay() {
        const sortedNumbers = generateNumbers();
        
        lottoBalls.forEach((ball, index) => {
            // 애니메이션 효과를 위해 클래스 잠시 제거 후 추가
            ball.style.transform = 'scale(0)';
            ball.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                const number = sortedNumbers[index];
                const colors = getColor(number);
                
                ball.textContent = number;
                ball.style.backgroundColor = colors.bg;
                ball.style.color = colors.text;
                ball.style.transform = 'scale(1)';
            }, index * 100); // 순차적으로 나타나는 효과
        });
    }

    generatorBtn.addEventListener('click', updateDisplay);

    // 초기 실행 시에도 번호 생성
    updateDisplay();
});