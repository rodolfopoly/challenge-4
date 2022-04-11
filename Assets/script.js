
  const startBtn = document.getElementById('start-btn')
  const introduction = document.getElementById('introduction')
  const control = document.getElementById('control')
  const questionContainer = document.getElementById('question-container')
  let shuffledQuestion, currentQuestion
  const question = document.getElementById('question')
  const answerButtons = document.getElementById('answer-buttons')
  const wrongElement = document.getElementById('wrong')
  const correctElement = document.getElementById('correct')
  const quizOverEl = document.getElementById('quizOver')
  const yourHighScore = document.getElementById('yourHighScore')
  const inputEl = document.getElementById('input')
  const submitEl = document.getElementById('submit')
  const highScoreTableEl = document.getElementById('highScoreTable')
  const highScoreListEl = document.getElementById('highScoreList')
  var correctQuestion = 0
  var wrongQuestion = 0
  var score = 0
  var timerEl = document.getElementById('time')
  var endQuestion
  var initial = inputEl.value

  startBtn.addEventListener('click', startQuiz)

  function startQuiz(params) {
      countdown(40)
      console.log('started');
      startBtn.classList.add('hide')
      shuffledQuestion = myQuestions.sort(() => Math.random() - .5)
      currentQuestion = 0
      questionContainer.classList.remove('hide')
      introduction.classList.add('hide')
      setNextQuestion()
  }

  function setNextQuestion() {
      resetState()
      showQuestions(shuffledQuestion[currentQuestion]) 
  }

  function showQuestions(myQuestions){
      question.innerText = myQuestions.question
      myQuestions.answers.forEach(answers => {
          const button = document.createElement('button')
          button.innerText = answers.text
          button.classList.add('btn')
          if (answers.correct) {
              button.dataset.correct = answers.correct
          }
          button.addEventListener('click', selectAnswer)
          answerButtons.appendChild(button)
      })
  }

  function selectAnswer(e){
      const selectButtons = e.target
      const correct = selectButtons.dataset.correct
      setStatusClass (document.body, correct)
      Array.from(answerButtons).forEach(button =>{
          setStatusClass(button, button.dataset.correct)
      })
  }

  function setStatusClass(element, correct){
      clearStatusClass(element)
      if (correct) {
          displayMessageTrue()
          //correctElement.classList.remove('hide')
          console.log('correct')
          correctQuestion ++
      }
      else{
          //wrongElement.classList.remove('hide')
          displayMessageWrong()
          wrongQuestion = true;
      }
  }

  function scoreCalculator(){
      score = correctQuestion/(shuffledQuestion.length)*100
      console.log(score)
      questionContainer.classList.add('hide')
      quizOverEl.classList.remove('hide')
      const paragraph = document.createElement('p')
      paragraph.innerText = "Your final score is " + score + "."
      yourHighScore.appendChild(paragraph)
  }


  function clearStatusClass(element){
    correctElement.classList.add('hide')
    wrongElement.classList.add('hide')
  }

  function countdown(time) {
    var timeLeft = time;
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {

        if (endQuestion) {
            endQuestion.resetState
            timeLeft = 0
            timerEl.textContent = 'time: ' + timeLeft;
        }

        if (wrongQuestion) {
            wrongQuestion.resetState
            if (timeLeft > 10) {
                timeLeft = timeLeft - 10
            }
            else {
                timeLeft = 0
                timerEl.textContent = 'time: ' + timeLeft;
            };
            wrongQuestion = false;
        }
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = 'time: ' + timeLeft;
        // Decrement `timeLeft` by 1
        timeLeft--;
      } 
       else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = 'time : ';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        scoreCalculator();
      }
    }, 1000);
  }

  function displayMessageTrue() {
    correctElement.classList.remove('hide')
    var msgInterval = setInterval(function () {
        if (wrongQuestion != true) {
            console.log('mostrar 1 segundo true')
            correctElement.classList.add('hide')
            clearInterval(msgInterval)
            if (shuffledQuestion.length > currentQuestion + 1) {
                currentQuestion ++
                setNextQuestion()
              }
              else{
                correctElement.classList.add('hide')
                wrongElement.classList.add('hide')
                endQuestion = true
              }
        }
    }, 1000);
    }

    function displayMessageWrong() {
        wrongElement.classList.remove('hide')
        var msgInterval = setInterval(function () {
            if (wrongQuestion = true) {
                console.log('mostrar 1 segundo false')
                wrongElement.classList.add('hide')
                clearInterval(msgInterval)
                if (shuffledQuestion.length > currentQuestion + 1) {
                    currentQuestion ++
                    setNextQuestion()
                  }
                  else{
                    correctElement.classList.add('hide')
                    wrongElement.classList.add('hide')
                    endQuestion = true
                  }
            }
        }, 1000);
        }

  function resetState(){
      while (answerButtons.firstChild) {
          answerButtons.removeChild
          (answerButtons.firstChild)
      }
  }


  function setHighScore(){
      initial = inputEl.value
      console.log(initial)
      localStorage.setItem(JSON.stringify(initial), JSON.stringify(score))
      highScoreList()
  }

  function highScoreList(){
    const list = document.createElement('li')
    highScoreListEl.appendChild(list)
    highScoreTableEl.classList.remove('hide')
    quizOverEl.classList.add('hide')
  }

  submitEl.addEventListener('click', setHighScore)

  const myQuestions = [
    {
      question: "At 20 minutes into the game, Roshan will have how much maximum HP?",
      answers: [
        {text: '8000', correct: false}, 
        {text: '9000', correct: false},
        {text: '10000', correct: true},
        {text: '15000', correct: false},
      ],
    },
    {
      question: "When can you upgrade the Courier?",
      answers: [
        {text: 'At minute 2:00', correct: false},
        {text: 'At minute 3:00', correct: true},
        {text: 'At minute 4:00', correct: false},
        {text: 'At the start of the game', correct: false},
      ],
      correctAnswer: 'b'
    },
    {
      question:"Which Strength Hero has the highest Strength gain per level?",
      answers:[
        {text: 'Centaur', correct: true}, 
        {text: 'Treant', correct: false},
        {text: 'Doom', correct: false},
        {text: 'Pudge', correct: false},
      ],
    },  
    {
        question:"How many melees and ranged creeps spawn in the first wave, for only one lane? Not counting the enemy creeps in that lane!",
        answers:[
        {text: '4 melee creeps, 1 ranged creep', correct: false}, 
        {text: '3 melee creeps, 1 ranged creep', correct: true},
        {text: '4 melee creeps, 2 ranged creeps', correct: false},
        {text: '3 melee creeps, 2 ranged creeps', correct: false},
        ],
    },
]   
        