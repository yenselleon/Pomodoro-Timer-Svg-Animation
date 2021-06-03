
// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
const ProgressBar = require("./node_modules/progressbar.js");
const progressRing = document.querySelector('.progress-ring');

let bar = new ProgressBar.Circle(progressRing, {
    color: '#aaa',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 10,
    trailWidth: 6,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    
  });
  
  
 /*  bar.animate(1.0);  */ // Number from 0.0 to 1.0


function progressPorcentageValue({m, s, focusTimeValue}) {
  
  let totalSecondTime = m * 60 + s;

  let restSecondTime = (focusTimeValue * 60) - totalSecondTime;

  let totalOperation = (restSecondTime * 100) / (focusTimeValue * 60) / 100;
  
  return Number(totalOperation.toFixed(2));
}

module.exports = {
    bar,
    progressPorcentageValue,
}