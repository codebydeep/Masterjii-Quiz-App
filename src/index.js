const questions = [
    {
    question: "Who is the Prime Minister of India?",
    answers: [
      { text: "Narendra Modi", correct: true },
      { text: "Rahul Gandhi", correct: false },
      { text: "Amit Shah", correct: false },
      { text: "Manmohan Singh", correct: false }
    ]
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "New York", correct: false },
      { text: "London", correct: false },
      { text: "Paris", correct: true },
      { text: "Dublin", correct: false }
    ]
  },
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false }
    ]
  },
  {
    question: "Who is CEO of Tesla?",
    answers: [
      { text: "Jeff Bezos", correct: false },
      { text: "Elon Musk", correct: true },
      { text: "Bill Gates", correct: false },
      { text: "Tony Stark", correct: false }
    ]
  },
  {
    question: "The full form of JSP is",
    answers: [
      { text: "Java Server Pages", correct: true },
      { text: "Java Server Platform", correct: false },
      { text: "Java Script Platform", correct: false },
      { text: "Java Script Program", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.className =
      "btn bg-white text-[#222] font-semibold border-0 p-3 mb-3 rounded-xl w-full text-left cursor-pointer hover:bg-black hover:text-white";
    if (answer.correct) button.dataset.correct = "true";
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none"
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct")
    score++;
  } else {
    selectedBtn.classList.add("wrong")
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true
  });

  nextButton.style.display = "block"
}

function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  nextButton.textContent = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion()
  } else {
    showScore()
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton()
  } else {
    startQuiz()
  }
});

startQuiz();