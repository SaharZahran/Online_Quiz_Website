const submit_Button = document.querySelector(".submit-btn");
const question = document.querySelector(".question");
const allAnswers = document.querySelector(".all-answers");
const spans = document.querySelector(".spans");
const container = document.querySelector(".quiz-container");
const results = document.querySelector(".results");
let userAnswer;
let numOfQuestion = 0;
let right_answer;
let correct = 0;
let user_answers = [];
let right_answers = [];
let options;
let quiz_number = JSON.parse(localStorage.getItem("quiz_number"));
const questionsNum = document.querySelector(".questionsNum");
let end_iteration;

function loadQuestions(number) {
  if (number < 5) {
    fetch(
      "https://raw.githubusercontent.com/SaharZahran/Online_Quiz_Website/main/quiz_questions.json"
    )
      .then((response) => response.json())
      .then((data) => {
        options = data[quiz_number][number].options;
        console.log(options);
        addQuestion(options, data[quiz_number][number].Question);
        createBullets(number);

        right_answer = data[quiz_number][number].right_answer;
        console.log(right_answer);
      });
  }
}
loadQuestions(numOfQuestion);
submit_Button.addEventListener("click", () => {
  checkRightAnswer(right_answer);
  setTimeout(() => {
    console.log(numOfQuestion);
    numOfQuestion++;
    reset();
    loadQuestions(numOfQuestion);
    if (numOfQuestion > 4) {
      container.innerHTML = "";
      const result = document.createElement("p");
      result.innerHTML = `Your score is:${correct} / 5`;
      container.appendChild(result);
      console.log(user_answers);
      console.log(right_answers);
    }
  }, 700);
});

function createBullets(numOfQuestion) {
  for (let i = 0; i <= 4; i++) {
    const span = document.createElement("span");
    spans.appendChild(span);
    if (i === numOfQuestion) {
      span.classList.add("active-question");
    }
  }
}

function addQuestion(arrayOfOptions, number_of_question) {
  const questionText = document.createElement("h2");
  questionText.textContent = number_of_question;
  question.appendChild(questionText);

  for (let i = 0; i <= 3; i++) {
    const answer = document.createElement("div");
    answer.classList.add("answer");
    const input = document.createElement("input");
    input.name = "answer";
    input.type = "radio";
    input.className = "inputRadio";
    input.id = `answer${i}`;
    const label = document.createElement("label");
    label.setAttribute("for", `answer${i}`);
    label.textContent = arrayOfOptions[i];
    answer.appendChild(input);
    answer.appendChild(label);
    allAnswers.appendChild(answer);
  }
}

function checkRightAnswer(correct_answer) {
  const inputAnswers = document.querySelectorAll("input");
  let userAnswer;
  inputAnswers.forEach((input) => {
    if (input.checked) {
      userAnswer = input.nextElementSibling.innerHTML;
      right_answers.push(correct_answer);
      user_answers.push(userAnswer);
      storeResult();
      if (userAnswer !== correct_answer) {
        input.parentElement.style.color = "#721c24";
        input.parentElement.style.background = "#f8d7da";
        input.parentElement.style.border = "10px solid #f5c6cb";
      } else {
        input.parentElement.style.color = "#155724";
        input.parentElement.style.background = "#d4edda";
        input.parentElement.style.border = "10px solid #c3e6cb";
        correct++;
      }
    }
  });
}

function reset() {
  allAnswers.innerText = "";
  spans.innerText = "";
  question.innerText = "";
  userAnswer = "";
  right_answer = "";
}

function storeResult() {
  localStorage.setItem("user-answers", user_answers);
  localStorage.setItem("right-answers", right_answers);
}

// fetch(
//   "https://raw.githubusercontent.com/SaharZahran/Online_Quiz_Website/main/quiz_questions.json"
// )
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data["Quiz1"]);
//     options = data[quiz_number][number].options;
//     console.log(options);
//     addQuestion(options, data[quiz_number][number].Question);
//     createBullets(number);

//     right_answer = data[quiz_number][number].right_answer;
//     console.log(right_answer);
//   });
