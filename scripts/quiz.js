var btn = document.querySelector("#b-col1-item");
var quizFrame = document.querySelector("#q-grid-container");
var qImg = document.querySelectorAll(".q-img");

// toggle the quiz module
btn.onclick = () => {
  if (quizFrame.style.display === "grid") {
    quizFrame.style.display = "none";
  } else {
    quizFrame.style.display = "grid";
  }
};

// add event listeners to quiz squares
 qImg.forEach((el) => {
   el.addEventListener("click", function(){
     el.style.margin = "10px";
     el.style.backgroundSize="106px";
   });
 });
