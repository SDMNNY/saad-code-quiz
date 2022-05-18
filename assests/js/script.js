var timerLeft = 75;
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
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()

});

// timer
function timerTick() {
    timerLeft--;
    timerEl.textContent= "Time: " + timerleft;
    if (timerLeft <= 0) {
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


function resetState() {
    nextBtn.classList.add("hide")
    checkAnsEL.classList.add("hide")
    while (ansButtonEL.firstChild) {
        ansButtonEL.removeChild
            (ansButtonEL.firstChild)
    }
};

function selectAnswer(e) {
    var selectedButton = e.target;
    
    var correct = selectedButton.dataset.correct;
    checkAnsEL.classList.remove("hide")
    
    if (correct) {
        checkAnsEL.innerHTML = "You got it right!";
    } else {
        checkAnsEL.innerHTML = "Sorry that was not the correct answer.";
        if (timeLeft <= 10) {
            timeLeft = 0;
        } else {
           
            timeLeft -= 10;
        }
    }

    Array.from(ansButtonEL.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove("hide")
        checkAnsEL.classList.remove("hide")
    } else {
        startBtn.classList.remove("hide")
        saveScore();
    }
};



function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
};



function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
};



function saveScore() {
    clearInterval(timerIdentity);
    timerEl.textContent = "Time: " + timeLeft;
    setTimeout(function () {
        
        questionContEL.classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent = "Your final score is " + timeLeft;

    }, 2000)
};


var loadScores = function () {
    

    if (!savedScores) {
        return false;
    }

   
    savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initialEnter").value;
    var newScore = {
        score: timeLeft,
        initials: initials
    }
    savedScores.push(newScore);
    console.log(savedScores)

    savedScores.forEach(score => {
        initialField.innerText = score.initials
        scoreField.innerText = score.score
    })
};



function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hideCont")
    document.getElementById("highscorescontainer").classList.add("hideCont");
    startContainerEl.classList.add("hideCont");
    questionContainerEl.classList.add("hideCont");
    if (typeof initials == "string") {
        var score = {
            initials, timeLeft
        }
        scores.push(score)
    }

    var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";
    
    for (i = 0; i < scores.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        var div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].timeLeft;

        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }

    localStorage.setItem("scores", JSON.stringify(scores));

};


viewScores.addEventListener("click", showHighScores);


submitBtn.addEventListener("click", function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials-field").value;
    showHighScores(initials);
});



restart.addEventListener("click", function () {
    window.location.reload();
});



clearScore.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});