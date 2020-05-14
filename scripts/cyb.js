import { default as anime } from '/scripts/anime.js';

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

export { mouthToPleased };
