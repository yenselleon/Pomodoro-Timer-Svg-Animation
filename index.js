window.onload = ()=> btnEvents();

    const btnStart = document.querySelector('.start');
    const btnReset = document.querySelector('.reset');
    const btnPause = document.querySelector('.pause');
    const minsClock = document.querySelector('.mins');
    const secsClock = document.querySelector('.secs');

    let h = 0;
    let m = 25;
    let s = 0;
    let stopIntervalTimer;


function btnEvents() {
    btnStart.addEventListener('click', startClock);
    btnReset.addEventListener('click', resetClock);
    btnPause.addEventListener('click', pauseClock);
}

/*------------------------------------------*/
/*--btn start--*/
/*------------------------------------------*/

function startClock() {
    btnStart.removeEventListener('click', startClock);
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
    console.log("hola mundo")
    
}


/*------------------------------------------*/
/*--btn reset--*/
/*------------------------------------------*/
function pauseClock() {

    btnPause.removeEventListener('click', pauseClock);
    clearInterval(stopIntervalTimer)
    btnStart.addEventListener('click', startClock);
    
}