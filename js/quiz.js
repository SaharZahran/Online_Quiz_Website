const submit_Button = document.querySelector(".submit-btn");
const question = document.querySelector(".question");
const allAnswers = document.querySelector(".all-answers");
const spans = document.querySelector(".spans");
const container = document.querySelector(".quiz-container");
const time_line = document.querySelector(".time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
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
let number_of_passed_quizzes = 0;
let average_point = 0;
let number_of_all_user_quizzes = 0;

function loadQuestions(number) {
  if (number < 5) {
    fetch(
      "https://raw.githubusercontent.com/SaharZahran/Online_Quiz_Website/main/quiz_questions.json"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data[quiz_number][1].options.length);
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
      fetch(
        "https://raw.githubusercontent.com/SaharZahran/Online_Quiz_Website/main/quiz_questions.json"
      )
        .then((response) => response.json())
        .then((data) => {
          let counterResult = 0;
          for (let i = 0; i < data[quiz_number].length; i++) {
            let questionResult = `<h3>${data[quiz_number][counterResult]["Question"]}</h3>`;
            container.insertAdjacentHTML("beforeend", questionResult);
            counterResult++;
            for (let j = 0; j < data[quiz_number][i].options.length; j++) {
              let answernResult = `<div>${data[quiz_number][i].options[j]}</div>`;
              container.insertAdjacentHTML("beforeend", answernResult);
            }
          }
        });
    }
    clearInterval(counter);
    startTimer(15);
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

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

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
        input.nextElementSibling.style.color = "#721c24";
        input.nextElementSibling.style.background = "#f8d7da";
        input.nextElementSibling.style.border = "1px solid #f5c6cb";
        input.insertAdjacentHTML("afterend", crossIconTag);
      } else {
        input.nextElementSibling.style.color = "#155724";
        input.nextElementSibling.style.background = "#d4edda";
        input.nextElementSibling.style.border = "1px solid #c3e6cb";
        input.insertAdjacentHTML("afterend", tickIconTag);
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

function calculation() {
  if (
    correct >= 3 &&
    localStorage.getItem("number_of_passed_quizzes") === null
  ) {
    number_of_passed_quizzes++;
    localStorage.setItem("number_of_passed_quizzes", number_of_passed_quizzes);
  } else if (
    correct >= 3 &&
    localStorage.getItem("number_of_passed_quizzes") !== null
  ) {
    let container = localStorage.getItem("number_of_passed_quizzes");
    console.log(parse(container));
    localStorage.setItem("number_of_passed_quizzes", parse(container) + 1);
  }
  number_of_all_user_quizzes++;
  average_point = (number_of_passed_quizzes / number_of_all_user_quizzes) * 100;
  localStorage.setItem(
    "number_of_all_user_quizzes",
    number_of_all_user_quizzes
  );
  localStorage.setItem("average_point", average_point);
  console.log(number_of_passed_quizzes);
  console.log(number_of_all_user_quizzes);
  console.log(average_point);
}

function startTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; //add a 0 before time value
    }
    if (time < 0) {
      clearInterval(counter); //clear counter
      timeText.textContent = "Time Off";
    }
  }
}
startTimer(15);
