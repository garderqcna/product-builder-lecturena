document.addEventListener('DOMContentLoaded', () => {
    const generatorBtn = document.getElementById('generator-btn');
    const lottoContainer = document.getElementById('lotto-container');
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const themeText = document.getElementById('theme-text');

    // 테마 전환 함수
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeText.textContent = '다크 모드';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeText.textContent = '화이트 모드';
        }
    }

    toggleSwitch.addEventListener('change', switchTheme, false);

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
            themeText.textContent = '다크 모드';
        }
    }

    function getColor(number) {
        if (number <= 10) {
            return { bg: '#fbc400', text: 'black' };
        } else if (number <= 20) {
            return { bg: '#69c8f2', text: 'white' };
        } else if (number <= 30) {
            return { bg: '#ff7272', text: 'white' };
        } else if (number <= 40) {
            return { bg: '#aaa', text: 'white' };
        } else {
            return { bg: '#b0d840', text: 'black' };
        }
    }

    function generateNumbers() {
        const numbers = new Set();
        while(numbers.size < 7) { // 6개 + 보너스 1개 총 7개 생성
            const randomNum = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNum);
        }
        
        const allNums = Array.from(numbers);
        const bonusNum = allNums.pop(); // 마지막 번호를 보너스 번호로 사용
        const mainNums = allNums.sort((a, b) => a - b);
        
        return { mainNums, bonusNum };
    }

    function createLottoRow(rowIndex) {
        const row = document.createElement('div');
        row.className = 'lotto-row';
        
        const label = document.createElement('span');
        label.className = 'row-label';
        label.textContent = String.fromCharCode(65 + rowIndex); // A, B, C, D, E
        row.appendChild(label);

        const { mainNums, bonusNum } = generateNumbers();
        
        // 메인 번호 6개 생성
        mainNums.forEach((number, colIndex) => {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.style.transform = 'scale(0)';
            
            setTimeout(() => {
                const colors = getColor(number);
                ball.textContent = number;
                ball.style.backgroundColor = colors.bg;
                ball.style.color = colors.text;
                ball.style.transform = 'scale(1)';
            }, (rowIndex * 150) + (colIndex * 50));

            row.appendChild(ball);
        });

        // + 기호 추가
        const plusSign = document.createElement('span');
        plusSign.className = 'bonus-plus';
        plusSign.textContent = '+';
        row.appendChild(plusSign);

        // 보너스 번호 생성
        const bonusBall = document.createElement('div');
        bonusBall.className = 'ball bonus';
        bonusBall.style.transform = 'scale(0)';
        
        setTimeout(() => {
            const colors = getColor(bonusNum);
            bonusBall.textContent = bonusNum;
            bonusBall.style.backgroundColor = colors.bg;
            bonusBall.style.color = colors.text;
            bonusBall.style.transform = 'scale(1)';
        }, (rowIndex * 150) + (6 * 50) + 100);

        row.appendChild(bonusBall);

        return row;
    }

    function updateDisplay() {
        lottoContainer.innerHTML = ''; // 기존 번호 삭제
        for(let i = 0; i < 5; i++) {
            lottoContainer.appendChild(createLottoRow(i));
        }
    }

    generatorBtn.addEventListener('click', updateDisplay);
    updateDisplay();
});