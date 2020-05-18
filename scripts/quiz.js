const cyb = require('/scripts/cyb.js');
var emotiveState = "neutral";
var cybSvg = document.querySelector("#cyb");
var facePath = document.querySelector("#face");
var shadow = document.querySelector("#shadow");
var dialogCont = document.querySelector("#dialog");
var state = "intro";

// onload animations
var cybCont = document.querySelector("#cyb-container");
var dialogRight = document.querySelector("#rightdialog");
var dialogLeft = document.querySelector("#leftdialog");
var choiceBtn = document.querySelector("#choicebuttons");
cyb.pulse();
window.addEventListener("load", function(){
  cybCont.classList.remove("hidden");
  dialogRight.classList.remove("hidden");
  dialogLeft.classList.remove("hidden");
  choiceBtn.classList.remove("hidden");
});

//toggle Cyb's motive state with yes/no choicebuttons
var yesBtn = document.querySelector("#yesbtn");
var noBtn = document.querySelector("#nobtn");
var bCont = document.querySelector("#b-grid-container");
var nameInput = document.querySelector("#nameinput");
var yesTxt = document.querySelector("#yestxt");
yesBtn.addEventListener("click", function(){
  console.log("yesbutton clicked~");
  cyb.cybToPleased()
  emotiveState = "pleased";
  dialogLeft.style.transitionDelay="0s";
  dialogRight.style.transitionDelay="0s";
  noBtn.textContent="Submit";
  dialogRight.classList.add("hidden");
  dialogLeft.classList.add("hidden");
  yesTxt.style.display = "none";
  nameInput.style.display = "block";
  cyb.input();
  state="dialog";
});
noBtn.addEventListener("click", function(){
  console.log("nobutton clicked~");
  if(state==="intro"){
    cyb.cybToUpset()
    emotiveState = "upset";
  } else if(state==="dialog"){
    bCont.style.display="grid";
  }
});

//toggle Cyb's emotive states on click
face.addEventListener("click", function(){
  console.log(emotiveState);
  if (emotiveState==="pleased"){
    cyb.cybToUpset()
    emotiveState = "upset";
  } else if (emotiveState==="upset") {
    cyb.cybToNeutral()
    emotiveState = "neutral";
  }else if (emotiveState==="neutral") {
    cyb.cybToPleased()
    emotiveState = "pleased";
  }
});

// Get a reference to the database service
var database = firebase.database();

// retrieve image links and save as lvl1Img and lvl2Img
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

// set total number of lvl1 and lvl2 questions to be chosen from
var lvl1qtotal = [1,2,3,4,5,6,7,8];
var lvl2qtotal = [1,2,3,4];
// create array of questions in this game
var lvl1qs = [];
var lvl2qs = [];
//set length of each level
var lvl1length = 5;
var lvl2length = 4;

// set the level and question vars
function setLineup(){
  // lvl1
  while (lvl1qs.length < lvl1length){
    var num = Math.floor(Math.random()*lvl1qtotal.length);
    lvl1qs.push(lvl1qtotal[num]);
    lvl1qtotal.splice(num,1);
  }
  // lvl2
  while (lvl2qs.length < lvl2length){
    var num = Math.floor(Math.random()*lvl2qtotal.length);
    lvl2qs.push(lvl2qtotal[num]);
    lvl2qtotal.splice(num,1);
  }
}

//initialize lineup and set the lvl1 / first question
setLineup();
var lvl = lvl1qs;
var qstInd = 0;
console.log("lineup set!");

// populate the squares with background images from database
var qImg = document.querySelectorAll(".q-img");
var identifier = document.querySelector("#q-identifier");
var qType1 = document.querySelector("#q-type1");
var qType2 = document.querySelector("#q-type2");
// var quizGroup =
function populateSquares() {
  var qstLink;
  var question = "q" + lvl[qstInd].toString();
  if (lvl===lvl1qs){
    qstLink = lvl1Img[question];
  }
  else if (lvl===lvl2qs){ qstLink = lvl2Img[question]; }
  qImg.forEach((el) => {
    // set background
    el.style.backgroundImage = "url(" + qstLink[el.id] + ")";
    //reset refresh button settings
    el.style.webkitTransform = "rotate(0deg)";
    el.style.mozTransform = "rotate(0deg)";
    feedbackMsg.style.display = "none";
    gridContainer.style.height="580px";

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
var initBtn = document.querySelector("#b-col1-item");
var quizFrame = document.querySelector("#q-grid-container");
var qTri = document.querySelectorAll(".q-triangle");
initBtn.onclick = () => {
  if (quizFrame.style.display === "grid") {
    quizFrame.style.display = "none";
    qTri.forEach((el) => {
      el.style.display = "none";
    });
    initBtn.style.borderColor="#4d90fe";
  } else {
    populateSquares();
    quizFrame.style.display = "grid";
    qTri.forEach((el) => {
      el.style.display = "block";
    });
    initBtn.style.borderColor="#c1c1c1";
  }
};

//event listener for closing quiz window
document.addEventListener("click", function(){
  var el= event.target;
  // if(el.classList.contains("q")){console.log("part of quiz");}
  if(el.classList.contains("q")===false && el!==initBtn){
    if (quizFrame.style.display === "grid") {
      quizFrame.style.display = "none";
      qTri.forEach((el) => {
        el.style.display = "none";
      });
      initBtn.style.borderColor="#4d90fe"
    }
  }
})

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

// refresh button
var refBtn = document.querySelector("#refresh");
var feedbackMsg = document.querySelector("#feedback-msg");
var gridContainer = document.querySelector("#q-grid-container");
refBtn.addEventListener("click", function(){
  qImg.forEach((el) => {
    if(el.style.webkitTransform==="rotate(0deg)"){
      el.style.webkitTransform = "rotate(90deg)";
      el.style.mozTransform = "rotate(90deg)";
    } else if (el.style.webkitTransform = "rotate(90deg)"){
      el.style.webkitTransform = "rotate(180deg)";
      el.style.mozTransform = "rotate(180deg)";
      feedbackMsg.style.display = "inline";
      feedbackMsg.textContent="Does this help?";
      gridContainer.style.height="610px";
    }
   });
   // feedbackmessage.style.display = inline
})

// verify button
var verBtn = document.querySelector("#verify-button");
verBtn.addEventListener("click", function(){
  qImg.forEach((el) => {
    if (el.style.margin === "12px") {
      el.style.margin = "0px";
      el.style.backgroundSize="126px";
      key = el.id
      // Increment the img score by 1.
      var level;
      if(lvl===lvl1qs){
        level = "lvl1";
        question = lvl1qs[qstInd];
      }
      else{
        level = "lvl2";
        question = lvl2qs[qstInd];
      }
      var postRef = firebase.database().ref(level+'/scores/q'+question.toString()+"/"+key);
      postRef.transaction(function(updateScore) {
        return updateScore + 1;
      });
    }
  });
  //load next question or go to reuslts page
  if(lvl===lvl1qs){
    if(qstInd<lvl1length-1){
      qstInd += 1;
    } else if(qstInd===lvl1length-1){
      lvl = lvl2qs;
      qstInd = 0;
    }
  } else if(lvl===lvl2qs){
    if(qstInd<lvl2length-1){
      qstInd += 1;
    } else if(qstInd===lvl2length-1){
      window.open('results.html', '_self');
    }
  }
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
