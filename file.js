function setTimer(sec, flag = false) {
    if (sec <= 0)
        return;
    button.innerText = "Stop";
    const point = Math.floor(Date.now() / 1000 + sec);
    intID = setInterval(() => {
        const val = point - Math.floor(Date.now() / 1000);
        const hours = numProcess(Math.floor((val / 60 / 60) % 60));
        const mins = numProcess(Math.floor((val / 60) % 60));
        const secs = numProcess(Math.floor(val % 60));
        if (val <= 0) {
            console.log(`${hours}:${mins}:${secs}`);
            updatePage(hours, mins, secs);
            clearInterval(intID);
        }
        else {
            updatePage(hours, mins, secs);
            console.log(`${hours}:${mins}:${secs}`)
        }
    }, 1000);
}

function numProcess(num) {
    return num.toLocaleString(undefined, {
        minimumIntegerDigits: 2
    }
    )
}

function updatePage(hours, mins, secs) {
    hh.value = hours;
    mm.value = mins;
    ss.value = secs;
}

function startTimer(hh, mm, ss) {
    time = parseInt(((+hh.value * 60) + +mm.value) * 60 + +ss.value);
    console.log(time);
    setTimer(time);
}

function toggleTimer() {
    if (!intID)
        startTimer(hh, mm, ss);
    else {
        clearInterval(intID);
        intID = '';
        button.innerText="Start";
    }
}

const hh = document.querySelector('input[placeholder="HH"]');
const mm = document.querySelector('input[placeholder="MM"]');
const ss = document.querySelector('input[placeholder="SS"]');
const button = document.querySelector("button");
const inputs = Array.from(document.querySelectorAll("input"));
const values = Object();
const ins = [hh, mm, ss];
let intID;

inputs.forEach(input => addEventListener("keyup", () => {
    if (input.value > 59)
        input.value = 59;
    if (input.value.length > 2)
        input.value = input.value.slice(0, 2)
}));
6
inputs.forEach(input => addEventListener("keydown", (evt) => {
    badKeys = [69, 190, 187, 189, 107, 109];
    if (badKeys.includes(evt.which))
        evt.preventDefault();
}));

inputs.forEach(input => input.addEventListener("focus", (e) => {
    if (input.value) {
        values[input.placeholder] = input.value;
        input.value = '';
    }
}));

inputs.forEach(input => input.addEventListener("blur", (e) => {
    if (values[input.placeholder] && !input.value) {
        input.value = values[input.placeholder];
        values[input.placeholder] = '';
    }
    if (input.value) {
        input.value = numProcess(+input.value);
    }
}));

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 13)
        startTimer(hh, mm, ss);
})