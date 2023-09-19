// Questions and Answers
const questions = [
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cool Style Stuff", correct: false},
            { text: "Coding Starter Sheet", correct: false},
            { text: "Cascading Style Sheet", correct: true},
            { text: "Code Styling Sheet", correct: false}
        ]
    },
    {
        question: "What does '$ is not defined' mean in the console?",
        answers: [
            { text: "jQuery is not linked", correct: true},
            { text: "You're out of money", correct: false},
            { text: "There is nothing in the javascript file", correct: false},
            { text: "The javascript file is not linked", correct: false}
        ]
    },
    {
        question: "What is the file extentsion for a javascript file?",
        answers: [
            { text: "file.java", correct: false},
            { text: "file.script", correct: false},
            { text: "file.javascript", correct: false},
            { text: "file.js", correct: true}
        ]
    },
    {
        question: "What does API stand for?",
        answers: [
            { text: "A Programming Invention", correct: false},
            { text: "Applying Possible Integers", correct: false},
            { text: "Application Program Interface", correct: false},
            { text: "Application Programming Interface", correct: true}
        ]
    },
    {
        question: "How do you write a message in the console?",
        answers: [
            { text: "console.message('Hello!');", correct: false},
            { text: "console('Hello!');", correct: false},
            { text: "console.log('Hello!');", correct: true},
            { text: "log.console('Hello!');", correct: false}
        ]
    },
    {
        question: "What type of data is this? 64",
        answers: [
            { text: "Number", correct: true},
            { text: "String", correct: false},
            { text: "Boolean", correct: false},
            { text: "Undefined", correct: false}
        ]
    },
    {
        question: "What does the following code mean? (a != b)",
        answers: [
            { text: "a is equal to b", correct: false},
            { text: "a is not equal to b", correct: true},
            { text: "a is the same data type as b", correct: false},
            { text: "a is more important than b", correct: false}
        ]
    },
    {
        question: "How do you create an HTML file in the command line?",
        answers: [
            { text: "create index.html", correct: false},
            { text: "add index.html", correct: false},
            { text: "open index.html", correct: false},
            { text: "touch index.html", correct: true}
        ]
    },
    {
        question: "What does 'event.preventDefault();' do?",
        answers: [
            { text: "Prevents an event from happening", correct: false},
            { text: "Closes the webpage", correct: false},
            { text: "Keeps items in forms filled after being submitted", correct: true},
            { text: "Deletes history in local storage", correct: false}
        ]
    },
    {
        question: "How do you create an element in jQuery?",
        answers: [
            { text: "$('< p >')", correct: true},
            { text: "$(p)", correct: false},
            { text: "$('p')", correct: false},
            { text: "$(add 'p')", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const quizBox = document.getElementById("quizbox");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_text");
const timeCount = document.querySelector(".timer .timer_sec");
const scoreBoard = document.querySelector("scoreboard")

let currentQuestionIndex = 0;
let score = 0;
let timeInterval;
let timeValue = 60;
let scorePush = [];

startButton.addEventListener('click', startGame)


// When quiz is started, it will reset the question number and score, and show the Next button.

// START BUTTON FUNCTIONALITY HERE
startButton.onclick = ()=>{
    quizBox.classList.add("quizbox");
    startButton.classList.add('hide');
    quizBox.classList.remove('hide')

    startTimer(timeValue); // Calls startTimer function
};

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
// START BUTTON FUNCTION END

// Will show question number (index number + 1), as well as display the question.
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    // Will display answers
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct; // Will add true or false to data set.
        }
        button.addEventListener("click", selectAnswer);
    });
}

// Hides previous answers.
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Checks if selected answer is true or false.
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++; // Increases score by 1 if correct.
    }else{
        selectedBtn.classList.add("incorrect");
    }
    // Makes correct answer highlight green.
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; // Makes it so buttons are unclickable after choosing an answer.
    });
    nextButton.style.display = "block";
}

// Shows score and play again button at end of quiz.
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of 
    ${questions.length}!`;
    nextButton.style.display = "hide";
    if(currentQuestionIndex < 0){
        resetState();
    }
    scoreStore();
}

function scoreStore(){
    const highscores = { // Logs score
        Name: prompt(score + "/" + questions.length + ", Nice work! Log your score with your initials."),
        Score: score
    }
    scorePush.push(highscores)
    localStorage.setItem("Scoreboard", JSON.stringify(scorePush)) // Saves score in Local Storage
    console.log("You recieved a " + score + "/" + questions.length);
}


function handleNextButton(){ // Makes sure quiz ends after question 10
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

// Starts quiz or goes to next question.
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startGame();
    }
});


// Timer Start
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; // Makes time go down
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            showScore();
        }
            

        }
    }
// Timer End


// Calls startGame function 
startGame();