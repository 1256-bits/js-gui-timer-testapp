const inputHours = document.querySelector('input[placeholder="HH"]');
const imputMinutes = document.querySelector('input[placeholder="MM"]');
const inputSeconds = document.querySelector('input[placeholder="SS"]');
const button = document.querySelector("button");
const progress = document.querySelector("#progress");
const inputs = Array.from(document.querySelectorAll("input"));
const values = Object();
const ins = [inputHours, imputMinutes, inputSeconds];
let intID;
let isPaused;

function setTimer(sec) {
    if (sec <= 0) return;
    if (!isPaused) progress.style.flexBasis = "100%";
    button.innerText = "Stop";
    const targetTimeSeconds = Math.floor(Date.now() / 1000 + sec);
    intID = setInterval(() => {
        const currentTimeSeconds = Math.floor(Date.now() / 1000);
        const timeLeftSeconds = targetTimeSeconds - currentTimeSeconds;
        const displayHours = formatValues(Math.floor(timeLeftSeconds / 60 / 60));
        const displayMins = formatValues(Math.floor((timeLeftSeconds / 60) % 60));
        const displaySecs = formatValues(Math.floor(timeLeftSeconds % 60));
        if (isPaused) {
            isPaused = false;
        }
        progress.style.flexBasis = `${(timeLeftSeconds / sec) * 100}%`;
        updatePage(displayHours, displayMins, displaySecs);
        if (timeLeftSeconds <= 0) {
            console.log(`${displayHours}:${displayMins}:${displaySecs}`);
            clearInterval(intID);
            intID = "";
            button.innerText = "Start";
        }
    }, 1000);
}

function formatValues(num) {
    return num >= 10 ? num.toString() : "0" + num.toString();
}

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
