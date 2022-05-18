var timerleft = 75;
var timerIdentity;
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("startButton");
var nextBtn = document.getElementById("nextButton");
var questionContEL = document.getElementById("qContainer");
var ansButtonEL = document.getElementById("ansBTN");
var checkAnsEL = document.getElementById("inspectAns");
var viewScores = document.getElementById("topscore");
var submitBtn = document.getElementById("submitButton");
var clearScore = document.getElementById("clear-button")
var initalField = document.getElementById("playerscore");
var restart = document.getElementById("restart-button");
var scoreBoard = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];

var shuffledQuestions, currentQuestionIndex;

var questions = [
    { 
        question: "What is the correct JavaScript syntax to write Hello World?", 
        answers: [
            { text: "response.write('Hello World')", correct: false },
            { text: "Hello World" , correct: false },
            { text: "docuement.write('Hello World')", correct: true },
            { text: "alertBox('Hello World')", correct: false }
        ]
    },
    { 
        question: "What is the correct place to insert a Javascript", 
        answers: [
            { text: "The body section", correct: false },
            { text: "The Head section", correct: false },
            { text: "Both the head section and the body section are correct", correct: true },
            { text: "split()", correct: false }
        ]
    },
    { 
        question: "How can you add a comment in Javascript ", 
        answers: [
            { text: "'This is a comment", correct: false },
            { text: "<!--This is a comment-->", correct: true },
            { text: "//This is a comment", correct: false },
            { text: "if (i)", correct: false }
        ]
    },
    { 
        question: "What is the correct way to write a JavaScript array?", 
        answers: [
            { text: "var fruit = (0:'apple', 1:'strawberry', 2:'blueberry')", correct: false },
            { text: "var fruit = ['apple', 'strawberry', 'blueberry']", correct: true },
            { text: "var fruit = (apple, strawberry, blueberry)", correct: false },
            { text: "None of the above", correct: false }
        ]
    },
    { 
        question: "Arrays in JavaScript are defined by which of the following statements",
        answers: [
            { text: "it is an ordered list of functions", correct: false },
            { text: "it is an ordered list of objects ", correct: false },
            { text: "it is an ordered list of string", correct: false },
            { text: "it is an ordered list of values", correct: true }
        ]
    },
];



// start button 

startBtn.addEventListener("click",startGame);
nextBtn.addEventListener("click",() => {
    currentQuestionIndex++
    setNextQuestion()

});

// timer
function timerTick() {
    timerleft--;
    timerEl.textContent= "Time: " + timerleft;
    if (timerleft <= 0) {
        saveScore();
    }
}

// start the quiz 
function startGame() {
    timerIdentity = setInterval(timeTick, 1000);
    questionContEL.classList.add("hideCont");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContEL.classList.remove("hideCont");

    timerTick();
    setNextQuestion();
};

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};


function showQuestion(question) {
    questionContEL.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        ansButtonEL.appendChild(button)
    })
};

