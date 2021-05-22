import {getParameter, setParametersInLocalStorage} from './settings.js'

    const btnStart = document.querySelector('.start');
    const btnReset = document.querySelector('.reset');
    const btnPause = document.querySelector('.pause');
    const minsClock = document.querySelector('.mins');
    const secsClock = document.querySelector('.secs');
    const btnSendParameters = document.getElementById('sendParameters');
    const inputFocusTime = document.getElementById('focusTime');
    const inputBreakTime = document.getElementById('brakTime');
    
    
    let h = 0;
    let m = 25;
    let s = 0;
    let stopIntervalTimer;
    
window.onload = ()=> { btnEvents(); loadParameters(); };


/*------------------------------------------*/
/*--Cargar datos del LocalStorage--*/
/*------------------------------------------*/
function loadParameters() {
    //Load input focus time value
    (JSON.parse(localStorage.getItem("parameters"))) ? inputFocusTime.value = Number(JSON.parse(localStorage.getItem("parameters")).focusTime)
                                                     : inputFocusTime.value = m;
    //Load Input break time value
    (JSON.parse(localStorage.getItem("parameters")) && Number(JSON.parse(localStorage.getItem("parameters")).breakTime !== "")) 
                                                     ? inputBreakTime.value = Number(JSON.parse(localStorage.getItem("parameters")).breakTime)
                                                     : inputBreakTime.value = 5;
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
    btnStart.removeEventListener('click', startClock);
    btnSendParameters.setAttribute("disabled", "true");
    btnPause.addEventListener('click', pauseClock);
    
    stopIntervalTimer = setInterval(()=> {
        
        if (s === 0 && m === 0) { clearInterval(stopIntervalTimer); resetClock(); }
        else if(s < 5 && m === 0) { console.log("animate"); s--; }
        else if(s === 0) {s = 60;  m--; s--;}
        else if (s < 60) {s--}
        
        secsClock.innerHTML = `${String(s).padStart(2,"0")}`;
        minsClock.innerHTML = `${String(m).padStart(2,"0")}`;
    }, 1000)

}

/*------------------------------------------*/
/*--START BREAK--*/
/*------------------------------------------*/

function startBreak() {
    
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


    h = 0;
    s = 0;

    (JSON.parse(localStorage.getItem("parameters"))) ? m = Number(JSON.parse(localStorage.getItem("parameters")).focusTime)
                                                     : m = inputFocusTime.value;

    secsClock.innerHTML = `${String(s).padStart(2,"0")}`;
    minsClock.innerHTML = `${String(m).padStart(2,"0")}`;

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