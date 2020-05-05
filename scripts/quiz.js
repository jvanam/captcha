// TODO:
// add var questionid = '' upon init
// add click ventlistener to verify BUTTON
// onclick it will:
// find the imgkey associated w each clicked button and add one to its value
// reset the questionid
// re-render
var initBtn = document.querySelector("#b-col1-item");
var quizFrame = document.querySelector("#q-grid-container");
var qImg = document.querySelectorAll(".q-img");
var verBtn = document.querySelector("#verify-button");
// for each quiz square element, add a state (un/clicked) and question/img key
var squaresDict = {"img01":false,"img02":false,"img03":false,"img04":false,
"img05":false,"img06":false,"img07":false,"img08":false,"img09":false};
// Get a reference to the database service
var database = firebase.database();
//set the level and question vars
var lvl = "lvl1"
var qst = 1

// toggle the quiz module
initBtn.onclick = () => {
  if (quizFrame.style.display === "grid") {
    quizFrame.style.display = "none";
  } else {
    quizFrame.style.display = "grid";
  }
};

// populate the squares with background images from database
function populateSquares() {
  var imgref = lvl + "/img/q" + qst.toString()
  var images = firebase.database().ref(imgref).once('value')
    .then((snapshot) => {
      var snap = snapshot.val();
      qImg.forEach((el) => {
        imgLink = snap[el.id];
        var thisisit = el.id;
        // prefetch images
        const im = new Image();
        im.src = imgLink;
        // set background
        el.style.backgroundImage = "url(" + imgLink + ")"
        //add to squaresDict
      });
    })
    .catch({
      // failed
    });
}

populateSquares();


// add event listeners to quiz squares
// so far, only for click and only for type1 and type2
 qImg.forEach((el) => {
   el.addEventListener("click", function(){
     if(el.style.margin === "10px"){
       el.style.margin = "0px";
       el.style.backgroundSize="126px";
     }
     else{
       el.style.margin = "10px";
       el.style.backgroundSize="106px";
     }
   });
 });

// verify BUTTON
verBtn.addEventListener("click", function(){
  qst += 1;
  populateSquares();
})
