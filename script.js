// Selects each container <div>
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerContainer = document.getElementById('timer-container')
const scoresContainer = document.getElementById('scores-container')

let shuffledQuestions, currentQuestionIndex

//Timer
function startTimer() {
  var timer = 61;
  setInterval(function() {
    timer--;
    if (timer >= 0) {
      span = timerContainer;
      span.innerHTML = timer + " seconds left";
    }
    if (isWin && timer > 0) {
      clearInterval(timer);
      // winGame();
    }
    if (timer === 0) {
      clearInterval(timer);
      // loseGame();
  }
  }, 1000);
}

// Start Button & Next Button
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

// Game
function startGame() {
  startTimer()
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    // startButton.innerText = 'Restart'
    // startButton.classList.remove('hide')

    // TODO ADD END OF GAME FEATURES HERE

    alert("Congrats! You have completed the quiz!")
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


// Here's where the questions and answers are stored
const questions = [
  {
    question: 'Inside which HTML element do we put JavaScript?',
    answers: [
      { text: '<script>', correct: true },
      { text: '<js>', correct: false },
      { text: '<javascript>', correct: false },
      { text: '<scripting>', correct: false }
    ]
  },
  {
    question: 'What is the correct syntax for referring to an external script called "script.js"?',
    answers: [
      { text: '<script href="script.js"></script>', correct: false },
      { text: '<script name="script.js"></script>', correct: false },
      { text: '<script src="script.js"></script>', correct: true },
      { text: '<script link="script.js"></script>', correct: false }
    ]
  },
  {
    question: 'How do you create a function in JavaScript?',
    answers: [
      { text: 'function = myFunction()', correct: false },
      { text: 'function:myFunction()', correct: false },
      { text: 'function = $myFunction()', correct: false },
      { text: 'function myFunction()', correct: true }
    ]
  },
  {
    question: 'How do you call a function named "myFunction"?',
    answers: [
      { text: 'call function myFunction()', correct: false },
      { text: 'myFunction()', correct: true },
      { text: 'hello myFunction()', correct: false },
      { text: 'myFunction(call)', correct: false },
    ]
  },
  {
    question: 'How do you add a comment in JavaScript?',
    answers: [
      { text: '<!-- This is a comment --!>', correct: false },
      { text: '"This is a comment"', correct: false },
      { text: '/*This is a comment*/', correct: false },
      { text: '// This is a comment', correct: true }
    ]
  },
  {
    question: 'What is the correct way to write a JavaScript array?',
    answers: [
      { text: 'var colors = ["red", "green", "blue"]', correct: true },
      { text: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', correct: false },
      { text: 'var colors = "red", "green", "blue"', correct: false },
      { text: 'var colors = (1:red, 2:green, 3:blue)', correct: false }
    ]
  },
  {
    question: 'JavaScript is the same as Java',
    answers: [
      { text: 'True', correct: false },
      { text: 'False', correct: true },
    ]
  },
  {
    question: 'How do you declare a JavaScript variable?',
    answers: [
      { text: 'v helloWorld', correct: false },
      { text: 'variable helloWorld', correct: false },
      { text: 'var helloWorld', correct: true },
      { text: 'var = helloWorld', correct: false }
    ]
  },
]