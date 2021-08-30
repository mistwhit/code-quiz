// Selects each container <div>
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerContainer = document.getElementById('timer-container')
const scoresContainer = document.getElementById('scores-container')

// These variables are used for randomizing the questions
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

// Starts the Game
function startGame() {
  // Starts the timer
  startTimer()
  // Hides the Start button
  startButton.classList.add('hide')
  // Randomly sorts through the questions array
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  // Starts on first question of the shuffled questions array
  currentQuestionIndex = 0
  // Shows the question container
  questionContainerElement.classList.remove('hide')
  // Sets the first question
  setNextQuestion()
}

// Sets the next question when Next button is clicked
function setNextQuestion() {
  // Resets everything back to default styling
  resetState()
  // Shows the next question
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

// Shows the next question
function showQuestion(question) {
  // Displays the question in the question container
  questionElement.innerText = question.question
  // Displays answers in answer containers
  question.answers.forEach(answer => {
    // Displays each answer as a button with answer text
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    // Checks if the answer is correct (correct = true)
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    // Adds click event to answer button and calls selectAnswer function
    button.addEventListener('click', selectAnswer)
    // Appends new answer buttons to the answerButtonsElement
    answerButtonsElement.appendChild(button)
  })


}

// Resets everything back to default styling for each question
function resetState() {
  clearStatusClass(document.body)
  // Re-hides the Next button
  nextButton.classList.add('hide')
  // Removes the previously appended answer buttons
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// Selects an answer
function selectAnswer(e) {
  // Selects the answer that has been clicked
  const selectedButton = e.target
  // Checks if it is correct
  const correct = selectedButton.dataset.correct
  // If it correct, this makes the body green
  setStatusClass(document.body, correct)
  // Adds correct dataset to correct answers
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    // TODO ADD END OF GAME FEATURES HERE
    alert("Congrats! You have completed the quiz!")
  }
}

function setStatusClass(element, correct) {
  // Clear status it already has
  clearStatusClass(element)
  // Adds correct class if correct
  if (correct) {
    element.classList.add('correct')
  } else {
    // Adds wrong class if incorrect
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
  }
]