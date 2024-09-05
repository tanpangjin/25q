// Generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random math question
function generateQuestion() {
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2;

    switch (operation) {
        case '+':
        case '-':
            num1 = getRandomNumber(1, 100);
            num2 = getRandomNumber(1, 100);
            break;
        case '*':
            num1 = getRandomNumber(1, 12);
            num2 = getRandomNumber(1, 12);
            break;
        case '/':
            num2 = getRandomNumber(1, 12);
            num1 = num2 * getRandomNumber(1, 12);
            break;
    }

    return {
        question: `${num1} ${operation} ${num2} = ?`,
        answer: eval(`${num1} ${operation} ${num2}`)
    };
}

// Generate 25 questions
function generateQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    for (let i = 0; i < 15; i++) {
        const { question, answer } = generateQuestion();
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <p class="mb-2">${i + 1}. ${question}</p>
            <input type="number" class="answer-input border rounded p-1" data-answer="${answer}">
        `;
        quizContainer.appendChild(questionElement);
    }
}

// Timer functionality
function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            submitQuiz();
        }
    }, 1000);
}

// Submit quiz functionality
function submitQuiz() {
    const inputs = document.querySelectorAll('.answer-input');
    let score = 0;
    inputs.forEach(input => {
        if (parseFloat(input.value) === parseFloat(input.dataset.answer)) {
            score++;
        }
    });
    alert(`Quiz submitted! Your score: ${score} out of 15`);
}

// Initialize the quiz
generateQuiz();

// Start the timer
const tenMinutes = 10 * 60,
    display = document.querySelector('#time');
startTimer(tenMinutes, display);

// Add event listener to submit button
document.getElementById('submit-btn').addEventListener('click', submitQuiz);