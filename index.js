const {getParameter, setParametersInLocalStorage} = require('./settings.js');
const {bar, progressPorcentageValue} = require('./progress.js');

    const btnStart = document.querySelector('.start');
    const btnReset = document.querySelector('.reset');
    const btnPause = document.querySelector('.pause');
    const minsClock = document.querySelector('.mins');
    const secsClock = document.querySelector('.secs');
    const btnSendParameters = document.getElementById('sendParameters');
    const inputFocusTime = document.getElementById('focusTime');
    const inputBreakTime = document.getElementById('brakTime');
    const endTimeSound = document.getElementById('endTimeSound');
    const progressRing = document.querySelector('.progress-ring');
    
    let currentColorSvgCircle = '#2940d3';
    let h = 0;
    let m = loadParameters().focusTimeInputValue;
    let s = 0;
    let stopIntervalTimer;
    
window.onload = ()=> { btnEvents(); loadParameters(); };
minsClock.innerHTML = `${String(m).padStart(2,"0")}`;


/*------------------------------------------*/
/*--Cargar datos del LocalStorage--*/
/*------------------------------------------*/
function loadParameters() {
    console.log('cargo nuevamente')
    //Load input focus time value
    const focusTimeInputValue = (JSON.parse(localStorage.getItem("parameters"))) ? inputFocusTime.value = Number(JSON.parse(localStorage.getItem("parameters")).focusTime)
                                                     : inputFocusTime.value = 25;
    //Load Input break time value
    const breakTimeInputvalue = (JSON.parse(localStorage.getItem("parameters")) && Number(JSON.parse(localStorage.getItem("parameters")).breakTime !== "")) 
                                                     ? inputBreakTime.value = Number(JSON.parse(localStorage.getItem("parameters")).breakTime)
                                                     : inputBreakTime.value = 5;


    progressRing.append(bar);
    
    return {
        focusTimeInputValue,
        breakTimeInputvalue,
    }
}

function btnEvents() {
    btnStart.addEventListener('click', startClock);
    btnReset.addEventListener('click', resetClock);
    btnPause.addEventListener('click', pauseClock);
    btnSendParameters.addEventListener('click', (e)=> saveParameters(e));
}

/*------------------------------------------*/
/*--btn start--*/
/*------------------------------------------*/

function startClock() {
    let {focusTimeInputValue} = loadParameters();

    btnStart.removeEventListener('click', startClock);
    btnSendParameters.setAttribute("disabled", "true");
    btnPause.addEventListener('click', pauseClock);
    currentColorSvgCircle = '#2940d3';

    
    stopIntervalTimer = setInterval(()=> {
        console.log({m,s})
        if (s === 0 && m === 0) { 
            clearInterval(stopIntervalTimer); 
            secsClock.innerHTML = `${String(s).padStart(2,"0")}`;
            minsClock.innerHTML = `${String(inputBreakTime.value).padStart(2,"0")}`;

            endTimeSound.play();
            startBreak();
            return;
        }
        else if(s <= 5 && m === 0) { s--; currentColorSvgCircle = '#ce1212';progressRing.classList.add('danger')}
        else if(s === 0) {s = 60;  m--; s--;}
        else if (s < 60) {s--}

        try {
            let progressTime = progressPorcentageValue({m : m, s : s, focusTimeValue : focusTimeInputValue});
            console.log(progressTime)
            bar.animate(progressTime, {
                
                // Set default step function for all animate calls
                step: function(state, circle) {
                    circle.path.setAttribute('stroke', currentColorSvgCircle);
                    circle.path.setAttribute('stroke-width', 8);
                
                }
                
            });
            
        } catch (error) {
            console.log(error)
        }
        secsClock.innerHTML = `${String(s).padStart(2,"0")}`;
        minsClock.innerHTML = `${String(m).padStart(2,"0")}`;
    }, 1000)

}

/*------------------------------------------*/
/*--START BREAK--*/
/*------------------------------------------*/

function startBreak() {
    let {focusTimeInputValue, breakTimeInputvalue} = loadParameters();
    m = breakTimeInputvalue;
    currentColorSvgCircle = '#ff8303';
    progressRing.classList.remove('danger')

    stopIntervalTimer = setInterval(()=> {
        
        if (s === 0 && m === 0) { 
            clearInterval(stopIntervalTimer); 
            secsClock.innerHTML = `${String(s).padStart(2,"0")}`;
            minsClock.innerHTML = `${String(focusTimeInputValue).padStart(2,"0")}`;

            endTimeSound.play();
            resetClock();
            return;
        }
        else if(s <= 5 && m === 0) { progressRing.classList.add('danger'); s--; currentColorSvgCircle = '#ce1212';}
        else if(s === 0) {s = 60;  m--; s--;}
        else if (s < 60) {s--}

        try {
            let progressTime = progressPorcentageValue({m : m, s : s, focusTimeValue : focusTimeInputValue});
            console.log(progressTime)
            bar.animate(progressTime, {
                
                // Set default step function for all animate calls
                step: function(state, circle) {
                    circle.path.setAttribute('stroke', currentColorSvgCircle);
                    circle.path.setAttribute('stroke-width', 8);
                
                }
                
            });
            
        } catch (error) {
            console.log(error)
        }

        secsClock.innerHTML = `${String(s).padStart(2,"0")}`;
        minsClock.innerHTML = `${String(m).padStart(2,"0")}`;
    }, 1000)

    
}

/*------------------------------------------*/
/*--btn reset--*/
/*------------------------------------------*/

function resetClock() {

    clearInterval(stopIntervalTimer)
    btnPause.removeEventListener('click', pauseClock);
    btnReset.removeEventListener('click', pauseClock);
    btnStart.addEventListener('click', startClock);
    btnSendParameters.removeAttribute("disabled");
    progressRing.classList.remove('danger')


    h = 0;
    s = 0;

    (JSON.parse(localStorage.getItem("parameters"))) ? m = Number(JSON.parse(localStorage.getItem("parameters")).focusTime)
                                                     : m = inputFocusTime.value;

    secsClock.innerHTML = `${String(s).padStart(2,"0")}`;
    minsClock.innerHTML = `${String(m).padStart(2,"0")}`;
    bar.animate(0);
}


/*------------------------------------------*/
/*--btn reset--*/
/*------------------------------------------*/
function pauseClock() {

    btnPause.removeEventListener('click', pauseClock);
    clearInterval(stopIntervalTimer)
    btnStart.addEventListener('click', startClock);
    
}

/*------------------------------------------*/
/*--SendParameters--*/
/*------------------------------------------*/

function saveParameters(e) {
    e.preventDefault()

    let newParametersSave = getParameter();
    m = Number(newParametersSave.focusTime)
    minsClock.innerHTML = `${String(m).padStart(2,"0")}`;
    setParametersInLocalStorage(newParametersSave)
    
    console.log(newParametersSave)
    
}
