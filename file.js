const inputHours = document.querySelector('input[placeholder="HH"]');
const imputMinutes = document.querySelector('input[placeholder="MM"]');
const inputSeconds = document.querySelector('input[placeholder="SS"]');
const button = document.querySelector("button");
const progress = document.querySelector("#progress");
const inputs = Array.from(document.querySelectorAll("input"));
const values = Object();
const ins = [inputHours, imputMinutes, inputSeconds];
let intID; //
let isPaused; //

class timer {
    constructor(initialSetTime_s) {
        this.initialSetTime_s = initialSetTime_s;
        this.initialTimestamp_s = Math.trunc(Date.now() / 1000);
        this.isPaused = false;
        this.intervalId = 0;
    }
    setTimer() {
        this.intervalId = setInterval(() => {
            if (this.isPaused) this.isPaused = false;
            const currentTime_s = Math.floor(Date.now() / 1000);
            const timeLeft_s =
                this.initialTimestamp_s + this.initialSetTime_s - currentTime_s;
            const displayHours = this.#formatValues(Math.floor(timeLeft_s / 60 / 60));
            const displayMins = this.#formatValues(Math.floor((timeLeft_s / 60) % 60));
            const displaySecs = this.#formatValues(Math.floor(timeLeft_s % 60));
            progress.style.width = `${(timeLeft_s / this.initialTimestamp_s) * 100}%`;
            updatePage(displayHours, displayMins, displaySecs);
            if (timeLeft_s <= 0) {
                console.log(`${displayHours}:${displayMins}:${displaySecs}`);
                clearInterval(this.intervalId);
                delete this.intervalId;
                button.innerText = "Start";
            }
        }, 1000);
    }
    #formatValues() {
        return num >= 10 ? num.toString() : "0" + num.toString();
    }
}
/* OLD */
function updatePage(hours, mins, secs) {
    inputHours.value = hours;
    imputMinutes.value = mins;
    inputSeconds.value = secs;
}

function startTimer(hh, mm, ss) {
    const time = parseInt((+hh.value * 60 + +mm.value) * 60 + +ss.value);
    console.log(time);
    setTimer(time);
}

function toggleTimer() {
    if (!intID) startTimer(inputHours, imputMinutes, inputSeconds);
    else {
        clearInterval(intID);
        intID = "";
        isPaused = true;
        button.innerText = "Start";
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
    if (e.keyCode === 13) startTimer(inputHours, imputMinutes, inputSeconds);
});

inputs.forEach((input) =>
    addEventListener("change", () => {
        progress.style.flexBasis = "100%";
    })
);
