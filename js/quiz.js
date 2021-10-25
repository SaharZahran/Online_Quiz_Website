const submit_Button = document.querySelector(".submit-btn");
const question = document.querySelector(".question");
const allAnswers = document.querySelector(".all-answers");
const spans = document.querySelector(".spans");
const container = document.querySelector(".quiz-container");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const input = document.querySelectorAll("input");
const quizName = document.querySelector(".quiz-name");

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
        quizName.innerHTML = data[quiz_number][0].name;
        console.log(data[quiz_number].length);
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
      calculation();
      numOfQuestion = 0;
      correct = 0;
      loadResult();
    }
    clearInterval(counter);
    startTimer(15);
  }, 700);
});

console.log(localStorage.getItem("user-answers"));
function trueAns(index) {
  // console.log(localStorage.getItem("right-answers"));
  return localStorage.getItem("user-answers").split(",")[index] !=
    localStorage.getItem("right-answers").split(",")[index]
    ? "incorrect"
    : "";
}
// localStorage.clear();

function createBullets(numOfQuestion) {
  for (let i = 0; i <= 4; i++) {
    const span = document.createElement("span");
    spans.appendChild(span);
    if (i === numOfQuestion) {
      span.classList.add("active-question");
    }
  }
}

function loadResult() {
  fetch(
    "https://raw.githubusercontent.com/SaharZahran/Online_Quiz_Website/main/quiz_questions.json"
  )
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = "";
      let counterResult = 0;
      // let quizName = `<h1>${data[quiz_number][0].name}</h1>`;
      // container.insertAdjacentHTML("beforeend", quizName);
      // for (let i = 0; i < data[quiz_number].length; i++) {
      //   let questionResult = `</br></br><h3>${data[quiz_number][counterResult]["Question"]}</h3></br>`;
      //   container.insertAdjacentHTML("beforeend", questionResult);
      //   counterResult++;
      //   for (let j = 0; j < data[quiz_number][i].options.length; j++) {
      //     let answernResult = `<div class="answer ${trueAns(j)}">
      //     <input class="inputRadio" type="radio"><label>${
      //       data[quiz_number][i].options[j]
      //     }</label></div>`;
      //     container.insertAdjacentHTML("beforeend", answernResult);
      //   }
      // }

      let quizName = `<h1>${data[quiz_number][0].name}</h1>`;
      container.insertAdjacentHTML("beforeend", quizName);
      for (let i = 0; i < data[quiz_number].length; i++) {
        let h3 = document.createElement("h3");
        // data[quiz_number][counterResult]["Question"];
        h3.innerHTML = data[quiz_number][counterResult]["Question"];
        container.append(h3);
        counterResult++;
        for (let j = 0; j < data[quiz_number][i].options.length; j++) {
          let div = document.createElement("div");
          let label = document.createElement("label");
          div.classList.add("answer");
          label.innerHTML = data[quiz_number][i].options[j];
          container.append(div);
          div.append(label);
          let userAnswers = localStorage.getItem("user-answers").split(",");
          // label.classList.add("disabled");
          // if (
          //   localStorage.getItem("user-answers").split(",")[j] !=
          //   localStorage.getItem("right-answers").split(",")[j]
          // ) {
          //   console.log("object");
          //   label.classList.add("incorrect");
          // }
          if (
            data[quiz_number][i].options[j] == data[quiz_number][i].right_answer
          ) {
            label.classList.add("correct");
          }
        }
      }
    });
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

// let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
// let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

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
        // input.insertAdjacentHTML("afterend", crossIconTag);
      } else {
        input.nextElementSibling.style.color = "#155724";
        input.nextElementSibling.style.background = "#d4edda";
        input.nextElementSibling.style.border = "1px solid #c3e6cb";
        // input.insertAdjacentHTML("afterend", tickIconTag);
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

let calculationContainer = 0;

function calculation() {
  number_of_all_user_quizzes++;

  if (correct >= 3) {
    number_of_passed_quizzes++;
  }
  console.log((number_of_passed_quizzes / number_of_all_user_quizzes) * 100);
  //   if (
  //     correct >= 3 &&
  //     localStorage.getItem("number_of_passed_quizzes") === null
  //   ) {
  //     number_of_passed_quizzes++;
  //     localStorage.setItem("number_of_passed_quizzes", number_of_passed_quizzes);
  //   } else if (
  //     correct >= 3 &&
  //     localStorage.getItem("number_of_passed_quizzes") !== null
  //   ) {
  //     // calculationContainer = parseInt(
  //     //   localStorage.getItem("number_of_passed_quizzes")
  //     // );
  //     calculationContainer += 1;
  //     localStorage.setItem("number_of_passed_quizzes", calculationContainer);
  //   }
  //   // if (localStorage.getItem("number_of_passed_quizzes") === null) {
  //   //   calculationContainer = 1;
  //   // }
  //   console.log(calculationContainer);
  //   localStorage.setItem(
  //     "number_of_all_user_quizzes",
  //     number_of_all_user_quizzes
  //   );
  //   average_point = (+calculationContainer / +number_of_all_user_quizzes) * 100;
  //   localStorage.setItem("average_point", average_point);
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
      reset();
      numOfQuestion++;
      loadQuestions(numOfQuestion);
      startTimer(15);
      numOfQuestion > 4 ? loadResult() : "";
    }
  }
}
startTimer(15);
