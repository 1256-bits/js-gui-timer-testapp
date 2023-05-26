class timer {
    constructor(initialSetTime_s) {
        this.initialSetTime_s = initialSetTime_s;
        this.targetTimestamp_s =
            this.initialSetTime_s + Math.trunc(Date.now() / 1000);
        this.isPaused = false;
        this.intervalId = 0;
    }
    setTimer() {
        this.intervalId = setInterval(() => {
            const currentTime_s = Math.floor(Date.now() / 1000);
            const timeLeft_s = this.targetTimestamp_s - currentTime_s;
            const displayHours = uiElements.formatValues(
                Math.floor(timeLeft_s / 60 / 60)
            );
            const displayMins = uiElements.formatValues(
                Math.floor((timeLeft_s / 60) % 60)
            );
            const displaySecs = uiElements.formatValues(Math.floor(timeLeft_s % 60));
            uiElements.updateBar(timeLeft_s, this.initialSetTime_s);
            uiElements.updatePage(displayHours, displayMins, displaySecs);
            if (timeLeft_s <= 0) {
                console.log(`${displayHours}:${displayMins}:${displaySecs}`);
                this.pauseTimer();
            }
        }, 1000);
    }
    pauseTimer() {
        clearInterval(this.intervalId);
        this.isPaused = true;
        this.timeLeftBuff = this.targetTimestamp_s - Math.floor(Date.now() / 1000);
    }
    resumeTimer() {
        this.targetTimestamp_s = this.timeLeftBuff + Math.floor(Date.now() / 1000);
        this.isPaused = false;
        this.setTimer();
    }
    resetTimer() {
        clearInterval(this.intervalId);
    }
}

class uiElements {
    static {
        this.inputHours = document.querySelector("#hours");
        this.inputMinutes = document.querySelector("#minutes");
        this.inputSeconds = document.querySelector("#seconds");
        this.button = document.querySelector("button");
        this.progress = document.querySelector("#progress");
        this.inputs = document.querySelectorAll("input");
    }
    static formatValues(num) {
        return num >= 10 ? num.toString() : "0" + num.toString();
    }
    static updatePage(hours, mins, secs) {
        inputHours.value = hours;
        inputMinutes.value = mins;
        inputSeconds.value = secs;
    }
    static updateBar(timeLeft_s, timeTotal_s) {
        this.progress.style.width = `${(timeLeft_s / timeTotal_s) * 100}%`;
    }
    static init() {
        this.inputs.forEach((input) => {
            input.addEventListener("keyup", () => {
                if (input.value > 59) input.value = 59;
                if (input.value.length > 2) input.value = input.value.slice(0, 2); //stops you from inputting zeros.
            });
            input.addEventListener("focus", (e) => {
                e.target.dataset.value = e.target.value;
                e.target.value = "";
            });
        });
    }
}
/* OLD */

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
/* GOOD */
/* GOOD */

inputs.forEach((input) =>
    input.addEventListener("keydown", (evt) => {
        badKeys = [69, 190, 187, 189, 107, 109];
        if (badKeys.includes(evt.which)) evt.preventDefault();
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
    if ((e.code = "Space")) startTimer(inputHours, inputMinutes, inputSeconds);
});

inputs.forEach((input) =>
    addEventListener("change", () => {
        progress.style.flexBasis = "100%";
    })
);
