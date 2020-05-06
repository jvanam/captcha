var initBtn = document.querySelector("#b-col1-item");
var quizFrame = document.querySelector("#q-grid-container");
var qImg = document.querySelectorAll(".q-img");
var verBtn = document.querySelector("#verify-button");

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
 qImg.forEach((el) => {
   el.addEventListener("click", function(){
     if(el.style.margin === "12px"){
       el.style.margin = "0px";
       el.style.backgroundSize="126px";
     }
     else{
       el.style.margin = "12px";
       el.style.backgroundSize="106px";
     }
   });
 });

// verify button
verBtn.addEventListener("click", function(){
  qImg.forEach((el) => {
    if(el.style.margin === "10px"){
      key = el.id
      // Increment the img score by 1.
      var postRef = firebase.database().ref(lvl+'/scores/q'+qst.toString()+"/"+key);
      postRef.transaction(function(updateScore) {
        return updateScore + 1;
      });
      console.log(key);
      el.style.margin = "0px";
      el.style.backgroundSize="126px";
    }
  });
  qst += 1;
  populateSquares();
})

// DANGER ZONE! RESET ALL SCORES TO ZERO //
