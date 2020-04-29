var btn = document.querySelector("#b-col1-item");
var quizFrame = document.querySelector("#q-grid-container");
var quizState = false;

btn.onclick = () => {
  if (quizFrame.style.display === "grid") {
    quizFrame.style.display = "none";
  } else {
    quizFrame.style.display = "grid";
  }
};
