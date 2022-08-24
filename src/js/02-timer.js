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
        if (selectedDates[0] < new Date()) {
            Notify.failure('Please choose a date in the future');
        return;
        }
        startBtn.removeAttribute('disabled');

        const showTimer = () => {
            const now = new Date();
            localStorage.setItem('selectedData', selectedDates[0]);
            const selectedData = new Date(localStorage.getItem('selectedData'));

            if (!selectedData) {
                return
            }

            const difference = selectedData - now;

            const { days, hours, minutes, seconds } = convertMs(difference);

            daysKeeper.textContent = days;
            hoursKeeper.textContent = addLeadingZero(hours);
            minutesKeeper.textContent = addLeadingZero(minutes);
            secondsKeeper.textContent = addLeadingZero(seconds);

            if (
                daysKeeper.textContent === '0' &&
                hoursKeeper.textContent === '00' &&
                minutesKeeper.textContent === '00' &&
                secondsKeeper.textContent === '00'
            ) {
                clearInterval(timerId)
            }
        };

        const onClick = () => {
            if (timerId) {
                clearInterval(timerId)
            }
            showTimer();
            timerId = setInterval(showTimer, 1000);
        }
        startBtn.addEventListener('click', onClick);
    },
};

flatpickr(dataTimePicker, {...options})