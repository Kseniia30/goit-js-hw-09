function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector("button[data-start]")
const stopBtn = document.querySelector('button[data-stop]')
const mainBody = document.querySelector("body")
let timerId = null;

function onClickStart() {
    timerId = setInterval(() => { mainBody.style.backgroundColor = getRandomHexColor() }, 1000);
}

startBtn.addEventListener('click', onClickStart)

function onClickStop() {
    clearInterval(timerId);
}

stopBtn.addEventListener('click', onClickStop)

