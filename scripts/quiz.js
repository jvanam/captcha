// Get a reference to the database service
var database = firebase.database();
// CSS selectors
var initBtn = document.querySelector("#b-col1-item");
var quizFrame = document.querySelector("#q-grid-container");
var qImg = document.querySelectorAll(".q-img");
var verBtn = document.querySelector("#verify-button");
var identifier = document.querySelector("#q-identifier");
var qType1 = document.querySelector("#q-type1");
var qType2 = document.querySelector("#q-type2");
// retrieve lvl 1 + 2 img
var lvl1Img;
var lvl2Img;
var initLvl1Img = firebase.database().ref("lvl1/img").once('value')
  .then((snapshot) => {
    lvl1Img = snapshot.val();
    console.log("imagesloaded!");
  })
  .catch({
    // failed
  });
var initLvl2Img = firebase.database().ref("lvl2/img").once('value')
  .then((snapshot) => {
    lvl2Img = snapshot.val();
  })
  .catch({
    // failed
  });
// set the level and question vars
var lvl = 1;
var qst = 1;

// populate the squares with background images from database
function populateSquares() {
  var qstLink;
  var question = "q" + qst.toString();
  if (lvl===1){
    qstLink = lvl1Img[question];
  }
  else if (lvl===2){ qstLink = lvl2Img[question]; }
  qImg.forEach((el) => {
    // set background
    el.style.backgroundImage = "url(" + qstLink[el.id] + ")";
  });
  // set textContent
  identifier.textContent = qstLink["identifier"];
  if (qstLink["type"]==="type1"){
    qType1.style.display = "inline";
    qType2.style.display = "none";
  }
  else if (qstLink["type"]==="type2"){
    qType2.style.display = "inline";
    qType1.style.display = "none";
  }
}

// toggle the quiz module
initBtn.onclick = () => {
  if (quizFrame.style.display === "grid") {
    quizFrame.style.display = "none";
  } else {
    populateSquares();
    quizFrame.style.display = "grid";
  }
};

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
    if (el.style.margin === "12px") {
      el.style.margin = "0px";
      el.style.backgroundSize="126px";
      key = el.id
      // Increment the img score by 1.
      var postRef = firebase.database().ref(lvl+'/scores/q'+qst.toString()+"/"+key);
      postRef.transaction(function(updateScore) {
        return updateScore + 1;
      });
    }
  });
  qst += 1;
  populateSquares();
})

// DANGER ZONE! RESET ALL SCORES TO ZERO //
function resetScores() {
  var updates = {};
  for(y=1; y<=8; y++){
    for(x=1; x<=9; x++){
      updates["lvl1/scores/q"+y.toString()+"/img0"+x.toString()] = 0;
    }
  }
  for(y=1; y<=4; y++){
    for(x=1; x<=9; x++){
      updates["lvl2/scores/q"+y.toString()+"/img0"+x.toString()] = 0;
    }
  }
  return firebase.database().ref().update(updates);
};
