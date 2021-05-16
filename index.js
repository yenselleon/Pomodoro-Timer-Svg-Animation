import {getParameter} from './settings.js'

    const btnStart = document.querySelector('.start');
    const btnReset = document.querySelector('.reset');
    const btnPause = document.querySelector('.pause');
    const minsClock = document.querySelector('.mins');
    const secsClock = document.querySelector('.secs');
    const btnSendParameters = document.getElementById('sendParameters');
    
    let h = 0;
    let m = 25;
    let s = 0;
    let stopIntervalTimer;
    
window.onload = ()=> btnEvents();

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
        
        if (s === 0) {s = 60;  m--; s--;}
        else if (s < 60) {s--}
        
        secsClock.innerHTML = `${String(s).padStart(2,"0")}`;
        minsClock.innerHTML = `${String(m).padStart(2,"0")}`;
        console.log(s)
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


    h = 0;
    m = 25;
    s = 0;

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

    console.log(m)
    
}