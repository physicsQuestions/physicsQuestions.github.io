(function() {

  var pickedQuestions = [];
  var pickedReasons = [];
  var chapterNumber = 0;
  var overallScore;
  var overallPreviousScore;
  var mainReasons = [];
  var tempScore;
  var reasonSlide = 0;
  var alreadyClicked = false;

  if(localStorage.getItem("score15")) {
    overallScore = document.querySelector("#score15");
    overallPreviousScore = document.querySelector("#score15Li");
    tempScore = parseInt(localStorage.getItem("score15"));
    overallPreviousScore.value = tempScore;
    overallScore.innerHTML = 'Best Score: ' + tempScore + '%';
  }

  function buildQuestions() {
    let randomNumber = 0;
    let canContinue = false;
    var mainQuestions = myQuestions15;
    console.log(chapterNumber);
    if(chapterNumber == 15) {
      mainQuestions = myQuestions15;
      mainReasons = myReasons15;
      console.log(trueValue);
    }
    else if(chapterNumber == 2) {
      mainQuestions = myQuestions2;
    }
    else if(chapterNumber == 3) {

      mainQuestions = myQuestions3;
    }
    // gets 3 random questions
    for(i = 0; i < trueValue; i++) {
      while(canContinue == false) {
        //gets a random number
        randomNumber = Math.floor(Math.random() * mainQuestions.length);
        // if the questions chosen is not already in the array then continue
        if (!pickedQuestions.includes(mainQuestions[randomNumber])) {
         pickedQuestions.push(mainQuestions[randomNumber]);
         pickedReasons.push(mainReasons[randomNumber]);
         canContinue = true;
        }
      }
      //reset to get next question
      canContinue = false;
    }
  }

  function buildQuiz() {
      // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    
    pickedQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label style="text-align: left;">
             <input type="radio" class="${letter}" name="question${questionNumber}" value="${letter}">
             </input>
              <span id="span${letter}" style="color:black;">
              <span id="span${letter}color">${letter} : </span>
              ${currentQuestion.answers[letter]}
              </span>
           </label>`
        ); 
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
        <div class="progression" style="text-align: center"> Question ${questionNumber + 1} out of ${pickedQuestions.length}</div>
          <br>
           <div class="question"> ${currentQuestion.question} </div>
           <br>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");

  }

  function showResults() {
    // gather answer containers from our quiz
    if(alreadyClicked != true){
    alreadyClicked = true;
    const answerContainers = quizContainer.querySelectorAll(".answers");
    explanation.style.display = "inline-block";
    submitButton.style.display = "none";
    returnToMenu.id = "return2";
    nextButton.id = "next2";

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    pickedQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answer green
        answerContainers[questionNumber].querySelector('#span' + currentQuestion.correctAnswer + 'color').style.color = 'lightgreen';
      } else {
        // if answer is wrong or blank
        // color the user answer red
        // color the correct answer green
        answerContainers[questionNumber].querySelector('#span' + currentQuestion.correctAnswer + 'color').style.color = 'lightgreen';
        if(userAnswer != null) {
          answerContainers[questionNumber].querySelector('#span' + userAnswer).style.color = 'red';
        }
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${pickedQuestions.length} correct`;

    if(chapterNumber == 15) {
      overallScore = document.querySelector("#score15");
      overallPreviousScore = document.querySelector("#score15Li");
      tempScore = parseInt(100 * numCorrect/pickedQuestions.length);
      if(overallPreviousScore.value <= tempScore) {
        localStorage.setItem("score15", tempScore);
        overallPreviousScore.value = tempScore;
        overallScore.innerHTML = 'Best Score: ' + tempScore + '%';
      }
    }
  }
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    reasonSlide = n - 1;

    if(currentSlide === 0) {
      explanation.style.display = "none";
      previousButton.style.display = "none";
      nextButton.style.display = "none";
      submitButton.style.display = "none";
      returnToMenu.style.display = "none";
    }
    else if (currentSlide === 1) {
      quizDisplay.style.display = "inline-block";
      previousButton.style.display = "none";
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
      returnToMenu.style.display = "block";
      explanation.innerHTML = pickedReasons[reasonSlide].reason;
    } 

    else if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      previousButton.style.display = "inline-block";
      if(alreadyClicked == false) {
        submitButton.style.display = "inline-block";
      }
      explanation.innerHTML = pickedReasons[reasonSlide].reason;
    } else {
      nextButton.style.display = "inline-block";
      previousButton.style.display = "inline-block";
      submitButton.style.display = "none";
      explanation.innerHTML = pickedReasons[reasonSlide].reason;
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  function resetSlide() {
    alreadyClicked = false;
    resultsContainer.innerHTML = '';
    quizContainer.innerHTML = '';
    pickedQuestions = [];
    pickedReasons = [];
    returnToMenu.id = "return";
    nextButton.id = "next";
    showSlide(0);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const startQuiz = document.getElementById("startQuiz");
  const returnToMenu = document.getElementById("return");

  quizContainer.style.display = "inline";

  function showStartSlide() {
    chapterNumber = this.value;
    buildQuestions();
    buildQuiz();
    slides = document.querySelectorAll(".slide");
    showSlide(1);
  }

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  var slides = document.querySelectorAll(".slide");
  var buttons = document.querySelectorAll(".chapter");
  var quizDisplay = document.getElementById("quizSheet");
  var reasoning = document.getElementById("reason");
  var explanation = document.getElementById("explain");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  returnToMenu.addEventListener("click", resetSlide);
  for(i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", showStartSlide);
  }
})();