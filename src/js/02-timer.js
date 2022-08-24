import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dataTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysKeeper = document.querySelector('[data-days]')
const hoursKeeper = document.querySelector('[data-hours]')
const minutesKeeper = document.querySelector('[data-minutes]')
const secondsKeeper = document.querySelector('[data-seconds]')
const timer = document.querySelector(".timer")
const fields = document.querySelectorAll(".field")
let timerId = null;
let selectedDay = null;

startBtn.style.cssText = "cursor: pointer; background-color: blue; color: white; border: none; padding: 10px 30px; border-radius: 15px; margin-left: 15px";

timer.style.cssText = "display: flex;"

for (const field of fields) {
    field.style.cssText = "margin-right: 10px"
}

startBtn.setAttribute('disabled', true);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDay = selectedDates[0].getTime();
        if (selectedDay < new Date()) {
            Notify.failure('Please choose a date in the future');
            return;
        }
        startBtn.removeAttribute('disabled');
    }
}
flatpickr(dataTimePicker, options);

let newObject = {};

function showTimer() {
    timerId = setInterval(() => {
        const difference = selectedDay - new Date().getTime();
        if (difference <= 0) {
            clearTimeout(timerId);
            return
        }
        newObject = convertMs(difference);
        addContent(newObject);
    }, 1000)
}

function addContent({ days, hours, minutes, seconds }) {
        daysKeeper.textContent = days;
        hoursKeeper.textContent = addLeadingZero(hours);
        minutesKeeper.textContent = addLeadingZero(minutes);
        secondsKeeper.textContent = addLeadingZero(seconds);
    }

    startBtn.addEventListener('click', showTimer);