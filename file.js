class Timer {
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
            const displayHours = UIElements.formatValues(
                Math.floor(timeLeft_s / 60 / 60)
            );
            const displayMins = UIElements.formatValues(
                Math.floor((timeLeft_s / 60) % 60)
            );
            const displaySecs = UIElements.formatValues(Math.floor(timeLeft_s % 60));
            UIElements.updateBar(timeLeft_s, this.initialSetTime_s);
            UIElements.updatePage(displayHours, displayMins, displaySecs);
            console.log(timeLeft_s);
            if (timeLeft_s === 0) {
                this.resetTimer();
                this.isFinished = true;
            }
        }, 1000);
    }
    toggleTimer() {
        if (this.isPaused) {
            this.isPaused = false;
            this.targetTimestamp_s =
                this.timeLeftBuff + Math.floor(Date.now() / 1000);
            this.setTimer();
        }
        clearInterval(this.intervalId);
        this.isPaused = true;
        this.timeLeftBuff = this.targetTimestamp_s - Math.floor(Date.now() / 1000);
    }
    resetTimer() {
        clearInterval(this.intervalId);
    }
}

class UIElements {
    constructor() {
        this.timer = new Timer(this.#timeToSeconds());
    }
    #timeToSeconds() {
        const hours = UIElements.inputHours.value;
        const minutes = UIElements.inputMinutes.value;
        const seconds = UIElements.inputSeconds.value;
        return (hours * 60 + minutes) * 60 + seconds;
    }
    static {
        this.inputHours = document.querySelector("#hours");
        this.inputMinutes = document.querySelector("#minutes");
        this.inputSeconds = document.querySelector("#seconds");
        this.progress = document.querySelector("#progress");
        this.inputs = document.querySelectorAll("input");
        this.resetButton = document.querySelector("#reset");
    }
    static formatValues(num) {
        return num >= 10 ? num.toString() : "0" + num.toString();
    }
    static updatePage(hours, mins, secs) {
        this.inputHours.value = hours;
        this.inputMinutes.value = mins;
        this.inputSeconds.value = secs;
    }
    static updateBar(timeLeft_s, timeTotal_s) {
        this.progress.style.width = `${(timeLeft_s / timeTotal_s) * 100}%`;
    }
    static resetUi() {
        this.inputs.forEach((input) => (input.value = "00"));
        this.progress.style.width = "100%";
    }
    static init() {
        this.inputs.forEach((input) => {
            input.addEventListener("keyup", (e) => {
                input = e.target;
                if (input.value > 59) input.value = 59;
                if (input.value.length > 2) input.value = input.value.slice(0, 2); //stops you from inputting zeros.
                if (input.value < 0) input.value = "00";
            });
            input.addEventListener("focus", (e) => {
                e.target.dataset.value = e.target.value;
                e.target.value = "";
            });
            input.addEventListener("blur", (e) => {
                input = e.target;
                if (input.value) {
                    input.value = this.formatValues(input.value);
                    return;
                }
                input.value = input.dataset.value;
            });
        });
        resetButton.addEventListener("click", () => {
            if (this.timer) this.timer.resetTimer();
            UIElements.resetUi();
        });
    }
}

const startButton = document.querySelector("#start");
UIElements.init();
