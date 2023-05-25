const inputHours = document.querySelector('#hours');
const inputMinutes = document.querySelector('#minutes');
const inputSeconds = document.querySelector('#seconds');
const button = document.querySelector("button");
const progress = document.querySelector("#progress");
const inputs = Array.from(document.querySelectorAll("input"));
const values = Object();
let intID; //
let isPaused; //

class timer {
    constructor(initialSetTime_s) {
        this.initialSetTime_s = initialSetTime_s;
        this.targetTimestamp_s = this.initialSetTime_s + Math.trunc(Date.now() / 1000);
        this.isPaused = false;
        this.intervalId = 0;
    }
    setTimer() {
        this.intervalId = setInterval(() => {
            console.log("hi")
            const currentTime_s = Math.floor(Date.now() / 1000);
            const timeLeft_s = this.targetTimestamp_s - currentTime_s;
            const displayHours = this.#formatValues(Math.floor(timeLeft_s / 60 / 60));
            const displayMins = this.#formatValues(Math.floor((timeLeft_s / 60) % 60));
            const displaySecs = this.#formatValues(Math.floor(timeLeft_s % 60));
            progress.style.width = `${(timeLeft_s / this.initialSetTime_s) * 100}%`;
            updatePage(displayHours, displayMins, displaySecs);
            if (timeLeft_s <= 0) {
                console.log(`${displayHours}:${displayMins}:${displaySecs}`);
                this.pauseTimer();
            }
        }, 1000);
    }
    pauseTimer() {
        clearInterval(this.intervalId);
        button.innerText = "Start";
        this.isPaused = true;
        this.timeLeftBuff = this.targetTimestamp_s - Math.floor(Date.now() / 1000);
    }
    resumeTimer() {
        this.targetTimestamp_s = this.timeLeftBuff + Math.floor(Date.now() / 1000);
        this.isPaused = false;
        this.setTimer();
    }
        #formatValues(num) {
            return num >= 10 ? num.toString() : "0" + num.toString();
        }
    }
/* OLD */
function updatePage(hours, mins, secs) {
    inputHours.value = hours;
    inputMinutes.value = mins;
    inputSeconds.value = secs;
}

function startTimer(hh, mm, ss) {
    const time = parseInt((+hh.value * 60 + +mm.value) * 60 + +ss.value);
    console.log(time);
    setTimer(time);
}

function toggleTimer() {
    if (!intID) startTimer(inputHours, inputMinutes, inputSeconds);
    else {
    }
}

function resetTimer() {
    clearInterval(intID);
    inputs.forEach((input) => (input.value = "00"));
    progress.style.flexBasis = "100%";
    button.innerText = "Start";
    intID = "";
    isPaused = false;
}

inputs.forEach((input) =>
    addEventListener("keyup", () => {
        if (input.value > 59) input.value = 59;
        if (input.value.length > 2) input.value = input.value.slice(0, 2);
    })
);

inputs.forEach((input) =>
    addEventListener("keydown", (evt) => {
        badKeys = [69, 190, 187, 189, 107, 109];
        if (badKeys.includes(evt.which)) evt.preventDefault();
    })
);

inputs.forEach((input) =>
    input.addEventListener("focus", (e) => {
        if (input.value) {
            values[input.placeholder] = input.value;
            input.value = "";
        }
    })
);

inputs.forEach((input) =>
    input.addEventListener("blur", (e) => {
        if (values[input.placeholder] && !input.value) {
            input.value = values[input.placeholder];
            values[input.placeholder] = "";
        }
        if (input.value) {
            input.value = formatValues(+input.value);
        }
    })
);

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) startTimer(inputHours, inputMinutes, inputSeconds);
});

inputs.forEach((input) =>
    addEventListener("change", () => {
        progress.style.flexBasis = "100%";
    })
);
