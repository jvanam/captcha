const anime = require('/scripts/anime.js');

// main emotive changes
const cybToPleased = () => {
  mouthToPleased();
  eyesToPleased();
  shadowToYellow();
  emotiveState = "pleased";
}
const cybToNeutral = () => {
  mouthToNeutral();
  eyesToNeutral();
  shadowToBlue();
  emotiveState = "neutral";
}
const cybToUpset = () => {
  mouthToUpset();
  eyesToUpset();
  shadowToPink();
  emotiveState = "upset";
}

//individual feature changes
//pleased
const mouthToPleased = () => {
  anime({
   targets: '#mouth',
   d: [
     { value: "M131.9,412.5c3.3,2.7,17.9,13.8,40.7,14.2c23.6,0.3,39.2-11.2,42.5-13.7" }
     ],
   direction: 'normal',
   easing: 'linear',
   duration: 1000,
  });
}
const eyesToPleased = () => {
  var lefteyeToPleased = anime({
   targets: '#lefteye',
   d: [
     { value: "M61,274.4c9.7,1.3,21,2.3,33.6,2.2c13.5-0.1,25.6-1.3,35.8-3" }
     ],
   easing: 'linear',
   direction: 'normal',
   duration: 700,
  });
  var righteyeToPleased = anime({
   targets: '#righteye',
   d: [
     { value: "M206.8,273.5c9.7,1.3,21,2.3,33.6,2.2c13.5-0.1,25.6-1.3,35.8-3" }
     ],
   easing: 'linear',
   direction: 'normal',
   duration: 700,
  });
}
const shadowToYellow = () => {
  anime({
  targets: '#shadowpath',
  fill: '#FFE033',
  easing: 'linear',
  duration: 1000,
  });
}
//neutral
const mouthToNeutral = () => {
  anime({
   targets: '#mouth',
   d: [
     { value: "M130.5,416.1c10.3,0,18.7,0.7,41.5,0.9c19.2,0,25.4-0.3,43.8-0.9" }
     ],
   easing: 'linear',
   direction: 'normal',
   duration: 1000,
  });
}
const eyesToNeutral = () => {
  anime({
   targets: '#righteye',
   d: [
     { value: "M206.8,273.5c8.8,0.1,20.9,0.2,33.5,0.1c13.5-0.1,23.7-0.3,35.9-0.9" }
     ],
   easing: 'linear',
   direction: 'normal',
   duration: 700,
  });
  anime({
   targets: '#lefteye',
   d: [
     { value: "M61,274.4c10.7,0,22.1,0.1,34.7,0c13.3-0.4,22-0.5,34.7-0.8" }
     ],
   easing: 'linear',
   direction: 'normal',
   duration: 700,
  });
}
const shadowToBlue = () => {
  anime({
  targets: '#shadowpath',
  fill: '#6E6EB1',
  easing: 'linear',
  duration: 1000,
  });
}
//upset
const mouthToUpset = () => {
  anime({
   targets: '#mouth',
   d: [
     { value: "M130.4,421.3c4.3,0.6,18.5-2.1,41.3-1.7c23.6,0.3,35.9,2.3,42.3,2" }
     ],
   easing: 'linear',
   direction: 'normal',
   duration: 1000,
  });
}
const eyesToUpset = () => {
  anime({
   targets: '#righteye',
   d: [
     { value: "M206.8,273.5c9.7,1.3,17.8-0.7,30.4-0.8c13.5-0.1,28.8,1.7,39,0" }
     ],
   easing: 'linear',
   direction: 'normal',
   duration: 700,
  });
  anime({
   targets: '#lefteye',
   d: [
     { value: "M61,274.4c9.7,1.3,26.6-1.1,39.2-1.2c13.5-0.1,20,2.1,30.2,0.4" }
     ],
   easing: 'linear',
   direction: 'normal',
   duration: 700,
  });
}
const shadowToPink = () => {
  anime({
  targets: '#shadowpath',
  fill: '#945776',
  easing: 'linear',
  duration: 1000,
  });
}


//exports
exports.cybToPleased = cybToPleased;
exports.cybToNeutral = cybToNeutral;
exports.cybToUpset = cybToUpset;
